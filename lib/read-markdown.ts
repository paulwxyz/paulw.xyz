import { readFile } from 'fs/promises';
import path from 'path';

export default async function readMarkdown(directory: string, slug: string, withoutTitle: boolean = false): Promise<string> {
    const content = await readFile(path.join(process.cwd(), directory, `${slug}.md`), 'utf-8');
    if (withoutTitle)
        return content.substring(content.indexOf('\n') + 1, content.length);
    return content;
}
