const request = require('request')
const chalk = require('chalk')





const geocode = function(address, callback) {
    const GeoUrl = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + address +'.json?access_token=pk.eyJ1IjoiZGF2aWQtaDEwMDAiLCJhIjoiY2wxMmdrbXgzMDJ5eDNicXVjN2I0NmlwdCJ9.u5sbdgn4cY8dz7vJX4ZG3g'

    request({url: GeoUrl, json: true}, function (error, response) {
            if (error) {
                   
                    callback('Unable to access API at the moment'), undefined
                            
            }else if (response.body.features.length === 0) {
           
                    callback('Unable to find location. Please try another search!'), undefined
            
            }else {
                  callback(undefined, {
                          latitude: response.body.features[0].center[1],
                          longtitude: response.body.features[0].center[0],
                          location: response.body.features[0].place_name,

                  })  
            } 
    }) }



    module.exports = geocode