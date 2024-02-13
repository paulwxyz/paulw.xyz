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
        const children = (<><dl style={{marginLeft: '3rem'}}> {traverseMap(info, path, depth + 1)}</dl></>);
        elements.push(<>
            <>
                <dt>{info.title}</dt>
                <dd><Link href={path}>{path}</Link></dd>
                 {children}
            </>
        </>);
    }
    return elements;
}

function SiteMapPage() {


    return <Layout>
        <dl>{traverseMap(SiteMap)}</dl>
    </Layout>;
}

export default SiteMapPage;

