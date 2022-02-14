import fs from 'fs'
import matter from 'gray-matter';
import { join } from 'path';

const postsDirectory = join(process.cwd(), 'posts');

export function getPost(rawslug: string, filter: Array<any> = []) {
    const slug = rawslug.replace(/\.md$/, '');
    const path = join(postsDirectory, `${slug}.md`);
    const file = fs.readFileSync(path, 'utf-8');
    const { data, content } = matter(file);

    if (data['last_updated'] === undefined)
        data['last_updated'] = data['created_at'];

    if (filter.length === 0)
        return { ...data, content, slug, rawslug };

    let post: { slug?: string, rawslug?: string, content?: string, title?: string } | any = {};
    for (const [_, entry] of filter.entries()) {
        if (entry === 'slug')
            post[entry] = slug;

        if (entry === 'rawslug')
            post[entry] = rawslug;

        if (entry === 'content')
            post[entry] = content;


            
        if (typeof data[entry] !== 'undefined') {
            post[entry] = data[entry]
        }
    }
    return post;
}

export function getAllPosts(filter: Array<any> = []) {
    const files = fs.readdirSync(postsDirectory);

    return files.map(file => { return getPost(file, filter) });
}