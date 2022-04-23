import React, { ReactElement } from 'react';
import Layout from '../components/layout';
import style from '../styles/lists.module.css';
import rec from '../public/recommended.yaml';

type listItem = {
    children?: listItem[] | string[];
    url?: string;
    title: string;
    description?: string
};

const list: listItem[] = rec // todo: validate this

function mapChild(obj: listItem | string, level: number) {
console.log(list)
if (typeof obj === 'string') {
        if (obj === '')
            return <></>
        return <span className={style.listItem}>{obj}</span>
    }

    if (obj.title === '')
        return <></>

    if (obj.url)
        return <span className={style.listItem}><a href={obj.url}>{obj.title}</a></span>

    if (!obj.children)
        return <span className={style.listItem}>{obj.title}</span>

    let title: ReactElement;

    if (level >= 0 && level <= 4)
        title = React.createElement(`h${level + 2}`, {}, obj.title);
    else
        title = React.createElement('strong', {}, obj.title);

    return (
        <>
            {title}
            {obj.description ? <p>{obj.description}</p> : <></>}
            <div>
                {obj.children.map(l => mapChild(l, level + 1))}
            </div>
        </>
    );
}

function Recommended() {
    return (
        <Layout name='Recommended' title='My Recommendations'>
            <section className='block'>
                <p>This page is really for me to not forget/revisit the good things I have read, seen, heard, and/or experienced. This list may change, just as my opinions.</p>
                <p>If the one you are looking for is not on this list, it is most likely I have not had the chance to read/listen to/watch it yet.</p>
                {list.map(l => mapChild(l, 0))}
            </section>
        </Layout>
    );
}

export default Recommended;
