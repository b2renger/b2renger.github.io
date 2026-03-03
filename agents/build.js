const fs = require('fs');
const { execSync } = require('child_process');
const path = require('path');

const manualMap = {
    "droidparty-tutorials": "droidparty_tuto.csv",
    "data-sonification": "datasonification.csv",
    "webpd-getting-started": "Webpd_getting_started.csv",
    "springs": "springs.csv",
    "musicbox-3d": "musicbox3d.csv",
    "pendulum-phase": "pendulum-phase.csv",
    "ppp": "ppp.csv",
    "rainstick": "rainstick.csv",
    "webpd-experiments": "Webpd_experiments.csv",
    "p5js-sound-experiments": "p5js_sound_experiments.csv",
    "happy-birthday-codelab": "codelab_sonification.csv",
    "rennes-soundscape": "fm_culture.csv~",
    "the-midst": "the_midst.csv",
    "la-bibliotheque": "labibliotheque.csv",
    "li-il": "liil.csv",
    "open-house": "openhouse.csv",
    "neurokiff": "neurokiff.csv",
    "fresques-numeriques": "fresquesnumeriques.csv",
    "chronophotography": "chronophotography.csv",
    "this-website": "home.csv",
    "openprocessing-reinetiere": "reinetiere.csv",
    "p5js-typographic-experiments": "p5js_typo.csv",
    "chromateque": "p5js_chromateque.csv",
    "weekly-challenge": "WTC.csv",
    "super-x16-resolution": "superresolution.csv",
    "pi": "PI.csv",
    "patterns": "p5js_patterns.csv",
    "shaders": "p5js_shaders.csv",
    "pixel-spirit": "p5js_psd.csv",
    "blends-and-shaders": "blends_n_shaders.csv"
};

// 1. Get original data from data.js
const dataJsPath = path.join(__dirname, '../data.js');
let dataJsContext = fs.readFileSync(dataJsPath, 'utf8');

const sandbox = {};
try {
    eval(dataJsContext + '\n sandbox.projects = projects; sandbox.bio = bio;');
} catch (e) {
    console.error("Error evaluating data.js", e);
}
const currentProjects = sandbox.projects;
const bio = sandbox.bio;

function extractYear(fileName) {
    try {
        const yearOut = execSync(`git log --reverse --format="%ad" --date=format:"%Y" master -- pages/${fileName}`).toString();
        const y = yearOut.split('\n')[0].trim();
        return y || "2020";
    } catch (e) {
        return "2020";
    }
}

function csvToMarkdownAndTags(csvContent) {
    const lines = csvContent.split('\n');
    let md = "";
    let tags = [];
    let firstImage = null;
    let descFallback = "";

    for (let line of lines) {
        const parts = line.split(',');
        if (parts.length < 3) continue;
        const type = parts[0].trim();
        let val = parts.slice(1, parts.length - 1).join(',').trim();
        // strip trailing true/false used in the old csv config
        val = val.replace(/,\s*(True|False|true|false)$/i, '');
        if (!val) continue;

        const ltype = type.toLowerCase();

        if (ltype === 'title') {
            md += `# ${val}\n\n`;
        } else if (ltype === 'tags') {
            tags.push(val);
        } else if (ltype === 'paragraph') {
            md += `${val}\n\n`;
            if (!descFallback) descFallback = val;
        } else if (ltype === 'image') {
            md += `![Image](${val})\n\n`;
            if (!firstImage) firstImage = val;
        } else if (ltype === 'video') {
            md += `${val}\n\n`; // Raw iframe
        } else if (ltype === 'jump') {
            // do nothing or add spaces
        } else if (['live demo', 'android app', 'code', 'check out the code'].includes(ltype) || ltype.includes('site') || ltype.includes('link')) {
            md += `[${type}](${val})\n\n`;
        }
    }
    return { md: md.trim(), tags, firstImage, descFallback };
}

const newProjects = currentProjects.map(proj => {
    let newProj = {
        id: proj.id,
        year: "2020",
        title: proj.title,
        category: proj.category,
        tags: [],
        thumbnail: proj.thumbnail,
        description: proj.description,
        content: ""
    };

    const csvFile = manualMap[proj.id];
    if (csvFile) {
        try {
            const content = execSync(`git show master:pages/${csvFile}`).toString();
            const { md, tags, firstImage, descFallback } = csvToMarkdownAndTags(content);

            newProj.year = extractYear(csvFile);
            newProj.tags = tags;
            newProj.content = md;

            // If the thumbnail contains picsum, try replacing it with first image found in CSV
            if (newProj.thumbnail.includes('picsum.photos') && firstImage) {
                newProj.thumbnail = firstImage;
            }
            if (newProj.description.includes('ready to go fun') && descFallback) {
                newProj.description = descFallback.substring(0, 160) + (descFallback.length > 160 ? '...' : '');
            }
        } catch (e) {
            console.warn("Could not process " + csvFile);
        }
    }

    // If no content parsed via CSV, fallback to old content blocks generated into Markdown
    if (!newProj.content && proj.content) {
        let md = "";
        proj.content.forEach(c => {
            if (c.type === 'Title') md += `# ${c.value}\n\n`;
            if (c.type === 'Tags') newProj.tags = c.value;
            if (c.type === 'Paragraph') md += `${c.value}\n\n`;
            if (c.type === 'Image') md += `![Image](${c.value})\n\n`;
            if (c.type === 'Link') md += `[${c.text || c.type}](${c.url})\n\n`;
            if (c.type === 'Video') md += `${c.value}\n\n`;
        });
        newProj.content = md.trim();
    }

    return newProj;
});

// Output
let outputStr = "const projects = [\n";
newProjects.forEach(p => {
    outputStr += `  {\n`;
    outputStr += `    id: "${p.id}",\n`;
    outputStr += `    year: "${p.year}",\n`;
    outputStr += `    title: \`${p.title.replace(/`/g, '\\`')}\`,\n`;
    outputStr += `    category: "${p.category}",\n`;
    outputStr += `    tags: ${JSON.stringify(p.tags)},\n`;
    outputStr += `    thumbnail: "${p.thumbnail}",\n`;
    outputStr += `    description: \`${p.description.replace(/`/g, '\\`')}\`,\n`;
    outputStr += `    content: \`${p.content.replace(/`/g, '\\`')}\`\n`;
    outputStr += `  },\n`;
});
outputStr += "];\n\n";

outputStr += `const bio = ${JSON.stringify(bio, null, 2)};\n`;

fs.writeFileSync(path.join(__dirname, '../data.js'), outputStr, 'utf8');
console.log("Successfully rebuilt data.js!");
