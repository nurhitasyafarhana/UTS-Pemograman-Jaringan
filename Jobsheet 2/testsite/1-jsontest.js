const fs = require('fs')

const book = {
    judul : 'Pemograman Jaringan',
    penulis : 'Nurhitasyafarhana'
}

const bookJSON = JSON.stringify(book)
fs.writeFileSync('1-jsontest.json', bookJSON)

