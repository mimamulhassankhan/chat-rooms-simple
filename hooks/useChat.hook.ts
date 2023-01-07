import Pusher from 'pusher-js';
import Echo from 'laravel-echo';
import { useMemo, useState, useEffect } from 'react';
import useCurrentUser from './useCurrentUser.hook';
//@ts-ignore
window.Pusher = Pusher;

function options(token: string) { 
    return{
        broadcaster: 'pusher',
        key: 'scvbmzkmvcscvbmzkmvcscvbmzkmvcbjit',
        cluster: 'mt1',
        forceTLS: false,
        authEndpoint: 'http://localhost:8000/api/v1/socket/connect',   // As I'm using JWT tokens, I need to manually set up the headers.
        wsHost: '127.0.0.1',
        wsPort: 6001,
        wssPort: 6001,
        auth: {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    }
};

const useChat = (...initialChannels: string[]) => {
    const {token} = useCurrentUser()
    const echo = useMemo(() => new Echo(options(token)), [token]);
    const [channels, setChannels] = useState<string[]>(initialChannels)
    const [messages, setMessages] = useState<any[]>([]);
    const [input, setInput] = useState('');
    console.log(echo.socketId())
    
    const updateChannelNames = (channels: string[]) => {
        setChannels(channels)
    }

    useEffect(() => {
        if(channels.length < 1) {
            return
        }

        for(let i = 0; i < channels.length; i++) {
            echo.private(channels[i]).listen(
                'SendMessage',
                (data: any) => {
                  console.log( data);
                  setMessages((prev) => [data, ...prev])
                }
            );
        }
    }, [channels]);

    return { messages, input, setInput, updateChannelNames };
  };

  export default useChat;