import style from '../styles/title.module.css';
import Link from 'next/link';

type propsObj = {
    name: string,
    title?: string,
    ancestors?: Array<{ name: string, path: string }>
};

function createPathElements(ancestors: Array<{ name: string, path: string }>) {
    let currentPath = '';
    return ancestors.map((ancestor) => {
        currentPath += `/${ancestor.path}`
        return (
            <>
                <Link href={currentPath}>
                    <a>{ancestor.name}</a>
                </Link>
                <> / </>
            </>
        );
    });
};

function Title({ name, title, ancestors }: propsObj) {
    const pathElements = ancestors && createPathElements(ancestors) || <></>;

    return (
        <>
            <h1 className={style.container}>
                {title || name}
            </h1>
            <div className={`${style.nav} h1`}>
                {name
                    ? <><Link href='/'><a>PaulW.XYZ</a></Link> / {pathElements}{name}</>
                    : <>PaulW.XYZ /</>}
            </div>
        </>
    );
}

export default Title;