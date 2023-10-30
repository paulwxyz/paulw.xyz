import Link from 'next/link';
import Layout from '../components/layout';
import { Site } from '../lib/site';
import SiteMap from '../public/sitemap.json';

function traverseMap(head: Site, cwd = '', depth = 0) {
    if (head.subpages === undefined)
        return [];
    let elements = [];
    for (const [slug, info] of Object.entries(head.subpages)) {
        const path = `${cwd}/${slug}`;
        const children = (<><ul> {traverseMap(info, path, depth + 1)}</ul></>);
        elements.push(<>
            <li>
                <Link className='button' href={path}>{info.title}</Link> {children}
            </li>
        </>);
    }
    return elements;
}

function SiteMapPage() {


    return <Layout>
        <ul>{traverseMap(SiteMap)}</ul>
    </Layout>;
}

export default SiteMapPage;

