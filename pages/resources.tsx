import React, { ReactElement } from 'react';
import Layout from '../components/layout';
import style from '../styles/lists.module.css';

type listItem = {
    children?: listItem[] | string[];
    url?: string;
    title: string;
    description?: string
};

const list = [{
    title: 'Programming',
    children: [
        {
            url: 'http://aggregate.org/MAGIC/',
            title: 'The Aggregate Magic Algorithms'
        },
        {
            url: 'https://3fx.ch/typing-is-hard.html',
            title: 'Typing is Hard'
        },
        {
            url: 'https://www.atlassian.com/git/',
            title: 'Atlassian&apos;s Git Guide'
        },
        {
            url: 'https://learnopengl.com/',
            title: 'LearnOpenGL.com'
        },
        {
            url: 'http://ctan.math.utah.edu/ctan/tex-archive/info/symbols/comprehensive/symbols-letter.pdf',
            title: '[PDF] LaTeX Symbols'
        },
        {
            url: 'https://tobi.oetiker.ch/lshort/lshort.pdf',
            title: '[PDF] The Not So Short Introduction to LATEX 2ε'

        },
        {
            url: 'https://writing.kemitchell.com/2016/09/21/MIT-License-Line-by-Line.html',
            title: 'The MIT License, Line by Line by Kyle E. Mitchell'
        },
        {
            title: 'Posts',
            children: [
                {
                    title: 'How to Make Your Code Reviewer Fall in Love with You by Michael Lynch',
                    url: 'https://mtlynch.io/code-review-love/'
                },
                {
                    title: 'What&apos;s in the box? by @fasterthanlime',
                    url: 'https://fasterthanli.me/articles/whats-in-the-box'
                }
            ]
        },
        {
            title: 'Talks',
            children: [
                {
                    title: 'Concurrency is not Parallelism by Rob Pike',
                    url: 'https://talks.golang.org/2012/waza.slide'
                }
            ]
        }
    ]
},
{
    title: 'Electrical',
    children: [
        {
            title: 'Common Wire-To-Board, Wire-To-Wire Connectors, And Crimp Tools',
            url: 'http://www.mattmillman.com/info/crimpconnectors/'
        }
    ]
},
{
    title: 'Other Topics',
    children: [
        {
            title: 'Sight Reading Trainer',
            url: 'https://sightreading.training/'
        }
    ]
}];

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

function Resources() {
    return (
        <Layout name='Resources' title='Some Useful Resources'>
            <section className='block'>
                {list.map(l => mapChild(l, 0))}
            </section>
        </Layout>);
}

export default Resources;