import { Server } from 'Socket.IO'
import messageHandler from '../../utils/sockets/messageHandler'
const conversations:any=[]

const SocketHandler = (req:any, res:any) => {
  if (res.socket.server.io) {
    console.log('Socket is already running')
    res.end();
    return;
  }
    console.log('Socket is initializing')
    const io = new Server(res.socket.server)
    res.socket.server.io = io
    const onConnection = (socket:any) => {
        messageHandler(io, socket);
    };
    io.on("connection", onConnection);
    res.end()
}

export default SocketHandler