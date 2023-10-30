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

const ordSfx = ['','st','nd','rd','th'];

function toHumanReadableDate(date: Date | string, disable?: {year?: boolean, month?: boolean, day?: boolean}) {
    const oDate = (typeof date === 'string')? new Date(date): date;

    const year = oDate.getFullYear();
    const month = months[oDate.getMonth()];
    const day = oDate.getDate();
    
    let sfx;
    if (day >= 1 && day <= 3)
        sfx = ordSfx[day];
    else
        sfx = ordSfx[4];
    
    let out = !disable?.day ? `${day}${sfx}` : '';
    out = !disable?.month ? `${out} ${month}` : out;
    out = !disable?.year ? `${out} ${year}` : out;

    return out;
}

function toRelativeDate(date: Date | string): string { 
    const oDate = (typeof date === 'string')? new Date(date): date;

    const now = new Date();
    const diff = now.getTime() - oDate.getTime();

    let tdiff = Math.floor(diff/1000);
    
    if (tdiff < 0) {
        return toHumanReadableDate(oDate);
    }

    if (tdiff < 60) {
        return `${tdiff} seconds ago`;
    }
    
    tdiff = Math.floor(tdiff/60);
    if (tdiff < 60) {
        return `${tdiff} minute${tdiff === 1? '' : 's'} ago`;
    }

    tdiff = Math.floor(tdiff/60);
    if (tdiff < 24) {
        return `${tdiff} hour${tdiff === 1? '' : 's'} ago`;
    }
    if (tdiff < 48) {
        return `Yesterday`;
    }

    if (oDate.getFullYear() != now.getFullYear())
        return toHumanReadableDate(oDate);
    return toHumanReadableDate(oDate, {year: true});
}

function isValid(date: any) {
    return (new Date(date)).toString() === 'Invalid Date';
}
const DateTool = {
    toRelativeDate, 
    isValid
};

export default DateTool;
