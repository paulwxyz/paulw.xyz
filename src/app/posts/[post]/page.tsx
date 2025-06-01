import ReactMarkdown from 'react-markdown';
import style from '../../styles/post.module.css';
import PostsInfo from '../../../../public/posts.json';
import readMarkdown from '../../lib/read-markdown';
import DateTool, { toLocaleString } from '../../lib/date';

interface IPost {
	title: string;
	mtime: string;
	otime?: string;
}

function TimeBlock({ mtime, otime }: { mtime: string, otime: string }) {
	const ampm = (h: number) => { if (h >= 12) return 'p.m.'; return 'a.m.'; };

	const mdate = new Date(mtime);
	const odate = new Date(otime);

	const format = (date: Date) => {
		const day = date.getDay();
		const ord = <sup>{DateTool.getOrdinalDaySuffix(date.getDay())}</sup>;
		const month = DateTool.getFullMonth(date.getMonth());
		const year = date.getFullYear();
		const hours = date.getHours() > 12 ? date.getHours() - 12 : date.getHours();
		const minPrefix = date.getMinutes() < 10 ? '0' : '';
		const minutes = date.getMinutes();
		const twelveSfx = ampm(date.getHours());
		return <>{day}{ord} {month} {year} at {hours}:{minPrefix}{minutes} {twelveSfx}</>
	};

	return (
		<div style={{ textAlign: 'right', fontSize: '16px', fontFamily: 'Cantarell', fontStyle: 'italic' }}>
			{
				mtime ?
					<div className='mtime' data-text={mdate.toISOString()}>
						Last updated: {format(mdate)}
					</div>
					:
					<></>
			}
			<div className='otime'>
				{format(odate)}
			</div>
		</div>
	);
}
// post: IPost & { content: string, cover?: string, otime: string, mtime?: string }
export default async function Post({ params }: {params: Promise<{post: string}>}) {
	const post = await getPost((await params).post);
	if (!post)
		return <></>;
	return (<>
			<div className='container'>
			   { post.otime !== post.mtime && post.mtime &&
				   <span className={style.time}>
				   Last updated: {toLocaleString(post.mtime)}
				   </span>
			   }
				<span className={style.time}>
					{toLocaleString(post.otime)}
				</span>
			</div>
			{<div className={style.imageBlock}
				style={{
					backgroundImage:
						post.cover ?
							`url(/assets/images/${post.cover})` :
							'linear-gradient(to bottom right, rgb(5, 51, 11), rgb(5, 45, 13) 15%, rgb(5, 39,15) 40%, rgb(0, 30, 16) 80%)'
				}}></div>}
			<div className={`${style.spacer} ${post.cover ? style.background : ''}`}></div>
			<section className={`${style.block} block`}>
				<div className='container'>
					<ReactMarkdown>{post.content}</ReactMarkdown>
				</div>
			</section>
			<div className={style.spacer}></div>

	</>
	);
}

async function getPost(n: string) {
	const postsInfo: Record<string, (IPost & { cover?: string, otime: string, mtime?: string })> = PostsInfo;
	return {...postsInfo[n], content: await readMarkdown('posts', n, true)};
}
