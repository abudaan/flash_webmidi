window.onload = function(){

  'use strict';

  var midiAccess;

  // initialise WebMIDI
  if(navigator.requestMIDIAccess !== undefined){
    navigator.requestMIDIAccess().then(
      function onFulfilled(access){
        midiAccess = access;
        sendMIDI();
      },
      function onRejected(e){
        console.log('no WebMIDI!');
      }
    );
  }else{
    console.log('no WebMIDI!');
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


  // create MIDI event dependent on incoming queue id in the hash of the url
  function sendMIDI(){
    var queueId = window.location.hash.substring(1);
    switch(queueId){
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
      default:
        console.log('nothing to do');
    }
  }
};
