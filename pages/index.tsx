import Link from 'next/link';
import React from 'react';
import Layout from '../components/layout';
import Pages from '../public/pages.json';
import style from '../styles/home.module.css';
import prettyDatePrint from '../util/pretty-date';
import { getPostsMeta, PostMeta } from '../util/slug';

function HomePage(props: { postsMeta: PostMeta[] }) {
    props.postsMeta.sort((x, y) => { return (x.title).localeCompare(y.title) });
    return (
        <Layout name='' title='PaulW.XYZ'>
            <section className='block'>
                <div className='h2'>Welcome!</div>
                {
                    Pages.map(obj => {
                        return <span key={obj.link}>
                            <Link href={obj.link}>
                                {
                                    obj.link.match(/^http/)
                                        ? <a className={`button blue ${style.button} ${style.blueButton}`}>{obj.title}</a>
                                        : <a className={`${style.button} button`}>{obj.title}</a>
                                }
                            </Link>
                        </span>
                    })
                }
            </section>
            <section className='block'>
                <table style={{ width: '100%' }}>
                    <th className='h2'>Posts</th> <th>Posted</th>
                    {props.postsMeta?.map((post: any) => {
                        return <tr key={post.slug}>
                            <td className='h5'>
                                <Link href={`posts/${post.slug}`}>
                                    {post.title}
                                </Link>
                            </td>
                            <td>{prettyDatePrint(new Date(post.created_at))}</td>

                        </tr>
                    })}
                </table>
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