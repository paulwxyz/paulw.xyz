import React, { ReactElement } from 'react';
import Layout from '../components/layout';
import style from '../styles/lists.module.css';
import res from '../public/resources.yaml';

type listItem = {
    children?: listItem[] | string[];
    url?: string;
    title: string;
    description?: string
};

const list: listItem[] = res;

function mapChild(obj: listItem | string, level: number) {
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

function Resources() {
    return (
        <Layout name='Resources' title='Some Useful Resources'>
            <section className='block'>
                {list.map(l => mapChild(l, 0))}
            </section>
        </Layout>);
}

export default Resources;