import React from 'react';
import clsx from "clsx";
import styles from './Message.module.scss';
import {format} from "timeago.js";

interface MessageProps {
    own?: boolean;
}

const Message: React.FC<MessageProps> = ({own}) => {
    const publicFolder = process.env.NEXT_PUBLIC_PUBLIC_FOLDER;

    return (
        <div className={clsx(styles.message, own && styles.own)}>
            <div className={styles.messageTop}>
                <img className={styles.messageImg} src={publicFolder + "person/noAvatar.png" } alt="message icon"/>
                <p className={styles.messageText}>Some random text</p>
            </div>
            <div className={styles.messageBottom}>
                1 hour ago
            </div>
        </div>
    );
};

export default Message;
