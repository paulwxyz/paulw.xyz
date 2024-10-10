import ReactMarkdown from 'react-markdown';

import ReadmeMd from '../README.md';
import License from '../LICENSE.txt';
import Layout from '../components/layout';

function AboutPage() {
    return (
        <Layout >
            <section className='block'>
                <p>Paul&apos;s Personal Website. I go by <a href='https://github.com/LambdaPaul'>@LambdaPaul</a> on GitHub and <a href='https://x.com/lambda_paul'>@lambda_paul</a> on X/Twitter.</p>
                <p>I also have a Gitea server at <a href='https://git.paulw.xyz'>git.paulw.xyz</a> and a Pleroma (ActivityPub/Mastodon-compatible) server at <a href='https://social.paulw.xyz'>social.paulw.xyz</a> as back-ups for my GitHub and X/Twitter.</p>
                <p>Why did I create this? Why do I have the back-ups?</p>
                <p>
		    The original motivation was to just play with Next.js as it pretty much did the things I wanted web pages to do. But it came at the cost of needless complexity. As I use the JavaScript/ECMAScript/Whatever-you-want-to-call-it-script more and more, I am convinced that it is not a platform worth pursuing because the more complex it gets, the less control I have over what it does and this platform and its users seems to be okay with that sort of loss. I have been instead pivoting toward things that impressed and got me interested in working with computers.</p>
		<p>Most services/products are keen on going against what Steph Ango calls <a href='https://stephango.com/file-over-app'>File over app</a>, a philosophy in which you prioritize data over software, and anticipate and embrace the eventual death of software. People instead want subscription services that barely support open formats and sometimes do not support exporting data to commonly used formats. The goal here is to avoid storing artifacts under locations that are easily not accessible, not under my control, and does not lock me out of using it with other software. The only reason I have not completely abandoned this is thanks to my decision to rely on Markdown files alone. Had it been reliant on any cloud software, I would have started over.</p>

                <p>Got any questions, concerns, or issues? Contact me via email: <code>contact [at] paulw [dot] xyz</code>.</p>
            </section>
            <hr />
            <section className='block'>
                <p>Source for this site is available on GitHub: <a href='https://github.com/LambdaPaul/www'>github.com/LambdaPaul/www</a> and <a href='https://git.paulw.xyz/LambdaPaul/www'>git.paulw.xyz/LambdaPaul/www</a></p>
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
