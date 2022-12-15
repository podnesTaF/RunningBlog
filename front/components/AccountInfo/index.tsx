import React from 'react';
import {Card, TextField} from "@mui/material";
import styles from './AccountInfo.module.scss'

interface AccountInfoProps {
    email: string;
    name: string;
    createdAt: string;
    updatedAt: string;
}
const AccountInfo: React.FC<AccountInfoProps> = ({email, name, createdAt, updatedAt}) => {
    return (
        <Card className={styles.card}>
            <div className={styles.item}>
                <p>Your Email:</p>
                <TextField disabled className={styles.input} value={email} />
            </div>
            <div className={styles.item}>
                <p>Your Name:</p>
                <TextField disabled className={styles.input} value={name} />
            </div>
        </Card>
    );
};

export default AccountInfo;
