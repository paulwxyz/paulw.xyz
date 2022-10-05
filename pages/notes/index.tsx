import Link from 'next/link';
import Layout from '../../components/layout';
import date from '../../lib/date';
import { getNotesMeta, INoteMeta } from '../../lib/slug';

function NotesPage({ notesMeta }: { notesMeta: INoteMeta[] }) {
    return (
        <Layout name='Notes'>
            <table>
                <tbody>
                {notesMeta && notesMeta.map((note: INoteMeta, i) => {
                    return (
                    <tr key={i}>
                        <td style={{flex: '1 0 50%'}}>
                            <Link href={`/notes/${note.slug}`}>
                                {note.title}
                            </Link>
                        </td>
                        <td style={{fontStyle: 'italic'}}>
                            {note.last_updated && date.toRelativeDate(new Date(note.last_updated))}
                        </td>
                    </tr>
                )})}
                </tbody>
            </table>
        </Layout>
    )
}

export async function getStaticProps() {
    return {
        props: { notesMeta: getNotesMeta() }
    };
}

export default NotesPage;