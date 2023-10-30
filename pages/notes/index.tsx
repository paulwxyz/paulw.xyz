import Link from 'next/link';
import Layout from '../../components/layout';

import date from '../../lib/date';
import NotesInfo from '../../public/notes.json';

function NoteEntry(props: { path: string, note: { title: string, mtime: string } }) {
    return (
        <tr>
            <td style={{ flex: '1 0 50%' }}>
                <Link href={props.path}>
                    {props.note.title}
                </Link>
            </td>
            <td style={{ fontStyle: 'italic' }}>
                {props.note.mtime && date.toRelativeDate(new Date(props.note.mtime))}
            </td>
        </tr>

    );
}

function NotesPage() {
    const notes = Object.entries(NotesInfo);

    return (
        <Layout>
            {!notes || notes.length === 0 && <>No notes found</> || <table>
                <tbody>
                    {notes.map(([slug, note]: any, i: number) => {
                        return <NoteEntry path={`/notes/${slug}`} note={note} key={i} />
                    })}
                </tbody>
            </table>}
        </Layout>
    )
}


export default NotesPage;
