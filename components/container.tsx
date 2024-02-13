export type ChildrenType = JSX.Element | Array<ChildrenType>;

function Container(props: { children?: ChildrenType, ignore?: boolean }) {
    if (props.ignore)
        return <>{props.children}</>;
    return (
        <div className='container'>
            {props.children}
        </div>
    );
}

export default Container;