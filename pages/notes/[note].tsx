import Layout from '../../components/layout';
import ReactMarkdown from 'react-markdown';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { monokaiSublime as hlTheme } from 'react-syntax-highlighter/dist/cjs/styles/hljs';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';

import readMarkdown from '../../lib/read-markdown';
import NotesInfo from '../../public/notes.json';

interface Note {
    title: string,
    mtime: string,
}

interface Notes {
    [slug: string]: Note;
}

function Markdown({ content }: any) {
    return <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeRaw]}
        components={{
            code({ node, className, children, ...props }) {
                const match = /language-(\w+)/.exec(className || '')
                return match
                    ? (
                        <SyntaxHighlighter
                            showLineNumbers={true}
                            language={match[1]}
                            //@ts-ignore
                            style={hlTheme}
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
    >{content}</ReactMarkdown>
}

function Note({ note }: any) {
    return (<>
        <Layout >
            <section className='block'>
                <Markdown content={note.content} />
            </section>
        </Layout>
    </>
    );
}

export async function getStaticProps({ params }: any) {
    const note: string = params.note;
    const notesInfo: Notes = NotesInfo;
    const noteInfo: Note = notesInfo[note];

    return {
        props: {
            note: {
                ...noteInfo,
                content: await readMarkdown('notes', note, true)
            }
        }
    }
}

export async function getStaticPaths() {
    return {
        paths: Object.keys(NotesInfo).map((note: string) => {
            return {
                params: {
                    note
                }
            }
        }),
        fallback: false
    };
}


export default Note;
