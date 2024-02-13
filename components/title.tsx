import Link from 'next/link';
import { useRouter } from 'next/router';

import style from '../styles/title.module.css';
import SiteMap from '../public/sitemap.json';
import Head from 'next/head';
import { SiteSubPages } from '../lib/site';

function createPathElements(ancestors: Array<{ name: string, path: string }>) {
    let currentPath = '';
    return ancestors.map((ancestor, id) => {
        currentPath += `/${ancestor.path}`
        return (
            <>
                <Link key={id + 1} href={currentPath}>{ancestor.name}</Link>
                <> / </>
            </>
        );
    });
}

function Title() {

    const router = useRouter();
    const pagePath = router.asPath;
    const splitPath: Array<{ name: string, path: string }> = [];

    let currRoot: SiteSubPages = SiteMap.subpages;
    let title: string | null = null;
    if (pagePath !== '/') {
        const subPaths = pagePath.split('/');
        for (const p of subPaths.slice(1, subPaths.length)) {
            splitPath.push({ name: currRoot[p].title, path: p });

            if (currRoot === undefined
                || currRoot[p] === undefined
                || currRoot[p].subpages === undefined)
                break;
            currRoot = currRoot[p].subpages!;
        }
        if (splitPath !== undefined && splitPath.length > 0)
            title = splitPath.pop()!.name;

    }

    const pathElements = splitPath && createPathElements(splitPath) || <></>;
    return (
        <>
            <Head>
                <title>{title && `${title} | PaulW.XYZ` || 'PaulW.XYZ'}</title>
            </Head>
            <div className={style.container}>
                <h1 className={style.title}>
                    {title || 'PaulW.XYZ'}
                </h1>
            </div>
            <div className={`${style.nav} h1`}>
                {
                    title
                        ? <><Link href='/'>PaulW.XYZ</Link> / {pathElements}{title}</>
                        : <>PaulW.XYZ /</>
                }
            </div>
        </>
    );
}

export default Title;
