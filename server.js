const express = require('express');
const app = express();

const weather = require('./data/weather.json');
require("dotenv").config();
const cors = require('cors');
app.use(cors());

app.get('/', (req, res) => { res.send("hello world") })


app.get('/weather', (req, res) => {
    let lat = req.query.lat
    let lon = req.query.lon
    let searchQuery = req.query.lat
 
    try {
        let findData = () => {
            let city = weather.find(city => {
                return (city.city_name.toLocaleLowerCase === searchQuery.toLocaleLowerCase && city.lat === number(lat) && city.lon === number(lon))
            })
            return city.data.map(item => {
                return new ForeCast(item);
            })
        }
        res.json(findData());
    } catch (error) {
        res.status(500)
        res.json({ message: "something wrong", error: error })
    }
});

    class ForeCast {
        constructor(weatherData) {
            this.date = weatherData.valid_date
            this.description = weatherData.weather.description

        }

    }




   app.listen(PORT, () => {
        console.log(`starting at port ${PORT} `);
    });
