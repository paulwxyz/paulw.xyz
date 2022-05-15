import Link from 'next/link';
import Pages from '../public/pages.json';

function QuickLinks() {
    return (
        <div className='block'>
            <div className='h2'>Quick Links</div>
            {
                Object.entries(Pages).map(([title, link], i) => {
                    const extern = link.match(/^http/) && `blue extern` || '';
                    return (
                        <Link key={i} href={link}>
                            <a className={`${extern} link button`}>{title}</a>
                        </Link>
                    );
                })
            }
        </div>
    );
}

export default QuickLinks;