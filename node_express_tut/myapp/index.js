const express = require("express");
const app = express();      // server is created here 
const port = 3000;

app.get("/", (req, res) =>{
    res.send("Hello World!");
});

app.listen(port, () =>{
    console.log(`Example app listening on port ${port}!`);    // backticks enable us to interpolate $port
})