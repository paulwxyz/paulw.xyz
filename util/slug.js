const fs = require('fs');
const matter = require('gray-matter');
const { join } = require('path');

const postsDir = join(process.cwd(), 'posts');
const cacheDir = join(process.cwd(), '.cache');

function getPost(rawslug, filter = []) {
    const slug = rawslug.replace(/\.md$/, '');
    const path = join(postsDir, `${slug}.md`);
    const file = fs.readFileSync(path, 'utf-8');
    const { data, content } = matter(file);

    if (data['last_updated'] === undefined)
        data['last_updated'] = '';

    if (filter.length === 0)
        return { ...data, content, slug, rawslug };

    let post = {};
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

function getAllPosts(filter = []) {
    const files = fs.readdirSync(postsDir);

    return files
        .filter(c => (!c.match(/^\.]/) && c.match(/\.md$/)))
        .map(file => {
            return getPost(file, filter)
        })
        .sort((a, b) => {
            const dA = new Date(a['created_at']);
            const dB = new Date(b['created_at']);
            return dB - dA;
        });
}

const postMetaCacheFile = join(cacheDir, 'posts.meta.json');

function cachePostsMeta() { // public access cache
    const posts = getAllPosts(['title', 'slug', 'created_at', 'last_updated']);
    
    if (!fs.existsSync(cacheDir)) {
        fs.mkdirSync(cacheDir);
    }

    fs.writeFile(postMetaCacheFile, JSON.stringify(posts), (e) => {
        if (e)
            console.error(e);
    });
    return posts;
}

function getPostsMeta() {
    try {
        const file = fs.readFileSync(postMetaCacheFile, 'utf-8');
        return JSON.parse(file);
    } catch (e) {
        return cachePostsMeta();
    }
}

function cache() {
    cachePostsMeta();
}

module.exports = { getAllPosts, getPost, getPostsMeta, cache };