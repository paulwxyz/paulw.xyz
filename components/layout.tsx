import FuzzyBar from './fuzzy-bar';
import Logo from '../public/logo.svg';
import Meta from './meta';
import Title from './title';

type layoutProps = {
    name: string,
    title?: string,
    children?: JSX.Element | JSX.Element[],
    ancestors?: Array<{ name: string, path: string }>
};

function Layout(props: layoutProps) {
    return (
        <>
            <Meta name={props.name} ancestors={props.ancestors} />
            <Title title={props.title} name={props.name} ancestors={props.ancestors} />
            <FuzzyBar />
            {props.children}
        </>
    );
}

export default Layout;