(function () {
    var client = new XMLHttpRequest();
    client.open("GET", "pages.json");
    client.onreadystatechange = function () {
        initFuzzy(client.responseText);
    }
    client.send();
})();

function initFuzzy(text) {
    if (text == "")
        return;
        
    var pages;
    try {
        pages = JSON.parse(text);
    } catch (e) {
        return;
    }

    pages.sort();

    let output = "";
    
    for (const [name, rlink] of pages) {
        output += `<a class="hyperlink" href="${rlink}"><div class="name">${name}</div><div class="link">${rlink}</div></a>`;
    }

    document.querySelector("#results").innerHTML = output;

    document.querySelector("#search")
        .addEventListener("keyup", (e) => {

            let results = [];
            for (const [i, [title, page]] of pages.entries()) {
                ret = hotFuzz(title, document.querySelector("#search").value);
                if (ret == false)
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

function hotFuzz(list, input) {
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
                return false;
        }
    }
    if (search.length != pc)
        return false;
    
    return {first: tokens.join(''), second: (score / search.length)};
}