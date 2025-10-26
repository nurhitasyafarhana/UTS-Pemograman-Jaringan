const fs = require('fs')
// fs.writeFileSync('catatan.txt', 'Nama Saya Nurhitasyafarhana\n')
// fs.appendFileSync('catatan.txt', 'Saya tinggal di Padang\n')

const ambilCatatan = require('./catatan.js')
const validator = require('validator')
const chalk = require('chalk')
const { hideBin } = require('yargs/helpers')
const yargs = require('yargs/yargs')
const catatan = require('./catatan.js')
const { demandOption } = require('yargs')
const { argv } = require('process')

// Panggil fungsi dari catatan.js
//const pesan = ambilCatatan()

// Cetak hasilnya
// console.log(pesan)
// console.log(validator.isURL('https://nurhitasya.com'))
// console.log(chalk.red('print warna merah sukses'))
// console.log(chalk.green('Teks warna hijau sukses'))
// console.log(chalk.red.bold('Teks warna merah tebal'))
// console.log(chalk.yellow.bgBlue('Teks kuning dengan background biru'))
// console.log(process.argv)

// Inisialisasi yargs
const y = yargs(hideBin(process.argv))

// Command tambah (menerima judul & isi dari user)
y.command({
    command: 'tambah',
    describe: 'tambah sebuah catatan baru',
    builder: {
        judul: {
            describe: 'Judul Catatan',
            demandOption: true, 
            type: 'string'
        },
        isi: {
            describe: 'Isi Catatan',
            demandOption: true,
            type: 'string'
        }
    },
    handler: function (argv) {
        catatan.tambahCatatan(argv.judul, argv.isi)
        // console.log(chalk.green.inverse('Catatan baru ditambahkan!'))
        // console.log('Judul: ' + argv.judul)
        // console.log('Isi: ' + argv.isi)
        // Contoh: bisa disimpan ke file (optional)
        // fs.appendFileSync('catatan.txt', `${argv.judul}: ${argv.isi}\n`)
    }
})

// Command hapus
y.command({
    command: 'hapus',
    describe: 'Hapus catatan berdasarkan judul',
    builder: {
        judul: {
            describe: 'Judul catatan yang akan dihapus',
            demandOption: true,
            type: 'string'
        }
    },
    handler: function (argv) {
        catatan.hapusCatatan(argv.judul)
    }
})

// Command list untuk menampilkan semua catatan
y.command({
    command: 'list',
    describe: 'Menampilkan semua catatan',
    handler: function () {
        catatan.listCatatan()
        // console.log(chalk.blue.inverse('Daftar Semua Catatan'))
        // Bisa membaca dari file catatan.txt
        //if (fs.existsSync('catatan.txt')) {
            // const data = fs.readFileSync('catatan.txt', 'utf-8')
            // console.log(data)
        // } else {
            // console.log('Belum ada catatan yang tersimpan.')
        // }
    }
})

// Command read untuk membaca satu catatan
y.command({
    command: 'read',
    describe: 'Membaca sebuah catatan berdasarkan judul',
        builder: {
            judul: {
                describe: 'Judul Catatan yang ingin dibaca',
                demandOption: true,
                type: 'string'
        }
    },
    handler: function (argv) {
        catatan.bacaCatatan(argv.judul)
        // console.log(chalk.yellow.inverse('Membaca catatan dengan judul: ' + argv.judul))
        // Bisa mencari dari file catatan.txt
        // if (fs.existsSync('catatan.txt')) {
            // const data = fs.readFileSync('catatan.txt', 'utf-8')
            // const baris = data.split('\n').find(line => line.startsWith(argv.judul))
            // if (baris) {
                // console.log(baris)
            // } else {
                // console.log('Catatan tidak ditemukan!')
            // }
        // } else {
            // console.log('Belum ada catatan yang tersimpan.')
        // }
    }
})

// Panggil parse() untuk mengeksekusi perintah
y.parse()

// const dataBuffer = fs.readFileSync('./testsite/1-jsontest.json'); 
// const dataJSON = dataBuffer.toString();
// const data = JSON.parse(dataJSON);
// console.log(data.judul);


