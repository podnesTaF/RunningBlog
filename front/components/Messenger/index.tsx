import React, {useEffect, useState} from 'react';
import Conversation from './Conversation';
import styles from './Messenger.module.scss';
import Message from "./Message";
import {ConversationItem, MessageItem} from "../../utils/api/types";
import {Api} from "../../utils/api";
import {useAppSelector} from "../../redux/hooks";
import {selectUserData} from "../../redux/slices/user";

interface MessengerProps {
    conversations: ConversationItem[];
}

const Messenger: React.FC<MessengerProps> = ({conversations}) => {
    const [newMessage, setNewMessage] = useState('');
    const [currentChat, setCurrentChat] = useState<ConversationItem>();
    const [messages, setMessages]   = useState<MessageItem[]>([]);
    const [arrivalMessage, setArrivalMessage] = useState<MessageItem>();
    const userData = useAppSelector(selectUserData);

    useEffect(() => {
        arrivalMessage && [currentChat?.sender.id, currentChat?.receiver.id].includes(arrivalMessage?.sender.id)
        && setMessages((prev) => [...prev, arrivalMessage])
    }, [arrivalMessage, currentChat])

    console.log(conversations)

    useEffect(() => {
        const getMessages = async () => {
            try {
                const data = await Api().conversation.getMessages(currentChat!.id);
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

        // const receiverId = currentChat?.members.find((m) => m !== user._id);
        //
        // socketRef.current.emit("sendMessage", {
        //     senderId: user._id,
        //     receiverId,
        //     text: newMessage
        // })

        try {
            const data = await Api().conversation.sendMessage(message);
            setMessages([...messages, data]);
            setNewMessage('');
        } catch (err) {
            console.log(err);
        }
    }

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
                    <div className={styles.chatBoxTop}>
                        <div>
                            <Message/>
                        </div>
                        <div>
                            <Message own={true}/>
                        </div>
                    </div>
                    <div className={styles.chatBoxBottom}>
                        <textarea value={newMessage} onChange={(e) => (
                            setNewMessage(e.target.value)
                        )} className={styles.chatMessageInput} placeholder='write something...'>

                        </textarea>
                        <button onClick={sendMessage} className={styles.chatSubmitButton}>Send</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Messenger
