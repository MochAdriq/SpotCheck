const express = require("express");
const bodyParser = require("body-parser");
const mysql = require("mysql");
const cors = require("cors");

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(cors());

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "parking_db",
});

db.connect((err) => {
    if (err) {
        throw err;
    }
    console.log("MySQL Connected...");
});

// Endpoint GET untuk mengambil data dari tabel parking_data
app.get("/api/data", (req, res) => {
    let sql = "SELECT * FROM parking_data";
    db.query(sql, (err, results) => {
        if (err) throw err;
        res.setHeader("Access-Control-Allow-Origin", "*"); // Set header CORS
        res.json(results);
    });
});

// Endpoint POST untuk menyimpan data ke tabel parking_data
app.post("/api/data", (req, res) => {
    const { d1, d2, d3 } = req.body;

    let sql = "INSERT INTO parking_data (d1, d2, d3) VALUES (?, ?, ?)";
    db.query(sql, [d1, d2, d3], (err, result) => {
        if (err) throw err;
        res.setHeader("Access-Control-Allow-Origin", "*"); // Set header CORS
        res.send("Data inserted");
    });
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
