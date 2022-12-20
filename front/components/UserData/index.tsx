import React from 'react';
import styles from "./UserData.module.scss";
import {Avatar} from "@mui/material";
import {selectUserData} from "../../redux/slices/user";
import {useAppSelector} from "../../redux/hooks";

const UserData = () => {

    const userData = useAppSelector(selectUserData)

    return (
        <div className={styles.userData}>
            {userData?.image ? (
                <Avatar
                    style={{height: '50px', width: '50px'}}
                    className={styles.avatar}
                    alt="Remy Sharp"
                    src={`http://localhost:4000/${userData?.image}`}
                />
                ):
                <Avatar style={{height: '50px', width: '50px'}}>
                    {userData?.fullName[0]}
                </Avatar>
                }
            <div className={styles.content}>
                <span>Posting as</span>
                <h3>{userData?.fullName}</h3>
            </div>
        </div>
    );
};

export default UserData;
