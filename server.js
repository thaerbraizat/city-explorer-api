const express = require('express');
const app = express();

const weather = require('./data/weather.json');
require("dotenv").config();
const cors = require('cors');
const { default: axios } = require('axios');

app.use(cors());
const PORT = process.env.PORT;
const WEATHER_API_KEY = process.env.WEATHER_API_KEY;
const MOVIE_API_KEY = process.env.MOVIE_API_KEY;
app.get('/', (req, res) => {
   
    res.send("hello world");
 });


app.get('/weather', (req, res) => {
    let weather;
    let lat = req.query.lat
    let lon = req.query.lon
    let urlWeather = `https://api.weatherbit.io/v2.0/history/daily?key=${WEATHER_API_KEY}&lat=${lat}&lon=${lon}`
    let weatherBitData = axios.get(urlWeather).then(response => {
        weather = response.data
        console.log(weather);
        let forecastArr = weather.data.map((item, index) => {
            return new ForeCast(item)
        });
        res.json(forecastArr);

    }).catch(error => res.send(error.message));

});
app.get('/movies', (req, res) => {
let movies;
let cityName=req.query.city_name;
let urlMovies= `https://api.themoviedb.org/3/movie/550?api_key=${MOVIE_API_KEY}&${cityName}`
let moviesRes=axios.get(urlMovies).then(response =>{
movies = response.data;

let renderMovies =movies.map(element =>{
    return new Movies(element);
});
res.json(renderMovies);
}).catch(error => res.send(error.message));
    });


class ForeCast {
    constructor(weatherData) {
        this.date = weatherData.valid_date
        this.description = weatherData.weather.description

    }

}
class Movies{
    constructor(moviesData){
        this.title=moviesData.original_title;
        this.votes=moviesData.vote_count;
        this.img=`http://image.tmbd.org/t/p/w342`+moviesData.poster_path;
    }
}
app.listen(PORT, () => {
    console.log(`starting at port ${PORT} `);
});