import Pusher from 'pusher-js';
import Echo from 'laravel-echo';
import { useMemo, useState, useEffect, useLayoutEffect } from 'react';
import useCurrentUser from './useCurrentUser.hook';


function options(token: string) {
    return {
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
    const { id, token } = useCurrentUser()
    const echo = useMemo(() => new Echo(options(token)), [token]);
    const [channels, setChannels] = useState<string[]>(initialChannels)
    const [currentChat, setCurrentChat] = useState<any>(null)
    const [conversations, setConversations] = useState<any[]>([])

    function updateChannelNames(channels: string[]) {
        setChannels(channels)
    }

    function connectChatChannel(channelName: string) {
        echo.private(channelName).listen(
            '.chatEvent',
            (data: any) => {
                console.log(47, data);
                setConversations((prev) => prev.map((convo) => data.conversation_id !== convo.id ? convo : { ...convo, messages: [...convo.messages, data] }))
            }
        );
    }

    function connectNewConversationChannel(userId: number) {
        echo.private(`new.conversation.user.${userId}`).listen('.newConvsersationEvent', (data: any) => { console.log(data); setConversations((prev) => [data, ...prev]) });
    }

    useEffect(() => {
        if (channels.length < 1) {
            return
        }

        for (let i = 0; i < channels.length; i++) {
            connectChatChannel(channels[i])
        }
    }, [channels]);

    useEffect(() => {
        connectNewConversationChannel(id);
    }, [id])

    useEffect(() => {
        //@ts-ignore
        window.Pusher = Pusher;
    }, [])

    console.log(conversations)
    return { updateChannelNames, connectChatChannel, conversations, setConversations, currentChat, setCurrentChat };
};

export default useChat;