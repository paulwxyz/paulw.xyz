import React from 'react';
import Layout from '../components/layout';
import QuickLinks from '../components/quick-links';
import RecentNotes from '../components/recent-notes';
import RecentPosts from '../components/recent-posts';
import { getNotesMeta, getPostsMeta, NoteMeta, PostMeta } from '../util/slug';

function HomePage({ postsMeta, notesMeta }: { postsMeta: PostMeta[], notesMeta: NoteMeta[] }) {
    return (
        <Layout name='' title='PaulW.XYZ'>
            <section className='block'>
                <QuickLinks />
            </section>
            <section className='block'>
                <RecentPosts postsMeta={postsMeta} />
            </section>
            <section className='block'>
                <RecentNotes notesMeta={notesMeta} />
            </section>
        </Layout>
    )
}

export async function getStaticProps() {
    return {
        props: { postsMeta: getPostsMeta(), notesMeta: getNotesMeta() }
    };
}

export default HomePage;