import Link from "next/link";
import { toRelativeDate } from "../lib/date";
import style from '../styles/recent-posts.module.css';
import PostsInfo from '../public/posts.json';

function PostBlock({ slug, otime, title }: { slug: string, otime: string, title: string }) {
	return (
		<div className={style.block}>
			<span className={style.postDate}>
				{toRelativeDate(new Date(otime))}
			</span>
			<div className={style.postTitle}>
				<Link href={`/posts/${slug}`}>
					{title}
				</Link>
			</div>
		</div>
	);
}

function RecentPosts() {
	const posts = Object.entries(PostsInfo).reverse();
	if (!posts.length)
		return <></>;
	return (
		<div className='block'>
			<h2>Recent Posts</h2>
			<div className={style.container}>
				{posts?.slice(0, 10)
					.map(([slug, post]: any, i: number) => {
						return (
							<PostBlock
								key={slug}
								slug={slug}
								title={post.title}
								otime={post.otime} />
						);
					})}
			</div>
			{
				posts.length > 10 &&
				<div className={style.more}>
					<Link href='/posts' >More...</Link>
				</div>
			}
		</div>
	);
}

export default RecentPosts;
