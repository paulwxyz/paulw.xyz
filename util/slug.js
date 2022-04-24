const fs = require('fs');
const matter = require('gray-matter');
const { join } = require('path');

const postsDirectory = join(process.cwd(), 'posts');

function getPost(rawslug, filter = []) {
    const slug = rawslug.replace(/\.md$/, '');
    const path = join(postsDirectory, `${slug}.md`);
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
    const files = fs.readdirSync(postsDirectory);

    return files
        .filter(c => !c.match(/^\./))
        .map(file => {
            return getPost(file, filter)
        });
}

module.exports = { getAllPosts, getPost };