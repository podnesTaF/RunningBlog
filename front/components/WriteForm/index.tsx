/** @format */

import React, {useState} from 'react';
import styles from './WriteForm.module.scss';
import {Button, Divider} from '@mui/material';
import {Api} from '../../utils/api';
import {PostItem} from '../../utils/api/types';
import {useRouter} from "next/router";
import {useInput} from "../../hooks/useInput";
import {countDuration, getHr, getMin, getSec} from "../../utils/time";
import UserData from "../UserData";
import ImageUpload from "../ImageUpload";
import TrainInfo from "../TrainInfo";

interface WriteFormProps {
    data?: PostItem;
}

const WriteForm: React.FC<WriteFormProps> = ({data}) => {
    const router = useRouter()

    const distance = useInput(data?.distance || null)
    const type = useInput(data?.type || 'running')
    const getHours = useInput(getHr(data?.duration) || '00' )
    const getMinutes = useInput(getMin(data?.duration) || '00' )
    const getSeconds = useInput(getSec(data?.duration) || '00' )
    const [title, setTitle] = useState(data?.title || '');
    const [text, setText] = useState(data?.text || '');
    const [image, setImage] = useState();
    const [isLoading, setIsLoading] = useState(false);


    const onAddPost = async () => {
        try {
            setIsLoading(true);
            const duration = countDuration(getHours.value, getMinutes.value, getSeconds.value)
            const obj = {
                type: type.value,
                title,
                text,
                image,
                duration: duration + '',
                distance: distance.value + '',
            }
            console.log(obj)
            if (!data) {
                const post = await Api().post.create(obj);
                await router.push(`/`)
            } else {
                const post = await Api().post.update(data.id, obj);
                await router.push(`/`)
            }
        } catch (err) {
            console.log('Create post ', err);
            alert(err);
        } finally {
            setIsLoading(false);
        }
    };


    return (
        <div className={styles.postContainer}>
            <div className={styles.headWrapper}>
                <UserData />
                <Button
                    onClick={onAddPost}
                    style={{height: 42}}
                    variant="contained"
                    color="primary"
                    disabled={isLoading || !title}
                >
                    {data ? 'Save' : 'Publish'}
                </Button>
            </div>
           <TrainInfo distance={distance} type={type} getHours={getHours} getMin={getMinutes} getSec={getSeconds} />
            <Divider />
            <div className={styles.areaWrapper}>
                <textarea maxLength={255} value={title} onChange={(e) => setTitle(e.target.value)}
                          className={styles.postTitle} name='title' placeholder="Add a title (optional)"></textarea>
                <textarea
                    autoFocus
                    name='text'
                    placeholder="What's going on"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    className={styles.textField}>
            </textarea>
            </div>
            <ImageUpload image={image} setImage={setImage} imageUrl={data?.image} />
        </div>
    );
};

export default WriteForm;
