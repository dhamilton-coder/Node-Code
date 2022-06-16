const http = require('http')
const url = 'http://api.weatherstack.com/current?access_key=ef02a94adb30ec49eb62ca75d4e90ebe&query=40,-75'


const request = http.request(url, (response) => {

    let data = ''

    response.on('data', (chunk) => {
        data = data + chunk.toString()
    })

    response.on('end', () => {
       const body = JSON.parse(data)
       console.log(body)
    })

    
})

request.end()