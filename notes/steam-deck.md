# Steam Deck

- [Official Website](https://www.steamdeck.com/)

## Third-party Software

- [Decky Plugin Loader](https://decky.xyz/)
  - Source: [GitHub / SteamDeckHomebrew](https://github.com/SteamDeckHomebrew)
  - Installer:
    [decky_installer.desktop](https://github.com/SteamDeckHomebrew/decky-installer/releases/latest/download/decky_installer.desktop)

## Console-like Youtube in Gaming Mode

- Using Chromium's undocumented command-line options, the user agent can be
  changed to PlayStation's, Xbox's or Tizen's (Samsung's TV OS) and the
  application can be launched in full screen by using the `--kiosk` flag. The
  following XDG Desktop Configuration, for example, can be used and added as a
  non-Steam game while in Desktop mode for access in gaming mode

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
MimeType=text/plain; # $XDG_PATH contains the paths used to fetch icons, extensions for supported formats are optional Icon=com.youtube.tv
```

- Firefox can also be used however the supported command-line options are
  limited
- The URL for the TV user interface is https://www.youtube.com/tv
- Without the user agent change, the above URL is inaccessible and will redirect
  you to the desktop version of the website
- Adblockers like uBlock Origin, AdBlock Plus (both tested) do not remove ads
  even if they work with the desktop version
- Choosing an Xbox user agent is recommended as button prompts match the Steam
  Deck's `ABXY` button layout
- The Electron framework can be used to build a wrapper for the URL
    - This is the preferable method as it supports exiting from within the
      application, while browsers only support manual termination from the Steam
      menu. 
    - Sample code for the electron app (assuming you can build linux binaries
      for the target platform):
      ```javascript
      // sample code to get started
      const { app, BrowserWindow } = require('electron');
      app
        .whenReady()
        .then(() => {
          const win = new BrowserWindow({
            backgroundColor: '#2e2c29',
            kiosk: true,
          });
          win.maximize();
          win.loadURL('https://youtube.com/tv');
          win.webContents.userAgent = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; Xbox; Xbox Series X) '
          + 'AppleWebKit/537.36 (KHTML, like Gecko) '
          + 'Chrome/48.0.2564.82 Safari/537.36 Edge/20.02';
        })
        .catch(() => { });
    ```

## Miscellaneous

- When using a dock or a hub to connect to an external display, ensure the
  display supports the refresh rate set on the device; some TVs and some
  monitors only support refresh rates that are multiples of 30Hz 
