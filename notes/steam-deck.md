# Steam Deck

<a href='https://www.steamdeck.com/' class='link button extern blue'>Official Website</a>

## Third-party Software

* [Decky Plugin Loader](https://decky.xyz/)
  * Installer: [decky\_installer.desktop](https://github.com/SteamDeckHomebrew/decky-installer/releases/latest/download/decky_installer.desktop)

## Access Console-like Youtube in Gaming Mode

* Using Chromium's undocumented command-line options, the user agent can be changed to PlayStation's, Xbox's or Tizen's (Samsung's TV OS) and the application can be launched in full screen by using the `--kiosk` flag. The following XDG Desktop Configuration, for example, can be used and added as a non-Steam game while in Desktop mode for access in gaming mode

```cfg
#!/usr/bin/env xdg-open
[Desktop]
Version=1.0
Type=Application
Name=YouTube TV
GenericName=Online Video Platform
Comment=An online video-sharing, social media platform
Exec=/usr/bin/flatpak run --branch=master --arch=x86_64 --file-forwarding org.chromium.Chrome @@ %F @@ --user-agent='Mozilla/5.0 (Windows NT 10.0; Win64; x64; Xbox; Xbox Series X) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/48.0.2564.82 Safari/537.36 Edge/20.02' --kiosk 'https://www.youtube.com/tv'
Terminal=false
MimeType=text/plain;
# $XDG_PATH contains the paths used to fetch icons, extensions for supported formats are optional
Icon=com.youtube.tv 
```

* Firefox can also be used however the supported command-line options are limited
* The URL is https://www.youtube.com/tv
* Without the user agent change, the above URL is inaccessible
* Adblockers like uBlock Origin, AdBlock Plus (both tested) do not remove ads unlike on the desktop site
* Choosing the Xbox user agent is recommended as button prompts match the Steam Deck's `ABXY` button layout
* The Electron framework can be used to build a wrapper for the URL. This is the preferable method as it supports exiting from within the application, while browsers only support manual termination from the Steam menu. E.g. (assuming you can build native linux binaries on a device)

```javascript
const { app, BrowserWindow } = require('electron');
app.whenReady()
    .then(() => {
        const win = new BrowserWindow({
            backgroundColor: '#2e2c29', 
            kiosk: true
        });
        win.maximize();
        win.loadURL('https://youtube.com/tv');
        const wc = win.webContents;
        wc.userAgent = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; Xbox; Xbox Series X) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/48.0.2564.82 Safari/537.36 Edge/20.02'
    })
    .catch(()=>{}); // swallow errs
```

## Miscellaneous

* When using a dock or a hub to connect to an external display, ensure the display supports the refresh rate set on the device as some TVs and other displays only support refresh rates that are multiples of 30Hz
