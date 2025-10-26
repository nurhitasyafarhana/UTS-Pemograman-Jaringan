const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/prediksiCuaca')

const app = express()

// Setup view engine
app.set('view engine', 'hbs')

// Mendefinisikan jalur/path untuk konfigurasi Express
const direktoriPublic = path.join(__dirname, '../public')
const direktoriViews = path.join(__dirname, '../templates/views')
const direktoriPartials = path.join(__dirname, '../templates/partials')

// Setup handlebars engine dan lokasi folder views
app.set('views', direktoriViews)
hbs.registerPartials(direktoriPartials)

// Setup direktori statis 
app.use(express.static(direktoriPublic))

// Halaman utama (Home)
app.get('', (req, res) => {
    res.render('index', {
        judul: 'Aplikasi Cek Cuaca',
        nama: 'Nurhitasyafarhana'
    })
})

// Halaman Bantuan (FAQ)
app.get('/bantuan', (req, res) => {
    res.render('bantuan', {
        judul: 'Bantuan',
        teksBantuan: 'Ini adalah teks',
        nama: 'Nurhitasyafarhana'
    })
})

// Halaman Info Cuaca (API JSON)
app.get('/infoCuaca', (req, res) => {
    if(!req.query.address){
        return res.send({
            error: 'Kamu harus memasukkan lokasi yang ingin dicari'
        })
    }
    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
        if (error){
            return res.send({error})
        }
        forecast(latitude, longitude, (error, dataPrediksi) => {
            if (error){
                return res.send({error})
            }
            res.send({
                prediksiCuaca: dataPrediksi,
                lokasi: location,
                address: req.query.address
            })
        })
    })
})

// Halaman Tentang
app.get('/tentang', (req, res) => {
    res.render('tentang', {
        judul: 'Tentang Saya',
        nama: 'Nurhitasyafarhana',
        pekerjaan: 'Mahasiswa'
    })
})

app.get('/bantuan/*', (req, res) => {
    res.render('404', {
        judul: '404',
        nama: 'Nurhitasyafarhana',
        pesanKesalahan: 'Artikel yang dicari tidak ditemukan.'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        judul: '404',
        nama: 'Nurhitasyafarhana',
        pesanKesalahan: 'Halaman tidak ditemukan.'
    })
})

// Menjalankan server
app.listen(4000, () => {
    console.log('Server berjalan pada port 4000.')
})
