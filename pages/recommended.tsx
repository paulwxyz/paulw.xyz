import React, { ReactElement } from 'react';
import Layout from '../components/layout';
import style from '../styles/lists.module.css';

type listItem = {
    children?: listItem[] | string[];
    url?: string;
    title: string;
    description?: string
};

const list: listItem[] = [
    {
        title: 'Books',
        children: [
            {
                title: 'Technology',
                children: [
                    {
                        title: 'C programming',
                        children: [
                            {
                                title: 'The C Programming Language [K&R]',
                                url: 'https://en.wikipedia.org/wiki/The_C_Programming_Language'
                            },
                            {
                                title: 'Expert C Programming by Peter van der Linden'
                            },
                            {
                                title: 'Practical C Programming by Steve Oualline (outdated like all the books in this section but still good)'
                            },
                            {
                                title: 'Mastering Algorithms with C by Kyle Loudon'
                            }
                        ]
                    },
                    {
                        title: 'Other Programming',
                        children: [
                            'Programming Perl by Larry Wall [Camel Book] (one of the first programming books I used. It probably is outdated but it is written well)',
                            'Programming Rust: Fast, Safe Systems Development',
                            'The Rust Programming Language',
                            'Programming in Lua, Fourth Edition by Roberto Ierusalimschy'
                        ]
                    },
                    {
                        title: 'Operating Systems',
                        children: [
                            'Advanced Programming in the Unix Environment by W. Richard Stevens',
                            'Operating Systems: Design and Implementation by Andrew S. Tanenbaum (I have not had a chance to read his other books on OS. I am not a fan of his networking book though.)'
                        ]
                    },
                    // {
                    //     title: 'Networking'
                    // },
                    // {
                    //     title: 'Electronics'
                    // },
                    {
                        title: 'Computer Engineering',
                        children: [
                            'Making Embedded Systems: Design Patterns for Great Software by Elecia White',
                            'Computer Organization and Design: the Hardware/Software Interface [Patterson Hennessy]',
                            'Computer Architecture: A Quantitative Approach [Hennessy Patterson]'
                        ]
                    },
                    {
                        title: 'Compilers',
                        children: [
                            {
                                title: 'Compilers: Principles, Techniques, and Tools [Dragon Book] (discusses theory in detail so it is kind of hard to read)'
                            }
                        ]
                    },
                    {
                        title: 'Other',
                        children: [
                            {
                                title: 'Definitive Guide to sed: Tutorial and Reference'
                            }
                        ]
                    }
                ]
            },
            {
                title: 'Classics',
                description: 'Only the English ones for now.',
                children: [
                    'Christmas Carol',
                    'A Tale of Two Cities',
                    'The Mayor of Casterbridge',
                    'The Citadel',
                    'Oliver Twist',
                    'Macbeth',
                    'Othello',
                    'Adventures of Huckleberry Finn',
                    'Murder on the Orient Express'
                ]
            },
            {
                title: 'Language Learning',
                children: ['Lingua Latina per se Illustrata (Both parts)']
            }
        ]
    },
    {
        title: 'Movies',
        children: [
            'Pulp Fiction',
            'Blade Runner 2049',
            'The Grand Budapest Hotel',
            'The Hateful Eight',
            'Goodfellas',
            'Inception',
            'Memento',
            'Dune (2021)',
            'Hot Fuzz',
            'Snatch'
        ]
    },
    {
        title: 'Music',
        children: [
            'American Pie by Don McLean',
            'L\'Ultima Diligenza by Ennio Morricone'
        ]
    },
    {
        title: 'Classical Music',
        children: [
            'Große Fuge Op. 133',
            'KV 387',
            'KV 448',
            'KV 626',
            'Piano Sonata No. 2 Mvmt. 3 (Chopin)',
            'BWV 1048',
            'Prelude in G Minor (Op. 23 No. 5)',
            'String Quartet, Op. 20 No. 2 (Haydn)',
            'Arabesque No. 1 (Debussy)'
        ]
    },
    {
        title: 'Video Games',
        children: [
            'The Legend of Zelda: Breath of the Wild',
            'Portal 2',
            'Factorio',
            'The Witcher 3: The Wild Hunt GOTY Edition (Especially the DLCs)',
            'Baba is You',
            'Red Dead Redemption'
        ]
    }
];

function mapChild(obj: listItem | string, level: number) {
    if (typeof obj === 'string') {
        if (obj === '')
            return <></>
        return <span className={style.listItem}>{obj}</span>
    }

    if (obj.title === '')
        return <></>

    if (obj.url)
        return <span className={style.listItem}><a href={obj.url}>{obj.title}</a></span>

    if (!obj.children)
        return <span className={style.listItem}>{obj.title}</span>

    let title: ReactElement;

    if (level >= 0 && level <= 4)
        title = React.createElement(`h${level + 2}`, {}, obj.title);
    else
        title = React.createElement('strong', {}, obj.title);

    return (
        <>
            {title}
            {obj.description ? <p>{obj.description}</p> : <></>}
            <div>
                {obj.children.map(l => mapChild(l, level + 1))}
            </div>
        </>
    );
}

function Recommended() {
    return (
        <Layout name='Recommended' title='My Recommendations'>
            <section className='block'>
                <p>This page is really for me to not forget/revisit the good things I have read, seen, heard, and/or experienced. This list may change, just as my opinions.</p>
                <p>If the one you are looking for is not on this list, it is most likely I have not had the chance to read/listen to/watch it yet.</p>
                {list.map(l => mapChild(l, 0))}
            </section>
        </Layout>
    );
}

export default Recommended;
