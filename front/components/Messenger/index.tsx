import React, {useEffect, useRef, useState} from 'react';
import Conversation from './Conversation';
import styles from './Messenger.module.scss';
import Message from "./Message";
import {ConversationItem, MessageItem} from "../../utils/api/types";
import {Api} from "../../utils/api";
import {useAppSelector} from "../../redux/hooks";
import {selectUserData} from "../../redux/slices/user";
import {io} from "socket.io-client";

interface MessengerProps {
    conversations: ConversationItem[];
}

const Messenger: React.FC<MessengerProps> = ({conversations}) => {
    const [newMessage, setNewMessage] = useState('');
    const [currentChat, setCurrentChat] = useState<ConversationItem>();
    const [messages, setMessages]   = useState<MessageItem[]>([]);
    const [arrivalMessage, setArrivalMessage] = useState<any>();
    const userData = useAppSelector(selectUserData);
    const scrollRef = useRef<HTMLDivElement>(null);

    const socketRef = useRef(io("ws://localhost:4500"));

    useEffect(() => {
        socketRef.current = io("ws://localhost:4500");

        socketRef.current.on("getMessage", (data) => {
            setArrivalMessage({
                sender: data.senderId,
                text: data.text,
            })
        })
    }, []);


    useEffect(() => {
        arrivalMessage && [currentChat?.sender.id, currentChat?.receiver.id].includes(arrivalMessage?.sender)
        && setMessages((prev) => [...prev, arrivalMessage])
    }, [arrivalMessage, currentChat])

    useEffect(() => {
        socketRef.current.emit("addUser", userData!.id)
    }, [userData]);


    useEffect(() => {
        const getMessages = async () => {
            try {
                if(!currentChat) return;
                const data = await Api().conversation.getMessages(currentChat.id);
                setMessages(data);
            } catch (err) {
                console.log(err);
            }
        };
        getMessages();
    }, [currentChat])

    const sendMessage = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        if(!userData) return;
        const message = {
            text: newMessage,
            conversationId: currentChat!.id
        };

        const receiverId =  [currentChat?.sender.id, currentChat?.receiver.id].find((m) => m !== userData.id);

        socketRef.current.emit("sendMessage", {
            senderId: userData!.id,
            receiverId,
            text: newMessage
        })

        try {
            const data = await Api().conversation.sendMessage(message);
            setMessages([...messages, data]);
            setNewMessage('');
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        scrollRef.current?.scrollIntoView()
    }, [messages])

    return (
        <div className={styles.messenger}>
            <div className={styles.chatMenu}>
                <div className={styles.chatMenuWrapper}>
                    <input placeholder='Search for a friends' className={styles.chatMenuInput}/>
                    {userData && conversations && conversations.map((c) => (
                        <div key={c.id} onClick={() => setCurrentChat(c)}>
                            <Conversation conversation={c}
                                          currentUser={userData}/>
                        </div>
                    ))}
                </div>
            </div>
            <div className={styles.chatBox}>
                <div className={styles.chatBoxWrapper}>
                    {currentChat ? (
                            <>
                                <div className={styles.chatBoxTop}>
                                    {userData && messages?.map((m) => (
                                        <div key={m.id} ref={scrollRef}>
                                            <Message  message={m} own={m.sender?.id === userData.id} currentUser={userData}/>
                                        </div>
                                    ))}
                                </div>
                                <div className={styles.chatBoxBottom}>
                        <textarea value={newMessage} onChange={(e) => (
                            setNewMessage(e.target.value)
                        )} className={styles.chatMessageInput} placeholder='write something...'>
                        </textarea>
                                    <button onClick={sendMessage} className={styles.chatSubmitButton}>Send</button>
                                </div>
                            </>
                    ) : (
                        <div className={styles.noConversation}>
                            <h2>Open a conversation to start a chat.</h2>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Messenger
