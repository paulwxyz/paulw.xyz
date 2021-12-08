import style from '../styles/fuzzy.module.css';
import Link from 'next/link';

function Result(props: { formatted: JSX.Element[], key: string, link: string, idx: number }) {

    return (
        <Link href={props.link}>
            <a className={style.hyperlink}>
                <div className={style['hyperlink-name']}>
                    {props.formatted}
                </div>
                <div className={style['hyperlink-url']}>
                    {props.link}
                </div>
            </a>
        </Link>
    );
}

export default Result;