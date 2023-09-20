import Link from 'next/link';
import Layout from '../components/layout';

function NotFoundPage() {
    return (
        <Layout title='Page Not Found' name='... ??? / 404: Not Found'>
            <section className='block text center'>
                <h1>Error 404</h1>
                <p>
                    <strong>Uh oh! The page you are looking for does not exist...</strong><br />
                </p>
                <Link href='/' className='button green back link'>Go Home</Link>
                <a className='button blue link extern' href='https://en.wikipedia.org/wiki/List_of_HTTP_status_codes'>
                    More on HTTP status codes
                </a>
            </section>
        </Layout>
    );
}

export default NotFoundPage;
