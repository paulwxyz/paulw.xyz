declare module '*.yaml' {
    const record: Record<string, any>;
    export default record;
}

declare module '*.md' {
    const rawmd: string;
    export default rawmd;
}

declare module '*.txt' {
    const content: string;
    export default content;
}