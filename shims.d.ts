declare module '*.md' {
    const rawmd: string;
    export default rawmd;
}

declare module '*.txt' {
    const content: string;
    export default content;
}
