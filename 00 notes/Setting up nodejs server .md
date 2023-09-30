# Setting up nodejs server

Status: Node.js Odin

1. Run script from CLI 
    1. node app.js        
        1. simple straightforward 
        2. we can also explicitly tell app.js script to use using node by == #!/usr/bin/env node
    2. passing arugement instead of file path to node ==  node -e "console.log(123)”
    3. nodemon app.js 
        1. it automatically restart the app whenever code is changed 
        2. first we install this command via either of methods 
            1. npm i -g nodemon
            2. npm i --save-dev nodemon
        3. then use == nodemon app.js
        4. alternatively, we can edit script in package.json 
            - "scripts": {
            "start": "nodemon app.js"
            }
            - then use “npm start” and it will be using nodemon only
    
2. Read .env files from node.js
    1. process refers to currently executing nodejs application. so we have process core module which provides various properties and methods through which we interact with the process. 
    2. one such property is = .env , this property is an object actually which holds all environment variables in a key-value pair which contain data, config info, settings, etc 
    3. now what is environment variables?  these are external to our nodejs application and are setup in the same environment where app is being executed. we use them to configure the behaviour of application or to provide it sensitive information like api keys, etc.
    4. how do we use all this? 
        1. passing the env variables alongwith executing the nodejs application 
            
            ```jsx
            USER_ID=239482 USER_KEY=foobar node app.js
            ```
            
        2. accessing the env variables 
            
            ```jsx
            process.env.USER_ID; // "239482"
            process.env.USER_KEY; // "foobar"
            ```
            
    5. here all these env variables are being loaded from process object but what if we have lots of env variables in a different file - we use dotenv package to load them from file to process object 
        1. by calling the package 
            
            ```jsx
            require('dotenv').config();
            
            process.env.USER_ID; // "239482"
            process.env.USER_KEY; // "foobar"
            process.env.NODE_ENV; // "development"
            ```
            
        2. if you dont want to call the package 
            
            ```jsx
            node -r dotenv/config index.js
            ```
            
3. Make HTTP requests from node.js