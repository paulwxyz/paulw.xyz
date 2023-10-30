import Link from "next/link";
import date from "../lib/date";
import style from '../styles/recent-posts.module.css';
import PostsInfo from '../public/posts.json';

function RecentPosts() {
    const posts = Object.entries(PostsInfo);
    if (!posts.length)
        return <></>;
    return (
        <div className='block'>
            <div className='h2'>Recent Posts</div>
            <div className={style.container}>
                {posts?.slice(0, 10)
                    .map(([slug, post]: any) => {
                        return <div className={style.block} key={post.slug}>
                            <span className={style.postDate}>
                                {date.toRelativeDate(new Date(post.otime))}
                            </span>
                            <div className={style.postTitle}>
                                <Link href={`/posts/${slug}`}>
                                    {post.title}
                                </Link>
                            </div>
                        </div>
                    })}
            </div>
            {
                posts.length > 10 &&
                <div className={style.more}>
                    <Link href='/posts' className='h5'>More...</Link>
                </div>
            }
        </div>
    );
}

export default RecentPosts;
