const fs = require('fs');
const matter = require('gray-matter');
const { join } = require('path');

const postsDir = join(process.cwd(), 'posts');

function getPost(rawslug, filter = []) {
    const slug = rawslug.replace(/\.md$/, '');
    const path = join(postsDir, `${slug}.md`);
    const file = fs.readFileSync(path, 'utf-8');
    const { data, content } = matter(file);

    if (data['last_updated'] === undefined)
        data['last_updated'] = data['created_at'];

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
        });
}


function cachePostsMeta() { // public access cache
    const posts = getAllPosts(['title', 'slug', 'created_at', 'last_updated']);
    fs.writeFile(join(postsDir, 'meta.json'), JSON.stringify(posts), (e) => {
        if (e)
            console.error(e);
    });
    return posts;
}

function getPostsMeta() {
    const file = fs.readFileSync(join(postsDir, 'meta.json'), 'utf-8');

    if (!file) {
        return cachePostsMeta();
    }

    return JSON.parse(file);
}

module.exports = { getAllPosts, getPost, getPostsMeta, cachePostsMeta };