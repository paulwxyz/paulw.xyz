import Link from 'next/link';
import Pages from '../public/external.json';

function QuickLinks() {
    return (
        <div className='block'>
            <div className='h2'>Quick Links</div>
            {
                Object.entries(Pages).map(([title, link], i) => {
                    const extern = link.match(/^http/) && `blue extern` || '';
                    return (
                        <Link key={i} href={link} className={`${extern} link button`}>{title}</Link>
                    );
                })
            }
        </div>
    );
}

export default QuickLinks;
