const path = require('path')
const express = require('express')
const hbs = require('hbs')
const axios = require('axios')
const geocode = require('./utils/geocode')
const forecast = require('./utils/prediksiCuaca')

const app = express()

// ==============================
// Paths
// ==============================
const publicDir = path.join(__dirname, '../public')
const viewsDir = path.join(__dirname, '../templates/views')
const partialsDir = path.join(__dirname, '../templates/partials')

app.set('view engine', 'hbs')
app.set('views', viewsDir)
hbs.registerPartials(partialsDir)

// ==============================
// Helper format tanggal
// ==============================
hbs.registerHelper('formatDate', function(datetime) {
    if (!datetime) return ''
    return new Date(datetime).toLocaleString('id-ID', {
        year: 'numeric', month: 'long', day: 'numeric',
        hour: '2-digit', minute: '2-digit'
    })
})

app.use(express.static(publicDir))

// ==============================
// Halaman utama
// ==============================
app.get('', (req, res) => {
    res.render('index', { judul: 'Aplikasi Cek Cuaca', nama: 'Nurhitasyafarhana' })
})

// ==============================
// Halaman Bantuan
// ==============================
app.get('/bantuan', (req, res) => {
    res.render('bantuan', { judul: 'Bantuan Saya', teksBantuan: 'Ini adalah teks bantuan', nama: 'Nurhitasyafarhana' })
})

// ==============================
// Halaman Info Cuaca
// ==============================
app.get('/infocuaca', (req, res) => {
    if (!req.query.address) return res.send({ error: 'Kamu harus memasukan lokasi yang ingin dicari' })

    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
        if (error) return res.send({ error })

        forecast(latitude, longitude, (error, dataPrediksi) => {
            if (error) return res.send({ error })

            res.send({ prediksiCuaca: dataPrediksi, lokasi: location, address: req.query.address })
        })
    })
})

// ==============================
// Halaman Tentang
// ==============================
app.get('/tentang', (req, res) => {
    res.render('tentang', { judul: 'Tentang Saya', nama: 'Nurhitasyafarhana' })
})

// ==============================
// Halaman Berita (Mediastack)
// ==============================
app.get('/berita', async (req, res) => {
    const apiKey = 'aa846bcc8144f7d2b45afc34cce3d453';
    try {
        const response = await axios.get('https://api.mediastack.com/v1/news', {
            params: {
                access_key: apiKey,
                languages: 'en',  // gunakan bahasa Inggris
                limit: 5
            }
        });

        const beritaData = response.data.data || [];

        res.render('berita', {
            judul: 'Berita Terkini',
            nama: 'Nurhitasyafarhana',
            berita: beritaData
        });

    } catch (error) {
        console.error('Gagal mengambil berita:', error.message);
        // fallback dummy berita lokal
        const dummyBerita = [
            { title: "Berita Contoh 1", description: "Deskripsi berita contoh 1", image: "/img/cuaca.png", source: "Berita Lokal", published_at: new Date() },
            { title: "Berita Contoh 2", description: "Deskripsi berita contoh 2", image: "/img/cuaca.png", source: "Berita Lokal", published_at: new Date() }
        ];
        res.render('berita', {
            judul: 'Berita Terkini',
            nama: 'Nurhitasyafarhana',
            berita: dummyBerita,
            error: 'Sedang tidak bisa mengambil berita online. Menampilkan berita lokal.'
        });
    }
});

// ==============================
// Halaman 404
// ==============================
app.get('/bantuan/*', (req, res) => {
    res.render('404', { judul: '404', nama: 'Nurhitasyafarhana', pesanKesalahan: 'Artikel bantuan tidak ditemukan.' })
})
app.get('*', (req, res) => {
    res.render('404', { judul: '404', nama: 'Nurhitasyafarhana', pesanKesalahan: 'Halaman tidak ditemukan.' })
})

// ==============================
// Jalankan server
// ==============================
const PORT = 4000
app.listen(PORT, () => console.log(`Server berjalan di port ${PORT}`))
