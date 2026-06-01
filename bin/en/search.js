let allSites = [];

async function loadData() {

    const listText =
        await fetch("data/list.txt")
        .then(r => r.text());

    const files =
        listText
        .split(/\r?\n/)
        .map(v => v.trim())
        .filter(v => v);

    for (const file of files) {

        const text =
            await fetch("data/" + file)
            .then(r => r.text());

        parseTSV(text);
    }

    console.log(allSites.length + " sites loaded");
}

function parseTSV(text) {

    const lines = text.split(/\r?\n/);

    let engineName = "";

    for (const line of lines) {

        if (!line.trim()) continue;

        if (line.startsWith("#ENGINE=")) {

            engineName =
                line.substring(8);

            continue;
        }

        if (line.startsWith("#"))
            continue;

        const cols = line.split("\t");

        if (cols.length < 4)
            continue;

        allSites.push({
            name: cols[0],
            url: cols[1],
            keywords: cols[2],
            description: cols[3],
            engine: engineName
        });
    }
}

function searchSites() {

    const query =
        document
        .getElementById("searchBox")
        .value
        .trim()
        .toLowerCase();

    const results = allSites.filter(site => {

        return (
            site.name.toLowerCase().includes(query)
            ||
            site.description.toLowerCase().includes(query)
            ||
            site.keywords.toLowerCase().includes(query)
        );

    });

    renderResults(results);
}


function renderResults(results){

    const container =
        document.getElementById("results");

    container.innerHTML = "";

    results.forEach(site => {

        container.innerHTML += `

<div class="site">

<a href="${site.url}"
   target="_blank">

${site.name}

</a>

<div>
${site.url}
</div>

<div class="desc">
${site.description}
</div>

<div class="engine">
Engine: ${site.engine}
</div>

</div>

`;

    });

}








document
.getElementById("searchButton")
.addEventListener("click", searchSites);

document
.getElementById("searchBox")
.addEventListener("keydown", e => {

    if (e.key === "Enter")
        searchSites();
});

async function init() {

    await loadData();
}

init();
