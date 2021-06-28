const express = require('express');
const server = express();

const weather = require('./data/weather.json');

const cors = require('cors');
const { response } = require('express');
server.use(cors()); 


const PORT = process.env.PORT || 3030;
 require("dotenv").config();


 server.get('/',(req,res) =>{
    res.send('Home...');
})


server.get('/test',(req, res)=>{
  res.send('hello');
})


server.get('/weatherData', (req, res)=>{
    res.send(weather);
})


server.get('/lon-lat', (req, res)=>{
    let dataArr =weather.map((city)=> {
        return [`longitude: ${city.lon}` , `latitude: ${city.lat}`];
    }) 
    res.send(dataArr);
})


server.get('', (req, res)=>{
    let cityName = req.query.cityName;
    console.log(cityName);

    let cityFound = weather.find((city)=>{
        let name = city.city_name;
   
        if (name.toLocaleLowerCase() == cityName.toLocaleLowerCase()){
   
        return city;}   
    })
    console.log(cityFound);
    if(cityFound){
        res.status = 200;
        res.send(`City: ${cityFound.city_name}  -  Longitude: ${cityFound.lon}  -  Latitude: ${cityFound.lat}`);
    }else if (! cityFound){
        res.status =500;
        res.send(`ERROR: DATA NOT FOUND FOR REQUIRED REGION`);
    }
})


server.get('/cityData', (req, res)=>{
  let cityName = req.query.cityName;
  let cityValidation = weather.find((city)=>{
      return (city.city_name.toLocaleLowerCase() == cityName.toLocaleLowerCase());
  })


  if (cityValidation){

    let cityData = cityValidation.data.map(day => new Forecast(day));
    console.log(cityData);
      res.status=200;
      res.send(cityData);
  }
  else{
    res.status =500;
    res.send(`ERROR: DATA NOT FOUND FOR REQUIRED REGION`);
  }
})



class Forecast{
    constructor(city){
        this.date= city.valid_date,
        this.description= city.weather.description
    }
}

server.listen(8000);
