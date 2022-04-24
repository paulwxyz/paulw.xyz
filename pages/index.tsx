import Link from 'next/link';
import React from 'react';
import Layout from '../components/layout';
import Pages from '../public/pages.json';
import Posts from '../public/posts.json';
import style from '../styles/home.module.css';
import prettyDatePrint from '../util/pretty-date';

function HomePage({ posts }: any) {
    Pages.sort((x, y) => { return (x.title).localeCompare(y.title) });
    return (
        <Layout name='' title='PaulW.XYZ'>
            <section className='block'>
                <div className='h2'>Welcome!</div>
                {
                    Pages.map(obj => {
                        return <span key={obj.link}>
                            <Link href={obj.link}>
                                <a className={style.button}>{obj.title}</a>
                            </Link>
                        </span>
                    })
                }
            </section>
            <section className='block'>
                <table style={{ width: '100%' }}>
                    <th className='h2'>Posts</th> <th>Posted</th>
                    {Posts?.map((post: any) => {
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

export default HomePage;