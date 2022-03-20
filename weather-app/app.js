const request = require('request')

const url = 'http://api.weatherstack.com/current?access_key=ef02a94adb30ec49eb62ca75d4e90ebe&query=37.8267,-122.4233'

request({ url: url}, function (error, response) {
        const data = JSON.parse(response.body)
            console.log(data.current)
})