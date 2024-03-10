import Link from "next/link";
import NotesInfo from '../public/notes.json';

function RecentNotes() {
    const notes = Object.entries(NotesInfo).reverse();
    return (
    <div className='block'>
            <h2>Recent Notes</h2>
        <ul>
            {notes?.slice(0, 5)
                .map(([slug, note]: any, i: number) => {
                    return (
                        <li 
                            key={i}
                        >
                            <Link
                            href={`/notes/${slug}`}>
                            {note.title}
                        </Link>
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
