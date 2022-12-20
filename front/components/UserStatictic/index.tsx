import React from 'react';
import {ResponseUser} from "../../utils/api/types";
import styles from './UserStatistic.module.scss'
import {Divider} from "@mui/material";
import {activityRating, calculateRating} from "../../utils/rating";
interface UserStatisticProps {
    user: ResponseUser;
}
const UserStatistic: React.FC<UserStatisticProps> = ({user}) => {
    return (
        <div className={styles.wrapper}>
            <h2>Statistic</h2>
            <div className={styles.activityWrap}>
                <div className={styles.activity}>
                    <p>Running</p>
                    <h4>{user?.runningDistance} km</h4>
                </div>
                <div className={styles.activity}>
                    <p>Cycling</p>
                    <h4>{user?.cycleDistance} km</h4>
                </div>
            </div>
            <Divider />
            <div className={styles.socialAct}>
                <div>
                    <small>Total activity:</small>
                    <h3>{user.postsCount}</h3>
                </div>
                <div>
                    <small>Social Rating:</small>
                    <h3>{calculateRating(user.followerCount, user.commentsCount, user.postsCount, user.likesCount)}</h3>
                </div>
                <div>
                    <small>Sport Rating:</small>
                    <h3>{activityRating(user.runningDistance, user.cycleDistance) || 0}</h3>
                </div>
            </div>
        </div>
    );
};

export default UserStatistic;
