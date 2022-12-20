import {ResponseUser} from "./api/types";

export const calculateRating = (followers?: number, comments?: number, posts?: number, likes?: number) => {
    const ratingFollowers = followers ? followers * 4 : 0
    const ratingComments = comments ? comments * 2 : 0
    const ratingPosts = posts ? posts * 2 : 0
    const likesRate = likes || 0

    return ratingFollowers + ratingComments + ratingPosts + likesRate
}

export const activityRating = (runningDis?: number, cyclingDis?: number) => {
    const runRate = runningDis && runningDis * 3 || 0
    return runRate + (cyclingDis || 0)
}

export const sortSocial = (a: ResponseUser, b: ResponseUser) => {
    return calculateRating(b.followerCount, b.commentsCount, b.postsCount, b.likesCount) - calculateRating(a.followerCount, a.commentsCount, a.postsCount, a.likesCount)
}

export const sortSport = (a: ResponseUser, b: ResponseUser) => {
    return activityRating(a.runningDistance, a.cycleDistance) - activityRating(b.runningDistance, b.cycleDistance)
 }