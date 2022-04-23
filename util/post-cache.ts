import fs from 'fs';
import { getAllPosts } from './slug';
import { join } from 'path';

const publicDir = join(process.cwd(), 'public');

export default function cachePostLinkData() {
    const posts = getAllPosts(['title', 'slug', 'last_updated']);
    fs.writeFile(`${publicDir}/posts.json`, JSON.stringify(posts), (e) => {
        if (e)
            console.error(e);
    });
    return posts;
}