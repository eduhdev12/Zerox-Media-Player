const express = require('express')
const fs = require('fs')
const ffmpeg = require('ffmpeg')
var http = require('http');
const app = express()
const config = require('./config.json')
var FFplay = require("ffplay");
var player = new FFplay()
const ytdl = require('ytdl-core')
const loudness = require('loudness');
const e = require('express');
const request = require('request');
const bodyParser = require('body-parser');
const search = require('yt-search');
var ip = require('ip');
const yts = require('yt-search');
var status = 'Not Playing'
var ytsearches = []
var ytsearchesurl = []
require('console-stamp')(console, 'HH:MM:ss');
var playing = 0
var volume
var currentstation = "stop"


app.use(express.static("public"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.set('view-engine', 'ejs')
app.get('/', (req, res) => {
    if (currentstation == `stop`) {
        var load = {
            radio1namefront: config.radio1name,
            radio2namefront: config.radio2name,
            radio3namefront: config.radio3name,
            radio4namefront: config.radio4name,
            radio5namefront: config.radio5name,
            playerstatus: `Not Playing`,
            currentvolume: volume
        }
    }
    else {
        var load = {
            radio1namefront: config.radio1name,
            radio2namefront: config.radio2name,
            radio3namefront: config.radio3name,
            radio4namefront: config.radio4name,
            radio5namefront: config.radio5name,
            playerstatus: `Playing ${currentstation}`,
            currentvolume: volume
        }
    }
    res.render('index.ejs', load)
})

app.get('/youtube', (req, res) => {
    var load = {
        ytsearches: ytsearches
    }
    res.render('youtube.ejs', load)
})

app.get('/youtube/:id', (req, res) => {
    var parsedid = req.params.id
    if (playing == 1) {
        player.stop()
    }
    playing = 1
    currentstation = ytsearches[parsedid]
    res.redirect('/')
    download(ytsearchesurl[parsedid])
})

app.post('/youtube/submit', (req, res) => {
    var video = req.body.id
    ytsearchesurl = []
    ytsearches = []
    if (playing == 1) {
    }
    searchsong(video)
    setTimeout(() => {
        res.redirect('/youtube')
    }, 2000);
})

app.get('/down', function (req, res) {
    if (volume == 0) {
        volume = 0
        console.log('Unable to down the volume')
    }
    else volume = volume - 25;

    if (playing == 0) {
        var load = {
            radio1namefront: config.radio1name,
            radio2namefront: config.radio2name,
            radio3namefront: config.radio3name,
            radio4namefront: config.radio4name,
            radio5namefront: config.radio5name,
            playerstatus: `Not Playing`,
            currentvolume: volume
        }
    }
    if (playing == 1) {
        var load = {
            radio1namefront: config.radio1name,
            radio2namefront: config.radio2name,
            radio3namefront: config.radio3name,
            radio4namefront: config.radio4name,
            radio5namefront: config.radio5name,
            playerstatus: `Playing ${currentstation}`,
            currentvolume: volume
        }
    }
    res.render('index.ejs', load)
    loudness.setVolume(volume, (err) => {
    })
    console.log(`Volume was setted on ${volume}`)
})

app.get('/up', function (req, res) {
    if (volume == 100) {
        volume = 100
        console.log('Unable to up the volume')
    }
    else volume = volume + 25;
    if (playing == 0) {
        var load = {
            radio1namefront: config.radio1name,
            radio2namefront: config.radio2name,
            radio3namefront: config.radio3name,
            radio4namefront: config.radio4name,
            radio5namefront: config.radio5name,
            playerstatus: `Not Playing`,
            currentvolume: volume
        }
    }
    if (playing == 1) {
        var load = {
            radio1namefront: config.radio1name,
            radio2namefront: config.radio2name,
            radio3namefront: config.radio3name,
            radio4namefront: config.radio4name,
            radio5namefront: config.radio5name,
            playerstatus: `Playing ${currentstation}`,
            currentvolume: volume
        }
    }
    res.render('index.ejs', load)
    loudness.setVolume(volume, (err) => {
    })
    console.log(`Volume was setted on ${volume}`)
})

app.get('/radio1', (req, res) => {
    if (playing == 1) {
        player.stop()
    }
    status = config.radio1name
    var load = {
        radio1namefront: config.radio1name,
        radio2namefront: config.radio2name,
        radio3namefront: config.radio3name,
        radio4namefront: config.radio4name,
        radio5namefront: config.radio5name,
        playerstatus: `Playing ${status}`,
        currentvolume: volume
    } //to update the playing status
    res.render('index.ejs', load)
    console.log("\x1b[36m", `Playing ${config.radio1name} from adress ${config.radio1}`)
    player = new FFplay(config.radio1)
    playing = 1
    currentstation = config.radio1name
})

app.get('/radio2', (req, res) => {
    if (playing == 1) {
        player.stop()
    }
    status = config.radio2name
    var load = {
        radio1namefront: config.radio1name,
        radio2namefront: config.radio2name,
        radio3namefront: config.radio3name,
        radio4namefront: config.radio4name,
        radio5namefront: config.radio5name,
        playerstatus: `Playing ${status}`,
        currentvolume: volume
    } //to update the playing status
    res.render('index.ejs', load)
    console.log("\x1b[36m", `Playing ${config.radio2name} from adress ${config.radio2}`)
    player = new FFplay(config.radio2)
    playing = 1
    currentstation = config.radio2name
})

app.get('/radio3', (req, res) => {
    if (playing == 1) {
        player.stop()
    }
    status = config.radio3name
    var load = {
        radio1namefront: config.radio1name,
        radio2namefront: config.radio2name,
        radio3namefront: config.radio3name,
        radio4namefront: config.radio4name,
        radio5namefront: config.radio5name,
        playerstatus: `Playing ${status}`,
        currentvolume: volume
    } //to update the playing status
    res.render('index.ejs', load)
    console.log("\x1b[36m", `Playing ${config.radio3name} from adress ${config.radio3}`)
    player = new FFplay(config.radio3)
    playing = 1
    currentstation = config.radio3name
})

app.get('/radio4', (req, res) => {
    if (playing == 1) {
        player.stop()
    }
    status = config.radio4name
    var load = {
        radio1namefront: config.radio1name,
        radio2namefront: config.radio2name,
        radio3namefront: config.radio3name,
        radio4namefront: config.radio4name,
        radio5namefront: config.radio5name,
        playerstatus: `Playing ${status}`,
        currentvolume: volume
    } //to update the playing status
    res.render('index.ejs', load)
    console.log("\x1b[36m", `Playing ${config.radio4name} from adress ${config.radio4}`)
    player = new FFplay(config.radio4)
    playing = 1
    currentstation = config.radio4name
})

async function searchsong(name) {
    let finalurl
    if (name.includes("https://youtube.com")) {
        finalurl = name
        download(finalurl)
    }
    else {
        const r = await search(name)
        const videos = r.videos.slice(0, 10)
        videos.forEach(function (v) {
            const views = String(v.views).padStart(10, ' ')
            ytsearches.push(v.title)
            ytsearchesurl.push(v.url)
            //console.log(`${v} | ${views} | ${v.title} (${v.timestamp}) | ${v.author.name}`)
        })
        finalurl = r.all[0].url
    }
}

async function download(url) {

    let starttime
    console.log("\x1b[36m", `Downloading and playing from youtube link: ${url}`)
    const stream = ytdl(url, { filter: 'audioonly', dlChunkSize: 0 });
    stream.pipe(fs.createWriteStream("song.mp3"))
    stream.once('response', () => {
        starttime = Date.now()
    })
    // stream.on('progress', (chunkLength, downloaded, total)=>{
    //     const percent = downloaded / total;
    //     const downloadedMinutes = (Date.now() - starttime) / 1000 / 60;
    //     const estimatedDownloadTime = (downloadedMinutes / percent) - downloadedMinutes;
    //     process.stdout.write(`${(percent * 100).toFixed(2)}% downloaded `);
    //     process.stdout.write(`(${(downloaded / 1024 / 1024).toFixed(2)}MB of ${(total / 1024 / 1024).toFixed(2)}MB)\n`);
    //     process.stdout.write(`running for: ${downloadedMinutes.toFixed(2)}minutes`);
    //     process.stdout.write(`, estimated time left: ${estimatedDownloadTime.toFixed(2)}minutes `);
    //     process.stdout.write(`\n`)
    // })
    stream.on('end', () => {
        player = new FFplay("song.mp3")
    })
}

app.get('/radio5', (req, res) => {
    if (playing == 1) {
        player.stop()
    }
    status = config.radio5name
    var load = {
        radio1namefront: config.radio1name,
        radio2namefront: config.radio2name,
        radio3namefront: config.radio3name,
        radio4namefront: config.radio4name,
        radio5namefront: config.radio5name,
        playerstatus: `Playing ${status}`,
        currentvolume: volume
    } //to update the playing status
    res.render('index.ejs', load)
    console.log("\x1b[36m", `Playing ${config.radio5name} from adress ${config.radio5}`)
    player = new FFplay(config.radio5)
    playing = 1
    currentstation = config.radio5name
})

app.get('/stop', (req, res) => {
    var load = {
        radio1namefront: config.radio1name,
        radio2namefront: config.radio2name,
        radio3namefront: config.radio3name,
        radio4namefront: config.radio4name,
        radio5namefront: config.radio5name,
        playerstatus: `Not Playing`,
        currentvolume: volume
    } //to update the playing status
    res.render('index.ejs', load)
    console.log("\x1b[36m", 'Stopped Playing')
    player.stop()
    playing = 0
    currentstation = `stop`
})

app.listen(config.port, function () {
    check()
    console.info("\x1b[33m", `Server started on http://${ip.address()}:${config.port}`);
    if (config.webvolume == 0) {
        console.log('Using local volume')
    }
    else {
        console.log('Using web volume')
        loudness.setVolume(100, (err) => {
            // Done
        })
        volume = 100
        console.log(volume)
    }
});
function check() {
    request('https://raw.githubusercontent.com/eduhdev12/Zerox-Media-Player/master/version.txt', function (error, response, body) {
        const version = JSON.parse(body)
        if (version != "1.0.0") {
            console.warn("\x1b[31m", "Update Available, check https://github.com/eduhdev12/Zerox-Media-Player/")
            console.warn("\x1b[31m", "Update Available, check https://github.com/eduhdev12/Zerox-Media-Player/")
        }
    });
}
