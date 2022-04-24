import Layout from '../components/layout';
import res from '../public/resources.yaml';
import { toListItem, mapChild } from '../util/resrec';

function Resources() {
    return (
        <Layout name='Resources' title='Some Useful Resources'>
            <section className='block'>
                {
                    res.map((item: Record<string, any>) => {
                        const lItem = toListItem(item)
                        if (lItem)
                            return mapChild(lItem, 0)
                    })
                }
            </section>
        </Layout>);
}

export default Resources;