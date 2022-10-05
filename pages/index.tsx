import React from 'react';
import Link from 'next/link';
import Layout from '../components/layout';
import QuickLinks from '../components/quick-links';
import RecentNotes from '../components/recent-notes';
import RecentPosts from '../components/recent-posts';
import { getNotesMeta, getPostsMeta, INoteMeta, IPostMeta } from '../lib/slug';

function Nav() {
    const nav = {'Posts': '/posts', 'Notes': '/notes', 'About': '/about', };
    return (
        <div className='block' style={{textAlign: 'center'}}>
            {
                Object.entries(nav).map(([k, v]) => {
                    return <Link href={v}> 
                        <a className='button green'>{k}</a>
                    </Link>       
                })
            }
        </div>
    )
}

function HomePage({ postsMeta, notesMeta }: { postsMeta: IPostMeta[], notesMeta: INoteMeta[] }) {
    return (
        <Layout name='' title='PaulW.XYZ'>
            <Nav />
            <QuickLinks />
            <RecentNotes notesMeta={notesMeta} />
            <RecentPosts postsMeta={postsMeta} />
        </Layout>
    )
}

export async function getStaticProps() {
    return {
        props: { postsMeta: getPostsMeta(), notesMeta: getNotesMeta() }
    };
}

export default HomePage;