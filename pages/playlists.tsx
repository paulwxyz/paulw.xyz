import React, { ReactElement } from 'react';
import Layout from '../components/layout';

type listItem = {
    children?: listItem[];
    url?: string;
    title: string;
};

const list: listItem[] = [{
    title: 'Classical by Composer',
    children: [
        {
            title: '[Youtube] Baroque Red Metal Priest / Antonio Lucio Vivaldi',
            url: 'https://youtube.com/playlist?list=PLSU6wJEYct5HslkoJWHQFCttB-lhSwVr2'
        },
        {
            title: '[Youtube] Papa Bach / Johann Sebastian Bach',
            url: 'https://youtube.com/playlist?list=PLSU6wJEYct5HftuY6UunC6zE_QMXOGmhm'
        },
        {
            title: '[Youtube] Luigi Bee the Oven / Ludwig van Beethoven',
            url: 'https://youtube.com/playlist?list=PLSU6wJEYct5Etx0WAXUQ7YXe84Fp5E142'
        },
        {
            title: '[Youtube] Leck Mozart im Arsch / Wolfgang Amadeus Mozart',
            url: 'https://youtube.com/playlist?list=PLSU6wJEYct5EJsE-9Zh-jWckBuZAmIt8Q'
        }
    ]
}];

function mapChild(obj: listItem, level: number) {
    if (obj.url)
        return <li key=''><a href={obj.url}>{obj.title}</a></li>

    if (!obj.children)
        return <></> // ignore playlists without links

    let title: ReactElement;
    if (level >= 0 && level <= 3)
        title = React.createElement(`h${level+3}`, {}, obj.title);
    else
        title = React.createElement('strong', {}, obj.title);

    return (
        <>
            {title}
            <ul>
                {obj.children.map(l => mapChild(l, level + 1))}
            </ul>
        </>
    );
}

function Playlists() {
    return (
        <Layout name='Playlists'>
            <section className='block'>
                <h2>Music</h2>
                {list.map(l => mapChild(l, 0))}
            </section>
        </Layout>
    );
}

export default Playlists;