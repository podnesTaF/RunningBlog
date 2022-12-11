import {CommentItem} from "../utils/api/types";
import React, {SetStateAction, useEffect, useState} from "react";
import {Api} from "../utils/api";


type UseCommentsProps = {
    setComments: React.Dispatch<SetStateAction<CommentItem[]>>,
    comments: CommentItem[],
}
export const useComments = (postId?: number): UseCommentsProps => {
    const [comments, setComments] = useState<CommentItem[]>([]);

    useEffect(() => {
        (async () => {
            try {
                const arr = await Api().comment.getAll(postId)
                setComments(arr)
            } catch (err) {
                console.warn('Comments fetching', err)
            }
        })()
    }, [])

    return {comments, setComments}
}