var jazz = require('jazz-midi');
var net = require('net');
var ouputs = {};
var socket;


// process incoming socket message and create MIDI event(s)
function processMessage(id){
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
    default:
      console.log('nothing to do');
  }
}


// send MIDI event to all connected outputs
function sendMIDIEvent(event){
  console.log('sending MIDI', event);
  for(var name in ouputs){
    port = ouputs[name];
    var n = port.MidiOutOpen(name);
    console.log(n, name, event[0], event[1], event[2]);
    port.MidiOut(event[0], event[1], event[2]);
    port.MidiOutClose();
  }
}


// send a timed MIDI event to all connected outputs
function sendTimedMIDIEvent(event, delay){
  setTimeout(function(){
    sendMIDIEvent(event);
  }, delay);
}


function startServer(){
  net.createServer({allowHalfOpen: true}, function(stream) {
    socket = stream;
    socket.setEncoding('utf8');
    console.log('server connected with client on port ' + this.address().port);
    socket.on('data', processMessage);
  }).listen(8000);
}


function startMIDI(){
  var midi = new jazz.MIDI();
  var names = midi.MidiOutList();
  for(var name in names){
    //console.log(name);
    ouputs[name] = new jazz.MIDI();
  }
  startServer();
}

startMIDI();
