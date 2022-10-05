interface IPost { 
    slug: string;
    rawslug: string;
    content: string;
    title: string;
}

interface INote { 
    slug: string;
    rawslug: string;
    content: string;
    title: string;
}

interface INoteMeta {
    title: string;
    slug: string;
    last_updated?: string;
}

interface IPostMeta {
    title: string;
    slug: string;
    created_at: string;
    last_updated?: string;
}

export function getAllPosts(filter?: Array<any>): IPost[];
export function getAllNotes(filter?: Array<any>): INote[];

export function getPost(rawslug: string, filter?: Array<any>): IPost;
export function getNote(rawslug: string, filter?: Array<any>): INote;

export function getPostsMeta(): IPostMeta[];
export function getNotesMeta(): INoteMeta[];