import Link from 'next/link';

import Layout from '../../components/layout';
import { toRelativeDate } from '../../lib/date';

import NotesInfo from '../../public/notes.json';

function NoteEntry({ note }: { note: { title: string, mtime: string, slug: string } }) {
    return (
        <tr>
            <td style={{ flex: '1 0 50%' }}>
                <Link href={`/notes/${note.slug}`}>
                    {note.title}
                </Link>
            </td>
            <td style={{ fontStyle: 'italic' }}>
                {note.mtime && toRelativeDate(note.mtime)}
            </td>
        </tr>
    );
}

function NotesPage() {
    const notes = Object.entries(NotesInfo)
        .map(([slug, note]) => {
            return {
                slug,
                title: note.title,
                mtime: new Date(note.mtime)
            }
        })
        .sort(
            (a, b) => {
                return b.mtime.getTime() - a.mtime.getTime();
            }
        );

    return (
        <Layout>
            {
                !notes || notes.length === 0
                && <>No notes found</>
                || <table>
                    <tbody>
                        {notes.map(
                            (note: any, i: number) => {
                                return (<NoteEntry note={note} key={i} />);
                            }
                        )}
                    </tbody>
                </table>
            }
        </Layout>
    )
}


export default NotesPage;
