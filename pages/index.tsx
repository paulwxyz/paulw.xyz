import React from 'react';
import Layout from '../components/layout';
import QuickLinks from '../components/quick-links';
import RecentPosts from '../components/recent-posts';
import { getPostsMeta, PostMeta } from '../util/slug';

function HomePage({ postsMeta }: { postsMeta: PostMeta[] }) {
    return (
        <Layout name='' title='PaulW.XYZ'>
            <section className='block'>
                <QuickLinks />
            </section>
            <section className='block'>
                <RecentPosts postsMeta={postsMeta} />
            </section>
        </Layout>
    )
}

export async function getStaticProps() {
    return {
        props: { postsMeta: getPostsMeta() }
    };
}

export default HomePage;