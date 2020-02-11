const request = require ('request')
const forcast = (longitude, latitude, callback) => {
    const url = 'https://api.darksky.net/forecast/ea29c413d1bff341b62c2afc170f9e97/'+longitude+','+ latitude +'?units=si'
    request({ url, json: true }, (error, {body}) => {
        if (error) {
            callback('Unable to connect to location services!', undefined)
        } else if (body.error) {
            callback('Unable to find location. Try another search.', undefined)
        } else {
            callback(undefined, body.daily.data[0].summary + ' It is currently ' + body.currently.temperature + ' degrees out. There is a ' + body.currently.precipProbability + ' chance of rain. the highest temperature today is '+ body.daily.data[0].temperatureHigh + ' the lowest is '+ body.daily.data[0].temperatureLow )
        }
    })
    }

    module.exports= forcast