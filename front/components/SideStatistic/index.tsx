/** @format */

import React, { useState } from 'react';
import styles from './SideStatistic.module.scss';
import Link from 'next/link';
import {selectUserData} from "../../redux/slices/user";
import {useAppSelector} from "../../redux/hooks";
import {Avatar, Divider} from "@mui/material";
import {humanReadable} from "../../utils/time";
import {activityRating} from "../../utils/rating";
import {deepOrange} from "@mui/material/colors";
import Image from "next/image";

const SideStatistic = () => {
    const userData = useAppSelector(selectUserData)
  const [visible, setVisible] = useState(true);

  const toggleVisible = () => {
    setVisible(!visible);
  };

  return (
        <div className={styles.statItem}>
          <div className={styles.userInfo}>
              {userData?.image ? (
                  <Image
                      src={`http://localhost:4000/${userData.image}`}
                      alt="avatar"
                      width={70}
                      height={70}
                  />
              ):(
                  <Avatar sx={{ bgcolor: deepOrange[500], height: 70, width: 70 }}>
                      {userData?.fullName[0].toUpperCase()}
                  </Avatar>
              )}
          </div>
          <div className={styles.content}>
              <Link className={styles.title} href={`/profile/${userData?.id}`}>
                  <h3>{userData?.fullName}</h3>
              </Link>
              <div className={styles.userStats}>
                 <div>
                     <small>Followings</small>
                     <p>{userData?.followingsCount}</p>
                 </div>
                  <div>
                      <small>Followers</small>
                      <p>{userData?.followerCount}</p>
                  </div>
                  <div>
                      <small>Rating</small>
                      <p>{activityRating(userData?.runningDistance, userData?.cycleDistance)}</p>
                  </div>
              </div>
              <Divider/>
            <div className={styles.lastAct}>
                <p>Latest Activity</p>
                {userData?.lastActivity?.id ? (
                    <Link href={`/news/${userData?.lastActivity?.id}`}>
                        <h4>{userData?.lastActivity.title} | <small>{humanReadable(userData?.lastActivity.createdAt)?.slice(0, 17)}</small></h4>
                    </Link>
                    ) : (
                        <p>
                        You dont have any activity yet
                    </p>
                    )}
            </div>
            <div className={styles.activityWrap}>
                <div className={styles.activity}>
                    <p>Running</p>
                    <h4>{userData?.runningDistance} km</h4>
                </div>
                <div className={styles.activity}>
                    <p>Cycling</p>
                    <h4>{userData?.cycleDistance} km</h4>
                </div>
            </div>
          </div>
        </div>
  );
};

export default SideStatistic;
