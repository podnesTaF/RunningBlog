/** @format */

import React, {useRef, useState} from 'react';
import {Button, Input} from '@mui/material';

import styles from './AddComentForm.module.scss';
import {Api} from "../../utils/api";
import {CommentItem} from "../../utils/api/types";

interface AddCommentFormProps {
    onSuccessAdd: (obj: CommentItem) => void;
    postId: number;

    getRef: Function;
}

const AddCommentForm: React.FC<AddCommentFormProps> = ({postId, onSuccessAdd, getRef}) => {
    const [clicked, setClicked] = useState(false);
    const [loading, setLoading] = useState(false);
    const [text, setText] = useState('');

    const ref = useRef<HTMLInputElement>()

    getRef(ref)
    const onAddComment = async () => {
        try {
            setLoading(true)
            const comment = await Api().comment.create({postId, text})
            setClicked(false);
            onSuccessAdd(comment)
            setText('');
            setLoading(false);
        } catch (err) {
            setLoading(false);
            console.warn('Add comment', err)
            alert('error by creating comment')
        }
    };

    return (
        <div className={styles.form}>
            <Input
                ref={ref}
                onFocus={(e) => {
                    setClicked(true);
                }}
                disabled={loading}
                minRows={clicked ? 5 : 1}
                classes={{root: styles.fieldRoot}}
                placeholder="write a comment"
                fullWidth
                multiline
                value={text}
                onChange={(e) => setText(e.target.value)}
            />
            {clicked && (
                <Button
                    disabled={loading}
                    onClick={onAddComment}
                    className={styles.addButton}
                    variant="contained"
                    color="primary"
                >
                    Create article
                </Button>
            )}
        </div>
    );
};

export default AddCommentForm;
