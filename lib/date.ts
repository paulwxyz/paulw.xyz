// getMonth() method ranges from 0-11 so no reason to account for it
const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
];

function get12HourTime(pdate: Date | string): string {
    const date = (typeof pdate === 'string') ? new Date(pdate) : pdate;
    let hours = date.getHours();
    const minutes = date.getMinutes();
    let meridiem = 'A.M.';

    let strhours = ''
    
    if (hours > 12) {
        hours -= 12;
        meridiem = 'P.M.';
    }

    if (hours === 0)
        hours = 12;
    
    return `${hours}:${minutes < 10 ? '0' : ''}${minutes} ${meridiem}`;

}

function toHumanReadableDate(date: Date | string, disable?: { year?: boolean, month?: boolean, day?: boolean }) {
    const oDate = (typeof date === 'string') ? new Date(date) : date;

    const year = oDate.getFullYear();
    const month = months[oDate.getMonth()];
    const day = oDate.getDate();
    const suffix = getOrdinalDaySuffix(day)
    let out = '';
    out = !disable?.month ? `${month}` : '';
    out = !disable?.day ? `${out} ${day}${suffix}` : out;
    out = !disable?.year ? `${out}, ${year}` : out;

    return out;
}


export function getOrdinalDaySuffix(day: number): string {
    switch (day) {
        case 1:
        case 21:
        case 31:
            return 'st';
        case 2:
        case 22:
            return 'nd';
        case 3:
        case 23:
            return 'rd';
        default:
            return 'th';
    }
}

export function toLocaleString(pdate: Date | string): string {
    const date = (typeof pdate === 'string') ? new Date(pdate) : pdate;
    return `${toHumanReadableDate(date)} at ${get12HourTime(date)}`;
}

export function toRelativeDate(date: Date | string): string {
    const oDate = (typeof date === 'string') ? new Date(date) : date;


    if (!isValid(oDate)) {
        return 'Invalid Date';
    }

    const now = new Date();
    const diff = now.getTime() - oDate.getTime();

    let tdiff = Math.floor(diff / 1000);

    if (tdiff < 0) {
        return toHumanReadableDate(oDate);
    }

    if (tdiff < 60) {
        return `${tdiff} seconds ago`;
    }

    tdiff = Math.floor(tdiff / 60);
    if (tdiff < 60) {
        return `${tdiff} minute${tdiff === 1 ? '' : 's'} ago`;
    }

    tdiff = Math.floor(tdiff / 60);
    if (tdiff < 24) {
        return `${tdiff} hour${tdiff === 1 ? '' : 's'} ago`;
    }
    if (tdiff < 48) {
        return `Yesterday`;
    }

    if (oDate.getFullYear() != now.getFullYear())
        return toHumanReadableDate(oDate);
    return toHumanReadableDate(oDate, { year: true });
}

export function getFullMonth(month: number) {
    if (month >= 1 && month <= 12)
        return months[month];
    return 'Invalid Month';
}

export function isValid(date: any) {
    return (new Date(date)).toString() !== 'Invalid Date';
}

const DateTool = {
    toRelativeDate,
    getFullMonth,
    isValid,
    getOrdinalDaySuffix,
    toLocaleString,
};

export default DateTool;
