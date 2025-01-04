const path = require('path')
const fs = require('fs/promises')

const gitRef = process.env.WWW_GIT_REF ?? 'master'

async function readFirstLines(filePath, lineCount = 1) {
    const gitFileFetch = await fetch(`https://git.paulw.xyz/api/v1/repos/lambdapaul/www/raw/${filePath}?ref=${gitRef}`)
    if (!gitFileFetch.ok) return null
    const file = await gitFileFetch.text()
    const lines = file.split('\n')
    const out = []
    for (let i = 0; i < lineCount && i < lines.length; i++) {
        out.push(lines[i])
    }
    return out
}

async function getTitle(filePath) {
    const firstLines = await readFirstLines(filePath)
    if (firstLines === null || firstLines === undefined || firstLines.length === 0) return null
    let title = firstLines[0]

    if (title.substring(0, 2) !== '# ') return null
    title = title
        .substring(1, firstLines[0].length)
        .trim()
    if (title.length < 3)
        return null
    return title
}

async function getMarkdownMetadata(dir) {
    const dirGitInfoFetch = await fetch(`https://git.paulw.xyz/api/v1/repos/lambdapaul/www/contents/${dir}/?ref=${gitRef}`)
    if (!dirGitInfoFetch.ok) return {}

    const commits = {}
    const out = {}

    const dirGitInfo = await dirGitInfoFetch.json()
    for (const file of dirGitInfo) {
        if (file.name.startsWith('.') || !file.name.endsWith('.md')) continue
        const title = await getTitle(file.path)
        if (title === null) continue

        const slug = file.name.replace(/\.md$/, '')
        let mtime = new Date(); // better to have an incorrect recent date than the more incorrect unix time 0 (assuming the host doesn't have messed up clock)


        if (!(file.last_commit_sha in commits)) {
            const lastCommitSha = await fetch(`https://git.paulw.xyz/api/v1/repos/lambdapaul/www/git/commits/${file.last_commit_sha}`)
            if (lastCommitSha.ok) {
                const commitJson = await lastCommitSha.json()
                commits[commitJson.sha] = (new Date(commitJson.created))
            }
        }

        mtime = commits[file.last_commit_sha]

        out[slug] = {
            title: title,
            mtime: mtime.toISOString(),
        }
    }
    return out
}

async function readFilesMetadata(dir) {
    const filePath = jsonFilePath(dir)
    try {
        const fileContent = await fs.readFile(filePath, 'utf-8')
        const metadata = JSON.parse(fileContent)
        return metadata
    } catch {
        return []
    }
}

async function writeFilesMetadata(filePath, metadata) {
    try {
        await fs.writeFile(filePath, JSON.stringify(metadata, null, 4), 'utf-8')
    } catch (error) {
        console.error(error)
    }
}

function jsonFilePath(dir) {
    return path.join(process.cwd(), 'public', `${dir}.json`); // ehh
}

async function generateNotesMetadata() {
    const dir = 'notes'
    await writeFilesMetadata(jsonFilePath(dir), await getMarkdownMetadata(dir))
}

async function generatePostsMetadata() {
    const dir = 'posts'
    const currMetadata = await readFilesMetadata(dir)
    const generatedMetadata = await getMarkdownMetadata(dir)
    const newMetadata = {}

    for (const [name, data] of Object.entries(generatedMetadata)) {
        let otime = new Date()
        if (currMetadata[name]?.otime !== undefined && currMetadata[name]?.otime !== null)
            otime = currMetadata[name].otime ?? otime
        else
            otime = data.mtime ?? otime

        newMetadata[name] = { ...data, otime }
    }
    await writeFilesMetadata(jsonFilePath(dir), newMetadata)
}

async function generateSiteMap() {
    await generateNotesMetadata()
    await generatePostsMetadata()

    const sitemap = {
        title: 'PaulW.XYZ',
        pages: await readFilesMetadata('home')
    }

    const pages = ['posts', 'notes']
    for (const page of pages) {
        sitemap.pages[page].pages = await readFilesMetadata(page)
    }

    await writeFilesMetadata(jsonFilePath('sitemap'), sitemap)
}

generateSiteMap()
