"use client";
// import { useEffect, useState } from "react";
// import io from "Socket.IO-client";
// let socket: any;

// type Message = {
//     author: string;
//     message: string;
//   };

const Chat = () => {
    // const [username, setUsername] = useState("");
    // const [chosenUsername, setChosenUsername] = useState("");

    // const [message, setMessage] = useState("");
    // const [messages, setMessages] = useState<Array<Message>>([]);

    // useEffect(() => {
    //     socketInitializer();
    // }, []);

    // const socketInitializer = async () => {
    //     await fetch('/api/socket');
    //     socket = io()

    //     socket.on('connect', () => {
    //       console.log('connected')
    //     })
    
    //     socket.on("newIncomingMessage", (msg:any) => {
    //         setMessages((currentMsg) => [
    //             ...currentMsg,
    //             { author: msg.author, message: msg.message },
    //         ]);
    //     })
    // }

    // const sendMessage = async () => {
    //     socket.emit("createdMessage", { author: chosenUsername, message });
    //     setMessages((currentMsg) => [
    //         ...currentMsg,
    //         { author: chosenUsername, message },
    //     ]);
    //     setMessage("");
    // };

    // const handleKeypress = (e:any) => {
    //     if (e.keyCode === 13) {
    //         if (message) {
    //         sendMessage();
    //         }
    //     }
    // };

    return (
          <main>
            {/* {!chosenUsername ? (
              <>
                <h3>How people should call you?</h3>
                <input
                  type="text"
                  placeholder="Identity..."
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
                <button
                  onClick={() => {
                    setChosenUsername(username);
                  }}
                >
                  Go!
                </button>
              </>
            ) : (
              <>
                  <p>Your username: {username}</p>
                  <div>
                    {
                        messages.map((msg, i) => <p key={i}>
                        {msg.author} : {msg.message}
                         </p>)
                    }
                  </div>
                  <div>
                    <input
                      type="text"
                      placeholder="New message..."
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      onKeyUp={handleKeypress}
                    />
                      <button
                        onClick={() => {
                          sendMessage();
                        }}
                      >
                        Send
                      </button>
                  </div>
              </>
            )} */}
          </main>
      );
};

export default Chat;
