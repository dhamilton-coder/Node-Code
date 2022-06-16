const fs = require('fs')


//const book = {
  //  title: 'Book1',
    //autor: 'author1'
//}

//const bookJSON = JSON.stringify(book)

//fs.writeFileSync('1-json.json', bookJSON)


const dataBuffer = fs.readFileSync('1-json.json')
const dataJSON = dataBuffer.toString()
const DataParsed = JSON.parse(dataJSON)
console.log(DataParsed.title)

// const url = 'http://api.weatherstack.com/current?access_key=ef02a94adb30ec49eb62ca75d4e90ebe&query=&units=m'

// const url2 = 'https://api.mapbox.com/geocoding/v5/mapbox.places/Loss%20Angeles.json?access_token=pk.eyJ1IjoiZGF2aWQtaDEwMDAiLCJhIjoiY2wxMmdrbXgzMDJ5eDNicXVjN2I0NmlwdCJ9.u5sbdgn4cY8dz7vJX4ZG3g'

// request({ url: url, json: true }, function (error, response) {
//         if (error) {
//                 console.log('Sorry you dont have access to the API at the Moment!')
      
//         }else if (response.body.error) {
//                 console.log('Unable to find Location')
        
//         } else {
//                 console.log(`It is currently ${response.body.current.temperature}° Celcius in Bandon and ${response.body.current.weather_descriptions}`)
//       }
// })

