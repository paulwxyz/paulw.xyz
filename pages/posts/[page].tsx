import Layout from '../../components/layout';
import { useRouter } from 'next/router';
import { getAllPosts, getPost } from '../../util/slug';
import ReactMarkdown from 'react-markdown';
import Image from 'next/image';
import style from '../../styles/post.module.css';

function Post({ post }: any) { // eh
    const router = useRouter();
    return (<>
        <Layout name={post.title} title={post.title} ancestors={[{ name: 'Posts', path: 'posts' }]}>
            <div className={style.imageBlock} style={{ backgroundImage: post.cover ? `url(/assets/images/${post.cover})` : '' }}>
                <div className={style.spacer}></div>
                <section className={`${style.block} block`}>
                    <ReactMarkdown>{post.content}</ReactMarkdown>
                </section>
                <div className={style.spacer}></div>
            </div>
        </Layout>
    </>
    );
}

export async function getStaticProps({ params }: any) {
    const post = getPost(params.page);

    return {
        props: { post }
    };
}

export async function getStaticPaths() {
    const posts = getAllPosts();
    return {
        paths: posts.map((post: any) => {
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
