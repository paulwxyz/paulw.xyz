import ReactMarkdown from 'react-markdown';
import { PluggableList } from 'unified';

import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';

import rehypeKatex from 'rehype-katex';
import rehypeRaw from 'rehype-raw';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypeHighlight from 'rehype-highlight';
import rehypeHighlightCodeLines, { type HighlightLinesOptions } from 'rehype-highlight-code-lines';

import readMarkdown from '../../lib/read-markdown';
import { toLocaleString } from '../../lib/date';
import NotesInfo from '../../../../public/notes.json';

import style from './note.module.css';
import 'highlight.js/styles/monokai-sublime.css';
import 'katex/dist/katex.min.css';

interface Note {
	title: string,
	mtime: string,
	content?: string,
}

interface Notes {
	[slug: string]: Note;
}

function Markdown({ content }: any) {
	const remarkPlugins: PluggableList = [
		remarkGfm,
		remarkMath,
	];
	const rehypePlugins: PluggableList = [
		rehypeSlug,
		rehypeAutolinkHeadings,
		rehypeRaw,
		rehypeHighlight,
		rehypeKatex,
	];
	return <ReactMarkdown remarkPlugins={remarkPlugins} rehypePlugins={rehypePlugins}>
		{content}
	</ReactMarkdown>
}

export default async function Note({params}: {params: { note: string}}) {
	const note = params.note
	const n = await getNotes(note)
	return (<>
			<span className={style['last-updated']}>
				Last updated: {toLocaleString(n.mtime)}
			</span>
			<section className='block'>
				<Markdown content={n.content} />
			</section>
	</>
	);
}

async function getNotes(name: string) {
	const notesInfo: Notes = NotesInfo;
	return {...notesInfo[name], content: await readMarkdown('notes', name, true)}
}