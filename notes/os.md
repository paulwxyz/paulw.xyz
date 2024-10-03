# Operating Systems
## Windows

### Package Managers

- Chocolatey
    - requires Administrator permissions
- Winget
    - comes with Windows
    - (it doesn't work half of the time for me)

### Mounting ISO, CUE images

Windows versions 8 and above natively support mounting ISOs. However CUE images are not supported. 
WinCDEmu is a lightweight, open-source disc emulator that supports mounting CUE, NRG, IMG, ISO, etc. images. 
- [WinCDEmu Website](https://wincdemu.sysprogs.org/)
- [Source (GitHub)](https://github.com/sysprogs/WinCDEmu)
- [Portable Version](https://wincdemu.sysprogs.org/portable/)

### Master Control Panel / God Mode
(Misnomer; you probably won't use this either) 

Shows a list of all the available settings on Windows in a single view.

Open it by exceuting the following command or saving it as a shortcut: `explorer.exe shell:::{ED7BA470-8E54-465E-825C-99712043E01C}`

## MacOS

### Package Manager

- [HomeBrew](https://brew.sh)
    - package manager everyone uses but it is noticeably slow

### Video Players

- IINA
    - video player based on mpv with native macOS UI
- mpv
    - mpv doesn't have a brew cask for Apple silicon; stolen-mpv exists but it is x86 only
    - mpv brew formula is the cli tool which works pretty well but it is not as nice as packaged applications
