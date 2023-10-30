import Link from "next/link";
import NotesInfo from '../public/notes.json';

function RecentNotes() {
    const notes = Object.entries(NotesInfo);
    return (
        <div className='block'>
            <div className='h2'>Recent Notes</div>
            {notes?.slice(0, 10)
                .map(([slug, note]: any) => {
                    return <Link key={slug} href={`/notes/${slug}`} className={`button link`}>{note.title}</Link>
                })
            }
            {
                notes.length > 10 &&
                <div>
                    <Link href='/notes' className='h5'>More...</Link>
                </div>
            }
        </div>
    );
}

export default RecentNotes;
