import React, {useEffect, useRef, useState} from 'react';
import Image from "next/image";
import styles from "../WriteForm/WriteForm.module.scss";
import clsx from "clsx";


interface ImageUploadProps {
    setImage: Function;
    imageUrl?: string;

    image: any;
}
const ImageUpload: React.FC<ImageUploadProps> = ({setImage, image, imageUrl}) => {
    const [previewUrl, setPreviewUrl] = useState('');
    const [isHover, setIsHover] = useState(false)
    const [valid, setValid] = useState(false);
    const [drag, setDrag] = useState(true)
    const [oldImageUrl, setImageUrl] = useState(imageUrl ? `http://localhost:4000/${imageUrl}` : '')
    const pickImageRef = useRef<HTMLInputElement>(null)

    useEffect(() => {
        setPreviewUrl(`http://localhost:4000/${imageUrl}`)
        // @ts-ignore
    }, []);


    useEffect(() => {
        if (!image) return
        const fileReader = new FileReader()
        fileReader.onload = () => {
            // @ts-ignore
            setPreviewUrl(fileReader.result)
        }
        fileReader.readAsDataURL(image)

    }, [image]);
    const dragStartHandler = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setDrag(true);
    }

    const dragLeaveHandler = (e: React.DragEvent<HTMLDivElement>) => {
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
        if (pickImageRef.current) {
            pickImageRef.current.click()
        }
    }

    const pickedHandler = (e: any) => {
        if (e.target.files || e.target.files.length === 1) {
            const pickedFile = e.target.files[0]
            setImage(pickedFile)
            setValid(true)
        } else {
            setValid(false)
        }
    }

    const handleDelete = () => {
        if (oldImageUrl) {
            setImageUrl('')
        }
        setPreviewUrl('')
        setImage(undefined)
    }

    return (
        <>
            <div className={styles.imageUpload}>
                <div onMouseEnter={() => setIsHover(true)} onMouseLeave={() => setIsHover(false)}
                     className={styles.imageUploadPreview}>
                    {oldImageUrl ? <Image src={oldImageUrl} width={80} height={80} alt='Preview'/> : previewUrl && valid &&
                        <Image  width={80} height={80} src={previewUrl} alt='Preview'/>}
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
        </>
    );
};

export default ImageUpload;
