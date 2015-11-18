var jazz = require('jazz-midi');
var net = require('net');
var outputs = [];
var numOutputs;
var names;
var socket;


// process incoming socket message and create MIDI event(s)
function processMessage(id){
  console.log(id);

  switch(id){
    case 'que_1':

      // var port = new jazz.MIDI();
      // var list = port.MidiOutList();
      // console.log(list[1]);
      // port.MidiOutOpen(list[1]);
      // port.MidiOut(144, 60, 100);
      // port.MidiOutClose();

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
  for(var i = 0; i < numOutputs; i++){
    outputs[i].MidiOut(event[0], event[1], event[2]);
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
  names = midi.MidiOutList();
  numOutputs = names.length;
  for(var i = 0; i < numOutputs; i++){
    var port = new jazz.MIDI();
    var name = names[i];
    var n = port.MidiOutOpen(name);
    if(n === name){
      console.log('opening port', name);
      outputs.push(port);
    }else{
      console.log('could not open MIDI output', name);
    }
  }
  startServer();
}

function exitHandler(options, err) {
  if(options.exit){
    for(var i = 0; i < numOutputs; i++){
      var output = outputs[i];
      console.log('closing port', names[i]);
      output.MidiOutClose();
    }
    process.exit();
  }
}

//catches ctrl+c event
process.on('SIGINT', exitHandler.bind(null, {exit:true}));

//catches uncaught exceptions
process.on('uncaughtException', exitHandler.bind(null, {exit:true}));

startMIDI();
