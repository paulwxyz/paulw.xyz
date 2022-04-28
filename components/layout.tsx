import Meta from './meta';
import Title from './title';
// import FuzzyBar from './fuzzy-bar';

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
            {/* <FuzzyBar /> */}
            <div className='container'>
                {children}
            </div>
        </>
    );
}

export default Layout;