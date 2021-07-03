class ForeCast {
    constructor(weatherData) {
        this.date = weatherData.valid_date
        this.description = weatherData.weather.description

    }

}
module.exports=ForeCast;