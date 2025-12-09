import sqlite3

conn = sqlite3.connect('PDF_Table.db')
cursor = conn.cursor()
cursor.execute("DELETE FROM pdf_files")
conn.commit()
conn.close()