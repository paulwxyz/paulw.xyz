import ReactMarkdown from 'react-markdown';

// @ts-ignore
import ReadmeMd from '../README.md';
import Layout from '../components/layout';

function AboutPage() {
    return (
        <Layout name='About' title='About PaulW.XYZ'>
            <section className='block'>
                This is a personal website written by <a href='https://github.com/LambdaPaul'>@LambdaPaul</a>.<br /><br />
                Why did I write this?
                I do not really know, at least the content I put here. I guess I wanted a place on the web where I wanted to put everything I think is worth looking at some point in the future.
                <br />
                <br />
                It seems wise to have things up here even though they may embarrass me at some point in the future, as many of the things I have done in the past have.
                Got any questions, concerns, or issues? Feel free to contact me via my email: <code>lambdapaul [at] pm [dot] me</code>.
            </section>
            <section className='block'>
                <ReactMarkdown>
                    {ReadmeMd.replace(/^#{1,5} /g, (s: string) => { return `#${s}` })}
                </ReactMarkdown>
            </section>
        </Layout>
    )
}

export default AboutPage;
