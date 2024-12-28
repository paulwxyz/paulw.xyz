# Steam

- [Steam Store](https://store.steampowered.com)

## Resources

- [Steam Web API Documentation](https://steamcommunity.com/dev/)
- [Steamworks Documentation](https://partner.steamgames.com/doc/home)
- [Valve Developer Wiki](https://developer.valvesoftware.com/wiki/Main_Page)

## Third-party Resources

- [SteamDB](https://steamdb.info/)
  - tracks depot changes, price history, everything steam
- [gg.deals](https://gg.deals)
    - tracks game deals for steam, steam key stores and other platforms
- [IsThereAnyDeal](https://isthereanydeal.com)
    - similar to gg.deals except it does not support key seller tracking
- [SteamGifts](https://steamgifts.com/)
  - giveaway Steam keys or take part in giveaways
- [SteamTradeMatcher](https://steamtradematcher.com/)
  - one-to-one trading of items on Steam
- [ArchiSteamFarm](https://asf.justarchi.net)
  - useful bot written in C# to farm trading cards for owned games that can be
    sold
- [SteamGridDB](https://steamgriddb.com/)
  - custom video game assets for games available and not available on Steam
- [ProtonDB](https://www.protondb.com/)
  - community-sourced Linux and Steam Deck compatibility tracker


## Steam Client

- [Steam Client Valve Wiki Page](https://developer.valvesoftware.com/wiki/Steam)
- [SteamCMD Valve Wiki Page](https://developer.valvesoftware.com/wiki/SteamCMD)

### Accessing the Console

- Use the following URIs on a browser or a file manager to open GUI client with
  the console:
  - `steam://nav/console`
  - `steam://open/console`
    - will not work if the Steam client is running in the background
- The `-console` flag can be used with the client executable
- Alternatively, SteamCMD, a command-line only version of the Steam client, can
  be used
  - [Windows
    Binary (.zip)](https://steamcdn-a.akamaihd.net/client/installer/steamcmd.zip)
  - [Linux
    Binary (.zip)](https://steamcdn-a.akamaihd.net/client/installer/steamcmd_linux.tar.gz)
  - [macOS
    Binary (.zip)](https://steamcdn-a.akamaihd.net/client/installer/steamcmd_osx.tar.gz)

### Downloading Older Depots

Download a single depot (used to download older versions of applications/games):

`download_depot <appid> <depotid> [<target manifestid>] [<delta manifestid>][<depot flags filter>]`

[SteamDB](https://steamdb.info/) can be used to find the required argument
values.

## Steam Deck

- [Official Website](https://www.steamdeck.com/)

### Third-party Software

- [Decky Plugin Loader](https://decky.xyz/)
  - Source: [GitHub / SteamDeckHomebrew](https://github.com/SteamDeckHomebrew)
  - Installer:
    [decky_installer.desktop](https://github.com/SteamDeckHomebrew/decky-installer/releases/latest/download/decky_installer.desktop)

### Console-like Youtube in Gaming Mode

- Using Chromium's undocumented command-line options, the user agent can be
  changed to PlayStation's, Xbox's or Tizen's (Samsung's TV OS) and the
  application can be launched in full screen by using the `--kiosk` flag. The
  following XDG Desktop Configuration, for example, can be used and added as a
  non-Steam game while in Desktop mode for access in gaming mode

```ini
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
# $XDG_PATH contains the paths used to fetch icons, extensions for supported formats are optional Icon=com.youtube.tv
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

### Miscellaneous

- When using a dock or a hub to connect to an external display, ensure the
  display supports the refresh rate set on the device; some TVs and some
  monitors only support refresh rates that are multiples of 30Hz 
