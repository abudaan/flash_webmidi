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


  // create MIDI event dependent on incoming queue id
  window.sendToLightingControl = function(id){
    var type, channel, data1, data2;

    switch(id){
      case 'que_1':
        type = 144; // note on
        channel = 0;
        data1 = 60; // central c
        data2 = 100; // velocity
        break;
      case 'queue_1':
        // add your own MIDI data here
        break;
      case 'queue_2':
        break;
      case 'queue_3':
        break;
    }

    // send MIDI event to all connected outputs
    midiAccess.outputs.forEach(function(port){
      console.log(id, ': ', type + channel, data1, data2);
      port.send([type + channel, data1, data2]);
    });
  };
};
