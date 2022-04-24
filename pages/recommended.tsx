import Layout from '../components/layout';
import rec from '../public/recommended.yaml';
import { toListItem, mapChild } from '../util/resrec';

function Recommended() {
    return (
        <Layout name='Recommended' title='My Recommendations'>
            <section className='block'>
                <p>This page is really for me to not forget/revisit the good things I have read, seen, heard, and/or experienced. This list may change, just as my opinions.</p>
                <p>If the one you are looking for is not on this list, it is most likely I have not had the chance to read/listen to/watch it yet.</p>
                {
                    rec.map((item: Record<string, any>) => {
                        const lItem = toListItem(item)
                        if (lItem)
                            return mapChild(lItem, 0)
                    })
                }
            </section>
        </Layout>
    );
}

export default Recommended;
