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
                        return mapChild(lItem, 0, {
                            'spotify': (i) => {
                                return <div>
                                <a className='extern link button' 
                                href={`https://open.spotify.com/track/${i.id}`}></a> 
                                {i.title}</div>;
                            },
                            'youtube-playlist': (i) => {
                                return <div>
                                <a className='extern link button' 
                                href={`https://youtube.com/playlist?list=${i.id}`}></a> 
                                {i.title}</div>;
                            }
                        })
                })
            }
        </Layout>
    );
}
export default Playlists;
