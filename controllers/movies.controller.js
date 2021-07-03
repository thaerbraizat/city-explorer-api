
const Movies = require('../models/movies.model');
const MOVIE_API_KEY = process.env.MOVIE_API_KEY;
const { default: axios } = require('axios');

const Cache = require('../utils/cache')

let cache = new Cache();
cache['data'] = [];
// cache['timestamp]']=Date.now();


const moviesController = (req, res) => {
    let movies;
    let query = req.query.originaltitle;
    let arrMovies = [];
    if (query) {
        if ((cache.data.length > 0 && cache.name===query ) && Math.abs(cache.lastMod- new Date()) <=10000 ) {
            
            arrMovies = cache.data.map(data => new Movies(data))
            console.log('cache ====================');
            res.send(arrMovies)
        } else {
            let urlMovies = `https://api.themoviedb.org/3/search/movie?api_key=${MOVIE_API_KEY}&query=${query}`
            let moviesRes = axios.get(urlMovies).then(response => {
                movies = response.data.results;
                console.log(movies);
                arrMovies = movies.map(element => {
                    return new Movies(element);
                });
                res.json(arrMovies);
                cache['data'] =movies;
                cache['name'] =query;
                cache['lastMod']=new Date();
                console.log("api");
            }).catch(error => {
                console.log('try');
                res.send(error.message)
         
            });
        }    

    }


}
        module.exports = moviesController;