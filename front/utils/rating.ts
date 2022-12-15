import {ResponseUser} from "./api/types";

export const calculateRating = (followers?: number, comments?: number, posts?: number, likes?: number) => {
    const ratingFollowers = followers ? followers * 4 : 0
    const ratingComments = comments ? comments * 2 : 0
    const ratingPosts = posts ? posts * 2 : 0
    const likesRate = likes || 0

    return ratingFollowers + ratingComments + ratingPosts + likesRate
}

export const sortUsers = (a: ResponseUser, b: ResponseUser) => {
    const first = calculateRating(a.followerCount, a.commentsCount, a.postsCount, a.likesCount)
    const second = calculateRating(b.followerCount, b.commentsCount, b.postsCount, b.likesCount)

    return second - first
}