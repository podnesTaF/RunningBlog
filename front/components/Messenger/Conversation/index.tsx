import React, {useEffect, useState} from 'react';
import styles from './Conversation.module.scss'
import {ConversationItem, ResponseUser} from "../../../utils/api/types";


interface ConversationProps {
    conversation: ConversationItem;
    currentUser: ResponseUser;
}

const Conversation: React.FC<ConversationProps> = ({currentUser, conversation}) => {

    const [user, setUser] = useState(conversation.sender.id === currentUser.id ? conversation.receiver : conversation.sender);

    return (
        <div className={styles.conversation}>
            <img className={styles.conversationImg} src={user?.image ? 'http://localhost:4000/' + user.image : 'http://localhost:4000/' + "images/noAvatar.png" } alt="image"/>
            <span className={styles.conversationName}>{user?.fullName}</span>
        </div>
    );
};

export default Conversation;
