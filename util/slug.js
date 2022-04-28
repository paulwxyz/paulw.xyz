const fs = require('fs');
const matter = require('gray-matter');
const { join } = require('path');

const notesDir = join(process.cwd(), 'notes');
const postsDir = join(process.cwd(), 'posts');
const cacheDir = join(process.cwd(), '.cache');
const postsCacheFile = join(cacheDir, 'posts.meta.json');
const notesCacheFile = join(cacheDir, 'notes.meta.json');

function get(dir, rawslug, filter = []) {
    const slug = rawslug.replace(/\.md$/, '');
    const path = join(dir, `${slug}.md`);
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
            return get(postsDir, file, filter)
        })
        .sort((a, b) => {
            const dA = new Date(a['created_at']);
            const dB = new Date(b['created_at']);
            return dB - dA;
        });
}

function getAllNotes(filter = []) {
    const files = fs.readdirSync(notesDir);

    return files
        .filter(c => (!c.match(/^\.]/) && c.match(/\.md$/)))
        .map(file => {
            return get(notesDir, file, filter)
        })
        .sort((a, b) => {
            const dA = new Date(a['last_updated']);
            const dB = new Date(b['last_updated']);
            return dB - dA;
        });
}

function cachePostsMeta() { // public access cache
    const posts = getAllPosts(['title', 'slug', 'created_at', 'last_updated']);
    
    if (!fs.existsSync(cacheDir)) {
        fs.mkdirSync(cacheDir);
    }

    fs.writeFile(postsCacheFile, JSON.stringify(posts), (e) => {
        if (e)
            console.error(e);
    });
    return posts;
}

function cacheNotesMeta() { 
    const notes = getAllNotes(['title', 'slug', 'last_updated']);
    
    if (!fs.existsSync(cacheDir)) {
        fs.mkdirSync(cacheDir);
    }

    fs.writeFile(notesCacheFile, JSON.stringify(notes), (e) => {
        if (e)
            console.error(e);
    });
    return notes;
}

function getMetaFromFile(name) {
    try {
        const file = fs.readFileSync(name, 'utf-8');
        return JSON.parse(file);
    } catch (e) {
        if (name)
        return cachePostsMeta();
    }
}

function cache() {
    cachePostsMeta();
    cacheNotesMeta();
}

const getPostsMeta = () => {
    try {
        const file = fs.readFileSync(postsCacheFile, 'utf-8');
        return JSON.parse(file);
    } catch (e) {
        return cachePostsMeta();
    }
}; 

const getNotesMeta = () => {
    try {
        const file = fs.readFileSync(notesCacheFile, 'utf-8');
        return JSON.parse(file);
    } catch (e) {
        return cacheNotesMeta();
    }
}; 

const getPost = (s, f) => {return get(postsDir, s, f)};
const getNote = (s, f) => {return get(notesDir, s, f)};

module.exports = { 
    getAllPosts, 
    getAllNotes, 
    getPostsMeta, 
    getNotesMeta,
    getPost,
    getNote,
    cache 
};