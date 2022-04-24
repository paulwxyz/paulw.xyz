const fs = require('fs');
const { getAllPosts } = require('./slug');
const { join } = require('path');

const publicDir = join(process.cwd(), 'public');

module.exports = {
    cachePostLinkData: () => {
        const posts = getAllPosts(['title', 'slug', 'created_at', 'last_updated']);
        fs.writeFile(`${publicDir}/posts.json`, JSON.stringify(posts), (e) => {
            if (e)
                console.error(e);
        });
        return posts;
    }
}