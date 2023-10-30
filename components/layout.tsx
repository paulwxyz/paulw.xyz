import Title from './title';

type ChildrenType = JSX.Element | Array<ChildrenType>;

type LayoutProps = {
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
            <Title />
            <Container ignore={props.removeContainer}>{props.children}</Container>
        </>
    );
}

export default Layout;
