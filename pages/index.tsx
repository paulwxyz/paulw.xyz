import Link from 'next/link';
import React from 'react';
import Layout from '../components/layout';
import Pages from '../public/pages.json';
import cachePostLinkData from '../util/post-cache';


function HomePage({posts}: any) {
    Pages.sort((x, y) => { return ('' + x.title).localeCompare(y.title) });
    return (
        <Layout name='' title='PaulW.XYZ'>
            <section className='block'>
                <div className='h2'>Welcome!</div>
                {
                    Pages.map(obj => {
                        return <div key='' className='h5'>
                            <Link href={obj.link}>
                                <a>{obj.title}{obj.link.match('^http*')? ' ↗' : ''}</a>
                            </Link>
                        </div>
                    })
                }
            </section>
            <section className='block'>
                <div className='h2'>Posts</div>
                <div>
                    {posts?.map((post: any) => {
                        return <div key={post.slug} className='h5'>
                            [{ (new Date(post.last_updated)).toLocaleString()}] <Link href={`posts/${post.slug}`}>
                                {post.title}
                            </Link>
                        </div>
                    })}
                </div>
            </section>
        </Layout>
    )
}

export async function getStaticProps() {
    // make this webpack plugin
    return {
        props: {posts: cachePostLinkData()} 
    };
}

export default HomePage;