import Link from 'next/link';
import Layout from '../../components/layout';
import date from '../../util/date';
import { getPostsMeta, PostMeta } from '../../util/slug';

function PostsPage({ postsMeta }: { postsMeta: PostMeta[] }) {
    // todo: create a table-like user interface
    return ( // wow this is horrible
        <Layout name='Posts'>
            <section className='h4 block'>
                Post Name
                <span style={{ float: 'right', margin: 'auto 1rem' }}> Created on </span>
                <span style={{ float: 'right', margin: 'auto 1rem' }}>Last Updated </span>
            </section>
            {postsMeta.map((post: PostMeta, i) => {
                return <section key={i} className='h5 block'>
                    <Link href={`/posts/${post.slug}`}>
                        {post.title}
                    </Link>
                    <span className='h6' style={{ float: 'right', margin: 'auto 1rem' }}>
                        {date.prettyPrint(new Date(post.created_at))}
                    </span>
                    {post.last_updated && <span className='h6' style={{ float: 'right', margin: 'auto 1rem' }}>
                        {date.prettyPrint(new Date(post.last_updated))}
                    </span>}
                </section>
            })}
        </Layout>
    )
}

export async function getStaticProps() {
    return {
        props: { postsMeta: getPostsMeta() }
    };
}

export default PostsPage;