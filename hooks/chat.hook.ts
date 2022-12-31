import React, { useEffect, useState } from "react";
import io from 'socket.io-client';

const useChat = () => {
    const socket = React.useMemo(() => io(), []);
    const [messages, setMessages] = useState<string[]>([]);
    const [input, setInput] = useState('');
    const [currentRoom, setCurrentRoom] = useState('room1');

    const sendMessage = () => {
        console.log('sss')
        socket.emit('chat message', input);
        setInput('');
    };

    const joinRoom = (room: string) => {
        socket.emit('leave', currentRoom);
        socket.emit('join', room);
        setCurrentRoom(room);
    };

    useEffect(() => {
        socket.on('connect', () => {
            console.log('Connected to Socket.io server');
            alert('connected!!')
            socket.emit('join', currentRoom);
        });
        socket.on('disconnect', () => {
            console.log('Disconnected from Socket.io server');
        });
        socket.on('chat message', (msg: string) => {
            console.log(msg)
            setMessages((prevMessages) => [...prevMessages, msg]);
        });
    }, [socket, currentRoom]);

    return { messages, input, setInput, sendMessage, currentRoom, joinRoom };
  };

  export default useChat;
  