import React, {useEffect} from 'react';
import styles from "../WriteForm/WriteForm.module.scss";
import {InputAdornment, MenuItem, TextField} from "@mui/material";
import {useInput} from "../../hooks/useInput";
import {getHr, getMin, getSec} from "../../utils/time";
import {PostItem} from "../../utils/api/types";

interface inputActions {
    value?: string | number,
    onChange: any
}
interface TrainInfoProps {
    distance: inputActions;
    type: inputActions

    getHours: inputActions

    getMin: inputActions;
    getSec: inputActions
}

const runningTypes = [
    {
        value: 'running',
        label: 'Running'
    },
    {
        value: 'cycle',
        label: 'Cycling'
    }
]
const TrainInfo: React.FC<TrainInfoProps> = ({distance, getHours, getMin, getSec, type}) => {

    return (
        <div className={styles.trainInfo}>
            <div className={styles.distance}>
                <TextField
                    {...distance}
                    size='small'
                    type='number' id="standard-basic" label="Distance, km" variant="outlined"
                />
                <TextField
                    {...type}
                    select
                    label="Type"
                    defaultValue="running"
                    variant="outlined"
                    size='small'
                >
                    {runningTypes.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                            {option.label}
                        </MenuItem>
                    ))}
                </TextField>
            </div>
            <div className={styles.duration}>
                <TextField
                    label='Duration'
                    {...getHours}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment  position="start">
                                <p>hr</p>
                            </InputAdornment>
                        ),
                    }}
                    variant="outlined"
                    size='small'
                />
                <TextField
                    {...getMin}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <p>min</p>
                            </InputAdornment>
                        ),
                    }}
                    variant="outlined"
                    size='small'
                />
                <TextField
                    {...getSec}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <p>s</p>
                            </InputAdornment>
                        ),
                    }}
                    variant="outlined"
                    size='small'
                />
            </div>
        </div>
    );
};

export default TrainInfo;
