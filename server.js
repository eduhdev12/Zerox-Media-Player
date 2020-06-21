// const http = require('http')
// const fs = require('fs')
// const config = require("./config.json")

// const server = http.createServer(function(req, res) {
//     res.writeHead(200, { 'Content-Type': 'text/html'})
//     fs.readFile('index.html', function(error, data) {
//         if(error)
//         {
//             res.writeHead(404)
//             res.write('Error page not found!')
//         }
//         else{
//             res.write(data)
//         }
//         res.end()
//     })

// })

// server.listen(config.port, function(error){
//     if(error) {
//         console.log('Error on the server!')
//     }
//     else{
//         console.log(`Server is listening on localhost:${config.port}`)
//     }
// })
const express = require('express')
const ffmpeg = require('ffmpeg')
const app = express()
const config = require('./config.json')
var FFplay = require("ffplay");
var player = new FFplay()

app.set('view-engine', 'ejs')

app.get('/', (req, res) =>{
    res.render('index.ejs')
})

app.get('/test', (req,res)=>{
    res.render('index.ejs')
    console.log('cacatr')
    player = new FFplay('./1.mp3')
})

app.get('/stop', (req, res)=>{
    res.render('index.ejs')
    console.log('Stopped')
    player.stop()
})

app.listen(config.port)