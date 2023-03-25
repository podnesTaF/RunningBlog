import React, {useEffect, useState} from 'react';
import clsx from "clsx";
import styles from './Message.module.scss';
import {MessageItem, ResponseUser} from "../../../utils/api/types";

interface MessageProps {
    own?: boolean;
    message: MessageItem;
    currentUser: ResponseUser;
}

const Message: React.FC<MessageProps> = ({own, message, currentUser}) => {
    const [sender, setSender] = useState(message.sender);

    return (
        <div className={clsx(styles.message, own && styles.own)}>
            <div className={styles.messageTop}>
                <img className={styles.messageImg} src={sender?.image ? 'http://localhost:4000/' + sender.image : 'http://localhost:4000/' + "images/noAvatar.png" } alt="message icon"/>
                <p className={styles.messageText}>{message.text}</p>
            </div>
            <div className={styles.messageBottom}>
                1 hour ago
            </div>
        </div>
    );
};

export default Message;
