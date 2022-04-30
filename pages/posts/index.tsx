import Link from 'next/link';
import Layout from '../../components/layout';
import date from '../../util/date';
import { getPostsMeta, PostMeta } from '../../util/slug';

function PostsPage({ postsMeta }: { postsMeta: PostMeta[] }) {
    return ( 
        <Layout name='Posts'>
            <table  className='h5'>
                <thead>
                    <tr>
                        <th style={{flex: '1 0 30%'}}>Name</th>
                        <th>Created on</th>
                        <th>Last Updated</th>
                    </tr>
                </thead>
                <tbody>
                    {postsMeta.map((post: PostMeta, i) => {
                        return <tr key={i}>
                            <td style={{flex: '1 0 30%'}}>
                                <Link href={`/posts/${post.slug}`}>
                                    {post.title}
                                </Link>
                            </td>
                            <td>
                                {date.prettyPrint(new Date(post.created_at))}
                            </td>
                            <td>
                                {
                                    post.last_updated
                                    ? date.prettyPrint(new Date(post.last_updated))
                                    : '-'
                                }
                            </td>
                        </tr>
                    })}
                </tbody>
            </table>
        </Layout>
    )
}

export async function getStaticProps() {
    return {
        props: { postsMeta: getPostsMeta() }
    };
}

export default PostsPage;