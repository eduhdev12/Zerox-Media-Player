# Zerox-Media-Player

A simple customizable remote media player that supports radio streaming channels.

[Discord](https://discord.gg/c6EXUwN)

### Self-Hosting
**Configuration**
```
{
    "port": "port for the player server",
    "radio1": "radio streaming link",
    "radio1name": "name of the radio",
    "webvolume": "1" //0 if you are not using webvolume, 1 if you are using webvolume buttons
}
```
**Requirements**
```
node.js
ffmpeg library
```
All in one line & if that doesn't do it, try installing them seperately.

**Installing the Media-Player**

Windows
```
run install.bat
download ffmpeg files and drop in the Media-Player folder(https://johnvansickle.com/ffmpeg/)
customize your config.json
run start.bat
enjoy your new remote media player!
```
Linux
```
download ffmpeg files for linux(https://johnvansickle.com/ffmpeg/) and move in media player folder
open terminal in media player folder
npm i
node .
enjoy your new remote media player on linux!
```
