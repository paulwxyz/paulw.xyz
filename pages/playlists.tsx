import React, { ReactElement } from 'react';
import Layout from '../components/layout';
import pl from '../public/playlists.yaml';

type listItem = {
    children?: listItem[];
    url?: string;
    title: string;
};

function toListItem(record: Record<string, any>): listItem | null {
    if (!record.title)
        return null;

    let children: listItem[] = [];
    if (record.children)
        for (const child of record.children) {
            const lChild = toListItem(child);
            if (lChild)
                children.push(lChild);
        }

    return {
        title: record.title,
        url: record.url,
        children: children.length ? children : undefined,
    };
}

const list: listItem[] = [];

function mapChild(obj: listItem, level: number) {
    if (obj.url)
        return <li key=''><a href={obj.url}>{obj.title}</a></li>

    if (!obj.children)
        return <></> // ignore playlists without links

    let title: ReactElement;
    if (level >= 0 && level <= 3)
        title = React.createElement(`h${level + 3}`, {}, obj.title);
    else
        title = React.createElement('strong', {}, obj.title);

    return (
        <>
            {title}
            <ul>
                {obj.children.map(l => mapChild(l, level + 1))}
            </ul>
        </>
    );
}

function Playlists() {
    return (
        <Layout name='Playlists'>
            <section className='block'>
                <h2>Music</h2>
                {
                    pl.map((item: Record<string, any>) => {
                        const lItem = toListItem(item)
                        if (lItem)
                            return mapChild(lItem, 0)
                    })
                }
            </section>
        </Layout>
    );
}

export default Playlists;
