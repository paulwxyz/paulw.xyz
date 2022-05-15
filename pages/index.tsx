import React from 'react';
import Layout from '../components/layout';
import QuickLinks from '../components/quick-links';
import RecentNotes from '../components/recent-notes';
import RecentPosts from '../components/recent-posts';
import { getNotesMeta, getPostsMeta, NoteMeta, PostMeta } from '../util/slug';

function HomePage({ postsMeta, notesMeta }: { postsMeta: PostMeta[], notesMeta: NoteMeta[] }) {
    return (
        <Layout name='' title='PaulW.XYZ'>
            <QuickLinks />
            <RecentPosts postsMeta={postsMeta} />
            <RecentNotes notesMeta={notesMeta} />
        </Layout>
    )
}

export async function getStaticProps() {
    return {
        props: { postsMeta: getPostsMeta(), notesMeta: getNotesMeta() }
    };
}

export default HomePage;