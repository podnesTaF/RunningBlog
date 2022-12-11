/** @format */

import React, {useEffect, useRef, useState} from 'react';
import styles from './WriteForm.module.scss';
import {Avatar, Button} from '@mui/material';
import {Api} from '../../utils/api';
import {PostItem} from '../../utils/api/types';
import {useRouter} from "next/router";
import clsx from "clsx";

interface WriteFormProps {
    data?: PostItem;
}

const WriteForm: React.FC<WriteFormProps> = ({data}) => {
    const router = useRouter()
    const [title, setTitle] = useState(data?.title || '');
    const [text, setText] = useState(data?.text || '');
    const [image, setImage] = useState();
    const [previewUrl, setPreviewUrl] = useState('')
    const [isHover, setIsHover] = useState(false)
    const [valid, setValid] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [drag, setDrag] = useState(true)

    const pickImageRef = useRef<HTMLInputElement>(null)

    useEffect(() => {
        if (!image) return
        const fileReader = new FileReader()
        fileReader.onload = () => {
            // @ts-ignore
            setPreviewUrl(fileReader.result)
        }
        console.log(image)
        fileReader.readAsDataURL(image)
    }, [image]);

    const onAddPost = async () => {
        try {
            setIsLoading(true);
            const obj = {
                title,
                text,
                image,
            }
            if (!data) {
                const post = await Api().post.create(obj);
                await router.push(`/`)
            }
        } catch (err) {
            console.warn('Create post ', err);
            alert(err);
        } finally {
            setIsLoading(false);
        }
    };

    const dragStartHandler = (e:  React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setDrag(true);
    }

    const dragLeaveHandler = (e:  React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setDrag(false);
    }

    const onDropHandler = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        // @ts-ignore
        let file = [...e.dataTransfer.files][0]
        setImage(file)
        setDrag(false)
    }

    const pickImageHandler = () => {
        if(pickImageRef.current) {
            pickImageRef.current.click()
        }
    }

    const pickedHandler = (e: any) => {
        if(e.target.files || e.target.files.length === 1) {
            const pickedFile = e.target.files[0]
            setImage(pickedFile)
            setValid(true)
        } else {
            setValid(false)
        }
    }

    const handleDelete = () => {
        setPreviewUrl('')
        setImage(undefined)
    }

    return (
        <div className={styles.postContainer}>
            <div className={styles.headWrapper}>
                <div className={styles.userData}>
                    <Avatar
                        style={{height: '50px', width: '50px'}}
                        className={styles.avatar}
                        alt="Remy Sharp"
                        src="https://leonardo.osnova.io/5ffeac9a-a0e5-5be6-98af-659bfaabd2a6/-/scale_crop/108x108/-/format/webp/"
                    />
                    <div className={styles.content}>
                        <span>Posting as</span>
                        <h3>Alex Podnes</h3>
                    </div>
                </div>
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
            <div className={styles.imageUpload}>
                <div onMouseEnter={() => setIsHover(true)} onMouseLeave={() => setIsHover(false)} className={styles.imageUploadPreview}>
                    {previewUrl && valid && <img src={previewUrl}  alt='Preview' />}
                    {isHover && <div className={styles.deletePreview} onClick={handleDelete}>DELETE</div>}
                </div>
            </div>
            <div
                className={clsx(styles.dragContainer, drag && styles.dropZone)}
                onDragStart={e => dragStartHandler(e)}
                onDragLeave={e => dragLeaveHandler(e)}
                onDragOver={e => dragStartHandler(e)}
                onDrop={e => onDropHandler(e)}
                onClick={pickImageHandler}>
                <input
                    ref={pickImageRef}
                    type='file' style={{display: 'none'}}
                    accept=".jpg,.png,.jpeg,.webp"
                    onChange={pickedHandler}
                />

                <p>Drag and drop photos <span>or click to upload</span></p>
            </div>


        </div>
    );
};

export default WriteForm;
