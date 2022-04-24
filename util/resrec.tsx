import style from '../styles/lists.module.css';
import React, { ReactElement } from 'react';

interface listItem {
    children?: listItem[] | string[];
    url?: string;
    title: string;
    description?: string;
};

export function toListItem(record: Record<string, any>): listItem | null {
    if (!record.title)
        return null;

    let children: listItem[] | string[] = [];
    if (Array.isArray(record.children) && record.children.length) {

        let lchildren: listItem[] = [];
        let schildren: string[] = [];
        for (const child of record.children) {
            if (typeof child === 'string') {
                schildren.push(child);
                continue;
            }
            const lChild = toListItem(child);
            if (lChild)
                lchildren.push(lChild);
        }

        if (!lchildren.length) {
            children = schildren;
        }
        else {
            children = [...lchildren, ... schildren.map((s: string): listItem => {
                return { title: s };
            }) ];
        }
    }

    return {
        title: record.title,
        url: record.url,
        children: children.length? children : undefined,
        description: record.description,
    };
}

export function mapChild(obj: listItem | string, level: number) {
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