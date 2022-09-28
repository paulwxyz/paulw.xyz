import style from '../styles/lists.module.css';
import React, { ReactElement } from 'react';

export interface listItem {
    [x: string]: any;
    children?: listItem[] | string[];
    url?: string;
    type?: string;
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
            children = [...lchildren, ...schildren.map((s: string): listItem => {
                return { title: s };
            })];
        }
    }

    return Object.assign(record, {
        title: record.title,
        url: record.url,
        children: children.length ? children : undefined,
        type: record.type?.length ? record.type : undefined,
        description: record.description,
    });
}

const s = {
    "af": 123,
    "asdf" : 123
}

export function mapChild(
    obj: listItem | string, 
    level: number, 
    typeMap? : Record<string, (o: listItem) => JSX.Element> 
    ) {
    if (typeof obj === 'string') {
        if (obj === '')
            return <></>
        return <span className={style.listItem}>{obj}</span>
    }

    if (obj.title === '')
        return <></>

    const desc = obj.description
        ? <span className={style.listItemDesc}>{obj.description}</span>
        : <></>;

    if (obj.url)
        return (
            <>
                <span className={style.listItem}><a href={obj.url}>{obj.title}</a></span>
                {desc}
            </>);

    if (!obj.children) {
        let cb;
        if (obj.type && typeMap) {
            console.error(typeMap[obj.type])
            cb = typeMap[obj.type]
        }

        return cb 
            ? cb(obj) 
            : (<><span className={style.listItem}>{obj.title}</span>{desc}</>);
    }

    let title: ReactElement;

    if (level >= 0 && level <= 4)
        title = React.createElement(`h${level + 2}`, {}, obj.title);
    else
        title = React.createElement('strong', {}, obj.title);

    return (
        <section className={level < 4 && `block ${style.block}` || ''}>
            {title}
            {obj.description ? <p className={style.desc}>{obj.description}</p> : <></>}
            <div>
                {obj.children.map(l => mapChild(l, level + 1, typeMap))}
            </div>
        </section>
    );
}