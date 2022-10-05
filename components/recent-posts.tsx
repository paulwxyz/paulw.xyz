import Link from "next/link";
import date from "../lib/date";
import { IPostMeta } from "../lib/slug";
import style from '../styles/recent-posts.module.css';

function RecentPosts({ postsMeta }: { postsMeta: IPostMeta[] }) {
    if (!postsMeta.length)
        return <></>;
    return (
        <div className='block'>
            <div className='h2'>Recent Posts</div>
            <div className={style.container}>
                {postsMeta?.slice(0, 10)
                    .map((post: any) => {
                        return <div className={style.block} key={post.slug}>
                            <span className={style.postDate}>
                                {date.toRelativeDate(new Date(post.created_at))}
                            </span>
                            <div className={style.postTitle}>
                                <Link href={`/posts/${post.slug}`}>
                                    {post.title}
                                </Link>
                            </div>
                        </div>
                    })}
            </div>
            {
                postsMeta.length > 10 &&
                <div className={style.more}>
                    <Link href='/posts'>
                        <a className='h5'>More...</a>
                    </Link>
                </div>
            }
        </div>
    );
}

export default RecentPosts;