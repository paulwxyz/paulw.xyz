import Head from 'next/head';

function Meta({name, ancestors}
    : {name: string, ancestors?: Array<{ name: string, path: string }> }) {
    function path(): string {
        if (!ancestors)
            return name;

        let path = '';
        ancestors.forEach((obj) => {
            path = `${path}${obj.name} /`;
        });

        return `PaulW.XYZ / ${path} ${name}`;
    }

    return (
        <Head>
            <title>{path()}</title>
        </Head>
    );
}

export default Meta;