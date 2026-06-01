// =====================================
// Combine Class Databases
// =====================================

const chapterDatabase = {
    "Class 11": class11Data,
    "Class 12": class12Data
};

// =====================================
// DOM References
// =====================================

const classSelect = document.getElementById("classSelect");
const chapterList = document.getElementById("chapterList");
const chapterSearch = document.getElementById("chapterSearch");
const topicsContainer = document.getElementById("topicsContainer");
const outputArea = document.getElementById("outputArea");

// =====================================
// Load Chapters
// =====================================

function loadChapters() {

    const selectedClass = classSelect.value;

    chapterList.innerHTML = "";

    const chapters = Object.keys(
        chapterDatabase[selectedClass]
    );

    chapters.forEach(chapter => {

        const option = document.createElement("option");

        option.value = chapter;

        chapterList.appendChild(option);

    });

}

// =====================================
// Load Topics
// =====================================

function loadTopics() {

    const selectedClass = classSelect.value;

    const selectedChapter = chapterSearch.value;

    topicsContainer.innerHTML = "";

    const topics =
        chapterDatabase[selectedClass]?.[selectedChapter];

    if (!topics) {

        topicsContainer.innerHTML =
            "Select a valid chapter.";

        return;

    }

    topics.forEach(topic => {

        const label = document.createElement("label");

        label.innerHTML = `
            <input
                type="checkbox"
                class="topicCheckbox"
                value="${topic}">
            ${topic}
        `;

        topicsContainer.appendChild(label);

        topicsContainer.appendChild(
            document.createElement("br")
        );

    });

}

// =====================================
// Generate Prompt
// =====================================

function generatePrompt() {

    const selectedTopics =
        [...document.querySelectorAll(".topicCheckbox:checked")]
        .map(cb => cb.value);

    const worksheetType =
        document.getElementById("worksheetType").value;

    const difficulty =
        document.getElementById("difficulty").value;

    const outputMode =
        document.querySelector(
            'input[name="outputMode"]:checked'
        ).value;

    let prompt = "";

    prompt += `Generate a Physics Worksheet.\n\n`;

    prompt += `Class: ${classSelect.value}\n`;

    prompt += `Chapter: ${chapterSearch.value}\n`;

    prompt += `Worksheet Type: ${worksheetType}\n`;

    prompt += `Difficulty: ${difficulty}\n\n`;

    prompt += `Topics:\n`;

    if (selectedTopics.length === 0) {

        prompt += `- All Chapter Topics\n`;

    } else {

        selectedTopics.forEach(topic => {

            prompt += `- ${topic}\n`;

        });

    }

    prompt += `\n`;

    prompt += `Output Mode: ${outputMode}\n\n`;

    prompt += `CinePhysics Physics Standards:\n`;

    prompt += `• Proper SI Units\n`;
    prompt += `• Proper Superscripts and Subscripts\n`;
    prompt += `• Correct Scientific Notation\n`;
    prompt += `• Correct Dimensional Formulae\n`;
    prompt += `• Correct Vector Notation\n`;
    prompt += `• Publication Quality Equations\n`;
    prompt += `• Numerical Verification\n`;
    prompt += `• Physical Realism\n`;
    prompt += `• CBSE / NCERT Terminology\n`;
    prompt += `• No Duplicate Questions\n`;
    prompt += `• Plausible MCQ Distractors\n`;

    outputArea.value = prompt;

}

// =====================================
// Copy Output
// =====================================

function copyOutput() {

    outputArea.select();

    document.execCommand("copy");

    alert("Output copied.");

}

// =====================================
// Placeholder HTML Generator
// =====================================

function generateHTMLTemplate() {

    outputArea.value =
`<h1>CinePhysics Worksheet</h1>

<h2>${chapterSearch.value}</h2>

<p>Class: ${classSelect.value}</p>

<h3>Questions</h3>

<!-- Paste generated questions here -->

<h3>Answers</h3>

<!-- Paste answer key here -->`;

}

// =====================================
// Event Listeners
// =====================================

classSelect.addEventListener(
    "change",
    loadChapters
);

chapterSearch.addEventListener(
    "change",
    loadTopics
);

document
.getElementById("btnGeneratePrompt")
.addEventListener(
    "click",
    generatePrompt
);

document
.getElementById("btnCopyOutput")
.addEventListener(
    "click",
    copyOutput
);

document
.getElementById("btnGenerateHTML")
.addEventListener(
    "click",
    generateHTMLTemplate
);

// =====================================
// Initial Load
// =====================================

loadChapters();
