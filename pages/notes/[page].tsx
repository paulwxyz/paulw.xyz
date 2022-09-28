import Layout from '../../components/layout';
import { getAllNotes, getNote } from '../../util/slug';
import ReactMarkdown from 'react-markdown';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { monokaiSublime } from 'react-syntax-highlighter/dist/cjs/styles/hljs';
import remarkGfm from 'remark-gfm';

function Note({ note }: any) {
    return (<>
        <Layout name={note.title} title={note.title} ancestors={[{ name: 'Notes', path: 'notes' }]}>
            <section className='block'>
                <ReactMarkdown
                    remarkPlugins={[remarkGfm]}
                    components={{
                        code({ node, inline, className, children, ...props }) {
                            const match = /language-(\w+)/.exec(className || '')
                            return !inline && match
                                ? (
                                    <SyntaxHighlighter
                                        showLineNumbers={true}
                                        language={match[1]}
                                        //@ts-ignore
                                        style={monokaiSublime}
                                        PreTag='div'
                                        codeTagProps={{ style: { display: 'block' } }}
                                        customStyle={{ padding: '0', borderRadius: '1rem' }}
                                        {...props}
                                    >{String(children).replace(/\n$/, '')}</SyntaxHighlighter>
                                )
                                : <code className={className} {...props}>
                                    {children}
                                </code>
                        }
                    }}
                >{note.content}</ReactMarkdown>
            </section>
        </Layout>
    </>
    );
}

export async function getStaticProps({ params }: any) {
    const note = getNote(params.page);

    return {
        props: { note }
    };
}

export async function getStaticPaths() {
    const notes = getAllNotes();
    return {
        paths: notes.map((note: any) => {
            return {
                params: {
                    page: note.slug
                }
            }
        }),
        fallback: false
    };
}


export default Note;
