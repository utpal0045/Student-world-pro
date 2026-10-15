const sectionIds = ["study", "ai", "scholarship", "career", "quiz", "calculator", "planner", "websites"];
let language = "en";

const notes = {
  education: `EDUCATION — শিক্ষা

শিক্ষা হৈছে ব্যক্তিৰ জ্ঞান, দক্ষতা, মূল্যবোধ আৰু ব্যক্তিত্বৰ বিকাশ সাধন কৰা এক জীৱনজোৰা প্ৰক্ৰিয়া।

শিক্ষাৰ কেইটামান উদ্দেশ্য:
১. জ্ঞানৰ বিকাশ।
২. ব্যক্তিত্বৰ বিকাশ।
৩. সামাজিক দায়িত্ববোধৰ সৃষ্টি।
৪. নৈতিক মূল্যবোধৰ বিকাশ।

এইটো এটা নমুনা টোকা; নিজৰ পাঠ্যক্ৰমৰ সৈতে মিলাই পঢ়িবা।`,
  sociology: `SOCIOLOGY — সমাজতত্ত্ব

সমাজতত্ত্ব হৈছে সমাজ, সামাজিক সম্পৰ্ক, সামাজিক গাঁথনি আৰু সামাজিক অনুষ্ঠানসমূহৰ বৈজ্ঞানিক অধ্যয়ন।

প্ৰধান বিষয়সমূহ:
১. সমাজ।
২. সংস্কৃতি।
৩. সামাজিকীকৰণ।
৪. সামাজিক পৰিৱৰ্তন।
৫. সামাজিক অনুষ্ঠান।

এইটো এটা নমুনা টোকা; নিজৰ পাঠ্যক্ৰমৰ সৈতে মিলাই পঢ়িবা।`,
  english: `ENGLISH — Starter Topics

1. Grammar
2. Vocabulary
3. Reading comprehension
4. Essay writing
5. Literature

Use this as a topic checklist and add notes from your syllabus.`,
  computer: `COMPUTER SCIENCE — কম্পিউটাৰ বিজ্ঞান

কম্পিউটাৰ হৈছে নিৰ্দেশ অনুসৰি তথ্য গ্ৰহণ, প্ৰক্ৰিয়াকৰণ আৰু ফলাফল প্ৰদান কৰা এটা ইলেক্ট্ৰনিক যন্ত্ৰ।

প্ৰধান বিষয়সমূহ:
১. Hardware
২. Software
৩. Operating System
৪. Internet
৫. HTML, CSS আৰু JavaScript`
};

const quizData = [
  { q: "What is the capital of India?", options: ["Mumbai", "New Delhi", "Kolkata", "Chennai"], correct: 1 },
  { q: "What does HTML stand for?", options: ["HyperText Markup Language", "HighText Machine Language", "Home Tool Markup Language", "Hyperlink Text Mode Language"], correct: 0 },
  { q: "Which planet is known as the Red Planet?", options: ["Venus", "Jupiter", "Mars", "Saturn"], correct: 2 },
  { q: "Which gas do plants absorb during photosynthesis?", options: ["Oxygen", "Carbon dioxide", "Nitrogen", "Hydrogen"], correct: 1 }
];
let quizIndex = 0;
let quizScore = 0;
let quizAnswered = false;

function openSection(id) {
  sectionIds.forEach(sectionId => document.getElementById(sectionId).classList.add("hidden"));
  document.getElementById("searchPanel").classList.add("hidden");
  const section = document.getElementById(id);
  if (!section) return;
  section.classList.remove("hidden");
  section.scrollIntoView({ behavior: "smooth", block: "start" });
}

document.querySelectorAll("[data-open]").forEach(button => {
  button.addEventListener("click", () => openSection(button.dataset.open));
});

document.getElementById("themeBtn").addEventListener("click", () => {
  document.body.classList.toggle("light");
  localStorage.setItem("studentWorldTheme", document.body.classList.contains("light") ? "light" : "dark");
});
if (localStorage.getItem("studentWorldTheme") === "light") document.body.classList.add("light");

document.getElementById("year").textContent = new Date().getFullYear();

document.getElementById("searchForm").addEventListener("submit", event => {
  event.preventDefault();
  const query = document.getElementById("searchInput").value.trim().toLowerCase();
  if (!query) {
    alert("Enter a search term first.");
    return;
  }
  const entries = [
    { id: "study", name: "Study Centre", terms: ["study", "notes", "education", "পঢ়া", "শিক্ষা", "sociology", "english"] },
    { id: "ai", name: "AI Assistant", terms: ["ai", "answer", "question", "প্ৰশ্ন", "উত্তৰ"] },
    { id: "scholarship", name: "Scholarship", terms: ["scholarship", "বৃত্তি"] },
    { id: "career", name: "Career Centre", terms: ["career", "job", "চাকৰি"] },
    { id: "quiz", name: "Quiz", terms: ["quiz", "mcq", "test"] },
    { id: "calculator", name: "Calculator", terms: ["calculator", "percentage", "marks", "শতাংশ"] },
    { id: "planner", name: "Study Planner", terms: ["planner", "routine", "task"] },
    { id: "websites", name: "Useful Websites", terms: ["website", "link", "online learning"] }
  ];
  const matches = entries.filter(entry => entry.terms.some(term => term.includes(query) || query.includes(term)));
  const results = document.getElementById("searchResults");
  results.replaceChildren();
  if (!matches.length) {
    const message = document.createElement("p");
    message.textContent = "No matching section. Try Study, AI, Scholarship, Career, Quiz or Calculator.";
    results.appendChild(message);
  } else {
    matches.forEach(entry => {
      const button = document.createElement("button");
      button.className = "gold-btn";
      button.textContent = "Open " + entry.name;
      button.addEventListener("click", () => openSection(entry.id));
      results.appendChild(button);
    });
  }
  document.getElementById("searchPanel").classList.remove("hidden");
  document.getElementById("searchPanel").scrollIntoView({ behavior: "smooth", block: "start" });
});

document.getElementById("showNotesBtn").addEventListener("click", () => {
  const key = document.getElementById("subjectSelect").value;
  const output = document.getElementById("notesOutput");
  output.textContent = notes[key] || "No sample note available.";
  output.classList.remove("hidden");
});

document.getElementById("askBtn").addEventListener("click", () => {
  const question = document.getElementById("questionInput").value.trim().toLowerCase();
  const output = document.getElementById("aiOutput");
  if (!question) {
    alert("Write a question first.");
    return;
  }
  let answer = "This starter demo does not have a built-in answer for that question. To answer a wide range of questions, connect a real AI service through a secure backend. Do not put secret API keys in this public website.";
  if (question.includes("socialization") || question.includes("সামাজিকীকৰণ")) {
    answer = "সামাজিকীকৰণ (Socialization)\n\nসামাজিকীকৰণ হৈছে এনে এক প্ৰক্ৰিয়া, যাৰ জৰিয়তে ব্যক্তিয়ে সমাজৰ ৰীতি-নীতি, মূল্যবোধ, আচৰণ আৰু সংস্কৃতি আয়ত্ত কৰে।\n\nপ্ৰধান মাধ্যম:\n১. পৰিয়াল\n২. শিক্ষানুষ্ঠান\n৩. সমনীয়া গোট\n৪. গণমাধ্যম";
  } else if (question.includes("education") || question.includes("শিক্ষা")) {
    answer = "শিক্ষা (Education)\n\nশিক্ষা হৈছে ব্যক্তিৰ জ্ঞান, দক্ষতা, মূল্যবোধ আৰু সামৰ্থ্যৰ বিকাশ সাধন কৰা এক জীৱনজোৰা প্ৰক্ৰিয়া।\n\nউদ্দেশ্য:\n১. জ্ঞানৰ বিকাশ\n২. ব্যক্তিত্বৰ বিকাশ\n৩. সামাজিক দায়িত্ববোধ\n৪. নৈতিক মূল্যবোধ";
  } else if (question.includes("html")) {
    answer = "HTML means HyperText Markup Language. It structures the content of webpages. CSS controls appearance, and JavaScript adds interactivity.";
  } else if (question.includes("pollution") || question.includes("প্ৰদূষণ")) {
    answer = "পৰিৱেশ প্ৰদূষণ হৈছে বায়ু, পানী বা মাটিৰ গুণাগুণৰ ক্ষতিকাৰক পৰিৱৰ্তন।\n\nপ্ৰধান প্ৰকাৰ:\n১. বায়ু প্ৰদূষণ\n২. জল প্ৰদূষণ\n৩. মাটি প্ৰদূষণ\n৪. শব্দ প্ৰদূষণ";
  }
  output.textContent = answer;
  output.classList.remove("hidden");
});
document.getElementById("clearQuestionBtn").addEventListener("click", () => {
  document.getElementById("questionInput").value = "";
  document.getElementById("aiOutput").textContent = "";
  document.getElementById("aiOutput").classList.add("hidden");
});

document.getElementById("calculateBtn").addEventListener("click", () => {
  const obtainedRaw = document.getElementById("obtainedMarks").value;
  const totalRaw = document.getElementById("totalMarks").value;
  const obtained = Number(obtainedRaw);
  const total = Number(totalRaw);
  const output = document.getElementById("calcOutput");
  if (obtainedRaw === "" || totalRaw === "" || total <= 0 || obtained < 0 || obtained > total) {
    output.textContent = "Enter valid marks. Obtained marks must be between 0 and total marks.";
  } else {
    output.textContent = "Percentage: " + ((obtained / total) * 100).toFixed(2) + "%";
  }
  output.classList.remove("hidden");
});

function renderQuiz() {
  const item = quizData[quizIndex];
  document.getElementById("quizQuestion").textContent = (quizIndex + 1) + ". " + item.q;
  const options = document.getElementById("quizOptions");
  options.replaceChildren();
  document.getElementById("quizResult").classList.add("hidden");
  document.getElementById("nextQuizBtn").textContent = quizIndex === quizData.length - 1 ? "Finish quiz" : "Next question";
  quizAnswered = false;
  item.options.forEach((option, index) => {
    const button = document.createElement("button");
    button.type = "button";
    button.textContent = option;
    button.addEventListener("click", () => {
      if (quizAnswered) return;
      quizAnswered = true;
      const result = document.getElementById("quizResult");
      if (index === item.correct) {
        quizScore++;
        result.textContent = "Correct! ✓";
      } else {
        result.textContent = "Correct answer: " + item.options[item.correct];
      }
      result.classList.remove("hidden");
    });
    options.appendChild(button);
  });
}
document.getElementById("nextQuizBtn").addEventListener("click", () => {
  if (quizIndex === quizData.length - 1) {
    document.getElementById("quizQuestion").textContent = "Quiz complete. Score: " + quizScore + " / " + quizData.length;
    document.getElementById("quizOptions").replaceChildren();
    document.getElementById("quizResult").classList.add("hidden");
    document.getElementById("nextQuizBtn").textContent = "Restart quiz";
    quizIndex = -1;
    quizScore = 0;
    return;
  }
  quizIndex++;
  renderQuiz();
});
renderQuiz();

let tasks = [];
try {
  const savedTasks = JSON.parse(localStorage.getItem("studentWorldTasks") || "[]");
  if (Array.isArray(savedTasks)) tasks = savedTasks.filter(task => typeof task === "string");
} catch (_) {
  tasks = [];
}
function saveTasks() {
  try {
    localStorage.setItem("studentWorldTasks", JSON.stringify(tasks));
  } catch (_) {
    // Planner still works during the current page session if storage is unavailable.
  }
}
function renderTasks() {
  const list = document.getElementById("taskList");
  list.replaceChildren();
  if (!tasks.length) {
    const empty = document.createElement("p");
    empty.textContent = "No tasks added yet.";
    list.appendChild(empty);
    return;
  }
  tasks.forEach((task, index) => {
    const row = document.createElement("div");
    row.className = "task-item";
    const label = document.createElement("span");
    label.textContent = task;
    const button = document.createElement("button");
    button.type = "button";
    button.className = "delete-btn";
    button.textContent = "Delete";
    button.addEventListener("click", () => {
      tasks.splice(index, 1);
      saveTasks();
      renderTasks();
    });
    row.append(label, button);
    list.appendChild(row);
  });
}
document.getElementById("taskForm").addEventListener("submit", event => {
  event.preventDefault();
  const input = document.getElementById("taskInput");
  const task = input.value.trim();
  if (!task) {
    alert("Enter a task first.");
    return;
  }
  tasks.push(task);
  saveTasks();
  renderTasks();
  input.value = "";
});
renderTasks();

document.getElementById("languageBtn").addEventListener("click", () => {
  language = language === "en" ? "as" : "en";
  document.documentElement.lang = language === "as" ? "as" : "en";
  document.querySelectorAll("[data-en]").forEach(element => {
    element.textContent = element.dataset[language];
  });
  document.querySelectorAll("[data-en-html]").forEach(element => {
    element.innerHTML = element.dataset[language + "Html"];
  });
  document.getElementById("languageBtn").textContent = language === "en" ? "অসমীয়া" : "English";
  document.getElementById("searchInput").placeholder = language === "en"
    ? "Search study, AI, scholarship, career..."
    : "পঢ়া, AI, বৃত্তি, কৰ্মজীৱন বিচাৰা...";
});
