import { SocketIO as socketIO, Server } from 'mock-socket';
// SERVER
const uri = 'ws://localhost:1337';
export const mockServer = new Server( uri );
let messages = [];
window.io = socketIO;
const socket = socketIO( uri );
export const init = ( store ) => {
	// add listeners to supported socket messages so we can re-dispatch them as actions
	Object.keys( messageTypes )
		.forEach( type => socket.on( type, ( payload ) => store.dispatch({ type, payload }) ) );
};
export const emit = ( type, payload ) => {
	messages.push( type, payload );
	socket.emit( type, payload );
};
export const getMessages = () => {
	return messages;
};
