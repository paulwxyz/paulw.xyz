// good luck reading through this
(function () {
    var client = new XMLHttpRequest();
    client.open("GET", "/pages.json");
    client.onreadystatechange = () => {
        if (client.readyState === 4)
            fuzzyInit(client.responseText);
    }
    client.send();
    document.querySelector("#search").focus();
})();

function fuzzyInit(pagesFileName) {
    if (pagesFileName == "")
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

    document.querySelector("#search")
        .addEventListener("keyup", (e) => {
            switch (e.code) {
            case "Enter":
                if (document.querySelector("#results").childNodes[0].href === undefined)
                    return;
                window.location = document.querySelector("#results").childNodes[0].href;
                break;
            case "ArrowDown":
                console.log("S");
                break;
            case "ArrowUp":
                console.log("W");
                break;
            }

            // help
            if (document.querySelector("#search").value === "?" || document.querySelector("#search").value == "help") {
                document.querySelector("#results").innerHTML = "Enter a page or directory name. If do not know any, clear the search field to list everything. Using the <code>Enter</code> key would take you to the first page in list, if it is not empty."
                return;
            }


            // if (document.querySelector("#search").value === ""){
            //     document.querySelector("#results").innerHTML = "Try entering something into the input field...";
            //     return;
            // }

            let results = [];
            for (const [i, [title, page]] of pages.entries()) {
                ret = fuzzySearch(title, document.querySelector("#search").value);
                if (ret === null)
                    continue;
                results.push([ret, page]);
            }

            results.sort((x, y) => {return x[0].second - y[0].second});

            let output = "";
            for (const [hfRet, rlink] of results) {
                output += `<a class="hyperlink" href="${rlink}"><div class="name">${hfRet.first}</div><div class="link">${rlink}</div></a>`;
            }

            if (output == "")
                output = "No matches found."

            document.querySelector("#results").innerHTML = output;
        }
    );
}

function fuzzySearch(list, input) {
    let search = input.replace(/\s/g, "");
    search = search.toLowerCase();
    let tokens = list.split('');
    let pc = 0;
    let score = 0;

    for (const [i, ch] of tokens.entries()) {
        if (ch.toLowerCase() == search[pc]) {
            score += i - pc;
            tokens[i] = `<span class="highlight">${ch}</span>`;
            pc++;
            if (search.length < pc)
                return null;
        }
    }
    if (search.length != pc)
        return null;
    
    return {first: tokens.join(''), second: (score / search.length)};
}