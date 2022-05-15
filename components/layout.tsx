import Meta from './meta';
import Title from './title';

type ChildrenType = JSX.Element | Array<ChildrenType>;

type LayoutProps = {
    name: string,
    title?: string,
    ancestors?: Array<{ name: string, path: string }>
    children?: ChildrenType,
};

function Layout({ name, title, children, ancestors }: LayoutProps) {
    return (
        <>
            <Meta name={name} ancestors={ancestors} />
            <Title title={title} name={name} ancestors={ancestors} />
            <div className='container'>
                {children}
            </div>
        </>
    );
}

export default Layout;