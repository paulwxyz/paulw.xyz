import Head from 'next/head';

export default function Meta(props: { name: string, ancestors?: Array<{ name: string, path: string }> }) {
    const path = () => {
        if (!props.ancestors)
            return props.name;

        let path = '';
        props.ancestors.map((obj) => {
            path = `${path}${obj.name} /`;
        });

        return `${path} ${props.name}`;
    };

    return (
        <Head>
            <title>PaulW.XYZ / {path()}</title>
        </Head>
    );
}