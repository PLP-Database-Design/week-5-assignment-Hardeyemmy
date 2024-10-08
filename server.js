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

  

    app.set('view engine', 'ejs');
    app.set('views', __dirname + '/views');

    //question 1
    app.get('/patients', (req, res) => {
        db.query('SELECT * FROM patients', (err, results) =>
            {
                if (err){
                    console.log(err)
                    res.status(500).send('error retrieving data');
                } else {
                    res.render('patients', {results: results});
                }
            
                
            });
    });

    //question 2
    app.get('/providers', (req, res) => {
        db.query('SELECT * FROM providers', (err, results) => {
            if (err) {
                console.log(err)
                res.status(500).send('Error retrieving data');
            } else {
                res.render('providers', {results: results})
            }
        });
    });

    //question 3
    app.get('/patients/:firstName', (req, res) => {
        const firstName = req.params.firstName;
      
        db.query('SELECT * FROM patients WHERE first_name = ?', [firstName], (err, results) => {
          if (err) {
            console.log(err);
            res.status(500).send('Error retrieving patients');
          } else {
            res.render('patients', {results: results});
          }
        });
      });

      //question 4
      app.get('/providers/:specialty', (req, res) => {
        const specialty = req.params.specialty;
      
        db.query('SELECT * FROM providers WHERE provider_specialty = ?', [specialty], (err, results) => {
          if (err) {
            console.log(err);
            res.status(500).send('Error retrieving patients');
          } else {
            res.render('providers', {results: results});
          }
        });
      });

    // sending a message to the server
    app.get('/', (req, res) => {
        res.send("It's TIME!!")
        })
    });


const PORT = 3000;
app.listen(PORT, () => {
    console.log(`server is running on http://localhost:${3000}`)

});