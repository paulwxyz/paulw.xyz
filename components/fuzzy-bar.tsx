import { ChangeEvent, useCallback, useEffect, useRef, useState } from 'react';
import Fuzzy from './_fuzzy';
import pages from '../public/pages.json';
import style from '../styles/fuzzy.module.css';

function FuzzyBar(): JSX.Element {
    const searchField = useRef<any>(null);
    const [searchValue, setSearchValue] = useState('');
    const [resultsValue, setResultsValue] = useState(<></>);
    let [metaKey, setMetaKey] = useState('Ctrl');

    const [show, setShow] = useState(false);

    let fuzz: Fuzzy | null = null;

    try {
        fuzz = new Fuzzy({
            pages: pages,
            searchField: searchField,
            searchValue: searchValue,
            resultsValue: resultsValue,
            setResultsValue: setResultsValue,
            maxResults: 5
        });
    } catch (e: any) {
        console.error(e.message);
    }

    function searchInput(e: ChangeEvent<HTMLInputElement>) {
        setSearchValue(e.target.value);
    }

    const toggleSearch = useCallback(() => {
        setShow(!show);
        fuzz?.showSearchResults();
        searchField.current?.focus();
    }, [fuzz, show]);

    useEffect(() => {
        if (window.navigator.userAgent.match(/mac[\s]?os/i))
            setMetaKey('⌘ Cmd');
    }, []);

    useEffect(() => {
        const event = (e: KeyboardEvent) => {
            if (e.code === 'KeyK' && (e.ctrlKey || e.metaKey)) {
                e.preventDefault();
                toggleSearch();
            }

            if (e.code === 'KeyP' && (e.ctrlKey || e.metaKey) && e.shiftKey) {
                e.preventDefault();
                alert('not really sure what to do here lol');
            }

            if (show)
                searchField.current?.focus();
            
            return false;
        }

        window.addEventListener('keydown', event);

        return () => { window.removeEventListener('keydown', event); }
    }, [fuzz, show, toggleSearch]);


    return (
        <>
            {
                show ?
                    <div className={`fuzzynav ${style.container}`}>
                        <input type='text'
                            className={style.search}
                            value={searchValue}
                            placeholder='Go to ...'
                            ref={searchField}
                            onChange={searchInput}
                            onKeyUp={(e) => { fuzz?.searchKeyUpListener(e) }} />
                        <div
                            id='results'
                            className={style.results}>{resultsValue}</div>
                    </div>
                    : <></>
            }


            <a className={style.searchBar} onClick={toggleSearch}>
                <span className={style.searchTerm}>Search</span>
                <div className={style.keybind}>
                    <span className={style.key}>{metaKey}</span> <span className={style.key}>K</span>
                </div>
            </a>
        </>
    );
}

export default FuzzyBar;