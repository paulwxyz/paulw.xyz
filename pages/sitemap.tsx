import Link from 'next/link';
import Layout from '../components/layout';
import { Sites } from '../lib/site';
import SiteMap from '../public/sitemap.json';

function Desc(props: any) {
	return (
		<dl style={props.style}>
			<dt>{props.term}</dt>
			<dd>{props.details}</dd>
			{props.children}
		</dl>
	);
}

function traverseMap(head?: Sites, cwd = '', depth = 0) {
	if (!head) return [];
	let elements = [];
	for (const [slug, site] of Object.entries(head)) {
		if (slug === 'sitemap')
			continue;

		let details;
		let list;

		const path = `${cwd}/${slug}`;
		details = <Link href={path}>paulw.xyz{path}</Link>;
		list = traverseMap(site.pages, path, depth + 1);

		elements.push(<Desc style={{marginLeft: '3rem'}} key={site.title} term={site.title} details={details}>{list}</Desc>)
	}
	return elements;
}

function SiteMapPage() {
	return <Layout>
		{traverseMap(SiteMap.pages)}
	</Layout>;
}

export default SiteMapPage;

