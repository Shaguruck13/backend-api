require("dotenv").config();
require("./db/config");
const express = require("express");
const port = process.env.port || 3000;
const server = express();

server.listen(port, (err) => {
    err? console.warn(`Hubo un error ${port}`) : console.log (`Servidor corre en http://localhost:${port}`)
});

server.use(express.json())
server.use(express.urlencoded({extended: false}));
server.use(express.static("storage"))

server.get("/", (req, res) => {
    const content = `
    <h1>Nuestra API</h1>
    <pre>Bienvenidos a nuestra API construida con NJ<pre>
    `
    res.send(content)
});

server.use("/users", require("./users/usersRoute"));

server.use((req, res, next) => {
    let error = new Error ("Resource not found")
    error.status = 404
    next(error)
});

server.use((error, req, res, next) => {
    if(!error.status) {
        error.status = 500
    }
    res.status(error.status)
    if(error.message == 'ER_DUP_ENTRY'){
        res.json({status: error.status, message:"Users Exists"})
    }else{
    res.json({status: error.status, message: error.message})}
})