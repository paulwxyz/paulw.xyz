const fs = require('fs/promises');
const { createReadStream, write } = require('fs');
const path = require('path');
const readline = require('readline/promises');
const { info } = require('console');

async function readFirstLines(filePath, lineCount = 1) {
    return new Promise((resolve, reject) => {
        try {
            const stream = createReadStream(filePath, 'utf-8');
            const rl = readline.createInterface({ input: stream });
            let counter = 0;
            const lines = [];
            rl.on('line', (line) => {
                counter++;
                lines.push(line);
                if (counter >= lineCount) {
                    rl.close();
                    rl.removeAllListeners();
                }
            });
            rl.on('close', () => {
                resolve(lines)
            });
        } catch (e) {
            reject(e)
        }
    });
}

async function getTitle(filePath) {
    const firstLines = await readFirstLines(filePath);
    if (firstLines === undefined || firstLines.length === 0)
        return null;
    let title = firstLines[0];
    if (title.substring(0, 2) !== '# ')
        return null;
    title = title
        .substring(1, firstLines[0].length)
        .trim();
    if (title.length < 3)
        return null;
    return title;
}

async function getMarkdownMetadata(dir) {
    const dirPath = path.join(process.cwd(), dir);
    const files = (await fs.readdir(dirPath, 'utf-8'))
        .filter((file) => {
            return /^[^.].*.md$/.test(file);
        })


    const out = {};
    for (const file of files) {
        const filePath = path.join(dirPath, file);
        const title = await getTitle(filePath);
        if (title === null)
            continue;

        const slug = file.replace(/\.md$/, '');
        // const pagePath = path.join('/', dir, slug);
        out[slug] = {
            title: title,
            // path: pagePath,
            mtime: (await fs.stat(filePath)).mtime,

        };
    }
    return out;
}

async function readFilesMetadata(dir) {
    const filePath = jsonFilePath(dir);
    try {
        const fileContent = await fs.readFile(filePath, 'utf-8');
        const metadata = JSON.parse(fileContent);
        return metadata;
    } catch {
        return [];
    }
}

async function writeFilesMetadata(filePath, metadata) {
    try {
        await fs.writeFile(filePath, JSON.stringify(metadata), 'utf-8');
    } catch (error) {
        console.error(error);
    }
}

function jsonFilePath(dir) {
    return path.join(process.cwd(), 'public', `${dir}.json`);
}

async function generateNotesMetadata() {
    const dir = 'notes';
    await writeFilesMetadata(jsonFilePath(dir), await getMarkdownMetadata(dir));
}

async function generatePostsMetadata() {
    const dir = 'posts';
    const currMetadata = await readFilesMetadata(dir);
    const generatedMetadata = await getMarkdownMetadata(dir);
    const newMetadata = {};

    for (const [name, data] of Object.entries(generatedMetadata)) {
        let otime;
        if (currMetadata[name] !== undefined && currMetadata[name].otime !== undefined)
            otime = currMetadata[name].otime
        else
            otime = data.mtime;

        newMetadata[name] = { ...data, otime }
    }
    await writeFilesMetadata(jsonFilePath(dir), newMetadata);
}

async function generateSiteMap() {
    await generateNotesMetadata();
    await generatePostsMetadata();

    const sitemap = {
        title: 'PaulW.XYZ',
        subpages: await readFilesMetadata('home')
    };

    const pages = ['posts', 'notes'];
    for (const page of pages) {
        sitemap.subpages[page].subpages = await readFilesMetadata(page);
    }

    await writeFilesMetadata(jsonFilePath('sitemap'), sitemap);
}

generateSiteMap();
