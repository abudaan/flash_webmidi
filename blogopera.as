connect.addEventListener(MouseEvent.CLICK, connectToServer);

var socket = new Socket();
socket.connect("127.0.0.1", 8000);
socket.addEventListener(SecurityErrorEvent.SECURITY_ERROR, securityErrorHandler);
socket.addEventListener(IOErrorEvent.IO_ERROR, ioErrorHandler);


function securityErrorHandler(error:SecurityError){
	trace(error);	
}

function ioErrorHandler(error:IOErrorEvent){
	trace(error);	
}

function connectToServer(event:MouseEvent){
	socket.writeUTFBytes('que_1');
	socket.flush();
}