import Layout from '../../components/layout';
import { getAllNotes, getNote } from '../../util/slug';
import ReactMarkdown from 'react-markdown';
import { Prism } from 'react-syntax-highlighter';
import dark from 'react-syntax-highlighter/dist/cjs/styles/prism/material-oceanic';
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
                            return !inline && match ? (
                                <Prism 
                                    language={match[1]}
                                    style={dark}
                                    PreTag='div'
                                    {...props}
                                >{String(children).replace(/\n$/, '')}</Prism>
                            ) : <code className={className} {...props}>
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
