const toolInfo = {
  chat: {
    title: "AI Chat Assistant",
    description: "Ask a question or explore an idea.",
    instruction: "Answer the following question clearly, accurately and helpfully."
  },
  writer: {
    title: "AI Content Writer",
    description: "Prepare an article, story, email or post.",
    instruction: "Write engaging, original content based on this request."
  },
  image: {
    title: "AI Image Generator",
    description: "Prepare a detailed prompt for an AI image model.",
    instruction: "Create a detailed image-generation prompt describing subject, setting, lighting, composition and style."
  },
  coding: {
    title: "AI Coding Assistant",
    description: "Explain a programming problem or code idea.",
    instruction: "Help solve the programming task. Explain the solution and provide code where appropriate."
  },
  study: {
    title: "AI Study Assistant",
    description: "Learn a topic or prepare study material.",
    instruction: "Teach this topic step by step in beginner-friendly language, with examples."
  },
  youtube: {
    title: "AI YouTube Assistant",
    description: "Prepare ideas, scripts and video descriptions.",
    instruction: "Help plan a YouTube video. Include a suitable title, script idea and description as requested."
  }
};

const search = document.getElementById("search");
const cards = [...document.querySelectorAll(".tool-card")];
const workspace = document.getElementById("workspace");
const toolTitle = document.getElementById("toolTitle");
const toolDescription = document.getElementById("toolDescription");
const promptInput = document.getElementById("prompt");
const resultBox = document.getElementById("resultBox");
const result = document.getElementById("result");
const status = document.getElementById("status");
const generateButton = document.getElementById("generateButton");
const copyButton = document.getElementById("copyButton");
const count = document.getElementById("count");
const noResults = document.getElementById("noResults");

let selectedTool = "";
let preparedPrompt = "";

search.addEventListener("input", () => {
  const query = search.value.trim().toLowerCase();
  let visible = 0;

  cards.forEach(card => {
    const content = (
      card.innerText + " " + card.dataset.terms
    ).toLowerCase();

    const match = content.includes(query);
    card.hidden = !match;

    if (match) visible++;
  });

  count.textContent = `${visible} tool${visible === 1 ? "" : "s"}`;
  noResults.hidden = visible !== 0;
});

cards.forEach(card => {
  const button = card.querySelector("button");

  button.addEventListener("click", () => {
    openTool(button.dataset.tool);
  });
});

function openTool(name) {
  if (!toolInfo[name]) return;

  selectedTool = name;
  toolTitle.textContent = toolInfo[name].title;
  toolDescription.textContent = toolInfo[name].description;

  promptInput.value = "";
  result.textContent = "";
  status.textContent = "";
  preparedPrompt = "";

  resultBox.hidden = true;
  copyButton.disabled = true;
  workspace.hidden = false;

  workspace.scrollIntoView({
    behavior: "smooth",
    block: "start"
  });
}

document.getElementById("backButton").addEventListener("click", () => {
  workspace.hidden = true;
  search.focus();
});

generateButton.addEventListener("click", () => {
  const userRequest = promptInput.value.trim();

  if (!userRequest) {
    status.textContent = "Please enter your request first.";
    promptInput.focus();
    return;
  }

  const instruction = toolInfo[selectedTool].instruction;

  preparedPrompt =
    instruction + "\n\nUser request:\n" + userRequest;

  result.textContent = preparedPrompt;
  resultBox.hidden = false;
  copyButton.disabled = false;

  status.textContent =
    "Prompt prepared. Real AI responses need a connected AI service.";
});

copyButton.addEventListener("click", async () => {
  try {
    await navigator.clipboard.writeText(preparedPrompt);
    status.textContent = "Prompt copied successfully.";
  } catch {
    status.textContent =
      "Automatic copy failed. Select the prepared text and copy it manually.";
  }
});