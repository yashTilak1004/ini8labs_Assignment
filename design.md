1. Tech Stack Choices:
    a. I chose ReactJS framework for frontend because I'm more accustomed to it. React JS functional component architecture makes it    easy to create complex web apps.
    b. I chose Flask framework for backend to quickly expose rest api endpoints, and also because sqllite3 comes built in with python so my Flask application can utilise it alongside the api's.
    c. I chose sqllite3 due to its ease in building tables from python while still implementing most sql server queries.(Familiarity)
    d. If my application were to support 1000 users,here are the changes I would make:
        (i) Use NextJS since PDF Management since next js works well with single page applications.
        (ii) Utilise a more robust backend like .net or springboot(more documentation) with aws services like Elastic Load Balancer and Auto Scaling Group to scale the server.
        (iii) Since the amount of data attributes for the table is low, Postgresql or sql server or DynamoDB would work just fine. 
        (iv) S3 or a common shared path in a server for storage.

2. Architecture Overview:
    a. The frontend shows the webpage to end user. The user has the option to look at table, insert a pdf, delete a pdf(table row), view a pdf.
    b. The backend takes care of fetching table data, inserting the pdf in a local folder and its metadata in the table,
    deleting the pdf from the folder and its metadata, hosting a pdf in server(local files are not allowed in modern web browsers).
    c. sqllite3 db file to take care of metadata.

3. API Specification:
    (For localhost:8000)
    a. "/" -> Get table data. (no parameters) (GET)
    b. "/insert/" -> Insert table data and insert pdf in folder. (POST)
    c. "/deletee/" -> Delete table row and pdf from folder. (POST)
    d. "/host-pdf/" -> Get hosted URL for requested pdf, to view it below the main table. (POSt)
    e. "/files/<token>" -> The hosted pdf url. (GET)

4. Data Flow Description:
    a. Go to 'Insert PDF section' in webpage, and upload the pdf.
    b. The flask application endpoint ("/insert/") takes the file and places it in a local folder.(If it doesn't exist,the folder is made.)
    c. The same endpoint isnerts the relevant metadata for pdf.
    d. Now the 'View PDF List' in webpage shows the updated table(using '/' endpoint).
    e. Upon clicking view, the pdf is hosted from url given by '/host-pdf/' endpoint. The pdf possess the option for download.

5. The assumptions I made while going into this application:
    a. At most 3 endpoints (5 to cover all scenarios).
    b. Lack of use for cors. (CORS made sure my api calls don't return errors.)