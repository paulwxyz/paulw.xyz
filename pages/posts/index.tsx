import Link from 'next/link';
import React from 'react';
import Layout from '../../components/layout';
import Pages from '../../public/pages.json';
import cachePostLinkData from '../../util/post-cache';


function HomePage({posts}: any) {
    Pages.sort((x, y) => { return ('' + x.title).localeCompare(y.title) });
    return (
        <Layout name='Posts'>
            {posts.map((post: any) => {
                return <section key='' className='h5 block'>
                    <Link href={`posts/${post.slug}`}>
                        {post.title}
                    </Link>
                    <div>[{ (new Date(post.last_updated)).toLocaleString()}]</div>
                </section>
            })}
        </Layout>
    )
}

export async function getStaticProps() {

    return {
        props: {posts: cachePostLinkData()}
    };
}

export default HomePage;