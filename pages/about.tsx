import ReactMarkdown from 'react-markdown';

import ReadmeMd from '../README.md';
import License from '../LICENSE.txt';
import Layout from '../components/layout';

function AboutPage() {
    return (
        <Layout >
            <section className='block'>
                <p>This is a personal website written by <a href='https://github.com/LambdaPaul'>@LambdaPaul</a>.</p>
                <p>Why did I write this?
                    I do not really know, at least the content I put here.
                    I wanted a place on the web where I wanted to put everything I think is worth looking at some point in the future.
                    It seems wise to have things up here even though they may not be worthwhile, as many things ultimately are not.</p>
                <p>Got any questions, concerns, or issues? Contact me via email: <code>lambdapaul [at] pm [dot] me</code>.</p>
            </section>
            <hr />
            <section className='block'>
                <p>Source for this site is available at <a className='link' href='https://github.com/LambdaPaul/www'>GitHub / LambdaPaul / www</a></p>
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
                <pre className='license'>{License}</pre>
            </section>
        </Layout>
    );
}

export default AboutPage;
