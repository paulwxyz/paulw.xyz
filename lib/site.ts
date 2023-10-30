
export interface Site {
    title: string;
    subpages?: SiteSubPages;
    mtime?: string;
    otime?: string;
}

export interface SiteSubPages {
    [slug: string]: Site;
}
