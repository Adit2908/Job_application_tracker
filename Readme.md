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
  └── GET /api/auth/me

Job Applications
├── POST /api/applications
├── GET /api/applications
├── GET /api/applications/:id
├── PATCH /api/applications/:id
└── DELETE /api/applications/:id

Dashboard
├── GET /api/dashboard/stats
└── GET /api/dashboard/analytics

Tasks / Reminders
├── POST /api/tasks
├── GET /api/tasks
├── PATCH /api/tasks/:id
└── DELETE /api/tasks/:id

\*\* if you want to find a user by a mame you have to just do db.collectionName.find({name:"ABC"}) -- ab.users.find({firstName:"Mohan"})

\*\*if you want to get someOne changes to github you will write git pull <remote  name> <branch name>

if you are pulling changes into your main branch,you will always write
    git pull origin main


 if you are already on your current brach and it is properly linked (tracked to github),you can usually just type a shortcut - git pull 

if you are already on your github 

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
- Explore schematype option from the documentation
- add required ,unique,minLength,maxLength,trim
- Add default
- Install validator package from npm to add
  validation to email,passwors and photourl
- Improve the db schema and put all required validation
- Added some validator like isEmail,isPassword,isUrl to my Schema
- Validate data in signup api
- Install bcrypt library
- create passwordHash using bcrypt.hash and save the encrypted password
- Create a login Api
- Take email and password from req.body and compare it using bcrypt.compare
- Install jsonwebtoken
- In login api after email and password validation create a jwt token and send it back to the userAuth middleware
- Create userSchema method to getJWT()
- Create UserSchema method to validate password

- Explore job tracker apis
- Create a list of apis you can think of
- group multiple routes under respective routes

- Create a jobapplicationSchema and jobApplication Model
- create a post application api, getapplication by id and getAllapplication
- created a updatedApplication and deleteApplication

- create a dashboard.js route for dashboard stats and dashboard stats
- In this we will aggregate method to process multiple document
- $match{userId} will explain that the particular user will contain what type of document


- aggregate:- Aggregation operaions processes multiple documents and return computed results.You can use aggregation operations to:
  - Group value from multiple documents.
  - Compute a single result from the grouped data
  - Analyze data change over time
  - Query the most up-to-data version of your data

    $match-Filters the document stream to allow only matching documents to pass unmodified into the next pipeline stage. $match uses standard MongoDB queries. For each input document, outputs either one document (a match) or zero documents (no match).

    $group-Groups input documents by a specified identifier expression and applies the accumulator expression(s), if specified, to each group. Consumes all input documents and outputs one document per each distinct group. The output documents only contain the identifier field and, if specified, accumulated fields.

    $sum -Returns the sum of numeric values. $sum ignores non-numeric values.

          $sum is available in these stages:

          $addFields

          $bucket

          $bucketAuto

          $group

          $match stage that includes an $expr expression

          $project

          $replaceRoot

          $replaceWith

          $set

          $setWindowFields (Available starting in MongoDB 5.0)

    $cond- Evaluates a boolean expression to return one of the two specified return expressions.

    $eq- compares two values and returns:
    * true when the values are equivalent
    *false when the values are not equivalent

    $project- Passes the document with the requested fields to the next stage in the pipeline.The specified fields can be existing fields from the input documents or new computed fields.

    $sort - Sorts all input documents and returns them to the pipeline in sorted order
