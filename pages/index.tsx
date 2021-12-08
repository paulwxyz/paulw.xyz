import Link from 'next/link';
import React from 'react';
import Layout from '../components/layout';
import Pages from '../public/pages.json';

// import { GetStaticProps } from 'next';

function HomePage() {
    return (
        <Layout name='' title='PaulW.XYZ'>
            <section className='block' style={{ textAlign: 'center' }}>
                <div className='h2'>Welcome to my website!</div>                {
                    Pages.map(obj => {
                        return <div key='' className='h3'>
                            <Link href={obj.link}>
                                <a>{obj.title}</a>
                            </Link>
                        </div>
                    })
                }
            </section>
        </Layout>
    )
}

export default HomePage;

// export async function getStaticProps(context): GetStaticProps {

// }