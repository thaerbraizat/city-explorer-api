const ForeCast = require('../models/weather.model');
const WEATHER_API_KEY = process.env.WEATHER_API_KEY;
const { default: axios } = require('axios');
const CacheWeather = require('../utils/cacheWeather')

let cacheWeather = new CacheWeather();
cacheWeather['data'] = [];


const weatherController = (req, res) => {
    let weather;
    let lat = req.query.lat
    let lon = req.query.lon

    let arrData = [];
    if (lat && lon) {
        if ((cacheWeather.data.length > 0 && cacheWeather.lat===lat ) && Math.abs(cacheWeather.lastMod- new Date()) <=10000 ) {
            arrData = cacheWeather.data.map(data => new ForeCast(data))
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
                cacheWeather['data'] = weather.data;
                cacheWeather['lat'] =lat;
                cacheWeather['lastMod']=new Date();
                console.log(cacheWeather);
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