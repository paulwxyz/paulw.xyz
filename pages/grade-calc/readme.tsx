import ReactMarkdown from 'react-markdown';
import Layout from '../../components/layout';

// @ts-ignore
import ReadmeMd from '../../public/grade-calc/README.md';


function GCReadme() {
    return (<Layout name="Read Me" ancestors={[{name:'Grade Calc', path: 'grade-calc'}]}>
        <section className='block'>
        <ReactMarkdown>{ReadmeMd}</ReactMarkdown>
        </section>
        </Layout>);
}

export default GCReadme;