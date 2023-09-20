import Link from 'next/link';
import Layout from '../../components/layout';
import date from '../../lib/date';
import { getPostsMeta, IPostMeta } from '../../lib/slug';

function PostsPage({ postsMeta }: { postsMeta: IPostMeta[] }) {
    return ( 
        <Layout name='Posts'>
            <table>
                <tbody>
                {
                    postsMeta.length &&
                    postsMeta.map((post: IPostMeta, i) => {
                        return <tr key={i} style={{alignItems: 'center'}}>
                            <td style={{display: 'inline-block', textAlign: 'right', fontSize: '0.9rem'}}>
                                <div style={{fontStyle: 'italics', fontSize: '.8rem'}}>{
                                    post.last_updated && `updated ${date.toRelativeDate(new Date(post.last_updated))}`
                                }</div>
                                <div>{ date.toRelativeDate(new Date(post.created_at)) }</div>
                            </td>
                            <td style={{
                                flex: '1 1 60%', 
                                alignItems: 'center',
                                fontFamily: `'EB Garamond', 'Garamond', 'Times New Roman', Times, serif`}}>
                                <Link href={`/posts/${post.slug}`}  style={{textDecoration: 'none'}}>{post.title}</Link>
                            </td>
                        </tr>
                    }) || 
                    <div className='text center'>
                        <div>**crickets**</div>
                        <div>No posts found...</div>
                        <div><Link href='/' className='link button green back'>Go Home</Link></div>
                    </div>
                }
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
