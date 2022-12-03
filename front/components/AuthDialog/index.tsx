/** @format */

import React, { useState } from 'react';
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Typography,
  TextField,
  Divider,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

interface AuthDialogProps {
  onClose: () => void;
  open: boolean;
}

import styles from './AuthDialog.module.scss';
import Login from './forms/Login';
import MainLogin from './forms/MainLogin';
import Register from './forms/Register';

const AuthDialog: React.FC<AuthDialogProps> = ({ onClose, open }) => {
  const [formType, setFormType] = useState<'main' | 'login' | 'register'>(
    'main'
  );
  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogContent>
        <DialogContentText>
          <div className={styles.content}>
            <img
              src="https://www.seekpng.com/png/detail/7-71544_animation-man-running-entrenar-me.png"
              alt="runnin man"
            />
            <div className={styles.contentWrapper}>
              <Typography className={styles.title}>
                {formType === 'main' ? (
                  'Enter in TJ'
                ) : (
                  <p
                    onClick={() => setFormType('main')}
                    className={styles.backTitle}
                  >
                    <ArrowBackIcon /> To authorization
                  </p>
                )}
              </Typography>
              {formType === 'main' && (
                <MainLogin onOpenLogin={() => setFormType('login')} />
              )}
              {formType === 'login' && (
                <Login onOpenRegister={() => setFormType('register')} />
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
