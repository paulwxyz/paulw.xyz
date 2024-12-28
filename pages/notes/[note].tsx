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

import Layout from '../../components/layout';
import readMarkdown from '../../lib/read-markdown';
import { toLocaleString } from '../../lib/date';
import NotesInfo from '../../public/notes.json';

import style from '../../styles/note.module.css';
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

function Note({ note }: { note: Note }) {
	return (<>
		<Layout >
			<span className={style['last-updated']}>
				Last updated: {toLocaleString(note.mtime)}
			</span>
			<section className='block'>
				<Markdown content={note.content} />
			</section>
		</Layout>
	</>
	);
}

export async function getStaticProps({ params }: { params: { note: string } }) {
	const note: string = params.note;
	const notesInfo: Notes = NotesInfo;
	const noteInfo: Note = notesInfo[note];

	return {
		props: {
			note: {
				...noteInfo,
				content: await readMarkdown('notes', note, true)
			}
		}
	}
}

export async function getStaticPaths() {
	return {
		paths: Object.keys(NotesInfo).map((note: string) => {
			return {
				params: {
					note
				}
			}
		}),
		fallback: false
	};
}

export default Note;
