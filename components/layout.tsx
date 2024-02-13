import Title from './title';
import Container, { ChildrenType } from './container';

type LayoutProps = {
    children?: ChildrenType,
    removeContainer?: boolean,
};

function Layout(props: LayoutProps) {
    return (
        <>
            <Title />
            <Container ignore={props.removeContainer}>
                {props.children}
            </Container>
        </>
    );
}

export default Layout;
