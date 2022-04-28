import Link from 'next/link';
import Pages from '../public/pages.json';
import style from '../styles/quick-links.module.css'

function QuickLinks() {
    return (<>
        <div className='h2'>Quick Links</div>
        {
            Pages.map((obj, i) => {
                const extern = obj.link.match(/^http/) && `blue ${style.blueButton}` || '';
                return (
                    <Link key={i} href={obj.link}>
                        <a className={`${extern} ${style.button} button`}>{obj.title}</a>
                    </Link>
                );
            })
        }
    </>);
}

export default QuickLinks;