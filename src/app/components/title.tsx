'use client'
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Fragment } from 'react';

import style from './title.module.css';
import SiteMap from '../../../public/sitemap.json';
import { Sites } from '../lib/site';

function createPathElements(ancestors: Array<{ name: string, path: string }>) {
    let currentPath = '';
    return ancestors.map((ancestor, id) => {
        currentPath += `/${ancestor.path}`
        return (
            <Fragment key={currentPath} >
                <Link href={currentPath}>{ancestor.name}</Link>
                <> / </>
            </Fragment>
        );
    });
}

export default function Title() {
    const pagePath = usePathname();
    const splitPath: Array<{ name: string, path: string }> = [];

	// TODO(Paul): clean this up
    let currRoot: Sites = SiteMap.pages;
    let title: string | null = null;
    if (pagePath && pagePath !== '/') {
        const subPaths = pagePath.split('?')[0].split('#')[0].split('/');
        for (const p of subPaths.slice(1, subPaths.length)) {
            if (!p || !currRoot[p])
                continue;
            splitPath.push({ name: currRoot[p].title, path: p });

            if (currRoot === undefined
                || currRoot[p] === undefined
                || currRoot[p].pages === undefined)
                break;
            currRoot = currRoot[p].pages!;
        }
        if (splitPath !== undefined && splitPath.length > 0)
            title = splitPath.pop()!.name;

    }

    const pathElements = splitPath && createPathElements(splitPath) || <></>;
    return (
        <>
            {/* <head>
                <title>{title && `${title} | PaulW.XYZ` || 'PaulW.XYZ'}</title>
            </head> */}
            <div className={style.container}>
                <h1 className={style.title}>
                    {title || 'PaulW.XYZ'}
                </h1>
            </div>
            <div className={style.nav}>
                {
                    title
                        ? <><Link href='/'>PaulW.XYZ</Link> / {pathElements}{title}</>
                        : <>PaulW.XYZ /</>
                }
            </div>
        </>
    );
}
