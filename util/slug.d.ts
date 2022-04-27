interface Post { 
    slug?: string;
    rawslug?: string;
    content?: string;
    title?: string;
};

interface PostMeta {
    title: string;
    slug: string;
    created_at: string;
    last_updated: string;
};

export function getAllPosts(filter: Array<any> = []): Post[];
export function getPost(rawslug: string, filter: Array<any> = []): Post;
export function getPostsMeta(): PostMeta[];