const request = require('request');

const forecast = (latitude , longitude , callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=98cb26bbd3578602173cfddd88712ad6&query=' + latitude + ',' + longitude + '&units=m' ;
    request({ url, json: true} , (error,{ body }) => {
        if (error){
            callback('Unable to connect to weather service!' , undefined)
        } else if(body.error){
            callback('Unable to find location' , undefined)
        } else {
            const temperature = body.current.temperature;
            const feelslike = body.current.feelslike;
            const weather_descriptions = body.current.weather_descriptions[0];
            callback(undefined,weather_descriptions + ", It is currently " + temperature + " degress out . It feels like " + feelslike + " degress out .");
        }  
    });
};

module.exports = forecast;
