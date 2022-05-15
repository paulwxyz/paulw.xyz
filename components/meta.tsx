import Head from 'next/head';

function Meta({name, ancestors}
    : {name: string, ancestors?: Array<{ name: string, path: string }> }) {
    const path = () => {
        if (!ancestors)
            return name;

        let path = '';
        ancestors.forEach((obj) => {
            path = `${path}${obj.name} /`;
        });

        return `${path} ${name}`;
    };

    return (
        <Head>
            <title>PaulW.XYZ / {path()}</title>
        </Head>
    );
}

export default Meta;