type Lesson = {
  topic: string;
  title: string;
  desc: string;
  concept: string;
  hint: string;
  code: string;
  tests: [string, RegExp][];
};
type State = { done: number[]; active: number; xp: number; streak: number };
const lessons: Lesson[] = [
  {
    topic: "HTML · FOUNDATION",
    title: "Semantic profile card",
    desc: "Create a meaningful article with a heading and biography.",
    concept:
      "Semantic elements describe purpose to browsers and assistive technology.",
    hint: "Use <article> for the card, followed by one <h2> and one <p>.",
    code: '<article class="profile">\n <h2>Sudesh Mehar</h2>\n <p>Full-stack developer building useful web experiences.</p>\n</article>',
    tests: [
      ["Uses an article", /<article/i],
      ["Includes a heading", /<h2/i],
      ["Includes a paragraph", /<p/i],
    ],
  },
  {
    topic: "HTML · ACCESSIBILITY",
    title: "Label a contact form",
    desc: "Connect every form control to a visible label.",
    concept: "A matching for/id pair gives the input an accessible name.",
    hint: 'Create label for="email" and input id="email" with type="email".',
    code: '<form>\n <label for="email">Email address</label>\n <input id="email" type="email" required>\n <button>Join</button>\n</form>',
    tests: [
      ["Has a label", /<label/i],
      ["Connects label", /for=["\']email/i],
      ["Uses email type", /type=["\']email/i],
    ],
  },
  {
    topic: "CSS · FLEXBOX",
    title: "Responsive action row",
    desc: "Align actions and let them wrap on small screens.",
    concept:
      "Flexbox distributes items in one direction; wrapping prevents overflow.",
    hint: "Apply display:flex, gap and flex-wrap:wrap.",
    code: '<style>.actions{display:flex;gap:12px;flex-wrap:wrap}button{padding:10px 16px}</style>\n<div class="actions"><button>Save</button><button>Preview</button></div>',
    tests: [
      ["Uses flex", /display\s*:\s*flex/i],
      ["Adds gap", /gap\s*:/i],
      ["Wraps items", /flex-wrap\s*:\s*wrap/i],
    ],
  },
  {
    topic: "CSS · GRID",
    title: "Auto-fitting card grid",
    desc: "Create columns that adapt without extra breakpoints.",
    concept: "minmax combines a safe minimum with flexible remaining space.",
    hint: "Use repeat(auto-fit,minmax(180px,1fr)).",
    code: '<style>.grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(180px,1fr));gap:12px}.grid div{padding:30px;background:#20243b}</style>\n<div class="grid"><div>One</div><div>Two</div><div>Three</div></div>',
    tests: [
      ["Uses grid", /display\s*:\s*grid/i],
      ["Uses auto-fit", /auto-fit/i],
      ["Uses minmax", /minmax/i],
    ],
  },
  {
    topic: "CSS · ACCESSIBILITY",
    title: "Visible keyboard focus",
    desc: "Give keyboard users a strong focus indicator.",
    concept:
      "focus-visible shows focus where it helps without distracting pointer users.",
    hint: "Style button:focus-visible with outline and outline-offset.",
    code: "<style>button{padding:12px 18px}button:focus-visible{outline:3px solid #8b5cf6;outline-offset:3px}</style>\n<button>Keyboard focus me</button>",
    tests: [
      ["Uses focus-visible", /:focus-visible/i],
      ["Adds outline", /outline\s*:/i],
      ["Offsets it", /outline-offset/i],
    ],
  },
  {
    topic: "JAVASCRIPT · DOM",
    title: "Interactive counter",
    desc: "Update a value when a button is clicked.",
    concept: "DOM events connect user actions to predictable state changes.",
    hint: "Select the button, listen for click and update textContent.",
    code: '<button id="add">Add point</button> <b id="score">0</b>\n<script>let n=0;document.querySelector("#add").addEventListener("click",()=>{document.querySelector("#score").textContent=String(++n)});<\/script>',
    tests: [
      ["Selects element", /querySelector/i],
      ["Listens for click", /addEventListener/i],
      ["Updates content", /textContent/i],
    ],
  },
  {
    topic: "JAVASCRIPT · DATA",
    title: "Filter a task list",
    desc: "Render only incomplete tasks.",
    concept:
      "Array filter creates a new collection without mutating the source.",
    hint: "Call tasks.filter and keep items where done is false.",
    code: '<ul id="tasks"></ul><script>const tasks=[{name:"Build UI",done:true},{name:"Test keyboard",done:false}];const open=tasks.filter(task=>!task.done);document.querySelector("#tasks").innerHTML=open.map(task=>`<li>${task.name}</li>`).join("");<\/script>',
    tests: [
      ["Uses filter", /\.filter\(/i],
      ["Checks done", /!task\.done/i],
      ["Maps output", /\.map\(/i],
    ],
  },
  {
    topic: "JAVASCRIPT · ASYNC",
    title: "Handle async failure",
    desc: "Load data and show a useful error state.",
    concept: "try/catch makes asynchronous failures visible and recoverable.",
    hint: "Use async/await in try/catch and update #status in catch.",
    code: '<p id="status">Loading…</p><script>async function load(){try{const r=await fetch("./data.json");if(!r.ok)throw new Error("Failed");document.querySelector("#status").textContent="Loaded"}catch(error){document.querySelector("#status").textContent="Could not load data"}}load();<\/script>',
    tests: [
      ["Async function", /async function/i],
      ["Awaits work", /await /i],
      ["Catches errors", /catch\s*\(/i],
    ],
  },
  {
    topic: "TYPESCRIPT · TYPES",
    title: "Model a project",
    desc: "Describe project data with a reusable interface.",
    concept: "Interfaces catch incorrectly typed fields before runtime.",
    hint: "Define interface Project and annotate the project constant.",
    code: '<pre>interface Project { title:string; completed:boolean; tags:string[] }\nconst project:Project={title:"CodeForge",completed:false,tags:["TypeScript"]};</pre>',
    tests: [
      ["Defines interface", /interface\s+Project/i],
      ["Uses string type", /title\s*:\s*string/i],
      ["Annotates value", /project\s*:\s*Project/i],
    ],
  },
  {
    topic: "PROJECT · FINAL",
    title: "Accessible notification",
    desc: "Combine semantic structure, states and resilient CSS.",
    concept:
      "Good components combine structure, behaviour and recovery—not appearance alone.",
    hint: 'Use role="status", aria-label and a focus-visible style.',
    code: '<style>.notice{display:flex;gap:12px;padding:16px;background:#171a2c}.notice button:focus-visible{outline:3px solid #22d3ee}</style>\n<div class="notice" role="status"><span>Project saved locally.</span><button aria-label="Dismiss notification">×</button></div>',
    tests: [
      ["Status role", /role=["\']status/i],
      ["Accessible name", /aria-label/i],
      ["Focus style", /:focus-visible/i],
    ],
  },
];
const el = <T extends HTMLElement>(id: string) =>
  document.getElementById(id) as T;
let state: State = JSON.parse(
  localStorage.getItem("codeforge-state") ||
    '{"done":[],"active":0,"xp":120,"streak":3}',
);
const lessonsEl = el("lessons"),
  courseBar = el("courseBar"),
  courseText = el("courseText"),
  xp = el("xp"),
  streak = el("streak"),
  topic = el("topic"),
  title = el("title"),
  description = el("description"),
  concept = el("concept"),
  code = el<HTMLTextAreaElement>("code"),
  hintbox = el("hintbox"),
  frame = el<HTMLIFrameElement>("frame"),
  tests = el("tests"),
  testState = el("testState");
function save() {
  localStorage.setItem("codeforge-state", JSON.stringify(state));
}
function renderNav() {
  lessonsEl.innerHTML = lessons
    .map(
      (l, i) =>
        `<button class="lesson-btn ${i === state.active ? "active" : ""} ${state.done.includes(i) ? "done" : ""}" data-i="${i}">${i + 1}. ${l.title}</button>`,
    )
    .join("");
  document.querySelectorAll<HTMLButtonElement>(".lesson-btn").forEach(
    (b) =>
      (b.onclick = () => {
        state.active = Number(b.dataset.i);
        save();
        render();
      }),
  );
  const p = Math.round((state.done.length / lessons.length) * 100);
  courseBar.style.width = p + "%";
  courseText.textContent = p + "% complete";
  xp.textContent = String(state.xp);
  streak.textContent = String(state.streak);
}
function render() {
  const l = lessons[state.active];
  topic.textContent = l.topic;
  title.textContent = l.title;
  description.textContent = l.desc;
  concept.textContent = l.concept;
  code.value = l.code;
  hintbox.style.display = "none";
  frame.srcdoc = l.code;
  tests.innerHTML = l.tests.map((t) => `<li>○ ${t[0]}</li>`).join("");
  testState.textContent = "Not tested";
  renderNav();
}
el<HTMLButtonElement>("run").onclick = () => {
  const l = lessons[state.active],
    value = code.value;
  frame.srcdoc = value;
  let ok = 0;
  tests.innerHTML = l.tests
    .map((t) => {
      const pass = t[1].test(value);
      if (pass) ok++;
      return `<li class="${pass ? "pass" : ""}">${pass ? "✓" : "×"} ${t[0]}</li>`;
    })
    .join("");
  if (ok === l.tests.length) {
    testState.textContent = "All tests passed";
    if (!state.done.includes(state.active)) {
      state.done.push(state.active);
      state.xp += 50;
      save();
    }
    renderNav();
  } else testState.textContent = `${ok}/${l.tests.length} passed`;
};
el<HTMLButtonElement>("hint").onclick = () => {
  hintbox.textContent = lessons[state.active].hint;
  hintbox.style.display = "block";
};
code.oninput = () => (frame.srcdoc = code.value);
el<HTMLButtonElement>("reset").onclick = () => {
  state = { done: [], active: 0, xp: 120, streak: 3 };
  save();
  render();
};
el<HTMLButtonElement>("export").onclick = () => {
  const report = {
    learner: "Sudesh Mehar",
    completed: state.done.map((i) => lessons[i].title),
    xp: state.xp,
    progress: `${Math.round((state.done.length / lessons.length) * 100)}%`,
  };
  const a = document.createElement("a");
  a.href = URL.createObjectURL(
    new Blob([JSON.stringify(report, null, 2)], { type: "application/json" }),
  );
  a.download = "codeforge-progress.json";
  a.click();
};
render();
