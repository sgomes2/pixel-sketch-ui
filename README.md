# Pixel Sketch

This project is a simple 16x16 pixel art application. There is an accompanying [Arduino sketch](https://github.com/sgomes2/pixel-sketch-embedded) which can be used to display the drawn image on a 16x16 LED matrix.

# Table of Contents
- [Download](#download)
    - [Windows](#windows)
    - [Mac](#mac)
- [Running Locally](#running-locally)
- [Building Installer](#building-installer)
    - [Windows](#windows)
    - [Mac](#mac)

## Downloads
| OS    | Savings |
| -------- | ------- |
| Windows  | [Download](https://drive.google.com/uc?export=download&id=1x1Pq6NxlE7cMCf9Ieu2q4mJhAkqOIFnu)   |
| Mac | TBD     |

## Running Locally
The Electron application currently points to static HTML that's output when the react project is built. Use the following steps to build and use the UI without installing it.

1. Open a terminal in the root of the project directory.
2. If the the build folder doesn't exist run `npm run build`
3. Run `npm run start`

## Building Installer
You can also create an installer that can be used to install or run the application without running build or a local server.

### Windows
1. Run `npm run make`
2. Open the "out" folder that was created in file explorer.
3. Open the "make" folder.
4. Double-click pixel-sketch-{version} Setup.exe.
5. When the installer is complete, Pixel Sketch can be found on your desktop and in the start menu.

### Mac
1. Run `npm run make`
2. Open the "out" folder that was created in file explorer.
3. Open the "make" folder.
4. Copy the pixel-sketch.appImage wherever you would like to have it.
5. Double-click the pixel-sketch app to run it.