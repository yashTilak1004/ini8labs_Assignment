from flask import Flask, jsonify, request, make_response, url_for, abort, send_file
from flask_cors import CORS
from pathlib import Path
import shutil
import base64
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
    return jsonify(data), 200

#2. Insert a pdf into a folder, then update the table.
@app.route("/insert", methods=["POST","OPTIONS"])
def Insert_File():
    pdf_file = request.files.get("pdf")       
    file_path = request.form.get("file_path")  
    pdf_name = request.form.get("pdf_name")    

    # Validate inputs
    if not pdf_file or not file_path:
        return make_response("Missing file or file path", 400)

    if not pdf_name:
        pdf_name = pdf_file.filename

    if not os.path.exists(file_path):
        os.makedirs(file_path)

    # Full file save path
    save_path = os.path.join(file_path, pdf_name)
    pdf_file.save(save_path)

    
    absolute_path = os.path.abspath(save_path)
    
    print(save_path)
    print(str(absolute_path))

    conn = get_db_connection()
    cursor = conn.cursor()

    cursor.execute("""
        INSERT INTO pdf_files (pdf_name, folder_path, absolute_path)
        VALUES (?, ?,?)
    """, (pdf_name, save_path, str(absolute_path)))

    conn.commit()
    conn.close()
    
    return make_response("File uploaded successfully", 201)

#3. Delete
@app.route("/deletee", methods=["POST", "OPTIONS"])
def Delete_File():
    file_path = request.form.get("Absolute file path")
    print(file_path)
    try:
        target = Path(file_path).resolve(strict=False)
        if not target.exists():
            return make_response("Folder not found", 404)
        if target.is_dir():
            shutil.rmtree(target)
        else:
            target.unlink()

    except PermissionError:
        return make_response("Permission denied", 403)
    except Exception as e:
        print("delete error:", e)
        return make_response(f"Couldn't delete folder: {e}", 500)

    conn = get_db_connection()
    cursor = conn.cursor()

    cursor.execute("DELETE FROM pdf_files WHERE absolute_path = ?", (file_path,))
    conn.commit()
    
    # Check if table is empty, if so then reset sequence.
    cursor.execute("SELECT COUNT(*) FROM pdf_files")
    count = cursor.fetchone()[0]

    if count == 0:
        cursor.execute("UPDATE SQLITE_SEQUENCE SET seq = 0 WHERE name = 'pdf_files';")
        conn.commit()
        
    conn.close()

    return make_response("Deleted successfully", 200)

@app.route("/host-pdf", methods=["POST"])
def host_pdf():
    path = request.form.get("Absolute file path")
    print(path)
    if not path:
        return jsonify({"error": "path required"}), 400

    # Validate absolute path and file existence
    if not os.path.isabs(path) or not os.path.isfile(path):
        return jsonify({"error": "file not found or path not absolute"}), 404

    # Ensure it's a PDF
    if not path.lower().endswith(".pdf"):
        return jsonify({"error": "not a PDF"}), 400

    # Encode path to a URL-safe token (doesn't hide from someone with token, so protect tokens in prod)
    token = base64.urlsafe_b64encode(path.encode()).decode()
    file_url = url_for("serve_pdf_by_token", token=token, _external=True)
    return jsonify({"url": file_url}), 200

@app.route("/files/<token>")
def serve_pdf_by_token(token):
    try:
        path = base64.urlsafe_b64decode(token.encode()).decode()
    except Exception:
        abort(400)
    if not os.path.isabs(path) or not os.path.isfile(path) or not path.lower().endswith(".pdf"):
        abort(404)
    return send_file(path, mimetype="application/pdf", as_attachment=False)

if __name__ == "__main__":
    app.run(debug=True, port=8001)
