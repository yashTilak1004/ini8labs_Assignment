import sqlite3

conn = sqlite3.connect('PDF_Table.db')
cursor = conn.cursor()
cursor.execute("""
CREATE TABLE pdf_files (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    pdf_name TEXT NOT NULL,
    insertion_date TEXT DEFAULT (datetime('now')),
    folder_path TEXT NOT NULL,
               absolute_path TEXT NOT NULL
);
""")
#cursor.execute("UPDATE SQLITE_SEQUENCE SET seq = 0 WHERE name = 'pdf_files';")
# cursor.execute("DELETE FROM pdf_files")
conn.commit()
conn.close()
