window.onload = function(){

  'use strict';

  var midiAccess;

  // initialise WebMIDI
  if(navigator.requestMIDIAccess !== undefined){
    navigator.requestMIDIAccess().then(
      function onFulfilled(access){
        midiAccess = access;
        initFlash();
      },
      function onRejected(e){
        alert('no WebMIDI!');
      }
    );
  }else{
    alert('no WebMIDI!');
  }


  // add Flash as soon as WebMIDI has been initialised
  function initFlash(){
    var object = document.createElement('object');
    object.width = '1920';
    object.height = '1080';
    object.data = 'knopExternalInterface.swf';
    document.body.appendChild(object);
  }


  // send MIDI event to all connected outputs
  function sendMIDIEvent(event){
    midiAccess.outputs.forEach(function(port){
      port.send(event);
    });
  }


  // send a timed MIDI event to all connected outputs
  function sendTimedMIDIEvent(event, delay){
    setTimeout(function(){
      sendMIDIEvent(event);
    }, delay);
  }


  // create MIDI event dependent on incoming queue id
  window.sendToLightingControl = function(id){
    console.log(id);

    switch(id){
      case 'que_1':
        sendTimedMIDIEvent([144, 60, 100], 0); // note on event, channel 0, central c, velocity 100
        sendTimedMIDIEvent([128, 60, 0], 200); // note off event, channel 0, central c
        sendTimedMIDIEvent([144, 62, 100], 210);
        sendTimedMIDIEvent([128, 62, 0], 410);
        break;
      case 'queue_1':
        // add your own MIDI data here
        break;
      case 'queue_2':
        break;
      case 'queue_3':
        break;
    }

  };
};
