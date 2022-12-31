import Head from 'next/head'
import Image from 'next/image'
import { Inter } from '@next/font/google'
// import styles from '../styles/Home.module.css'
import { useEffect } from 'react'
import { io } from "socket.io-client";
import useChat from '../hooks/chat.hook'
import styles  from './index.module.scss'


const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const { messages, input, setInput, sendMessage, currentRoom, joinRoom } = useChat();
  
  return (
    <div className={styles.chat}>
      <div className={styles.chatHeader}>
        <h2>Chat</h2>
        <button className={styles.closeButton}>X</button>
      </div>
      <div className={styles.chatBody}>
        {messages.map((message, index) => (
          <div key={index} className={styles.message}>
            <div className={styles.avatar}></div>
            <div className={styles.text}>
              <p>{message}</p>
              <span className={styles.timestamp}>{`message.timestamp`}</span>
            </div>
          </div>
        ))}
      </div>
      <div className={styles.chatFooter}>
        <input
          type="text"
          placeholder="Type a message..."
          value={input}
          onChange={e => setInput(e.target.value)}
        />
        <button onClick={sendMessage}>Send</button>
      </div>
      <div className={styles.rooms}>
        {currentRoom && (
          <h3>Current room: {currentRoom}</h3>
        )}
        <h3>Rooms:</h3>
        <button onClick={() => joinRoom('room1')}>Room 1</button>
        <button onClick={() => joinRoom('room2')}>Room 2</button>
        <button onClick={() => joinRoom('room3')}>Room 3</button>
      </div>
    </div>
  );
}
