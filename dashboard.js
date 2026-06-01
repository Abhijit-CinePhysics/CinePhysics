// ===============================
// CinePhysics Chapter Database
// ===============================

const chapterDatabase = {

    "Class 11": {

        "Units and Measurements": [
            "Units",
            "SI System & Prefixes",
            "Dimensions",
            "Dimensional Analysis",
            "Significant Figures",
            "Errors in Measurement"
        ],

        "Motion in a Straight Line": [
            "Position",
            "Distance and Displacement",
            "Speed",
            "Velocity",
            "Acceleration",
            "Graphs of Motion"
        ],

        "Motion in a Plane": [
            "Scalars and Vectors",
            "Vector Addition",
            "Vector Resolution",
            "Projectile Motion",
            "Relative Velocity"
        ]
    },

    "Class 12": {

        "Electric Charges and Fields": [
            "Electric Charge",
            "Coulomb's Law",
            "Electric Field",
            "Electric Field Lines",
            "Electric Dipole"
        ],

        "Current Electricity": [
            "Electric Current",
            "Drift Velocity",
            "Ohm's Law",
            "Resistivity",
            "Kirchhoff's Laws"
        ]
    }
};

// ===============================
// DOM References
// ===============================

const classSelect = document.getElementById("classSelect");
const chapterList = document.getElementById("chapterList");
const chapterSearch = document.getElementById("chapterSearch");
const topicsContainer = document.getElementById("topicsContainer");
const outputArea = document.getElementById("outputArea");

// ===============================
// Populate Chapters
// ===============================

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

// ===============================
// Load Topics
// ===============================

function loadTopics() {

    const selectedClass = classSelect.value;

    const selectedChapter = chapterSearch.value;

    topicsContainer.innerHTML = "";

    const topics =
        chapterDatabase[selectedClass]?.[selectedChapter];

    if (!topics) {

        topicsContainer.innerHTML =
            "No topics found.";

        return;
    }

    topics.forEach(topic => {

        const label =
            document.createElement("label");

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

// ===============================
// Generate Prompt
// ===============================

function generatePrompt() {

    const selectedTopics =
        [...document.querySelectorAll(".topicCheckbox:checked")]
        .map(cb => cb.value);

    let prompt = "";

    prompt += `Generate a Physics worksheet.\n\n`;

    prompt += `Class: ${classSelect.value}\n`;

    prompt += `Chapter: ${chapterSearch.value}\n\n`;

    prompt += `Topics:\n`;

    selectedTopics.forEach(topic => {
        prompt += `- ${topic}\n`;
    });

    prompt += `\n`;

    prompt += `Apply CinePhysics Physics Standards.\n`;

    outputArea.value = prompt;
}

// ===============================
// Event Listeners
// ===============================

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

// Initial Load

loadChapters();

<button id="btnGeneratePrompt">
Generate Prompt
</button>

<button id="btnGenerateHTML">
Generate HTML Template
</button>

<button id="btnCopyOutput">
Copy Output
</button>
