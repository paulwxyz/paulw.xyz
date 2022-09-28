import ReactMarkdown from 'react-markdown';
import Image from 'next/image';

import ReadmeMd from '../README.md';
import License from '../LICENSE.txt';
import Layout from '../components/layout';
import style from '../styles/about.module.css';
import date from '../util/date';

function AboutPage({usr}: any) {
    return (
        <Layout name='About' title='About PaulW.XYZ'>
            <section className='block'>
                <p>This is a personal website written by <a href='https://github.com/LambdaPaul'>@LambdaPaul</a>.</p>
                <p>Why did I write this?
                I do not really know, at least the content I put here.
                I guess I wanted a place on the web where I wanted to put everything I think is worth looking at some point in the future.
                It seems wise to have things up here even though they may not be worthwhile, as many things ultimately are not.</p>
                <p>Got any questions, concerns, or issues? Contact me via my email: <code>lambdapaul [at] pm [dot] me</code>.</p>
            </section>
            {/* make this a pretty component with more info */}
            <section className='block'>
                <h5>GitHub Profile</h5>
                <div className={style.githubCard}>
                    <div className={style.githubAvatarContainer}>
                        <Image layout='fixed' width={128} height={128} src={usr.avatar_url} alt={`${usr.login}'s GitHub profile avatar`} />
                    </div>
                    <div className={style.githubCardTable}>
                        <div className={style.githubCardRow}>
                            <span className={style.githubCardLabel}>Name</span>
                            <span className={style.githubCardValue}>{usr.login}</span>
                        </div>
                        <div className={style.githubCardRow}>
                            <span className={style.githubCardLabel}>URL</span>
                            <span className={style.githubCardValue}>
                                <a href={usr.html_url}>{usr.html_url}</a>
                            </span>
                        </div>
                        <div className={style.githubCardRow}>
                            <span className={style.githubCardLabel}>Location</span>
                            <span className={style.githubCardValue}>{usr.location}</span>
                        </div>
                        <div className={style.githubCardRow}>
                            <span className={style.githubCardLabel}>About</span>
                            <span className={style.githubCardValue}>{usr.bio}</span>
                        </div>
                        <div className={style.githubCardRow}>
                            <span className={style.githubCardLabel}>Created</span>
                            <span className={style.githubCardValue}>{date.prettyPrint(usr.created_at)}</span>
                        </div>
                        <div className={style.githubCardRow}>
                            <span className={style.githubCardLabel}>Last Updated</span>
                            <span className={style.githubCardValue}>{date.prettyPrint(usr.updated_at)}</span>
                        </div>
                        <div className={style.githubCardRow}>
                            <span className={style.githubCardLabel}>Twitter</span>
                            <span className={style.githubCardValue}>
                                <a className='link extern blue button' href={`https://twitter.com/${usr.twitter_username}`}>@{usr.twitter_username}</a>
                            </span>
                        </div>
                    </div>
                </div>
            </section>
            <hr />
            <section className='block'>
                <p>Source for this site is available at <a className='button link extern blue' href='https://github.com/LambdaPaul/www'>GitHub / LambdaPaul / www</a></p>
                <p>Relevant information regarding the source is available on the repo and is also provided below.</p>
            </section>
            <section className='block'>
                <h2>README</h2>
                <ReactMarkdown>
                    {ReadmeMd.replace(/^#{1,5} /g, (s: string) => { return `#${s}` })}
                </ReactMarkdown>
            </section>
            <section className='block'>
                <h2>LICENSE</h2>
                <pre className={style.license}>{License}</pre>
            </section>
        </Layout>
    );
}

export async function getStaticProps() {
    const res = await fetch('https://api.github.com/users/lambdapaul');
    const usr = await res.json();

    return {
        props: { usr }
    };
}

export default AboutPage;
