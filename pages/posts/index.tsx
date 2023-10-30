import Link from 'next/link';
import Layout from '../../components/layout';
import date from '../../lib/date';
import PostsInfo from '../../public/posts.json';

function PostsPage() {
    return (
        <Layout>
            {Object.keys(PostsInfo).length && <Posts /> || <NoPosts />}
        </Layout>
    )
}

function NoPosts() {
    return (<><div className='text center'>
        <div>**crickets**</div>
        <div>No posts found...</div>
        <div><Link href='/' className='link button green back'>Go Home</Link></div>
    </div></>);
}

function Posts() {
    const posts = Object.entries(PostsInfo);
    return (
        <>
            <table>
                <tbody>
                    {
                        posts.map(([slug, post]: any, i: number) => {
                            return <tr key={i} style={{ alignItems: 'center' }}>
                                <td style={{ display: 'inline-block', textAlign: 'right', fontSize: '0.9rem' }}>
                                    <div style={{ fontStyle: 'italics', fontSize: '.8rem' }}>{
                                        post.mtime && `Updated ${date.toRelativeDate(new Date(post.mtime))}`
                                    }</div>
                                    <div>{date.toRelativeDate(new Date(post.otime))}</div>
                                </td>
                                <td style={{
                                    flex: '1 1 60%',
                                    alignItems: 'center',
                                    fontFamily: `'EB Garamond', 'Garamond', 'Times New Roman', Times, serif`
                                }}>
                                    <Link href={`/posts/${slug}`} style={{ textDecoration: 'none' }}>{post.title}</Link>
                                </td>
                            </tr>
                        })}
                </tbody>
            </table>
        </>
    )
}


export default PostsPage;
