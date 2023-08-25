const express = require('express');
const mysql = require('mysql');
const cors = require('cors');  // Add this line

const app = express();
const port = 5000;

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

app.use(cors());  // Add this line to use CORS middleware

// Change endpoint to /search/:city
app.get('/search/:zip', (req, res) => {
    const givenZip = req.params.zip;  // Use req.params to get the ZIP code parameter

    // The new SQL query
    const query = `
        SELECT 
            z.STCOUNTYFP AS FIPS, 
            c.lat AS Latitude, 
            c.lng AS Longitude, 
            c.State AS State,
            w.City AS City, 
            w.Hardness AS Hardness,
            w.Latitude AS CityLatitude,
            w.Longitude AS CityLongitude
        FROM 
            us_states_counties_water.zip_to_fips_mapping z
        JOIN 
            us_states_counties_water.county_coordinate c ON z.STCOUNTYFP = c.FIPS
        JOIN 
            us_states_counties_water.water_hardness w ON 1=1
        WHERE 
            z.ZIP = ?
        ORDER BY 
            POW(w.Latitude - c.lat, 2) + POW(w.Longitude - c.lng, 2)
        LIMIT 1;
    `;

    // Execute the query
    db.query(query, [givenZip], (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).send({ error: 'Internal server error' });
        } else {
            console.log(result);
            res.send({ data: result });
        }
    });
});

app.get('/all', (req, res) => {
    const query = 'SELECT * FROM us_states_counties_water.water_hardness';
    db.query(query, (err, result) => {  // added 'fields'
        if (err) {
            console.log(err);
            res.status(500).send({ error: 'Internal server error' });
        } else {
            res.send({ data: result });
        }
    });
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});