const request = require('request')
const geocode = require('./utils/geocode')
const forecast = require('./utils/weather')


adress = process.argv[2]
if (!adress) {
    console.log('Please provide an adress! ("Example Adress")')    
}else {

geocode(adress, (error, data) => {
        if (error) {
            return console.log(error)
        }
forecast(data.latitude, data.longtitude, (error, response) => {
       if (error)  {
                return console.log(error)
       }
       console.log(' ')
       console.log(data.location) 
       console.log(response)
       console.log(' ')
        
})
})
}

