
const months = ["January","February","March","April","May","June","July",
    "August","September","October","November","December"];

// '2022-12-11T15:56:10.953Z'
export const humanReadable = (time: string) => {
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