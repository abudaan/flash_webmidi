window.onload = function(){

  'use strict';

  var s = new WebSocket('ws://localhost:8090')

  s.onopen = function(evt){
    //onOpen(evt)
  };

  s.onclose = function(evt){
    //onClose(evt)
  };

  s.onmessage = function(evt){
    //onMessage(evt)
  };

  s.onerror = function(evt){
    //onError(evt)
  };

  var b = document.createElement('input');
  b.type = 'button';
  b.value = 'click me!';
  b.addEventListener('click', function(e){
    s.send('queue1');
  });
  document.body.appendChild(b);
};
