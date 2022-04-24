interface Post { slug?: string, rawslug?: string, content?: string, title?: string };

export function getAllPosts(filter: Array<any> = []): Post[];
export function getPost(rawslug: string, filter: Array<any> = []): Post;