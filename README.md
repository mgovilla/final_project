# Running the program

Env files will be required->

client: 
REACT_APP_GITHUB_CLIENT_ID_LOCAL=<client_id>
REACT_APP_GITHUB_CALLBACK=http://localhost:5000/auth

backend:
MONGODB_URI=<mongo_db_uri>
GITHUB_CLIENT_ID=<client_id>
GITHUB_CLIENT_SECRET=<client_secret>

GITHUB_CLIENT_ID_LOCAL=<client_id>
GITHUB_CLIENT_SECRET_LOCAL=<client_secret>
CALLBACK_URL=http://localhost:5000/auth
 
This project has a React frontend with an Express API backend. To run the code, npm start in both the backend and client directories (in different consoles)