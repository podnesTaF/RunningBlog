import React from 'react';
import styles from "./RunInfo.module.scss";
import {countPace, getHr, getMin, getSec} from "../../utils/time";

interface RunInfoProps {
    distance: string;
    duration: string;
}

export const RunInfo: React.FC<RunInfoProps> = ({distance, duration}) => {
    return (
        <div className={styles.sportInfo}>
            <div>
                <p>Distance:</p>
                <p>{distance} km</p>
            </div>
            <div>
                <p>Duration: </p>
                <p>{`${getHr(duration)}:${getMin(duration)}:${getSec(duration)}`}</p>
            </div>
            <div>
                <p>Pace:</p>
                <p> {countPace(duration, distance)} / km</p>
            </div>
        </div>
    );
};

export default RunInfo;
