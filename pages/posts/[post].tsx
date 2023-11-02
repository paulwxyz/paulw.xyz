import Layout from '../../components/layout';
import ReactMarkdown from 'react-markdown';
import style from '../../styles/post.module.css';
import PostsInfo from '../../public/posts.json';
import readMarkdown from '../../lib/read-markdown';

interface Post {
    title: string;
    mtime: string;
    otime?: string;
}

interface Posts {
    [slug: string]: Post
}

function Post({ post }: { post: Post & { content: string, cover?: string } }) {
    return (<>
        <Layout removeContainer={true}  >
            {<div className={style.imageBlock}
                style={{
                    backgroundImage:
                        post.cover ?
                            `url(/assets/images/${post.cover})` :
                            'linear-gradient(to bottom right, rgb(5, 51, 11), rgb(5, 45, 13) 15%, rgb(5, 39,15) 40%, rgb(0, 30, 16) 80%)'
                }}></div>}
            <div className={`${style.spacer} ${post.cover ? style.background : ''}`}></div>
            <section className={`${style.block} block`}>
                <div className='container'>
                    <ReactMarkdown>{post.content}</ReactMarkdown>
                </div>
            </section>
            <div className={style.spacer}></div>
        </Layout>

    </>
    );
}

export async function getStaticProps({ params }: any) {
    const postsInfo: Posts = PostsInfo;
    const post: Post = postsInfo[params.post];
    return {
        props: {
            post: {
                ...post,
                content: await readMarkdown('posts', params.post, true)
            }
        }
    }
}

export async function getStaticPaths() {
    return {
        paths: Object.keys(PostsInfo).map((post: string) => {
            return {
                params: {
                    post
                }
            }
        }),
        fallback: false
    };
}


export default Post;
