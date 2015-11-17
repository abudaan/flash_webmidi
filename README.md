###WebMIDI and Flash

This simple project allows you to send MIDI commands to a lighting console from a Flash time line.

If you click on the button, the .swf file makes a call to javascript using ExternalInterface:

```
ExternalInterface.call("sendToLightingControl('que_1')");
```

The function `sendToLightingControl` is a global javascript function. This is ugly, but it works and it is the simplest solution.

The parameter `que_1` is the queue id.

In the file main.js you can easily add new queue ids and create MIDI events for that specific queue:

```
    switch(id){
      case 'queue_1':
        // send MIDI event(s)
        break;
      case 'queue_2':
        // send other MIDI event(s)
        break;
      ... // add as many queues as you need
    }
```


####installation

First install [Nodejs](https://nodejs.org/en/) if you haven't already.

Then checkout this project using git or by downloading the [zip file](https://github.com/abudaan/webmidi_flash/archive/master.zip)

Open your terminal and cd into the folder where you have stored the project. Note that this folder should have a file named `package.json`:

`cd path/to/project`

Then type this command in your terminal:

`npm install`

After the command has finished, start a local webserver:

`npm run start`

Now the project runs at [http://localhost:8000](http://localhost:8000)