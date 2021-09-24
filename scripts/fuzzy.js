setTimeout(() => {
    let searchField = document.querySelector("#search");
        if (searchField === null)
            return;

    let client = new XMLHttpRequest();
    client.open("GET", "/pages.json");
    client.onreadystatechange = () => {
        if (client.readyState === 4)
            fuzzyInit(client.responseText);
    }
    client.send();
    searchField.focus();
}, 50);

function fuzzyInit(pagesFileName) {
    if (pagesFileName == "")
        return;
    
    let searchField = document.querySelector("#search");
    let resultBlock = document.querySelector("#results");
    if (searchField === null || resultBlock === null)
        return;

    var pages;
    try {
        pages = JSON.parse(pagesFileName);
    } catch (e) {
        console.error(e);
        document.body.innerHTML = e.message;
        return;
    }

    pages.sort();

    searchField.addEventListener("keyup", (e) => {

            let searchValue = searchField.value ? searchField.value.toLowerCase() : "";

            if (e.code === "Enter") {
                if (resultBlock.childNodes === null 
                    || resultBlock.childNodes[0] === null
                    || resultBlock.childNodes[0].href === undefined)
                    return;

                window.location = resultBlock.childNodes[0].href;
                return;
            }

            // help
            if (searchValue === "?" || searchValue === "help") {
                resultBlock.innerHTML = "<h2>Help</h2>Enter a page or directory name.<br>If do not know any, clear the search field to list everything.<br> Using the <code>Enter</code> key would take you to the first page in list, if the list is not empty.<br>Alternatively, use the <code>Up</code> and <code>Down</code> arrow keys to select the page you want and use the <code>Enter</code> key."
                return;
            }

            let results = [];
            for (const [i, page] of pages.entries()) {
                ret = fuzzySearch(page.title, searchValue);
                if (ret === null)
                    continue;
                results.push({formatted: ret.formatted, link: page.link, score: ret.score});
            }

            results.sort((x, y) => {return x.score - y.score});

            resultBlock.innerHTML = "";
            for (const res of results) {
                linkBlock = document.createElement("a");
                linkBlock.classList.add("hyperlink");
                linkBlock.href = res.link;
                linkBlock.innerHTML = `<div class="name">${res.formatted}</div><div class="link">${res.link}</div>`;
                resultBlock.appendChild(linkBlock);
            }

            if (results.length <= 0)
                resultBlock.innerHTML = "Unknown command or no matching pages found."
        }
    );

    document.body.addEventListener("keyup", (e) => {
        if (e.code === "ArrowDown" || e.code === "ArrowUp") {
            if (resultBlock.childNodes === null)
                return;

            resultNodes = resultBlock.childNodes;
            
            if (resultNodes.length <= 1)
                return;

            let currNode = document.activeElement;
            
            if (searchField === currNode) {
                if (e.code === "ArrowDown")
                    resultNodes[0].focus();
                else
                    resultNodes[resultNodes.length - 1].focus();
                return;
            }

            if (Array.from(resultNodes).indexOf(currNode) < 0)
                return;

            if (e.code === "ArrowDown")
                if (currNode.nextElementSibling === null)
                    searchField.focus();
                else
                    currNode.nextElementSibling.focus();
            else if (e.code === "ArrowUp")
                if (currNode.previousElementSibling === null)
                    searchField.focus();
                else
                    currNode.previousElementSibling.focus();
            return;
        }
    });
}

function fuzzySearch(findIn, find) {
    let search = find.replace(/\s/g, "");
    search = search.toLowerCase();
    let tokens = findIn.split('');
    let pc = 0;
    let score = 0;

    for (const [i, ch] of tokens.entries()) {
        if (ch.toLowerCase() === search[pc]) {
            score += i - pc;
            tokens[i] = `<span class="highlight">${ch}</span>`;
            pc++;
            if (search.length < pc)
                return null;
        }
    }

    if (search.length === pc)
        return {formatted: tokens.join(''), score: (score / search.length)};
    
    return null;
}