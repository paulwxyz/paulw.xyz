import Link from 'next/link';
import Layout from '../../components/layout';
import { getNotesMeta, NoteMeta } from '../../util/slug';

function NotesPage({ notesMeta }: { notesMeta: NoteMeta[] }) {
    return (
        <Layout name='Notes'>
            <div className='text center block'>
                {notesMeta && notesMeta.map((note: NoteMeta, i) => {
                    return <div key={i} className='h5'>
                        <Link href={`/notes/${note.slug}`}>
                            {note.title}
                        </Link>
                    </div>
                })}
            </div>
        </Layout>
    )
}

export async function getStaticProps() {
    return {
        props: { notesMeta: getNotesMeta() }
    };
}

export default NotesPage;