interface Post { 
    slug?: string;
    rawslug?: string;
    content?: string;
    title?: string;
};

interface NoteMeta {
    title: string;
    slug: string;
    last_updated: string;
};

interface PostMeta {
    title: string;
    slug: string;
    created_at: string;
    last_updated: string;
};

export function getAllPosts(filter: Array<any> = []): Post[];
export function getAllNotes(filter: Array<any> = []): Note[];

export function getPost(rawslug: string, filter: Array<any> = []): Post;
export function getNote(rawslug: string, filter: Array<any> = []): Note;

export function getPostsMeta(): PostMeta[];
export function getNotesMeta(): NoteMeta[];