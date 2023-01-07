export default (io:any, socket:any) => {
    const createdMessage = (msg:any) => {
      socket.broadcast.emit("newIncomingMessage", msg);
    };
    console.log(createdMessage,'server-2');
    socket.on("createdMessage", createdMessage);
  };