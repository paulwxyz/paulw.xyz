# Steam Client

<a href='https://store.steampowered.com' class='link button extern blue'>Steam Store</a>
<a href='https://developer.valvesoftware.com/wiki/SteamCMD' class='link button extern blue'>SteamCMD</a>

## Accessing the Console
- Use the following URIs on a browser or a file manager to open GUI client with the console:
	- `steam://nav/console`
 	- `steam://open/console`
 		- will not work if the Steam client is running in the background
- The `-console` flag can be used with the client executable
- Alternatively, SteamCMD, a command-line only version of the Steam client, can be used
    - [Windows Binary](https://steamcdn-a.akamaihd.net/client/installer/steamcmd.zip)
    - [Linux Binary](https://steamcdn-a.akamaihd.net/client/installer/steamcmd_linux.tar.gz)
    - [macOS Binary](https://steamcdn-a.akamaihd.net/client/installer/steamcmd_osx.tar.gz)

## Downloading Older Depots

Download a single depot (used to download older versions of applications/games):
```
download_depot <appid> <depotid> [<target manifestid>] [<delta manifestid>] [<depot flags filter>]
```

[SteamDB](https://steamdb.info/) can be used to find the required argument values.

## Resources

- [Steam Web API Documentation](https://steamcommunity.com/dev/)
- [Steamworks Documentation](https://partner.steamgames.com/doc/home)
- [Valve Developer Wiki](https://developer.valvesoftware.com/wiki/Main_Page)

## Third-party Resources

- [SteamDB](https://steamdb.info/)
	- tracks depot changes, price history, everything steam
- [SteamGifts](https://steamgifts.com/)
	- giveaway Steam keys or take part in giveaways
- [SteamTradeMatcher](https://steamtradematcher.com/)
	- one-to-one trading of items on Steam
- [ArchiSteamFarm](https://asf.justarchi.net)
	- useful bot written in C# to farm trading cards for owned games that can be sold
- [IsThereAnyDeal](https://isthereanydeal.com)
	- tracks game deals for steam, steam key stores and other platforms
	- somewhat broken although it is being migrated and modernized, see [New ITAD](https://new.isthereanydeal.com)
- [gg.deals](https://gg.deals)
	- newer than and similar to IsThereAnyDeal with modern UI
- [SteamGridDB](https://steamgriddb.com/)
    - custom video game assets for games available and not available on steam

