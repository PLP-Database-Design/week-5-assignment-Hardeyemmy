const express = require("express");
const app = express();
const cors = require("cors");

const mysql = require("mysql2");
require('dotenv').config();

app.use(express.json());
app.use(cors());

const dbconfig = {
    user: process.env.DB_USER,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT
};


const db = mysql.createConnection(dbconfig);

db.connect((err) => {
    if (err) {
        console.error("error connecting: ", err);
        return;
    }
    console.log('connected to database sucessfully', db.threadId);

    const PORT = 3000;
app.listen(PORT, () => {
    console.log(`server is running on http://localhost:${3000}`)


    // sending a message to the server
    app.get('/', (req, res) => {
        res.send("It's TIME!!")
        })
    });
});



