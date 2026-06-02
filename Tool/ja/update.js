const fs = require("fs");
const path = require("path");

const DATA_DIR = "./data";

async function updateAll() {

    const files = fs.readdirSync(DATA_DIR);

    for (const file of files) {

        if (!file.toLowerCase().endsWith(".tsv"))
            continue;

        const fullPath =
            path.join(DATA_DIR, file);

        console.log("Reading:", file);

        const text =
            fs.readFileSync(
                fullPath,
                "utf8"
            );

        const lines =
            text.split(/\r?\n/);

        let url = "";

        for (const line of lines) {

            if (line.startsWith("#URL=")) {

                url =
                    line.substring(5).trim();

                break;
            }
        }

        if (!url) {

            console.log(
                "No URL:",
                file
            );

            continue;
        }

        try {

            console.log(
                "Downloading:",
                url
            );

            const response =
                await fetch(url);

            if (!response.ok) {

                throw new Error(
                    "HTTP " +
                    response.status
                );
            }

            const newText =
                await response.text();

			if (
   				 !newText.includes("#ENGINE=")
			) {
   				 throw new Error(
       			 "Downloaded file is not a TSV"
   			 	);
			}

			fs.copyFileSync(
   				 fullPath,
    				fullPath + ".bak"
			);

            fs.writeFileSync(
                fullPath,
                newText,
                "utf8"
            );

            console.log(
                "Updated:",
                file
            );

        }
        catch(err) {

            console.log(
                "Failed:",
                file
            );

            console.log(err.message);
        }
    }

    console.log("Done.");
}

updateAll();