1. Project Overview:
    a. A single page application for a single user to store,insert,delete,view and download pdfs.
    b. Utilises Reactjs for frontend and Flask for Backend.
    c. Sqllite3 for database and local folder(s) for storing pdfs.

3. To run this full stack application in local machine:
    a. Open git bash or command prompt or terminal.
    b. Execute this command: "git clone https://github.com/yashTilak1004/ini8labs_Assignment.git"
    c. Open ini8labs_Assignment folder.
    d. Then open Backend.
    e. Open terminal or git bash or command prompt and execute this command: "python -m venv venv"
    f. Execute "venv\Scripts\activate"
    g. Execute "pip install -r requirement.txt"
    h. Execute "python Flask_SQLLite.py". Now the backend server is active.(exposed in localhost:8001)

    i. Go to Frontend folder. Then go to frontend folder.
    j. Open terminal or git bash or command prompt and execute this command: "npm install"
    i. Execute "npm start". Now the frontend web app is active. (exposed in localhost:3000)

4. Example API Calls:
    a. 'localhost:8001/' -> no parameters.
    b. 'localhost:8001/insert' -> give metadata as pdf_file(pdf file to be inserted), file_path(a string),pdf_name(a string).
    c. 'localhost:8001/deletee' -> Give absolute file path(path assigned by operating system)
    d. 'localhost:8001/host-pdf' -> Give absolute file path
