## Features
    # Login/SignUp
    # Add job Application
    #Company,position,salary,link
    # Status:
        - Applied
        - OA
        - Interview
        - Rejected
        - Selected
    # Search/Filter
    # Dashboard with Recharts
    # Admin?user Roles

## My APIs
- postAuthentication
├── POST /api/auth/signup
├── POST /api/auth/login
├── POST /api/auth/logout
└── GET  /api/auth/me

Job Applications
├── POST   /api/applications
├── GET    /api/applications
├── GET    /api/applications/:id
├── PATCH  /api/applications/:id
└── DELETE /api/applications/:id

Dashboard
├── GET /api/dashboard/stats
└── GET /api/dashboard/analytics

Tasks / Reminders
├── POST   /api/tasks
├── GET    /api/tasks
├── PATCH  /api/tasks/:id
└── DELETE /api/tasks/:id



# Procedure
 - Create a configuration file using npm init
 - Install express
 - Install Nodemon
 - Added start and dev Script in app.js
 - Created a project in mongodb and created a cluster
 - Create a file and connect to the database using connection String
 - create a UserSchema and user model
 - Create a post signup api to add data to the database
 - Push some doocument using api calls from postman
 - Error handling using try and catch

 - Add the express.json middleware to your app
 - Make your signup api dynamic to recceive data from the end user
 - Data Sanitization
 