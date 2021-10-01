# Zerox-Media-Player (OUTDATED)

This version will not receive any improvements from now on, but we invite you to use the new version of Zerox by clicking [here](http://zerox.pro).

An intuitive and easy-to-configure app with a user-frendly interface that can be controlled using other mobile devices and has playback support for YouTube and radio stations as well as local files.

[Discord](https://discord.gg/c6EXUwN)

---
### V1 (OUTDATED) Informations

[Installation Tutorial](https://www.youtube.com/watch?v=XHnL0YEjh9o)

### Features
*   **Radio stream url** - Play radio streams remotely
*   **YouTube** - Play youtube songs from phone to pc
*   **Volume Control** - Ability to control the volume from other device

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
download ffmpeg files and drop in the Media-Player folder(https://www.gyan.dev/ffmpeg/builds/)
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
