from flask import Flask, jsonify, request
from flask_cors import CORS
import sqlite3
import os

app = Flask(__name__)
CORS(app)

def get_db_connection():
    conn = sqlite3.connect('PDF_Table.db')
    conn.row_factory = sqlite3.Row  
    return conn

#1. Get table details
@app.route("/", methods=["GET"])
def Get_Data():
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM pdf_files")
    rows = cursor.fetchall()
    conn.close()
    data = [dict(row) for row in rows]
    return jsonify(data)

#2. Insert a pdf into a folder, then update the table.
@app.route("/insert", methods=["POST"])
def Insert_File():
    pdf_file = request.files.get("pdf")       
    file_path = request.form.get("file_path")  
    pdf_name = request.form.get("pdf_name")    

    # Validate inputs
    if not pdf_file or not file_path:
        return "Missing file or file path", 400 #one of the 2 inputs is empty.

    if not pdf_name:
        pdf_name = pdf_file.filename

    if not os.path.exists(file_path):
        os.makedirs(file_path)

    # Full file save path
    save_path = os.path.join(file_path, pdf_name)

    pdf_file.save(save_path)

    conn = get_db_connection()
    cursor = conn.cursor()

    cursor.execute("""
        INSERT INTO pdf_files (pdf_name, folder_path)
        VALUES (?, ?)
    """, (pdf_name, file_path))

    conn.commit()
    conn.close()
    
    return "File uploaded successfully", 201

#3. Delete
@app.route("/delete", methods=["POST"])
def Delete_File():
    data = request.get_json()
    file_path = data.get("file_path")

    if not file_path:
        return 400 #Wrong file_path

    try:
        if os.path.exists(file_path):
            os.rmdir(file_path)  

        else:
            return 404 #Folder not found
    except Exception as e:
        return 500 #Couldn't delete folder

    conn = get_db_connection()
    cursor = conn.cursor()

    cursor.execute("DELETE FROM pdf_files WHERE folder_path = ?", (file_path))
    conn.commit()
    conn.close()

    return 200

if __name__ == "__main__":
    app.run(debug=True,port=8001)    