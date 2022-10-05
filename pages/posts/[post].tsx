import Layout from '../../components/layout';
import { getAllPosts, getPost } from '../../lib/slug';
import ReactMarkdown from 'react-markdown';
import style from '../../styles/post.module.css';

function Post({ post }: any) { // eh
    return (<>
        <Layout removeContainer={true} name={post.title} title={post.title} ancestors={[{ name: 'Posts', path: 'posts' }]}>
            {<div className={style.imageBlock} 
                style={{ backgroundImage: 
                    post.cover ? 
                        `url(/assets/images/${post.cover})` : 
                        'linear-gradient(to bottom right, #565a0f, #08432c 15%, rgb(5, 39, 10) 40%, rgb(0, 22, 46) 80%)'
                }}></div>}
            <div className={style.spacer}></div>
            <section className={`${style.block} block`}>
                <div className='container'>
                    <ReactMarkdown>{post.content}</ReactMarkdown>
                </div>
            </section>
        </Layout>

    </>
    );
}

export async function getStaticProps({ params }: any) {
    const post = getPost(params.post);

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
                    post: post.slug
                }
            }
        }),
        fallback: false
    };
}


export default Post;
