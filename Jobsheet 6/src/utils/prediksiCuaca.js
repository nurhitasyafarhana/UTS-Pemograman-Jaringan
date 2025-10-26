const request = require('postman-request')

const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=e8df4b2694e863e629183a350cce4fb5&query=' +
        encodeURIComponent(latitude) + ',' + encodeURIComponent(longitude) + '&units=m'

    request({ url: url, json: true }, (error, response) => {
        if (error) {
            callback('Tidak dapat terkoneksi ke layanan cuaca', undefined)
        } else if (response.body.error) {
            callback('Tidak dapat menemukan lokasi', undefined)
        } else {
            callback(undefined,
                'Info Cuaca: ' + response.body.current.weather_descriptions[0] + '. ' +
                'Suhu saat ini adalah ' + response.body.current.temperature + '°C. ' +
                'Index UV adalah ' + response.body.current.uv_index + '. ' +
                'Visibilitas ' + response.body.current.visibility + ' km.'
            )
        }
    })
}

module.exports = forecast
