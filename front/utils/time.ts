
const months = ["January","February","March","April","May","June","July",
    "August","September","October","November","December"];

// '2022-12-11T15:56:10.953Z'
export const humanReadable = (time?: string) => {
    if(time) {
        const month = +time.slice(5,7)
        const day = time.slice(8,10)
        const year = time.slice(0,4)
        let hours = +time.slice(11, 13)
        let isAm = 'am'
        const minutes = +time.slice(14,15)
        if (+hours > 12) {
            hours = hours - 12
            isAm = 'PM'
        } else {
            isAm = 'AM'
        }

        return `${months[month - 1]} ${day}, ${year} at ${hours > 10 ? hours : `0${hours}`}:${minutes > 10 ? minutes : `0${minutes}`} ${isAm}`
    }
}

export const countDuration = (hours: string, minutes: string, seconds: string) => {
    const hr = +hours * 3600;
    const min = +minutes * 60;
    const sec = +seconds;
    return hr + min + sec
}

export const getHr = (duration?: string) => {
    if (duration) {
        const remainder = +duration % 3600
        const hr = (+duration - remainder) / 3600
        return hr >= 10 ? `${hr}` : `0${hr}`
    }
}

export const getMin = (duration?: string) => {
    if(duration) {
        let remainder = +duration % 3600
        const newRemainder = remainder % 60
        const min = (remainder - newRemainder) / 60
        return min >= 10 ? `${min}` : `0${min}`;
    }
}

export const getSec = (duration?: string) => {
    if (duration) {
        let remainder = +duration % 3600
        const newRemainder = remainder % 60
        const sec = (+duration - newRemainder - remainder) % 60
        return sec >= 10 ? `${sec}` : `0${sec}`;
    }
}

export const countPace = (duration: string, distance: string) => {
    const paceKmInSec = Math.floor(+duration / +distance)
    const rem = paceKmInSec % 60
    const KmInMin = (paceKmInSec - rem) / 60
    return`${KmInMin}:${rem >= 10 ? `${rem}` : `0${rem}`}`

}