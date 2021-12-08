import React, { ReactElement, useState } from 'react';
import Layout from '../../components/layout';
import Link from 'next/link';
import GradeCalc from '../../components/_gc';

function GradeCalcPage() {
    const [calculator, setCalculator] = useState<any>();
    let [jsonInput, setJsonInput] = useState('[]');

    function loadConfig(filename: string): void {
        const client = new XMLHttpRequest();
        client.open('GET', filename);
        client.onreadystatechange = () => {
            setJsonInput(client.responseText);
        }
        client.send();
    }

    function generate() {
        setCalculator('');
        let conf = null;
        try {
            conf = JSON.parse(jsonInput);
        }
        catch (e) {
            console.log(e);
            return;
        }
        let cb = (out: ReactElement[]) => {
            setCalculator([... calculator, out]);
        }
        const gc = new GradeCalc(conf, cb);
        if (calculator)
            setCalculator([... calculator, React.createElement('div', {className: 'asf'}, gc.elemTotal)]);
    }

    return (
        <Layout name="Grade Calc" title='Grade Calculator'>
            <div className='block'>
                <div className='about-container'>
                    <h2>About</h2>
                    Check out the <Link href='/grade-calc/readme'><a >README.md</a></Link> file
                    to learn more about the configuration structure.
                    <h3>Usage</h3>
                    <ol>
                        <li>Either configure the calculator using the text box below or load one from the existing JSON files to
                            generate one.</li>
                        <li>Click <code>Generate</code>.</li>
                        <li>Enter the input values.</li>
                    </ol>
                </div>
                <div className='json-textarea'>
                    <h2>Configuration</h2>
                    <hr />
                    <h3>Load config from file</h3>
                    <ul>
                        <li><a onClick={() => loadConfig('/grade-calc/config/map2302.json')}>MAP2302 - ODE I Fall 2019 (map2302.json)</a></li>
                        <li><a onClick={() => loadConfig('/grade-calc/config/eee3307c.json')}>EEE3307C - Electronics I Spring 2021 (eee3307c.json)</a></li>
                        <li><a onClick={() => loadConfig('/grade-calc/config/eel4742c.json')}>EEL4742C - Embedded Systems Spring 2021 (eel4742c.json)</a></li>
                        <li><a onClick={() => loadConfig('/grade-calc/config/eel4781.json')}>EEL4781 - Computer Comm. Networks Spring 2021 (eel4781.json)</a></li>
                    </ul>
                    <div className='button-container'>
                        <button className='button' onClick={generate}>Generate &#8594;</button>
                    </div>
                    <textarea id='json' rows={30} value={jsonInput} onChange={(t) => {setJsonInput(t.currentTarget.value)}}></textarea>

                </div>
                <div className='calculator-container'>
                    {calculator}
                </div>
                <span className='clear'></span>
            </div>
        </Layout>
    )
}

// export default GradeCalcPage;

export default function WIP() {
    return (
    <Layout name='Grade Calc' title='[WIP] Grade Calculator'>
        <section className='block' style={{textAlign: 'center'}}>
            Check back later as the port of this page is a Work in Progress.
        </section>
    </Layout>);
}
