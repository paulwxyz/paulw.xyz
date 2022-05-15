import Link from "next/link";
import { NoteMeta } from "../util/slug";

function RecentNotes({ notesMeta }: { notesMeta: NoteMeta[] }) {
    return (
        <div className='block'>
            <div className='h2'>Recent Notes</div>
            {notesMeta?.slice(0, 10)
                .map((note: any) => {
                    return <Link key={note.slug} href={`/notes/${note.slug}`}>
                        <a className={`button link`}>{note.title}</a>
                    </Link>
                })
            }
            {
                notesMeta.length > 10 &&
                <div className={''}>
                    <Link href='/notes'>
                        <a className='h5'>More...</a>
                    </Link>
                </div>
            }
        </div>
    );
}

export default RecentNotes;