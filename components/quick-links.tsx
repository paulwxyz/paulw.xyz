import Link from 'next/link';
import Pages from '../public/pages.json';

function QuickLinks() {
    return (<>
        <div className='h2'>Quick Links</div>
        {
            Pages.map((obj, i) => {
                const extern = obj.link.match(/^http/) && `blue extern` || '';
                return (
                    <Link key={i} href={obj.link}>
                        <a className={`${extern} link button`}>{obj.title}</a>
                    </Link>
                );
            })
        }
    </>);
}

export default QuickLinks;