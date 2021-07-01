const express = require('express');
const app = express();

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
    let urlWeather = `https://api.weatherbit.io/v2.0/forecast/daily?key=${WEATHER_API_KEY}&lat=${lat}&lon=${lon}`
    let weatherBitData = axios.get(urlWeather).then(response => {
        weather = response.data
        let forecastArr = weather.data.map((item, index) => {
            return new ForeCast(item)
        });
        res.json(forecastArr);

    }).catch(error => res.send(error.message));

});
app.get('/movies', (req, res) => {
let movies;
let query=req.query.originaltitle;
console.log(query);
let urlMovies= `https://api.themoviedb.org/3/search/movie?api_key=${MOVIE_API_KEY}&query=${query}`
let moviesRes=axios.get(urlMovies).then(response =>{
movies = response.data.results;
console.log(movies);
let renderMovies =movies.map(element =>{
    return new Movies(element);
});
res.json(renderMovies);
console.log(renderMovies);
}).catch(error =>{
    console.log("naq");
     res.send(error.message)});

    });


class ForeCast {
    constructor(weatherData) {
        this.date = weatherData.valid_date
        this.description = weatherData.weather.description

    }

}
class Movies{
    constructor(movies){
        this.title=movies.original_title;
        this.votes=movies.vote_count;
        this.img="https://image.tmdb.org/t/p/w200"+movies.poster_path;
        // http://image.tmdb.org/t/p/w185/nBNZadXqJSdt05SHLqgT0HuC5Gm.jpg
    }
}
app.listen(PORT, () => {
    console.log(`starting at port ${PORT} `);
});