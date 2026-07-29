const stackContent = {
  context: {
    kicker: "QUESTION 01",
    title: "What did the agent know?",
    copy: "Context determines the decision surface. Identify the tenant, person, files, messages, record, and time window that shaped the action.",
    proof: "Context references + identity",
  },
  runtime: {
    kicker: "QUESTION 02",
    title: "Where did the action run?",
    copy: "The runtime owns orchestration, tools, memory, and execution. Scout and Tula make the OpenClaw substrate explicit instead of hiding it behind the interface.",
    proof: "Runtime version + execution trace",
  },
  skills: {
    kicker: "QUESTION 03",
    title: "What was it allowed to do?",
    copy: "A skill is a behavioral contract: when to trigger, when to refuse, which tools to use, and where human judgment must take over.",
    proof: "Skill contract + tool scope",
  },
  boundary: {
    kicker: "QUESTION 04",
    title: "How did data cross the boundary?",
    copy: "Wren makes the patient-data crossing inspectable: patient authorization, SMART on FHIR, ciphertext-only relay, and local decryption in the Tula workspace.",
    proof: "Consent + data-flow record",
  },
  evidence: {
    kicker: "QUESTION 05",
    title: "What behavior was tested?",
    copy: "Waza turns expectations into repeatable evidence across positive, refusal, privacy, adversarial, and deterministic golden tasks.",
    proof: "Eval spec + results + snapshot",
  },
  governance: {
    kicker: "QUESTION 06",
    title: "Can we reconstruct the outcome?",
    copy: "Identity, consent, policy, attention, approval, and audit connect release-time confidence to the reality of one agent taking one action.",
    proof: "Decision record + audit trail",
  },
};

const demoContent = {
  scout: {
    label: "LIVE DEMO 01",
    title: "Follow the action and the controls.",
    purpose: "Trace one Microsoft 365 task from context to tool boundary, approval, and evidence.",
    steps: [
      "Name the context Scout is using.",
      "Follow the action into the runtime and tool boundary.",
      "Pause on the sensitive-action approval.",
      "Show what an administrator could reconstruct.",
    ],
    line: "“The result is the least interesting part. Who acted, with which context, under which permission?”",
  },
  tula: {
    label: "LIVE DEMO 02",
    title: "Inspect the contract. Test it.",
    purpose: "Walk from Wren's encrypted data boundary to a Tula skill contract and its Waza evaluation evidence.",
    steps: [
      "Trace patient authorization through Wren to local FHIR.",
      "Open a Tula SKILL.md and name its boundaries.",
      "Inspect one PHI or adversarial evaluation task.",
      "Run or narrate the Waza release gate.",
    ],
    line: "“The skill is the behavioral contract. The eval suite is the executable argument that it still means something.”",
  },
  bridge: {
    label: "LIVE DEMO 03",
    title: "Trace one interaction across the bridge.",
    purpose: "Use the synthetic Trust Bridge to follow identity, consent, policy, attention, and audit.",
    steps: [
      "State clearly that the dashboard is synthetic.",
      "Pick one interaction and locate its identity and consent.",
      "Show the policy decision and human-attention state.",
      "Follow the audit evidence to the outcome.",
    ],
    line: "“Evaluation proves behavior before release. Governance explains what this agent did for this person.”",
  },
};

const byId = (id) => document.getElementById(id);

document.querySelectorAll(".stack-controls button").forEach((button) => {
  button.addEventListener("click", () => {
    document.querySelectorAll(".stack-controls button").forEach((item) => {
      item.setAttribute("aria-selected", String(item === button));
    });
    const item = stackContent[button.dataset.layer];
    byId("stage-kicker").textContent = item.kicker;
    byId("stage-title").textContent = item.title;
    byId("stage-copy").textContent = item.copy;
    byId("stage-proof").textContent = item.proof;
  });
});

document.querySelectorAll(".demo-tabs button").forEach((button) => {
  button.addEventListener("click", () => {
    document.querySelectorAll(".demo-tabs button").forEach((item) => {
      item.setAttribute("aria-selected", String(item === button));
    });
    const demo = demoContent[button.dataset.demo];
    byId("demo-label").textContent = demo.label;
    byId("demo-title").textContent = demo.title;
    byId("demo-purpose").textContent = demo.purpose;
    byId("demo-line").textContent = demo.line;
    byId("demo-steps").replaceChildren(
      ...demo.steps.map((step) => {
        const item = document.createElement("li");
        item.textContent = step;
        return item;
      }),
    );
  });
});

const traceButton = document.querySelector(".trace-button");
let traceTimer;
traceButton?.addEventListener("click", () => {
  window.clearInterval(traceTimer);
  const steps = [...document.querySelectorAll("[data-trace]")];
  steps.forEach((step) => step.classList.remove("active"));
  traceButton.textContent = "Tracing…";
  let index = 0;
  const advance = () => {
    steps.forEach((step, stepIndex) => {
      step.classList.toggle("active", stepIndex <= index);
    });
    index += 1;
    if (index >= steps.length) {
      window.clearInterval(traceTimer);
      traceButton.textContent = "Trace complete ✓";
      window.setTimeout(() => {
        traceButton.textContent = "Run the trace";
      }, 1800);
    }
  };
  advance();
  traceTimer = window.setInterval(advance, 520);
});

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 },
);

document.querySelectorAll(".reveal").forEach((element) => observer.observe(element));

const meter = document.querySelector(".scroll-meter span");
const updateProgress = () => {
  const available = document.documentElement.scrollHeight - window.innerHeight;
  const progress = available > 0 ? (window.scrollY / available) * 100 : 0;
  meter.style.width = `${Math.min(100, Math.max(0, progress))}%`;
};
window.addEventListener("scroll", updateProgress, { passive: true });
updateProgress();
