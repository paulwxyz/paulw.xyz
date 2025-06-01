export default function Container(props: { children?:  React.ReactNode, ignore?: boolean }) {
    if (props.ignore)
        return <>{props.children}</>;
    return (
        <div className='container'>
            {props.children}
        </div>
    );
}
