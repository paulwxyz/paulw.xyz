import React from 'react';
import Link from 'next/link';
import Layout from '../components/layout';
import QuickLinks from '../components/quick-links';
import RecentNotes from '../components/recent-notes';
import RecentPosts from '../components/recent-posts';
import RootInfo from '../public/home.json';

function Nav() {
    const nav = RootInfo;
    return (
        <div className='block' style={{ textAlign: 'center' }}>
            {
                Object.entries(nav).map(([slug, info], i) => {
                    return <Link key={i} href={slug} className='button green'>{info.title}</Link>
                })
            }
        </div>
    )
}

function HomePage() {
    return (
        <Layout>
            <Nav />
            <QuickLinks />
            <RecentNotes />
            <RecentPosts />
        </Layout>
    )
}

export default HomePage;
