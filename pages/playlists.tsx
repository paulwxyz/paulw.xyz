import React, { ReactElement } from 'react';
import Layout from '../components/layout';
import { mapChild, toListItem } from '../components/lists';
import pl from '../public/playlists.yaml';

function Playlists() {
    return (
        <Layout name='Playlists'>
            <h2>Music</h2>
            {
                pl.map((item: Record<string, any>) => {
                    const lItem = toListItem(item)
                    if (lItem)
                        return mapChild(lItem, 0)
                })
            }
        </Layout>
    );
}

export default Playlists;
