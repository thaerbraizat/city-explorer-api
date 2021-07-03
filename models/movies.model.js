

class Movies {
    constructor(movies) {
        this.title = movies.original_title;
        this.votes = movies.vote_count;
        this.img = "https://image.tmdb.org/t/p/w200" + movies.poster_path;
        // http://image.tmdb.org/t/p/w185/nBNZadXqJSdt05SHLqgT0HuC5Gm.jpg
    }
}
module.exports=Movies;