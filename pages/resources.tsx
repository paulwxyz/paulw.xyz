import Layout from '../components/layout';
import res from '../public/resources.yaml';
import { toListItem, mapChild } from '../components/lists';

function Resources() {
    return (
        <Layout name='Resources' title='Some Useful Resources'>
            {
                res.map((item: Record<string, any>) => {
                    const lItem = toListItem(item)
                    if (lItem)
                        return mapChild(lItem, 0)
                })
            }
        </Layout>);
}

export default Resources;