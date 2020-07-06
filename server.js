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
const loudness = require('loudness')
var status = 'Not Playing'
require('console-stamp')(console, 'HH:MM:ss');

var load={
    radio1namefront: config.radio1name,
    radio2namefront: config.radio2name,
    radio3namefront: config.radio3name,
    radio4namefront: config.radio4name,
    radio5namefront: config.radio5name,
    playerstatus: status
}


app.use( express.static( "public" ) );

app.set('view-engine', 'ejs')

app.get('/', (req, res) =>{
    res.render('index.ejs', load)
})

app.get('/radio1', (req, res) =>{
    status= config.radio1name
    var load={
        radio1namefront: config.radio1name,
        radio2namefront: config.radio2name,
        radio3namefront: config.radio3name,
        radio4namefront: config.radio4name,
        radio5namefront: config.radio5name,
        playerstatus: `Playing ${status}`
    } //to update the playing status
    res.render('index.ejs', load)
    console.log("\x1b[36m",`Playing ${config.radio1name} from adress ${config.radio1}`)
    player = new FFplay(config.radio1)
})

app.get('/radio2', (req, res) =>{
    status= config.radio2name
    var load={
        radio1namefront: config.radio1name,
        radio2namefront: config.radio2name,
        radio3namefront: config.radio3name,
        radio4namefront: config.radio4name,
        radio5namefront: config.radio5name,
        playerstatus: `Playing ${status}`
    } //to update the playing status
    res.render('index.ejs', load)
    console.log("\x1b[36m",`Playing ${config.radio2name} from adress ${config.radio2}`)
    player = new FFplay(config.radio2)
})

app.get('/radio3', (req, res) =>{
    status= config.radio3name
    var load={
        radio1namefront: config.radio1name,
        radio2namefront: config.radio2name,
        radio3namefront: config.radio3name,
        radio4namefront: config.radio4name,
        radio5namefront: config.radio5name,
        playerstatus: `Playing ${status}`
    } //to update the playing status
    res.render('index.ejs', load)
    console.log("\x1b[36m",`Playing ${config.radio3name} from adress ${config.radio3}`)
    player = new FFplay(config.radio3)
})

app.get('/radio4', (req, res) =>{
    status= config.radio4name
    var load={
        radio1namefront: config.radio1name,
        radio2namefront: config.radio2name,
        radio3namefront: config.radio3name,
        radio4namefront: config.radio4name,
        radio5namefront: config.radio5name,
        playerstatus: `Playing ${status}`
    } //to update the playing status
    res.render('index.ejs', load)
    console.log("\x1b[36m",`Playing ${config.radio4name} from adress ${config.radio4}`)
    player = new FFplay(config.radio4)
})

app.get('/radio5', (req, res) =>{
    status= config.radio5name
    var load={
        radio1namefront: config.radio1name,
        radio2namefront: config.radio2name,
        radio3namefront: config.radio3name,
        radio4namefront: config.radio4name,
        radio5namefront: config.radio5name,
        playerstatus: `Playing ${status}`
    } //to update the playing status
    res.render('index.ejs', load)
    console.log("\x1b[36m",`Playing ${config.radio5name} from adress ${config.radio5}`)
    player = new FFplay(config.radio5)
})

app.get('/test', (req,res)=>{
    res.render('index.ejs')
    console.log('cacatr')
    loudness.setVolume(45, (err) => {
        // Done
    })
    //player = new FFplay('./1.mp3')
    player = new FFplay("./1.mp3");
})

app.get('/stop', (req, res)=>{
    status= 'Radio ZU'
    var load={
        radio1namefront: config.radio1name,
        radio2namefront: config.radio2name,
        radio3namefront: config.radio3name,
        radio4namefront: config.radio4name,
        radio5namefront: config.radio5name,
        playerstatus: `Not Playing`
    } //to update the playing status
    res.render('index.ejs', load)
    console.log("\x1b[36m", 'Stopped Playing')
    player.stop()
})

app.listen(config.port, function(){
    console.info("\x1b[33m", `Server started on port ${config.port}`);
    });