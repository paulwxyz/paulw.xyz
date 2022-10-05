const fs = require('fs');
const matter = require('gray-matter');
const { join } = require('path');

const cacheDir = join(process.cwd(), '.cache');

function getDir(name) {
    return join(process.cwd(), name);
}

function getCacheFileName(name) {
    return join(cacheDir, `${name}.cache.json`)
}

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
    const files = fs.readdirSync(getDir('posts'));

    return files
        .filter(c => (!c.match(/^\.]/) && c.match(/\.md$/)))
        .map(file => {
            return get(getDir('posts'), file, filter)
        })
        .filter(c => (c.title && c.slug && c.created_at && (new Date(c.created_at)).toString() !== 'Invalid Date'))
        .sort((a, b) => {
            const dA = new Date(a['created_at']);
            const dB = new Date(b['created_at']);
            return dB - dA;
        });
}

function getAllNotes(filter = []) {
    const files = fs.readdirSync(getDir('notes'));

    return files
        .filter(c => (!c.match(/^\.]/) && c.match(/\.md$/)))
        .map(file => {
            return get(getDir('notes'), file, filter)
        })
        .filter(c => (c.title && c.slug && c.last_updated && (new Date(c.last_updated)).toString() !== 'Invalid Date'))
        .sort((a, b) => {
            const dA = new Date(a['last_updated']);
            const dB = new Date(b['last_updated']);
            return dB - dA;
        });
}

const cats = {
    notes: {
        name: 'notes',
        getAll: getAllNotes,
        filter: ['title', 'slug', 'last_updated'],
    },
    posts: {
        name: 'posts',
        getAll: getAllPosts,
        filter: ['title', 'slug', 'created_at', 'last_updated'],
    }
};

function cacheMeta({name, getAll, filter}) {
    const items = getAll(filter);
    
    if (!fs.existsSync(cacheDir)) {
        fs.mkdirSync(cacheDir);
    }

    fs.writeFile(getCacheFileName(name), JSON.stringify(items), (e) => {
        if (e)
            console.error(e);
    });
    return items;
}

function getMeta(cat) {
    try {
        const file = fs.readFileSync(getCacheFileName(cat.name), 'utf-8');
        return JSON.parse(file);
    } catch (e) {
        if (cat.name)
            return cacheMeta(cat);
    }
}

function getPostsMeta() {
    return getMeta(cats.posts);
}; 

function getNotesMeta() {
    return getMeta(cats.notes);
}; 

function cache() {
    Object.entries(cats).map(([_, v]) => {
        return cacheMeta(v);
    });
}

const getPost = (s, f) => {return get(getDir('posts'), s, f)};
const getNote = (s, f) => {return get(getDir('notes'), s, f)};

module.exports = { 
    getAllPosts, 
    getAllNotes, 
    getPostsMeta, 
    getNotesMeta,
    getPost,
    getNote,
    cache 
};