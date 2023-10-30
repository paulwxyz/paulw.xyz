import Head from 'next/head';
import Link from 'next/link';

import style from '../styles/title.module.css';

function NotFoundPage() {
    // clean this page up
    return (
        <>
            <Head>
                <title>404: Not Found | PaulW.XYZ</title>
            </Head>
            <div className={style.container}>
                <h1 className={style.title}>
                    Page Not Found
                </h1>
            </div>
            <div className={`${style.nav} h1`}>
                <Link href='/'>PaulW.XYZ</Link> / ... ??? / 404: Not Found                          </div>
            <div className='container'>
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
            </div>
        </>

    );
}

export default NotFoundPage;
