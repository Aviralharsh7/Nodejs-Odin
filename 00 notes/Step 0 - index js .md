# Step 0 - index.js

Status: realWorld-backend-medium
file link: https://github.com/winterrrrrff/realWorld-server/blob/main/api/index.js#L9C38-L9C47

# 1. Imporing dependencies

```jsx
require('dotenv').config();
const express = require('express');
const app = express();
const path = require('path')
const PORT = process.env.PORT || 4000;
```

- first, we load the .env files into nodejs “process.env” object using “dotenv” module.
- then we load express module into a variable.
- now create an instance of express application inside the variable “app”
    - The **`app`** variable represents your web application, and you will use it to define routes, middleware, and other settings for your application.
- now path module is imported  that provides utilities for working with file and directory paths.
    - makes path operating system independent.
    - paths for serving static assets like html, css, images, js
- then we set the variable PORT with the value
    - **`PORT`** variable determines the port on which your Express application will listen for incoming HTTP requests.
    - It checks if there's an environment variable called **`PORT`** available in the **`process.env`** object. If there is, it assigns the value of **`PORT`** from the environment variable. If the **`PORT`** environment variable is not set, it defaults to **`4000`**.

```jsx
const cookieParser = require('cookie-parser');
const cors = require('cors');
const corsOptions = require('../config/corsOptions');
const connectDB = require('../config/dbConnect');
const mongoose = require('mongoose');
```

- cookieParser module is imported - it is middleware that parses the cookies which are attached to incoming http requests.
    - by parsing it means - extract the cookie data and add it to the “request object”
    - data includes stuff like user-specific info or session information.
- cors stands for cross origin resource sharing. it is a security feature which restricts webpages from making requests to different domain that the one served that served the webpage itself !!
    - this is static module - not defined in config folder
- another cors module but this is custom defined. it typically defines -
    - origin: '[https://example.com](https://example.com/)',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    headers: 'Content-Type,Authorization',
- connectDB module will establish a connection to our mongoDB database using the mongoose library
    - this is custom defined in the config folder
- importing mongoose library which is used for interacting with our database. it provides an abstraction layer for mongoDB operations - which helps us working with data models and schemas
    - mongoose makes it easy to define - data models, create documents, query database and handling schema validation.

# 2. Environment variable check, DB connect

```jsx
console.log(process.env.NODE_ENV);
connectDB();
```

- the environment variable NODE_ENV  - is used to determine the current environment in which our application is running (development, production, test)
    - **Development:** When **`NODE_ENV`** is set to "development," your application might load development-specific configurations. This can include enabling debugging, using development databases, and showing detailed error messages. It's typically more permissive and geared towards aiding developers in debugging and development tasks.
    - **Production:** When **`NODE_ENV`** is set to "production," your application should load production-specific configurations. This often means turning off debugging, using production databases, and showing generic error messages. It aims to optimize for performance, security, and reliability.
    - **Test:** In a testing environment, you can set **`NODE_ENV`** to "test" to load configurations specific to testing, such as using a testing database, enabling testing libraries, and configuring test-specific behaviors.
- the function named “connectDB()” is called. it establishes the connnection to mongoDB database.
    - where is the code for it ??  config files

# 3. Mounting parsers and CORS

```jsx
app.use(cors(corsOptions));
app.use(express.json()); // middleware to parse json
app.use(cookieParser());
```

- IMPORTANT - middlewares are executed in the order they are registered using the [app.us](http://app.us)e ( ) function.
- we are mounting middleware function on our app using the function app.use ( )
    - middleware code runs during the request response cycle performing tasks on incoming requests or outgoing responses.
    - cors specificially controls the origins which are allowed to access the resources on our server. even subdomains ("[app.website.com](http://app.website.com/)" and "[api.website.com](http://api.website.com/)") are defined in cors headers.
    - options includes specifying allowed origins, methods and headers for cross origin requests.
    - here cross origin requests are requests made to external APIs like payment gateaway, weather, social media api
- this middleware is parsing json data from incoming htttp requests
    - such instances occur when filling forms or making api requests
    - it adds the data to request.body object, which we have used extensively so far.
- this middleware parses http request cookies
    - it adds them to request.cookies object.
    - cookies store small peices of data on client side like user authentication tokens or session identifiers.

# 4. Mounting route handlers

```jsx
// static route
app.use('/', express.static(path.join(__dirname, '/public')));
app.use('/', require('../routes/root')); 
```

- IMPORTANT - **`app.use(...)`** is used to mount middleware or routers at a specific path in your Express application. In this case, the path **`'/'`** represents the root of your application.
- this middleware is built-in and is used to server static files. it takes single arguement which is path to the directory containing the static files
    - __dirname - is global variable in nodejs that represents the directory name of the current module (in this case index.js is the module) and provides the absolute path to this directory
    - path.join  is a method from “path module”
        - here it essentially concatenates the __dirname and /public to built the correct absolute path to the requried directory
    - Any files placed in the "public" directory can then be accessed by clients (e.g., web browsers) by specifying their URLs relative to the root of your web server. For example, if you have a file named "styles.css" in the "public" directory, it can be accessed via the URL **`http://yourdomain.com/styles.css`** once this middleware is set up.
- this middleware is mounting a route handler at / path
    - this route handler is situated on specified path and contains the relevent logic to handle the request .
        - where is the request bro? i mean how is route handler called up?

```jsx
// user routes - for testing
app.use('/test', require('../routes/testRoutes'));

// user routes - for /api/users and /api/user
app.use('/api', require('../routes/userRoutes'));

// user routes - for profiles
app.use('/api/profiles', require('../routes/profileRoutes'));

// article routes
app.use('/api/articles', require('../routes/articleRoutes'));

// tag route
app.use('/api/tags', require('../routes/tagRoutes'));

// comment routes
app.use('/api/articles', require('../routes/commentRoutes'));
```

- all these are route handlers which are being mounted by the function “app.use( )” which is inbuilt function of express package.
    - it specifies at what place the route handler is mounted and where is path of route handler code

# 5. Starting server, mongoose

```jsx
mongoose.connection.once('open', () => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
});
```

- mongoose.connection - is an instance of “Connection” class provided by mongoose. this connection object is used to manage the connection to database, perform database operations and interact with mongoDB.
    - Once the connection is successfully established using `**mongoose.connect()**` , **`mongoose.connection`** represents that open connection.
    - we can perform various functions using connection object like - listening for events (open, close, error) , perform crud operations, manage transactions
- **once(event, listener)**
    
    Adds a one time listener to the event. This listener is invoked only the next time the event is fired, after which it is removed. Returns emitter, so calls can be chained.
    
- here, the “open” event is emitted by mongoose when it successfully connects to the mongoDB database.
    - we console.log it when the event has occured
- now, we start the express.js web server and causing it to listen to incoming http requests on the specified port (or default one 4000)
    - app.listen( ) is an inbuilt method that starts the server. it takes two arguements -
        - PORT where it should listen.
        - call back function that is executed when the server is up and running (here callback func log a message for success and importantly specifies the PORT it is listening too)

 

```jsx
mongoose.connection.on('error', err => {
    console.log(err);
})
```

- here we are listening for error event and the vallback func defines what to do incase event is registered by the connection object.
- The **`.on()`** method is being used to register an event listener on the **`mongoose.connection`** object.

# 6. Exporting app

```jsx
module.exports = app;
```

- the whole app is now being added to this special object called module. exports
- now it can be imported by other modules using require
