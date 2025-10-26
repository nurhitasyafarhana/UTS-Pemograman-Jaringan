const chalk = require('chalk')
const fs = require('fs')

const muatCatatan = () => {
    try {
        const dataBuffer = fs.readFileSync('catatan.json')
        return JSON.parse(dataBuffer.toString())
    } catch (e) {
        return []
    }
}

const simpanCatatan = (catatan) => {
    fs.writeFileSync('catatan.json', JSON.stringify(catatan))
}

// tambahCatatan
const tambahCatatan = (judul, isi) => {
    const catatan = muatCatatan()

    // Cek duplikasi judul
    const duplikat = catatan.find((note) => note.judul === judul)
    if (duplikat) {
        console.log('❌ Judul sudah ada!')
        return
    }

    catatan.push({ judul, isi })
    simpanCatatan(catatan)
    console.log('Catatan berhasil ditambahkan!')
}

// hapusCatatn
const hapusCatatan = function (judul) {
    const catatan = muatCatatan()
    const catatanUntukDisimpan = catatan.filter(function (note) {
        return note.judul !== judul
    })

    if (catatan.length > catatanUntukDisimpan.length) {
        console.log(chalk.green.inverse('Catatan dihapus!'))
    } else {
        console.log(chalk.red.inverse('Catatan tidak ditemukan'))
    }
}

// listCatatan
const listCatatan = () => {
    const catatan = muatCatatan()
    console.log(chalk.blue.inverse('Daftar Semua Catatan'))
    if (catatan.length === 0) {
        console.log(chalk.yellow('Belum ada catatan yang disimpan.'))
    } else {
        catatan.forEach((note, index) => {
            console.log(`${index + 1}. ${note.judul}`)
        })
    }
}

// bacaCatatan
const bacaCatatan = (judul) => {
    const catatan = muatCatatan()
    const note = catatan.find((note) => note.judul === judul)

    if (note) {
        console.log(chalk.green.inverse(`Judul: ${note.judul}`))
        console.log(`Isi: ${note.isi}`)
    } else {
        console.log(chalk.red.inverse('Catatan tidak ditemukan!'))
    }
}

module.exports = {
    tambahCatatan,
    hapusCatatan,
    listCatatan,
    bacaCatatan
}
