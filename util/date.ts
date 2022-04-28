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

function prettyPrint(date: Date | string): string { 
    const oDate = (typeof date === 'string')? new Date(date): date;

    const now = new Date();
    const diff = now.getTime() - oDate.getTime();

    let tdiff = Math.floor(diff/1000);
    
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

    const year = oDate.getFullYear();
    const month = months[oDate.getMonth()];
    const day = oDate.getDate();
    
    let sfx;
    if (day >= 1 && day <= 3)
        sfx = ordSfx[day];
    else
        sfx = ordSfx[4];
    if (year != now.getFullYear())
        return `${day}${sfx} ${month} ${year}`;
    return `${day}${sfx} ${month}`;
}

function isValid(date: any) {
    return (new Date(date)).toString() === 'Invalid Date';
}

const d = {
    prettyPrint, 
    isValid
};

export default d;