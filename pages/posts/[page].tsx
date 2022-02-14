import Layout from '../../components/layout';
import { useRouter } from 'next/router';
import { getAllPosts, getPost } from '../../lib/slug';
import ReactMarkdown from 'react-markdown';
import Image from 'next/image';

function Post({post} : any) { // eh
    const router = useRouter();
    return (
        <Layout name={post.title} title={post.title} ancestors={[{name:'Posts', path: 'posts'}]}>
            <section className='block'>
                {post.cover ? <Image width={640} height={360} layout="intrinsic" src={`/assets/images/${post.cover}`} alt={`${post.title} Cover Image`} /> : ''}
                <ReactMarkdown>{post.content}</ReactMarkdown>
            </section>
        </Layout>
    );
}

export async function getStaticProps({params}: any) {
    const post = getPost(params.page);

    return {
        props: {post}
    };
}

export async function getStaticPaths() {
    const posts = getAllPosts();
    return {
        paths: posts.map(post => {
            return {
                params: {
                    page: post.slug
                }
            }
        }),
        fallback: false
    };
}


export default Post;
