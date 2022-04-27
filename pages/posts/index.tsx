import Link from 'next/link';
import React from 'react';
import Layout from '../../components/layout';
import prettyDatePrint from '../../util/pretty-date';
import { getPostsMeta, PostMeta } from '../../util/slug';

function HomePage(props: {postsMeta: PostMeta[]}) {
    props.postsMeta.sort((x: any, y: any) => { return (x as any).title.localeCompare((y as any).title) });
    // todo: create a table-like user interface
    return (
        <Layout name='Posts'>
            <>
            <section className='h4 block'>
            Post Name <span style={{float: 'right', margin: 'auto 1rem'}}> Created on </span> <span style={{float: 'right', margin: 'auto 1rem'}}>Last Updated </span> 
            </section>
            {props.postsMeta.map((post: any) => {
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

export async function getServerSideProps() {
    return {
        props: { postsMeta: getPostsMeta() }
    };
}

export default HomePage;