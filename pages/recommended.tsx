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
                                title: 'Practical C Programming by Steve Oualline (kind of outdated but still good)'
                            }
                        ]
                    },
                    {
                        title: 'Operating Systems',
                        children: [
                            {
                                title: 'Advanced Programming in the Unix Environment by W. Richard Stevens'
                            },
                            {
                                title: 'Operating Systems: Design and Implementation by Andrew S. Tanenbaum (I have not had a chance to read his other books on OS. I am not a fan of his networking book though.)'
                            }
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
                            {
                                title: 'Making Embedded Systems: Design Patterns for Great Software by Elecia White'
                            }
                            // Computer Organization and Design: the Hardware/Software Interface [Patterson Hennessy]
                            // Computer Architecture: A Quantitative Approach [Hennessy Patterson]
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
                    'A Tale of Two Cities',
                    'The Mayor of Casterbridge',
                    'The Citadel',
                    'Oliver Twist',
                    'Macbeth',
                    'Othello',
                    'Adventures of Huckleberry Finn'
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
            'Blade Runner 2049',
            'The Hateful Eight',
            'Goodfellas',
            'Inception',
            'Memento',
            'The Grand Budapest Hotel'
        ]
    },
    {
        title: 'Music',
        children: [
            'Große Fuge Op. 133',
            'KV 387',
            'KV 448',
            'BWV 1048',
            'Prelude in G Minor (Op. 23 No. 5)',
            'String Quartet, Op. 20 No. 2 (Haydn)'
        ]
    },
    {
        title: 'Video Games',
        children: [
            'The Legend of Zelda: Breath of the Wild',
            'Portal 2'
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
                <p>If the one you are looking for is not on this list, it is most likely I have not had the chance to read it yet or I may have put it on the Resources page, if it is freely available.</p>
                {list.map(l => mapChild(l, 0))}
            </section>
        </Layout>
    );
}

export default Recommended;