---
title: Steam Store Client
last_updated: '2022-05-16T14:20:20-04:00'
---

## Accessing the Console
- Use the following URLs to enable the console in the GUI client:
	- [steam://nav/console](steam://nav/console)
 	- [steam://open/console](steam://open/console)
 		- will not work if the Steam client is running in the background
- The `-console` flag can be used with the client executable.
- Alternatively, [SteamCMD](https://developer.valvesoftware.com/wiki/SteamCMD), a command-line version of the Steam client, can be used.

## Console Commands

Download a single depot (used to download older versions of applications/games):
```
download_depot <appid> <depotid> [<target manifestid>] [<delta manifestid>] [<depot flags filter>]
```

[SteamDB](https://steamdb.info/) can be used to find the required argument values.

## Resources

- [Steam Web API Documentation](https://steamcommunity.com/dev/)
- [Steamworks Documentation](https://partner.steamgames.com/doc/home)

## Unaffiliated, Useful Sites

- [SteamDB](https://steamdb.info/)
	- gives a lot more insight into their platform
- [SteamGifts](https://steamgifts.com/)
	- giveaway Steam keys or take part in giveaways
- [SteamTradeMatcher](https://steamtradematcher.com/)
	- one-to-one trading of items on Steam