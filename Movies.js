class Movies {
    constructor(film){
      this.poster = film.poster_path,
      this.name = film.original_title,
      this.description = film.overview,
      this.date = film.release_date,
      this.pop = film.popularity
    }
  }
const mv = function movies (req, res){
    let location = req.query.location;
    let movieKey= process.env.MOVIE_API_KEY;
    let movieURL= `https://api.themoviedb.org/3/search/movie?api_key=${movieKey}&query=${location}`;
  