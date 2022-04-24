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

const suffixes = ['','st','nd','rd','th'];

export default function prettyDatePrint(date: Date) {
    const now = new Date();
    const diff = now.getTime() - date.getTime();

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

    const year = date.getFullYear();
    const month = months[date.getMonth()];
    const day = date.getDate();
    let sfx;
    if (day >= 1 && day <= 3)
        sfx = suffixes[day];
    else
        sfx = suffixes[4];
    return `${day}${sfx} ${month} ${year}`;
}