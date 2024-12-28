
export interface Site {
    title: string;
    pages?: Sites;
    mtime?: string;
    otime?: string;
}

export interface Sites {
    [slug: string]: Site;
}
