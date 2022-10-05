import Meta from './meta';
import Title from './title';

type ChildrenType = JSX.Element | Array<ChildrenType>;

type LayoutProps = {
    name: string,
    title?: string,
    ancestors?: Array<{ name: string, path: string }>
    children?: ChildrenType,
    removeContainer?: boolean,
};

function Container(props: {children?: ChildrenType, ignore?: boolean}) {
    if (props.ignore)
        return <>{props.children}</>;
    return <div className='container'>
        {props.children}
    </div>;
}

function Layout(props : LayoutProps) {
    return (
        <>
            <Meta name={props.name} ancestors={props.ancestors} />
            <Title title={props.title} name={props.name} ancestors={props.ancestors} />
            <Container ignore={props.removeContainer}>{props.children}</Container>
        </>
    );
}

export default Layout;