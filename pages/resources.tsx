import React, { ReactElement } from 'react';
import Layout from '../components/layout';

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
        return <li>{obj}</li>
    }

    if (obj.title === '')
        return <></>

    if (obj.url)
        return <li key=''><a href={obj.url}>{obj.title}</a></li>

    if (!obj.children)
        return <li>{obj.title}</li>

    let title: ReactElement;

    if (level >= 0 && level <= 4)
        title = React.createElement(`h${level + 2}`, {}, obj.title);
    else
        title = React.createElement('strong', {}, obj.title);

    return (
        <>
            {title}
            {obj.description ? <p>{obj.description}</p> : <></>}
            <ul>
                {obj.children.map(l => mapChild(l, level + 1))}
            </ul>
        </>
    );
}

function Resources() {
    return (
        <Layout name='Resources' title='Some Useful Resources'>
            <section className='block'>

            </section>
        </Layout>);
}

export default Resources;