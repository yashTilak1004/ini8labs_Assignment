1. Project Overview

Type: Single Page Application (SPA)

User: Single user functionality to store, insert, delete, view, and download PDFs

Frontend: React.js

Backend: Flask

Database: SQLite3

Storage: Local folders for storing PDFs

2. Running the Full Stack Application Locally
Backend Setup

Open Git Bash, Command Prompt, or Terminal.

Clone the repository:

git clone https://github.com/yashTilak1004/ini8labs_Assignment.git


Navigate into the project folder:

cd ini8labs_Assignment/Backend


Create and activate a virtual environment:

Create virtual environment:

python -m venv venv


Activate virtual environment:

On Windows (Command Prompt):

.\venv\Scripts\activate.bat


On Unix or Git Bash:

source venv/bin/activate


Install dependencies:

pip install -r requirements.txt


Start the backend server:

python Flask_SQLLite.py


Backend server will run on localhost:8001

Frontend Setup

Navigate to frontend folder:

cd ../Frontend/frontend


Install npm packages:

npm install


Start the frontend app:

npm start


Frontend app will be available on localhost:3000

3. Example API Endpoints
Endpoint	Method	Description	Payload / Parameters
localhost:8001/	GET	Basic endpoint, no parameters	None
localhost:8001/insert	POST	Insert a PDF with metadata	pdf_file (file), file_path (string), pdf_name (string)
localhost:8001/deletee	POST	Delete PDF by absolute file path	Absolute file path (string)
localhost:8001/host-pdf	GET	View or host PDF by absolute file path	Absolute file path (string)

Let me know if you want it tailored for README.md or any other format!