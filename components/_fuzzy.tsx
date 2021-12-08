import { Dispatch, KeyboardEvent as ReactKeyboardEvent, MutableRefObject, SetStateAction } from 'react';
import Result from './fuzzy-result';
import style from '../styles/fuzzy.module.css';

export type FuzzyConstr = {
    pages: Page[],
    searchField: MutableRefObject<null>,
    searchValue: string,
    resultsValue: JSX.Element,
    setResultsValue: Dispatch<SetStateAction<JSX.Element>>,
    maxResults?: number
};

export type Page = {
    title: string;
    link: string;
};

export default class Fuzzy {
    searchValue: string = '';
    searchField: HTMLInputElement | null;
    pages: Page[];
    setResultsValue: Dispatch<SetStateAction<JSX.Element>>;
    resultsValue: JSX.Element;
    maxResults: number;

    constructor(obj: FuzzyConstr) {
        this.searchField = obj.searchField.current;
        this.resultsValue = obj.resultsValue; // not yet implemented. have to look into lazy eval in js
        this.setResultsValue = obj.setResultsValue;
        this.searchValue = obj.searchValue || '';

        this.pages = obj.pages
        this.maxResults = obj.maxResults || this.pages.length;

        this.pages.sort((x, y) => { return ('' + x.title).localeCompare(y.title) });
    }

    searchKeyUpListener(e: ReactKeyboardEvent) {
        this.showSearchResults();
    }

    showSearchResults(): void {
        let searchValue: string = this.searchValue.toLowerCase();
        searchValue = searchValue.trimStart().trimEnd();
        if (this.maxResults !== undefined && searchValue === ''){
            this.setResultsValue(
                <>
                    <h2>Search PaulW.XYZ</h2>
                    <div>Enter a page or directory name in the search bar above.</div>
                </>
            )
            return;
        }

        let results = [];
        for (const [idx, page] of this.pages.entries()) {
            const ret = this.fuzzySearch(page.title, searchValue);
            if (ret === null)
                continue;
            results.push({ formatted: ret.formatted, link: page.link, score: ret.score });
        }

        if (results.length <= 0)
            return this.setResultsValue(<>Unknown command or no matching pages found.</>);

        results.sort((x, y) => { return x.score - y.score });

        this.setResultsValue(
            <>
                {results.map((res: { formatted: JSX.Element[], link: string, score: number }, idx) => {
                    return (<Result
                        link={res.link}
                        formatted={res.formatted}
                        idx={idx}
                        key={`res-${idx}`} />);
                })}
            </>
        );
    }

    fuzzySearch(findIn: string, find: string) {
        let search = find.replace(/\s/g, '');
        search = search.toLowerCase();
        let tokens: string[] = findIn.split('');
        let elements: JSX.Element[] = new Array(tokens.length);
        let pc = 0;
        let score = 0;

        for (const [i, ch] of tokens.entries()) {
            if (ch.toLowerCase() === search[pc]) {
                score += i - pc;
                elements[i] = (<span className={style.highlight}>{ch}</span>);
                pc++;
                if (search.length < pc)
                    return null;
                continue;
            }
            elements[i] = (<>{ch}</>); // not very nice :(
        }

        if (search.length === pc)
            return { formatted: elements, score: (score / search.length) };

        return null;
    }
}