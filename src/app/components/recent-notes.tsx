import Link from "next/link";
import NotesInfo from '../../../public/notes.json';

function RecentNotes() {
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
    <div className='block'>
            <h2>Recent Notes</h2>
        <ul>
            {notes?.slice(0, 5)
                .map(({slug, title, mtime}) => {
                    return (
                        <li key={slug} >
                            <Link href={`/notes/${slug}`}>{title}</Link>
                        </li>
                    );
                })
            }
            {
                notes.length > 5 &&
                    <Link href='/notes'>More...</Link>
            }
        </ul>
    </div>
    );
}

export default RecentNotes;
