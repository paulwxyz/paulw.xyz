import Link from 'next/link';
import Layout from '../../components/layout';
import { getNotesMeta, NoteMeta } from '../../util/slug';

function NotesPage({ notesMeta }: { notesMeta: NoteMeta[] }) {
    return (
        <Layout name='Notes'>
            {notesMeta && notesMeta.map((note: NoteMeta, i) => {
                return <section key={i} className='h5 block'>
                    <Link href={`/notes/${note.slug}`}>
                        {note.title}
                    </Link>
                </section>
            })}
        </Layout>
    )
}

export async function getStaticProps() {
    return {
        props: { notesMeta: getNotesMeta() }
    };
}

export default NotesPage;