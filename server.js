const express = require('express');
const app = express();

const weather = require('./data/weather.json');

const cors = require('cors');
app.use(cors());

require("dotenv").config();
const PORT = process.env.PORT;

app.get('/', (req, res) => { res.send("hello world") })


app.get('/weather', (req, res) => {
    let lat = req.query.lat
    let lon = req.query.lon
    let searchQuery = req.query.lat
    console.log(lat, lon, searchQuery);

    let foreCastData=weather.map((item,i)=>{
        return new ForeCast(item.data)
    })
    res.json(
      
        weather.find((item, i) => {
            if (item.city_name === searchQuery)
              
        }else {
            return { massage :"not found"}
        }
        )
})

class ForeCast {
    constructor(weatherData) {
        this.date = weatherData.valid_date
        this.description = weatherData.weather.description
    }

}




server.listen(PORT, () => {
    console.log(`starting at port ${PORT} `);
});
