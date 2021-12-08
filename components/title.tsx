import style from '../styles/title.module.css';
import Link from 'next/link';
import { useEffect, useState } from 'react';

type propsObj = {
    name: string,
    title?: string,
    ancestors?: Array<{ name: string, path: string }>
};

function Title(props: propsObj) {

    const path = () => {
        if (!props.ancestors)
            return (<></>);

        let currentPath = '';
        return (<>
            {
                props.ancestors.map(ancestor => {
                    currentPath += `/${ancestor.path}`
                    return (
                        <>
                            <Link href={currentPath} key=''>
                                <a>{ancestor.name}</a>
                            </Link>
                            <> / </>
                        </>
                    );
                })
            }
        </>
        );
    };

    return (
        <>
            <h1 className={style.container}>
                {props.title || props.name}
            </h1>
            <div className={style.nav + ' h1'}>
                {
                    props.name === ''
                        ? <>PaulW.XYZ / {props.name}</>
                        : <><Link href='/'><a>PaulW.XYZ</a></Link> / {path()}{props.name}</>
                }
            </div>
        </>
    );
}

export default Title;