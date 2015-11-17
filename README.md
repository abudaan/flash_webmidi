###WebMIDI and Flash

This project allows you to send MIDI commands to a lighting console from a Flash projector file. It contains a simple socket server and a Flash file that connects to this socket server.

 - 1 First install [Nodejs](https://nodejs.org/en/) if you haven't already.

 - 2 Then checkout this project using git (branch: standalone) or by downloading the [zip file](https://github.com/abudaan/webmidi_flash/archive/standalone.zip).

 - 3 Open your terminal and cd into the folder where you have stored the project: `cd path/to/project`. Note that this folder should contain a file named `package.json`.

 - 4 Then type this command in your terminal: `npm install`.

 - 5 After the command has finished, start the socket server: `node server.js`.

 - 6 Now start the Flash projector (.exe on Windows and .app on OSX)

 - 7 Pressing the button sends a MIDI event to all outputs, on OSX you will hear two piano notes playing

