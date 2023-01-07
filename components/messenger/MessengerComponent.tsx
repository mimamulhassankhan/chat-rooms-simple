'use client'

import { getCookie } from 'cookies-next';
import React, { useContext, useEffect, useRef, useState } from "react";
import "./Messenger.css";
import axios from "axios";
import Conversation from '../conversations/Conversations';
import Message from '../message/Message';
import ChatOnline from '../chatOnline/ChatOnline';
import useCurrentUser from '../../hooks/useCurrentUser.hook';
import useChat from '../../hooks/useChat.hook';
  

const Messenger = () => {
    // consts
    const {id, token} = useCurrentUser()
    const {updateChannelNames} = useChat();
    
    // states
    const scrollRef=useRef<any>()
    const [conversations, setConversations]=useState<any[]>([])
    const [currentChat, setCurrentChat]=useState<any>(null)
    const [messages, setMessages]=useState<any>([])
    const [newMessage, setNewMessage]=useState<any>("")
    const [onlineUsers, setOnlineUsers]=useState<any>([])

   

    // functions
    async function getConversations(token: string) {
        try {
            const result=await axios.get(`http://localhost:8000/api/v1/my-conversations`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            if(!result) {
                return
            }
            updateChannelNames(result.data.result.map((convo: any) => `chat.${convo.id}`))
            setConversations(result.data.result);
        } catch (error) {
            console.log(error);
        }
    }
    
    async function postMessage(data:any) {
        try {
            const result=await axios.post(`http://localhost:8000/api/v1/message/store`,data, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            setMessages([...messages, result.data.result]);
            setNewMessage("")
        } catch (error) {
            console.log(error);
        }
    }

    function handleSubmit(e:any){
        e.preventDefault()
        const message={
            conversation_id: currentChat.id,
            sender_id: id,
            text: newMessage,
        }
        postMessage(message)
    }

    // useEffects
    useEffect(()=>{
        if(token){
            getConversations(token)
        }
    },[token])

    useEffect(()=>{
        if(!currentChat) {
            return
        }
        setMessages(conversations.filter((convo) => convo.id === currentChat.id).flatMap((convo) => convo.messages))
    },[currentChat])

    useEffect(()=>{
     scrollRef.current?.scrollIntoView({behavior:"smooth"})
    },[messages])

    console.log(messages)
    return (
        <>
            <div className="messenger">
                <div className="chatMenu">
                    <div className="chatMenuWrapper">
                        <input type="text" placeholder="Search for friends"  className="chatMenuInput"/>
                        {
                            conversations?.map((c:any)=><div onClick={()=>setCurrentChat(c)}><Conversation conversation={c}/></div>)
                        }
                    </div>
                </div>
                <div className="chatBox">
                    <div className="chatBoxWrapper">
                        {
                            currentChat ?
                            <>
                            <div className="chatBoxTop">
                                {
                                    messages.map((m:any)=>
                                    <div ref={scrollRef}><Message message={m} own={m.sender === id}/></div>
                                    )
                                }
                            </div>
                            <div className="chatBoxBottom">
                            <textarea className="chatMessageInput" placeholder="Write something..." onChange={(e)=>setNewMessage(e.target.value)} value={newMessage} ></textarea>
                            <button className="chatSubmitButton" onClick={handleSubmit}>Send</button>
                        </div>
                            </>
                            :<span className="noConversationText">Open a conversation to start a chat</span>
                        }
                        
                        
                    </div>
                </div>
                <div className="chatOnline">
                    <div className="chatOnlineWrapper">
                        <ChatOnline onlineUsers={onlineUsers} currentUserId={id} setCurrentChat={setCurrentChat}/>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Messenger;
