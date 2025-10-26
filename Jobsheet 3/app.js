const request = require('postman-request')
const url = 'http://api.weatherstack.com/current?access_key=e8df4b2694e863e629183a350cce4fb5&query=-0.89717,100.35351'
request({ url: url }, (error, response) => {
     console.log(response)
    // const data = JSON.parse(response.body)
    // console.log(data)
    // console.log(data.current)
     console.log(data.current.temperature)
})