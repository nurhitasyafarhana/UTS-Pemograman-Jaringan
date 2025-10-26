const request = require('postman-request')

// Ganti lokasi 
const lokasi = 'Padang'

// URL API Mapbox (Geocoding)
const geocodeURL = `http://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(lokasi)}.json?access_token=pk.eyJ1IjoibnVyaGl0YXN5YWZhcmhhbmEiLCJhIjoiY21oMjU3NXpnMGpsNDJqb25pN2tjMHc1dCJ9.lGSxt1kQlyxnc9Qc0aPkXg&limit=1`

// Request ke API Mapbox
request({ url: geocodeURL, json: true }, (error, response) => {
    if (error) {
        console.log('❌ Gagal terhubung ke layanan geocoding!')
    } else if (response.body.features.length === 0) {
        console.log('⚠️ Lokasi tidak ditemukan!')
    } else {
        // Ambil latitude dan longitude dari Mapbox
        const dataMap = response.body.features[0]
        const latitude = dataMap.center[1]
        const longitude = dataMap.center[0]
        const placeName = dataMap.place_name
        const placeType = dataMap.place_type[0]

        console.log('📍 Place Name:', placeName)
        console.log('🧭 Place Type:', placeType)
        console.log('🌐 Latitude:', latitude)
        console.log('🌐 Longitude:', longitude)

        // URL API Weatherstack (menggunakan koordinat dari Mapbox)
        const urlCuaca = `http://api.weatherstack.com/current?access_key=e8df4b2694e863e629183a350cce4fb5&query=${latitude},${longitude}`

        // Request ke API Weatherstack
        request({ url: urlCuaca, json: true }, (error, response) => {
            if (error) {
                console.log('❌ Gagal terhubung ke layanan cuaca!')
            } else if (response.body.error) {
                console.log('⚠️ Lokasi tidak ditemukan di layanan cuaca!')
            } else {
                // Ambil data cuaca
                const suhu = response.body.current.temperature
                const kemungkinanHujan = response.body.current.precip
                const deskripsiCuaca = response.body.current.weather_descriptions[0]

                console.log(`🌡️ Suhu saat ini: ${suhu}°C`)
                console.log(`☔ Kemungkinan hujan: ${kemungkinanHujan}%`)
                console.log(`🌤️ Deskripsi cuaca: ${deskripsiCuaca}`)
            }
        })
    }
})
