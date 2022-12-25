/** @format */

import React, {useState} from 'react';
import {
    Dialog,
    DialogContent,
    DialogContentText,
    Typography,
} from '@mui/material';

interface AuthDialogProps {
    onClose: () => void;
    open: boolean;
}

import styles from './AuthDialog.module.scss';
import Login from './forms/Login';
import MainLogin from './forms/MainLogin';
import Register from './forms/Register';

const AuthDialog: React.FC<AuthDialogProps> = ({onClose, open}) => {
    const [formType, setFormType] = useState<'login' | 'register'>(
        'login'
    );
    return (
        <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
            <DialogContent>
                <DialogContentText>
                    <div className={styles.content}>
                        <img
                            src="https://www.seekpng.com/png/detail/7-71544_animation-man-running-entrenar-me.png"
                            alt="running man"
                        />
                        <div className={styles.contentWrapper}>
                            <Typography className={styles.title}>
                                {formType === 'login' ? (
                                    <p>
                                        Authorization
                                    </p>
                                ) : (
                                    <p>
                                        Registration
                                    </p>
                                )}
                            </Typography>
                            {formType === 'login' && (
                                <Login onOpenRegister={() => setFormType('register')}/>
                            )}
                            {formType === 'register' && (
                                <Register
                                    onOpenRegister={() => setFormType('register')}
                                    onOpenLogin={() => setFormType('login')}
                                />
                            )}
                        </div>
                    </div>
                </DialogContentText>
            </DialogContent>
        </Dialog>
    );
};

export default AuthDialog;
