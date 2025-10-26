const request = require('postman-request')

// URL API Cuaca (koordinat: -0.89717, 100.35351)
const urlCuaca = 'http://api.weatherstack.com/current?access_key=e8df4b2694e863e629183a350cce4fb5&query=-0.89717,100.35351'
const geocodeURL = 'http://api.mapbox.com/geocoding/v5/mapbox.places/Jakarta.json?access_token=pk.eyJ1IjoibnVyaGl0YXN5YWZhcmhhbmEiLCJhIjoiY21oMjU3NXpnMGpsNDJqb25pN2tjMHc1dCJ9.lGSxt1kQlyxnc9Qc0aPkXg&limit=3'

// Melakukan request ke API
request({ url: urlCuaca, json: true }, (error, response) => {
    if (error) {
        console.log('Gagal terhubung ke layanan cuaca!')
    } else if (response.body.error) {
        console.log('Lokasi tidak ditemukan!')
    } else {
        // Mengambil data dari API
        const suhu = response.body.current.temperature
        const kemungkinanHujan = response.body.current.precip
        const deskripsiCuaca = response.body.current.weather_descriptions[0] // ambil elemen pertama array

        // Menampilkan hasil
        console.log('Saat ini suhu di luar mencapai ' + suhu + ' derajat celcius.')
        console.log('Kemungkinan terjadinya hujan adalah ' + kemungkinanHujan + '%.')
        console.log('Deskripsi cuaca saat ini: ' + deskripsiCuaca)
    }
})

request({ url: geocodeURL, json: true }, (error, response) => {
    if (error) {
        console.log('Gagal terhubung ke layanan geocoding!')
    } else if (response.body.features.length === 0) {
        console.log('Lokasi tidak ditemukan!')
    } else {
        const latitude = response.body.features[1].center[1]
        const longitude = response.body.features[1].center[0]

        console.log('📍 Latitude:', latitude)
        console.log('📍 Longitude:', longitude)
    }
})