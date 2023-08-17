const express = require('express');
const mysql = require('mysql');

const app = express();
const port = 3001;

// Connect to MySQL
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 't00d00',
    database: 'us_states_counties_water'
});

db.connect((err) => {
    if (err) throw err;
    console.log('Connected to MySQL database.');
});

// Define a simple API endpoint
app.get('/data', (req, res) => {
    // Retrieve a query parameter from the request, e.g., http://localhost:3001/data?id=5
    const id = req.query.id;

    // Make sure the parameter is provided
    if (!id) {
        return res.status(400).send({ error: 'ID parameter is required' });
    }

    // Use the ? placeholder in the query, and provide the parameter value as the second argument to db.query
    const query = 'SELECT * FROM table_name WHERE id = ?';
    db.query(query, [id], (err, result) => {
        if (err) res.status(500).send({ error: err });
        else res.send({ data: result });
    });
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});