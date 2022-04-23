const request = require('request')
const chalk = require('chalk')



const forecast = function(latitude, longtitude, callback) {

    const url = 'http://api.weatherstack.com/current?access_key=ef02a94adb30ec49eb62ca75d4e90ebe&query=' + latitude + ',' + longtitude

    request({ url: url, json: true }, function (error, response) {
        if (error) {
                callback('Sorry you dont have access to the API at the Moment!', undefined)
      
        }else if (response.body.error) {
                callback('Unable to find Location', undefined)
        
        } else {
                
            callback(undefined,(`It is currently ${response.body.current.temperature}° Celcius and ${response.body.current.weather_descriptions}`))
      }
})
}


module.exports = forecast

