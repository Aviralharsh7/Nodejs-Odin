# Step 5 - config —

Status: realWorld-backend-medium
file link: https://github.com/winterrrrrff/realWorld-server/tree/main/config

# 1. allowedOrigin.js

```jsx
const allowedOrigins = [
    'http://localhost:3000',
    'http://localhost:4200',
    'https://winterrrrrff.github.io',
    'https://angular-realworld-example-app-neon.vercel.app'
];

module.exports = allowedOrigins;
```

- we create a variable “allowedOrigins” which is an array. it is a special type of object.
- we are storing a list of accepted URL for CORS
    - aka these orgins are allowed to access resources or perform some action on a server.
- [localhost](http://localhost) are just local development servers

# 2. corsOptions.js

```jsx
const allowedOrigins = require('./allowedOrigins')
```

- we imported the list of origin URL which are tucked away in separate JS file

```jsx
const corsOptions = {
  origin: (origin, callback) => {
      if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
          callback(null, true)
      } else {
          callback(new Error('Not allowed by CORS'))
      }
  },
  credentials: true,
  optionsSuccessStatus: 200
}
```

- we create an variable object “corsOptions” which we later on pass as arugment to cors( ) at the time of mounting it in the app.
- origin is a property of our object and its value is determined by a callback function
    - it takes two parameters
