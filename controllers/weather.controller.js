const ForeCast = require('../models/weather.model');
const WEATHER_API_KEY = process.env.WEATHER_API_KEY;
const { default: axios } = require('axios');
const Cache = require('../utils/cache')

let cache = new Cache();
cache['data'] = [];


const weatherController = (req, res) => {
    let weather;
    let lat = req.query.lat
    let lon = req.query.lon

    let arrData = [];
    if (lat && lon) {
        if (cache.data.length > 0) {
            arrData = cache.data.map(data => new ForeCast(data))
            console.log('cache ====================');
            res.send(arrData)
        } else {
            let urlWeather = `https://api.weatherbit.io/v2.0/forecast/daily?key=${WEATHER_API_KEY}&lat=${lat}&lon=${lon}`
            let weatherBitData = axios.get(urlWeather).then(response => {
                weather = response.data
                arrData = weather.data.map(data => {
                    return new ForeCast(data)
                });
                // console.log(weather);
                cache['data'] = weather.data;
                console.log(cache);
                console.log('api======================');
                res.json(arrData);
                if (arrData === 0) {
                    res.status(500).send('wrong')
                }

            }).catch(error => res.send(error.message));


        }

    }
    // let urlWeather = `https://api.weatherbit.io/v2.0/forecast/daily?key=${WEATHER_API_KEY}&lat=${lat}&lon=${lon}`
    // let weatherBitData = axios.get(urlWeather).then(response => {
    //     weather = response.data
    //     let forecastArr = weather.data.map((item, index) => {
    //         return new ForeCast(item)
    //     });
    //     res.json(forecastArr);

    // }).catch(error => res.send(error.message));

};
module.exports = weatherController;