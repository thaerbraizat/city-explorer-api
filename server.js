const express = require('express');
const app = express();
require("dotenv").config();
const cors = require('cors');
app.use(cors());
const PORT = process.env.PORT;
const moviesController  =require('./controllers/movies.controller');
const weatherController =require('./controllers/weather.controller')

app.get('/', (req, res) => {
    res.send("hello world");
});


app.get('/weather',weatherController);

app.get('/movies',moviesController);

app.listen(PORT, () => {
    console.log(`starting at port ${PORT} `);
});