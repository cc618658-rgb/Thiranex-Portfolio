require("dotenv").config();

const express = require("express");
const axios = require("axios");
const path = require("path");

const app = express();

app.use(express.json());
app.use(express.static(__dirname));

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"));
});


// Node.js → Python API
app.get("/api/python", async (req, res) => {

    try {

        const response = await axios.get(
            "http://127.0.0.1:5000/api/hello"
        );

        res.json(response.data);

    } catch (error) {

        res.status(500).json({
            error: "Python API connection failed"
        });

    }

});


// Contact Form → Node.js → Python
app.post("/api/contact", async (req, res) => {

    try {

        const response = await axios.post(
            "http://127.0.0.1:5000/api/contact",
            req.body
        );

        res.json(response.data);

    } catch (error) {

        res.status(500).json({
            error: "Contact form connection failed"
        });

    }

});
app.get("/api/projects", (req, res) => {

    const sql = "SELECT * FROM projects";

    db.query(sql, (err, results) => {

        if (err) {
            return res.status(500).json({
                error: "Database query failed"
            });
        }

        res.json(results);
    });

});


app.listen(3000, () => {
    console.log("Node server running at http://localhost:3000");
});
const mysql = require("mysql2");
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: process.env.DB_PASSWORD,
    database: "portfolio_db"
});

db.connect((err) => {
    if (err) {
        console.log("MySQL connection failed:", err.message);
    } else {
        console.log("MySQL connected successfully!");
    }
});