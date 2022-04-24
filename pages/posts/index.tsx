import Link from 'next/link';
import React from 'react';
import Layout from '../../components/layout';
import Posts from '../../public/posts.json';
import prettyDatePrint from '../../util/pretty-date';

function HomePage({posts}: any) {
    Posts.sort((x, y) => { return x.title.localeCompare(y.title) });
    // todo: create a table-like interface
    return (
        <Layout name='Posts'>
            <>
            <section className='h4 block'>
            Post Name <span style={{float: 'right', margin: 'auto 1rem'}}> Created on </span> <span style={{float: 'right', margin: 'auto 1rem'}}>Last Updated </span> 
            </section>
            {Posts.map((post: any) => {
                return <section key='' className='h5 block'>
                    <Link href={`posts/${post.slug}`}>
                        {post.title}
                    </Link>
                    <span className='h6' style={{float: 'right', margin: 'auto 1rem'}}>{prettyDatePrint(new Date(post.created_at))}</span>
                    {post.last_updated ? <span className='h6' style={{float: 'right', margin: 'auto 1rem'}}>{prettyDatePrint(new Date(post.last_updated))}</span> : ''}
                </section>
            })}
            </>
        </Layout>
    )
}

export default HomePage;