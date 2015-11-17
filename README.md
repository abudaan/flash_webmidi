###Flash and WebMIDI

This simple project allows you to send commands to a lighting control from a Flash time line.

If you click on the button the .swf file makes a call to javascript using ExternalInterface:

```
ExternalInterface.call("sendToLightingControl('que_1')");
```

The function `sendToLightingControl` is a global javascript function. This is ugly, but it works and it is the simplest solution.

The parameter `que_1` is the queue id.

In the file main.js you can easily add new queue ids and create MIDI events for that specific id:

```
    switch(id){
      case 'queue_1':
        type = 144; // note on
        channel = 0;
        data1 = 60; // central c
        data2 = 100; // velocity
        break;
      case 'queue_2':
        // add your own MIDI data here
        break;
      ...
    }
```


####installation

First install [Nodejs](https://nodejs.org/en/) then open your terminal and enter:

`npm install`

Start a local webserver by the command:

`npm run start`

Now the project runs at [http://localhost:8000](http://localhost:8000)