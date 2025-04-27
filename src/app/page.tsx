import React from 'react';
import Link from 'next/link';
import QuickLinks from './components/quick-links';
import RecentNotes from './components/recent-notes';
import RecentPosts from './components/recent-posts';
import RootInfo from '../../public/home.json';

function Nav() {
	const nav = Object.entries(RootInfo);
	return (
		<div className='block'>
			<h2>Navigation</h2>
			{
				nav.map(([slug, info]) => {
					return <Link key={slug} href={slug} className='button green'>{info.title}</Link>
				})
			}
		</div>
	)
}

function HomePage() {
	return (
		<>
			<QuickLinks />
			<RecentPosts />
			<RecentNotes />
			<Nav />
		</>
	)
}

export default HomePage;
