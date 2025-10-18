// 问题与选项
const questions = [
  {
    q: "Q1. 当你发现一个问题或危险时，你的第一反应是……",
    options: [
      { key: "A", text: "立刻冲上去解决问题，不拖延。", cell: "巨噬细胞" },
      { key: "B", text: "先冷静观察，分析规律再行动。", cell: "B细胞" },
      { key: "C", text: "专注于止损，帮助他人恢复。", cell: "血小板" },
      { key: "D", text: "瞬间热血沸腾，无法容忍伤害发生。", cell: "嗜酸性粒细胞" },
      { key: "E", text: "想办法让大家冷静下来，重新协作。", cell: "调节性T细胞" },
    ],
  },
  {
    q: "Q2. 在团队中，你更像是……",
    options: [
      { key: "A", text: "守护者——负责处理麻烦、保护大家。", cell: "巨噬细胞" },
      { key: "B", text: "学习者——收集信息，记住应对方式。", cell: "B细胞" },
      { key: "C", text: "修复者——修补损伤，让系统重新运作。", cell: "血小板" },
      { key: "D", text: "战士——为正义发声，对威胁绝不退缩。", cell: "嗜酸性粒细胞" },
      { key: "E", text: "调和者——平衡能量，让团队回归和谐。", cell: "调节性T细胞" },
    ],
  },
  {
    q: "Q3. 当周围变得混乱时……",
    options: [
      { key: "A", text: "我保持冷静，清理残局、稳定局势。", cell: "巨噬细胞" },
      { key: "B", text: "我边观察边学习，下一次会更聪明。", cell: "B细胞" },
      { key: "C", text: "我第一时间确认没人受伤并帮忙修复。", cell: "血小板" },
      { key: "D", text: "我立刻反击，必须阻止伤害或不公。", cell: "嗜酸性粒细胞" },
      { key: "E", text: "我出面劝和，防止情绪过度反应。", cell: "调节性T细胞" },
    ],
  },
  {
    q: "Q4. 最能驱动你的，是……",
    options: [
      { key: "A", text: "保护他人、清除危险。", cell: "巨噬细胞" },
      { key: "B", text: "学习、进化、掌握新挑战。", cell: "B细胞" },
      { key: "C", text: "修复、重建、帮助恢复。", cell: "血小板" },
      { key: "D", text: "维护公正，对抗威胁。", cell: "嗜酸性粒细胞" },
      { key: "E", text: "创造平衡，让系统和谐运转。", cell: "调节性T细胞" },
    ],
  },
  {
    q: "Q5. 如果你的能量是一种元素，它会是……",
    options: [
      { key: "A", text: "土——稳重、可靠、有力量。", cell: "巨噬细胞" },
      { key: "B", text: "水——灵活、有记忆、充满智慧。", cell: "B细胞" },
      { key: "C", text: "金——坚韧、精准、修复能力强。", cell: "血小板" },
      { key: "D", text: "火——热情、激烈、充满能量。", cell: "嗜酸性粒细胞" },
      { key: "E", text: "风——平静、流动、连接万物。", cell: "调节性T细胞" },
    ],
  },
];

// 结果文案
const cellDescriptions = {
  "巨噬细胞": "你像系统中的守护者，果断、可靠、能扛事。遇到问题先顶上，清除风险、稳定局势是你的强项。注意别把所有责任都揽在自己身上，学会分工你会更强。",
  "B细胞": "你是学习与记忆的化身，善于观察、归纳与迭代。你用方法论解决问题，做团队的知识库与策略家。别忘了在关键时刻及时出手，理论结合实践最有效。",
  "血小板": "你是温柔而坚定的修复者。关注创伤、快速补位、善于重建秩序。你让团队恢复如常。注意也给自己留出恢复时间，持续输出需要良好节奏。",
  "嗜酸性粒细胞": "你热忱而有锋芒，面对不公或威胁从不后退。你为边界发声、敢于对抗。也要留意适度与节制，正确引导能量，你将成为最可靠的战士。",
  "调节性T细胞": "你是平衡器与协调者，擅长化解冲突、优化系统。你让不同声音共存并达成共识。记得在必要时给出清晰边界，和谐也需要原则。",
};

// 状态
let current = 0;
let answers = new Array(questions.length).fill(null); // 存 cell 名称
const progressText = document.getElementById("progressText");
const progressBar = document.getElementById("progressBar");
const questionText = document.getElementById("questionText");
const optionsBox = document.getElementById("options");

const intro = document.getElementById("intro");
const quiz = document.getElementById("quiz");
const result = document.getElementById("result");

const startBtn = document.getElementById("startBtn");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const submitBtn = document.getElementById("submitBtn");
const retryBtn = document.getElementById("retryBtn");
const copyBtn = document.getElementById("copyBtn");

const resultBadge = document.getElementById("resultBadge");
const resultDesc = document.getElementById("resultDesc");
const scoreList = document.getElementById("scoreList");

function showSection(name) {
  intro.classList.remove("visible");
  quiz.classList.remove("visible");
  result.classList.remove("visible");
  if (name === "intro") intro.classList.add("visible");
  if (name === "quiz") quiz.classList.add("visible");
  if (name === "result") result.classList.add("visible");
}

function renderQuestion() {
  const q = questions[current];
  questionText.textContent = q.q;
  progressText.textContent = `题目 ${current + 1} / ${questions.length}`;
  progressBar.style.width = `${((current) / questions.length) * 100}%`;

  optionsBox.innerHTML = "";
  q.options.forEach((opt, idx) => {
    const div = document.createElement("button");
    div.type = "button";
    div.className = "option";
    div.innerHTML = `<span class="label">${opt.key}.</span> ${opt.text} <span class="tag">（→ ${opt.cell}）</span>`;
    if (answers[current] && answers[current] === opt.cell) div.classList.add("selected");
    div.addEventListener("click", () => {
      answers[current] = opt.cell;
      Array.from(optionsBox.children).forEach(c => c.classList.remove("selected"));
      div.classList.add("selected");
      updateNavState();
    });
    optionsBox.appendChild(div);
  });

  updateNavState();
}

function updateNavState() {
  prevBtn.disabled = current === 0;
  const answered = answers[current] !== null;
  nextBtn.disabled = !answered && current < questions.length - 1;
  if (current === questions.length - 1) {
    nextBtn.style.display = "none";
    submitBtn.style.display = "inline-block";
  } else {
    nextBtn.style.display = "inline-block";
    submitBtn.style.display = "none";
  }
}

function calcScores() {
  const score = {};
  Object.keys(cellDescriptions).forEach(k => score[k] = 0);
  answers.forEach(cell => {
    if (cell) score[cell]++;
  });
  return score;
}

function computeResult(score) {
  // 找到最高分
  const entries = Object.entries(score);
  const max = Math.max(...entries.map(([_, v]) => v));
  const tops = entries.filter(([_, v]) => v === max).map(([k]) => k);
  return { max, tops };
}

function showResult() {
  const score = calcScores();
  const { max, tops } = computeResult(score);

  if (max === 0 || answers.includes(null)) {
    alert("还有题目未作答哦～");
    return;
  }

  let title, desc;
  if (tops.length === 1) {
    title = tops[0];
    desc = cellDescriptions[tops[0]];
  } else {
    title = `混合型：${tops.join(" + ")}`;
    desc = "你兼具多种免疫风格的特质。不同情境下，你会激活不同的“细胞角色”，这让你更具适应性。";
  }

  resultBadge.textContent = title;
  resultDesc.textContent = desc;

  // 分数列表
  scoreList.innerHTML = "";
  Object.entries(score).sort((a,b)=>b[1]-a[1]).forEach(([k,v])=>{
    const li = document.createElement("li");
    li.textContent = `${k}：${v} 分`;
    scoreList.appendChild(li);
  });

  progressBar.style.width = "100%";
  showSection("result");

  // 本地存储
  try {
    localStorage.setItem("immune-answers", JSON.stringify(answers));
  } catch {}
}

startBtn?.addEventListener("click", () => {
  answers = new Array(questions.length).fill(null);
  current = 0;
  renderQuestion();
  showSection("quiz");
});

prevBtn.addEventListener("click", () => {
  if (current > 0) current--;
  renderQuestion();
});

nextBtn.addEventListener("click", () => {
  if (answers[current] == null) return;
  if (current < questions.length - 1) {
    current++;
    renderQuestion();
  }
});

submitBtn.addEventListener("click", showResult);

retryBtn.addEventListener("click", () => {
  answers = new Array(questions.length).fill(null);
  current = 0;
  renderQuestion();
  showSection("quiz");
});

copyBtn.addEventListener("click", async () => {
  const score = calcScores();
  const { max, tops } = computeResult(score);
  const title = tops.length === 1 ? tops[0] : `混合型：${tops.join(" + ")}`;
  const desc = tops.length === 1 ? cellDescriptions[tops[0]] : "你兼具多种免疫风格的特质。";
  const share = `【免疫细胞人格测试】我的结果：${title}\n${desc}\n——试试你像哪种免疫细胞？`;
  try {
    await navigator.clipboard.writeText(share);
    alert("结果已复制到剪贴板，去分享吧！");
  } catch {
    // 兼容不支持剪贴板 API 的环境
    prompt("复制以下结果：", share);
  }
});

// 如果有历史答案，允许快速恢复
try {
  const saved = localStorage.getItem("immune-answers");
  if (saved) answers = JSON.parse(saved);
} catch {}

renderQuestion();
showSection("intro");
