import Link from "next/link";
import date from "../util/date";
import { PostMeta } from "../util/slug";
import style from '../styles/recent-posts.module.css';

function RecentPosts({ postsMeta }: { postsMeta: PostMeta[] }) {
    return (<>
        <div className='h2'>Recent Posts</div>
        <div className={style.container}>
            {postsMeta?.slice(0, 10)
                .map((post: any) => {
                    return <div className={style.block} key={post.slug}>
                        <Link href={`/posts/${post.slug}`}>
                            <a className={`${style.postTitle} h5`}>{post.title}</a>
                        </Link>
                        <span className={style.postDate}>
                            {date.prettyPrint(new Date(post.created_at))}
                        </span>
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
    </>
    );
}

export default RecentPosts;