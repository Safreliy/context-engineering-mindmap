const data = window.MINDMAP_DATA;

const BOARD = {
  width: 4400,
  height: 4400,
  centerX: 2200,
  centerY: 2200,
  radii: [0, 500, 1120, 1760, 2360]
};

const HIERARCHY_ENRICHMENTS = {
  definition: [
    {
      id: "definition-four-levers",
      title: "Write / Select / Compress / Isolate",
      tags: ["основа", "mental-model"],
      summary: "Удобная рамка: что записать во внешнее состояние, что выбрать в окно, что сжать и что изолировать в отдельный запуск.",
      why: "Она связывает поиск, память, Compaction и сабагентов в одну систему решений, а не в набор разрозненных техник.",
      example: "Write — decisions.md; Select — 3 релевантных файла; Compress — краткая сводка старых логов; Isolate — отдельный исследовательский сабагент.",
      insights: [
        "Почти любую технику карты можно свести к одному из этих четырех действий.",
        "Если решение не укладывается в рамку, обычно неясно, каким именно ресурсом оно управляет."
      ],
      sourceIds: ["langchain-context", "anthropic-agents", "anthropic-multi-agent"]
    },
    {
      id: "definition-instructions",
      title: "Инструкции и правила",
      tags: ["основа", "state"],
      summary: "Системный промпт, правила проекта и локальные ограничения среды.",
      why: "Это определяет рамку поведения ещё до поиска и инструментов.",
      example: "Агент заранее знает стиль кода, политику песочницы и ожидаемую форму ответа.",
      insights: ["Правила стоит держать отдельно от шумного рабочего контекста."],
      sourceIds: ["anthropic-context", "anthropic-agents"]
    },
    {
      id: "definition-observations",
      title: "Наблюдения и результаты",
      tags: ["основа", "tooling"],
      summary: "Поиск, чтение файлов, stdout, тесты, diff и ответы внешних сервисов.",
      why: "Этот слой быстрее всего раздувает окно и требует отдельной политики удержания.",
      example: "Результат pytest и grep одновременно становятся контекстом следующего шага.",
      insights: ["Выводы инструментов редко одинаково полезны во времени."],
      sourceIds: ["anthropic-context-management", "mcp-intro"]
    }
  ],
  goals: [
    {
      id: "goals-quality",
      title: "Качество решения",
      tags: ["основа", "metrics"],
      summary: "Контекст должен повышать вероятность правильного решения, а не только экономить токены.",
      why: "Дешёвая политика контекста бесполезна, если падает доля успешных решений.",
      example: "Лучше сохранить трассировку падения, чем длинный пересказ предыдущих сообщений.",
      insights: ["Полезный сигнал важнее объёма."],
      sourceIds: ["anthropic-context", "swe-bench"]
    },
    {
      id: "goals-economics",
      title: "Стоимость и задержка",
      tags: ["основа", "metrics"],
      summary: "Хорошая система уменьшает лишние токены и лишние обращения к инструментам.",
      why: "Контекстный дизайн напрямую влияет на цену и время решения.",
      example: "Выборочное чтение дешевле, чем полное чтение файла с последующим сжатием.",
      insights: ["Путь поиска влияет на стоимость так же, как длина ответа."],
      sourceIds: ["anthropic-context", "langchain-context"]
    }
  ],
  "lexical-search": [
    {
      id: "lexical-identifiers",
      title: "Поиск по идентификаторам",
      tags: ["retrieval", "exact"],
      summary: "Поиск по именам функций, классов, полей и констант.",
      why: "Это самый надёжный старт для локализации кода вокруг конкретного символа.",
      example: "Найти все упоминания `ContextPolicy` в проекте.",
      insights: ["Почти всегда дешевле векторного поиска."],
      sourceIds: ["langchain-context"]
    },
    {
      id: "lexical-regex",
      title: "Regex и поиск по путям",
      tags: ["retrieval", "exact"],
      summary: "Регулярки и пути помогают быстро сузить пространство чтения.",
      why: "Иногда нужен не смысл, а точный шаблон и место хранения.",
      example: "Искать `retry` только в `infra/**`.",
      insights: ["Полезно на этапе разбора задачи."],
      sourceIds: ["langchain-context"]
    }
  ],
  "semantic-search": [
    {
      id: "semantic-embeddings",
      title: "Embeddings",
      tags: ["retrieval", "semantic"],
      summary: "Запрос и код сравниваются в векторном пространстве.",
      why: "Это помогает, когда слова не совпадают, а роль участка кода совпадает.",
      example: "Найти косвенную реализацию ограничения частоты запросов.",
      insights: ["Лучше работает вместе с дополнительным переупорядочиванием результатов."],
      sourceIds: ["graphrag", "langchain-context"]
    },
    {
      id: "semantic-rerank",
      title: "Reranking",
      tags: ["retrieval", "semantic"],
      summary: "Второй этап переоценивает кандидатов по реальной близости к задаче.",
      why: "Без переупорядочивания семантический поиск часто приносит красивый, но ложный шум.",
      example: "Сначала взять 20 кандидатов, потом переупорядочить их по близости к задаче.",
      insights: ["Для кода гибридный подход почти всегда устойчивее чисто векторного."],
      sourceIds: ["graphrag", "langchain-context"]
    }
  ],
  prevention: [
    {
      id: "prevention-scoping",
      title: "Phase scoping",
      tags: ["budget", "prevention"],
      summary: "Каждый этап видит только свой тип контекста и свой набор tools.",
      why: "Это уменьшает смешение diagnosis, design и implementation в одном окне.",
      example: "Во время triage агент не тянет редакторские артефакты.",
      insights: ["Разделение по фазам уменьшает шум."],
      sourceIds: ["anthropic-agents", "langchain-context"]
    },
    {
      id: "prevention-limits",
      title: "Bounded exploration",
      tags: ["budget", "prevention"],
      summary: "Лимиты на число чтений, глубину поиска и rounds.",
      why: "Агент не должен бесконечно собирать контекст до начала работы.",
      example: "Не больше 8 файлов до первой гипотезы.",
      insights: ["Подталкивает к раннему синтезу выводов."],
      sourceIds: ["anthropic-agents"]
    }
  ],
  cure: [
    {
      id: "cure-thresholds",
      title: "Threshold triggers",
      tags: ["budget", "cure"],
      summary: "Compaction запускается по порогу токенов, сообщений или размера outputs.",
      why: "Без явного триггера cure-политика становится непредсказуемой.",
      example: "На 70% окна сохранить рабочее состояние и очистить старые выводы.",
      insights: ["Порог должен оставлять буфер."],
      sourceIds: ["anthropic-context-management"]
    },
    {
      id: "cure-reinjection",
      title: "Reinjection",
      tags: ["budget", "cure"],
      summary: "Сжатое состояние должно удобно возвращаться в рабочий контекст.",
      why: "Плохой Reinjection ломает непрерывность работы даже при хорошей сводке.",
      example: "В новый ход попадает короткий блок состояния и ссылки на артефакты.",
      insights: ["Сводка без Reinjection бесполезна."],
      sourceIds: ["anthropic-context", "anthropic-context-management"]
    }
  ],
  compaction: [
    {
      id: "compaction-state",
      title: "Сводка рабочего состояния",
      tags: ["compression", "runtime"],
      summary: "Сохраняются цель, статус, активные файлы, гипотезы и препятствия.",
      why: "Именно это нужно для следующего шага, а не литературный пересказ беседы.",
      example: "Список проверенных файлов и текущий путь падения вместо полной истории.",
      insights: ["Состояние важнее рассказа."],
      sourceIds: ["anthropic-context", "anthropic-context-management"]
    },
    {
      id: "compaction-artifacts",
      title: "Ссылки на артефакты",
      tags: ["compression", "artifact"],
      summary: "Большие материалы лучше выносить в адресуемые артефакты и реинжектить по необходимости.",
      why: "Так снижается риск потери деталей при чрезмерном сжатии.",
      example: "Полный лог тестов лежит в файле, а в окне только краткая выжимка.",
      insights: ["Не всё должно жить inline."],
      sourceIds: ["anthropic-context-management"]
    }
  ],
  "durable-memory": [
    {
      id: "durable-decisions",
      title: "Журнал решений",
      tags: ["memory", "artifact"],
      summary: "Журнал архитектурных решений и принятых ограничений.",
      why: "Позволяет не переобсуждать уже зафиксированные решения.",
      example: "Записать, почему выбрали hybrid retrieval вместо pure semantic search.",
      insights: ["Полезно при передаче работы другому агенту."],
      sourceIds: ["anthropic-agents"]
    },
    {
      id: "durable-checkpoints",
      title: "Контрольные точки",
      tags: ["memory", "artifact"],
      summary: "Снимки промежуточного состояния задачи и ключевых результатов.",
      why: "Если сессия оборвалась, агент может восстановиться быстрее.",
      example: "Контрольная точка после разбора задачи и до правок кода.",
      insights: ["Снижают цену рестарта."],
      sourceIds: ["anthropic-context-management"]
    }
  ],
  harness: [
    {
      id: "harness-prompt-stack",
      title: "Prompt stack",
      tags: ["runtime", "harness"],
      summary: "Слой системных правил, правил проекта, рабочих инструкций и контрактов инструментов.",
      why: "Порядок и границы этих слоёв влияют на поведение не меньше модели.",
      example: "Системные правила отделены от проектных указаний и временного состояния задачи.",
      insights: ["Stack должен быть детерминированным."],
      sourceIds: ["anthropic-agents", "anthropic-context"]
    },
    {
      id: "harness-loop",
      title: "Рабочий цикл",
      tags: ["runtime", "harness"],
      summary: "Решает, когда читать, когда действовать, когда суммировать и когда завершать цикл.",
      why: "Именно рабочий цикл превращает модель в устойчивого агента.",
      example: "Прочитать -> оценить -> сделать -> проверить -> сжать -> продолжить.",
      insights: ["Рабочий цикл влияет и на стоимость, и на корректность."],
      sourceIds: ["react", "anthropic-agents"]
    }
  ],
  subagents: [
    {
      id: "subagents-artifacts",
      title: "Артефакты вместо пересказа",
      tags: ["runtime", "multi-agent", "artifact"],
      summary: "Сабагенты лучше возвращают файлы, таблицы и структурированные результаты, а не длинный словесный пересказ.",
      why: "Это уменьшает потери при передаче работы и не раздувает главный контекст длинным следом побочных действий.",
      example: "Исследовательский сабагент сохраняет `notes.md` и отдаёт координатору только итог плюс путь к артефакту.",
      insights: [
        "Файловые артефакты уменьшают эффект испорченного телефона.",
        "Координатор должен видеть вывод сабагента как компактный результат, а не как полную историю."
      ],
      sourceIds: ["anthropic-multi-agent", "anthropic-agents"]
    }
  ],
  mcp: [
    {
      id: "mcp-servers",
      title: "Серверы и возможности",
      tags: ["mcp", "protocol"],
      summary: "Серверы публикуют инструменты, ресурсы и промпты как слои возможностей.",
      why: "Это создаёт стабильный контракт между агентом и внешним миром.",
      example: "Один сервер обслуживает локальные файлы, другой корпоративные документы.",
      insights: ["Граница возможностей помогает безопасности."],
      sourceIds: ["mcp-intro", "mcp-spec"]
    },
    {
      id: "mcp-clients",
      title: "Клиенты и координация",
      tags: ["mcp", "runtime"],
      summary: "Клиент решает, какие MCP-возможности реально подать в контекст и когда их вызвать.",
      why: "Наличие инструментов не означает, что их нужно держать в промпте постоянно.",
      example: "Клиент подгружает только релевантные описания инструментов по задаче.",
      insights: ["Клиентский слой тоже часть контекстной инженерии."],
      sourceIds: ["mcp-intro", "anthropic-context"]
    }
  ],
  "tool-safety": [
    {
      id: "tool-trust-boundaries",
      title: "Доверенный и недоверенный контекст",
      tags: ["tooling", "security"],
      summary: "Нельзя смешивать системные правила, намерение пользователя и внешние результаты инструментов так, будто это один и тот же уровень доверия.",
      why: "Описания, пометки и извлечённый контент могут содержать шум или враждебные инструкции и должны проходить через отдельные правила.",
      example: "Результат из веба не переписывает политику агента, а становится кандидатом в доказательства, который ещё нужно оценить.",
      insights: ["Слой доверия должен быть виден и в стеке инструкций, и в подтверждениях действий."],
      sourceIds: ["mcp-spec", "anthropic-tools"]
    },
    {
      id: "tool-least-privilege",
      title: "Минимальные права и понятные имена",
      tags: ["tooling", "security", "schema"],
      summary: "Разделяй чтение, запись, выполнение и внешние действия на отдельные блоки возможностей с понятными именами.",
      why: "Так модели проще выбрать правильный инструмент, а системе проще ставить подтверждения и анализировать риск.",
      example: "`search_docs`, `read_file` и `apply_patch` безопаснее и понятнее, чем один универсальный инструмент на всё сразу.",
      insights: ["Хорошо названные инструменты уменьшают и шум, и риск."],
      sourceIds: ["anthropic-tools", "mcp-spec"]
    }
  ],
  "outcome-metrics": [
    {
      id: "metric-solve-rate",
      title: "Доля успешных решений",
      tags: ["evaluation", "metrics"],
      summary: "Доля задач, которые агент реально доводит до успешного результата.",
      why: "Это главный пользовательский критерий полезности.",
      example: "Задача закрыта патчем и тесты проходят.",
      insights: ["Доли успеха без учёта стоимости недостаточно."],
      sourceIds: ["swe-bench", "terminal-bench"]
    },
    {
      id: "metric-cost-latency",
      title: "Стоимость и задержка",
      tags: ["evaluation", "metrics"],
      summary: "Сколько времени и токенов тратится на один успешный исход.",
      why: "Контекстная политика почти всегда влияет на обе метрики.",
      example: "Один агент решает столько же задач, но вдвое дороже.",
      insights: ["Успех без экономики трудно масштабировать."],
      sourceIds: ["swe-bench", "terminal-bench"]
    }
  ],
  "process-metrics": [
    {
      id: "process-retrieval-quality",
      title: "Качество поиска",
      tags: ["evaluation", "process", "retrieval"],
      summary: "Важно измерять не только полноту поиска, но и то, использовал ли агент найденный контекст в решении.",
      why: "Агент может добыть нужный файл и всё равно проигнорировать его при правке или в ответе.",
      example: "Логировать: эталонный файл найден, открыт, упомянут в рассуждении, повлиял на патч.",
      insights: ["'Нашёл' и 'использовал' — разные события."],
      sourceIds: ["langchain-context", "anthropic-agents"]
    },
    {
      id: "process-compaction-faithfulness",
      title: "Точность Compaction",
      tags: ["evaluation", "process", "compression"],
      summary: "После сжатия нужно проверять сохранность ограничений, решений, путей и незакрытых вопросов.",
      why: "Именно здесь хорошие долгоживущие агенты отделяются от тех, что красиво теряют смысл через несколько ходов.",
      example: "Проверочный вопрос: какой падающий тест сейчас главный, какие файлы критичны, что уже исключили.",
      insights: ["Низкая стоимость Compaction бессмысленна без точности."],
      sourceIds: ["anthropic-context-management", "langchain-context"]
    }
  ]
};

function normalizeNode(rawNode, parent = null, depth = 0, path = []) {
  const mergedChildren = [...(rawNode.children || []), ...(HIERARCHY_ENRICHMENTS[rawNode.id] || [])];
  const node = {
    ...rawNode,
    color: rawNode.color || parent?.color || "#0f766e",
    parentId: parent?.id || null,
    depth,
    path: [...path, rawNode.title]
  };
  node.children = mergedChildren.map((child) => normalizeNode(child, node, depth + 1, node.path));
  return node;
}

const treeRoot = normalizeNode({
  ...data.root,
  children: [...data.clusters].sort((a, b) => (a.angle || 0) - (b.angle || 0))
});

const allNodes = [];
const nodeMap = {};

function collectNodes(node) {
  allNodes.push(node);
  nodeMap[node.id] = node;
  node.children.forEach(collectNodes);
}

collectNodes(treeRoot);

const defaultExpandedIds = allNodes.filter((node) => node.children.length).map((node) => node.id);

const state = {
  selectedNodeId: treeRoot.id,
  filter: "all",
  search: "",
  expanded: new Set(defaultExpandedIds),
  manualOffsets: {},
  scale: 1,
  tx: 0,
  ty: 0,
  isDragging: false,
  dragStartX: 0,
  dragStartY: 0,
  dragOriginX: 0,
  dragOriginY: 0,
  draggedNodeId: null,
  nodeDragMoved: false,
  nodeDragStartOffsetX: 0,
  nodeDragStartOffsetY: 0,
  pointerNodeId: null
};

const viewport = document.getElementById("viewport");
const board = document.getElementById("board");
const nodeLayer = document.getElementById("node-layer");
const connections = document.getElementById("connections");
const chips = Array.from(document.querySelectorAll(".chip"));

board.style.width = `${BOARD.width}px`;
board.style.height = `${BOARD.height}px`;
connections.setAttribute("viewBox", `0 0 ${BOARD.width} ${BOARD.height}`);

function shorten(text, limit) {
  if (!text || text.length <= limit) return text || "";
  return `${text.slice(0, limit - 3).trim()}...`;
}

function makeSourceLink(source) {
  const link = document.createElement("a");
  link.className = "source-link";
  link.href = source.url;
  link.target = "_blank";
  link.rel = "noreferrer";
  link.innerHTML = `
    <span class="source-kind">${source.kind}</span>
    <strong>${source.title}</strong>
    <span>${source.publisher}</span>
  `;
  return link;
}

function makeVizText(tagName, className, text) {
  const el = document.createElement(tagName);
  el.className = className;
  el.textContent = text;
  return el;
}

let activeVizCleanup = null;

function setVizDelay(el, delayMs) {
  el.style.animationDelay = `${delayMs}ms`;
}

function makeVizChip(item, extraClass = "", delayMs = 0) {
  const chip = document.createElement("div");
  chip.className = `viz-chip ${extraClass}`.trim();
  chip.dataset.tone = item.tone || "default";
  setVizDelay(chip, delayMs);
  if (item.title) {
    const strong = document.createElement("strong");
    strong.textContent = item.title;
    chip.appendChild(strong);
  }
  chip.append(item.text || "");
  return chip;
}

function makeVizMeter(label, percent, state) {
  const wrap = document.createElement("div");
  wrap.className = "viz-flow";

  const meter = document.createElement("div");
  meter.className = "viz-meter";
  const fill = document.createElement("div");
  fill.className = "viz-meter-fill";
  fill.dataset.state = state;
  fill.style.width = `${percent}%`;
  meter.appendChild(fill);

  const labels = document.createElement("div");
  labels.className = "viz-meter-labels";
  labels.appendChild(makeVizText("span", "", label));
  labels.appendChild(makeVizText("span", "", `${percent}% окна`));

  wrap.appendChild(meter);
  wrap.appendChild(labels);
  return wrap;
}

function renderCompactionViz(viz) {
  const root = document.createElement("div");
  root.className = "detail-viz";
  const caption = makeVizText("p", "viz-caption", viz.caption);
  setVizDelay(caption, 20);
  root.appendChild(caption);

  const loop = document.createElement("div");
  loop.className = "viz-compaction-loop";

  const controls = document.createElement("div");
  controls.className = "viz-controls";
  setVizDelay(controls, 50);

  const playButton = document.createElement("button");
  playButton.type = "button";
  playButton.className = "viz-control-btn viz-play-btn";
  playButton.textContent = "❚❚";
  controls.appendChild(playButton);

  const stepper = document.createElement("div");
  stepper.className = "viz-stepper";
  const stepButtons = (viz.stages || []).map((title, index) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "viz-step-btn";
    button.textContent = `${index + 1}. ${title}`;
    stepper.appendChild(button);
    return button;
  });
  controls.appendChild(stepper);
  loop.appendChild(controls);

  const status = makeVizText("div", "viz-loop-status", "");
  setVizDelay(status, 70);
  loop.appendChild(status);

  const stages = document.createElement("div");
  stages.className = "viz-stage-row";
  const stageItems = (viz.stages || []).map((title, index) => {
    const item = document.createElement("div");
    item.className = "viz-stage";
    setVizDelay(item, 100 + index * 60);
    const step = makeVizText("span", "viz-stage-step", `${index + 1}`);
    const label = makeVizText("strong", "viz-stage-label", title);
    item.appendChild(step);
    item.appendChild(label);
    stages.appendChild(item);
    return item;
  });
  loop.appendChild(stages);

  const meterWrap = document.createElement("div");
  meterWrap.className = "viz-live-meter";
  setVizDelay(meterWrap, 250);

  const meter = document.createElement("div");
  meter.className = "viz-meter viz-meter-live";
  const fill = document.createElement("div");
  fill.className = "viz-meter-fill";
  fill.dataset.state = "safe";
  fill.style.width = `${viz.startMeterPercent}%`;
  meter.appendChild(fill);

  const threshold = document.createElement("div");
  threshold.className = "viz-threshold-marker";
  threshold.style.left = `${viz.thresholdPercent}%`;
  threshold.appendChild(makeVizText("span", "viz-threshold-label", `${viz.thresholdPercent}%`));
  meter.appendChild(threshold);
  meterWrap.appendChild(meter);

  const meterLabels = document.createElement("div");
  meterLabels.className = "viz-meter-labels";
  const meterLabel = makeVizText("span", "", "");
  const meterValue = makeVizText("span", "", "");
  meterLabels.appendChild(meterLabel);
  meterLabels.appendChild(meterValue);
  meterWrap.appendChild(meterLabels);
  loop.appendChild(meterWrap);

  const stageFlow = document.createElement("div");
  stageFlow.className = "viz-flow-row";
  stageFlow.appendChild(makeVizChip(viz.before, "is-enter is-warning", 320));
  stageFlow.appendChild(makeVizText("div", "viz-arrow", "→"));
  stageFlow.appendChild(makeVizChip(viz.transform, "is-enter is-glow", 380));
  stageFlow.appendChild(makeVizText("div", "viz-arrow", "→"));
  stageFlow.appendChild(makeVizChip(viz.after, "is-enter is-glow", 440));
  loop.appendChild(stageFlow);

  const panels = document.createElement("div");
  panels.className = "viz-compaction-panels";

  const windowPanel = document.createElement("div");
  windowPanel.className = "viz-column";
  windowPanel.appendChild(makeVizText("h4", "", viz.windowTitle || "Активное окно"));
  const lines = (viz.windowLines || []).map((line, index) => {
    const item = makeVizText("div", "viz-live-line", line.text);
    if (line.old) item.classList.add("is-old");
    setVizDelay(item, 500 + index * 50);
    windowPanel.appendChild(item);
    return item;
  });
  const reinjectedLine = makeVizText(
    "div",
    "viz-live-line viz-live-line-reinjected is-collapsed",
    viz.reinjectedLine || "Компактное состояние прошлого цикла"
  );
  setVizDelay(reinjectedLine, 740);
  windowPanel.appendChild(reinjectedLine);

  const summaryPanel = document.createElement("div");
  summaryPanel.className = "viz-column";
  summaryPanel.appendChild(makeVizText("h4", "", viz.summaryTitle || "Компактное состояние"));
  const summary = document.createElement("div");
  summary.className = "viz-live-summary";
  (viz.summaryLines || []).forEach((line, index) => {
    const item = makeVizText("div", "viz-line", line);
    setVizDelay(item, 620 + index * 40);
    summary.appendChild(item);
  });
  summaryPanel.appendChild(summary);

  panels.appendChild(windowPanel);
  panels.appendChild(summaryPanel);
  loop.appendChild(panels);

  root.appendChild(loop);
  root._compactionViz = {
    status,
    stageItems,
    playButton,
    stepButtons,
    fill,
    meterLabel,
    meterValue,
    lines,
    reinjectedLine,
    summary,
    threshold
  };
  return root;
}

function renderPruningViz(viz) {
  const root = document.createElement("div");
  root.className = "detail-viz";
  const caption = makeVizText("p", "viz-caption", viz.caption);
  setVizDelay(caption, 20);
  root.appendChild(caption);

  const compare = document.createElement("div");
  compare.className = "viz-compare";

  const before = document.createElement("div");
  before.className = "viz-column";
  setVizDelay(before, 90);
  before.appendChild(makeVizText("h4", "", viz.beforeTitle));
  viz.beforeLines.forEach((line, index) => {
    const item = makeVizText("div", "viz-line", line);
    setVizDelay(item, 140 + index * 60);
    before.appendChild(item);
  });

  const after = document.createElement("div");
  after.className = "viz-column";
  setVizDelay(after, 180);
  after.appendChild(makeVizText("h4", "", viz.afterTitle));
  viz.afterLines.forEach((line, index) => {
    const item = makeVizText("div", "viz-line", line);
    setVizDelay(item, 230 + index * 60);
    after.appendChild(item);
  });

  compare.appendChild(before);
  compare.appendChild(after);
  root.appendChild(compare);
  const note = makeVizText("div", "viz-note", viz.note);
  setVizDelay(note, 420);
  root.appendChild(note);
  return root;
}

function renderHandoffViz(viz) {
  const root = document.createElement("div");
  root.className = "detail-viz";
  const caption = makeVizText("p", "viz-caption", viz.caption);
  setVizDelay(caption, 20);
  root.appendChild(caption);

  const loop = document.createElement("div");
  loop.className = "viz-handoff-loop";

  const controls = document.createElement("div");
  controls.className = "viz-controls";
  setVizDelay(controls, 50);

  const playButton = document.createElement("button");
  playButton.type = "button";
  playButton.className = "viz-control-btn viz-play-btn";
  playButton.textContent = "❚❚";
  controls.appendChild(playButton);

  const stepper = document.createElement("div");
  stepper.className = "viz-stepper";
  const stepButtons = (viz.stages || []).map((title, index) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "viz-step-btn";
    button.textContent = `${index + 1}. ${title}`;
    stepper.appendChild(button);
    return button;
  });
  controls.appendChild(stepper);
  loop.appendChild(controls);

  const status = makeVizText("div", "viz-loop-status", "");
  setVizDelay(status, 70);
  loop.appendChild(status);

  const stages = document.createElement("div");
  stages.className = "viz-stage-row";
  const stageItems = (viz.stages || []).map((title, index) => {
    const item = document.createElement("div");
    item.className = "viz-stage";
    setVizDelay(item, 100 + index * 60);
    item.appendChild(makeVizText("span", "viz-stage-step", `${index + 1}`));
    item.appendChild(makeVizText("strong", "viz-stage-label", title));
    stages.appendChild(item);
    return item;
  });
  loop.appendChild(stages);

  const loadGrid = document.createElement("div");
  loadGrid.className = "viz-load-grid";
  setVizDelay(loadGrid, 250);

  const mainLoadCard = document.createElement("div");
  mainLoadCard.className = "viz-load-card";
  const mainLoadHead = document.createElement("div");
  mainLoadHead.className = "viz-load-head";
  mainLoadHead.appendChild(makeVizText("h4", "", viz.mainTitle || "Главное окно"));
  const mainLoadValue = makeVizText("span", "viz-load-value", "");
  mainLoadHead.appendChild(mainLoadValue);
  const mainMeter = document.createElement("div");
  mainMeter.className = "viz-meter";
  const mainFill = document.createElement("div");
  mainFill.className = "viz-meter-fill";
  mainFill.dataset.state = "safe";
  mainFill.style.width = `${(viz.mainLoadPercents || [34])[0]}%`;
  mainMeter.appendChild(mainFill);
  const mainLoadCopy = makeVizText("div", "viz-load-copy", "");
  mainLoadCard.appendChild(mainLoadHead);
  mainLoadCard.appendChild(mainMeter);
  mainLoadCard.appendChild(mainLoadCopy);

  const workerLoadCard = document.createElement("div");
  workerLoadCard.className = "viz-load-card";
  const workerLoadHead = document.createElement("div");
  workerLoadHead.className = "viz-load-head";
  workerLoadHead.appendChild(makeVizText("h4", "", viz.workerTitle || "Окно сабагента"));
  const workerLoadValue = makeVizText("span", "viz-load-value", "");
  workerLoadHead.appendChild(workerLoadValue);
  const workerMeter = document.createElement("div");
  workerMeter.className = "viz-meter";
  const workerFill = document.createElement("div");
  workerFill.className = "viz-meter-fill";
  workerFill.dataset.state = "safe";
  workerFill.style.width = `${(viz.workerLoadPercents || [12])[0]}%`;
  workerMeter.appendChild(workerFill);
  const workerLoadCopy = makeVizText("div", "viz-load-copy", "");
  workerLoadCard.appendChild(workerLoadHead);
  workerLoadCard.appendChild(workerMeter);
  workerLoadCard.appendChild(workerLoadCopy);

  loadGrid.appendChild(mainLoadCard);
  loadGrid.appendChild(workerLoadCard);
  loop.appendChild(loadGrid);

  const panels = document.createElement("div");
  panels.className = "viz-handoff-panels";

  const mainPanel = document.createElement("div");
  mainPanel.className = "viz-column";
  mainPanel.appendChild(makeVizText("h4", "", viz.mainTitle || "Главное окно"));
  const mainLines = (viz.mainWindowLines || []).map((line, index) => {
    const item = makeVizText("div", "viz-live-line", line.text);
    if (line.delegated) item.classList.add("viz-live-line-delegated");
    setVizDelay(item, 420 + index * 50);
    mainPanel.appendChild(item);
    return item;
  });
  const returnedLine = makeVizText(
    "div",
    "viz-live-line viz-live-line-returned is-collapsed",
    viz.returnedLine || "Возврат: итог + путь к артефакту"
  );
  setVizDelay(returnedLine, 620);
  mainPanel.appendChild(returnedLine);
  const continueLine = makeVizText(
    "div",
    "viz-live-line viz-live-line-continue is-collapsed",
    viz.continueLine || "Следующий шаг: главный агент продолжает работу по краткому итогу"
  );
  setVizDelay(continueLine, 690);
  mainPanel.appendChild(continueLine);

  const workerPanel = document.createElement("div");
  workerPanel.className = "viz-column";
  workerPanel.appendChild(makeVizText("h4", "", viz.workerTitle || "Окно сабагента"));
  const workerLines = (viz.workerWindowLines || []).map((line, index) => {
    const item = makeVizText("div", "viz-live-line", line.text);
    if (line.trace) item.classList.add("is-trace");
    if (line.result) item.classList.add("is-result");
    if (line.trace || line.result) item.classList.add("is-collapsed");
    setVizDelay(item, 500 + index * 50);
    workerPanel.appendChild(item);
    return item;
  });

  panels.appendChild(mainPanel);
  panels.appendChild(workerPanel);
  loop.appendChild(panels);

  const artifactPanel = document.createElement("div");
  artifactPanel.className = "viz-column viz-artifact-panel";
  artifactPanel.appendChild(makeVizText("h4", "", viz.artifactTitle || "Артефакт"));
  const artifactPendingLine = makeVizText(
    "div",
    "viz-live-line viz-live-line-pending",
    viz.artifactPendingLine || "Артефакт ещё не собран"
  );
  artifactPanel.appendChild(artifactPendingLine);
  const artifactLines = (viz.artifactLines || []).map((line, index) => {
    const item = makeVizText("div", "viz-live-line viz-live-line-artifact is-collapsed", line);
    setVizDelay(item, 730 + index * 50);
    artifactPanel.appendChild(item);
    return item;
  });
  loop.appendChild(artifactPanel);

  root.appendChild(loop);
  const note = makeVizText("div", "viz-note", viz.note);
  setVizDelay(note, 520);
  root.appendChild(note);

  root._handoffViz = {
    status,
    stageItems,
    playButton,
    stepButtons,
    mainFill,
    mainLoadValue,
    mainLoadCopy,
    workerFill,
    workerLoadValue,
    workerLoadCopy,
    mainPanel,
    workerPanel,
    artifactPanel,
    workerLines,
    artifactPendingLine,
    artifactLines,
    returnedLine,
    continueLine
  };
  return root;
}

function renderApprovalViz(viz) {
  const root = document.createElement("div");
  root.className = "detail-viz";
  const caption = makeVizText("p", "viz-caption", viz.caption);
  setVizDelay(caption, 20);
  root.appendChild(caption);

  const loop = document.createElement("div");
  loop.className = "viz-approval-loop";

  const controls = document.createElement("div");
  controls.className = "viz-controls";
  setVizDelay(controls, 50);

  const playButton = document.createElement("button");
  playButton.type = "button";
  playButton.className = "viz-control-btn viz-play-btn";
  playButton.textContent = "❚❚";
  controls.appendChild(playButton);

  const stepper = document.createElement("div");
  stepper.className = "viz-stepper";
  const stepButtons = (viz.stages || []).map((title, index) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "viz-step-btn";
    button.textContent = `${index + 1}. ${title}`;
    stepper.appendChild(button);
    return button;
  });
  controls.appendChild(stepper);
  loop.appendChild(controls);

  const status = makeVizText("div", "viz-loop-status", "");
  setVizDelay(status, 70);
  loop.appendChild(status);

  const stages = document.createElement("div");
  stages.className = "viz-stage-row";
  const stageItems = (viz.stages || []).map((title, index) => {
    const item = document.createElement("div");
    item.className = "viz-stage";
    setVizDelay(item, 100 + index * 60);
    item.appendChild(makeVizText("span", "viz-stage-step", `${index + 1}`));
    item.appendChild(makeVizText("strong", "viz-stage-label", title));
    stages.appendChild(item);
    return item;
  });
  loop.appendChild(stages);

  const phaseGrid = document.createElement("div");
  phaseGrid.className = "viz-phase-grid";
  const phaseCards = (viz.phaseCards || []).map((phase, index) => {
    const card = document.createElement("div");
    card.className = "viz-phase-card";
    card.dataset.tone = phase.tone || "default";
    setVizDelay(card, 220 + index * 50);
    card.appendChild(makeVizText("h4", "", phase.title));
    card.appendChild(makeVizText("p", "viz-phase-copy", phase.text));
    phaseGrid.appendChild(card);
    return card;
  });
  loop.appendChild(phaseGrid);

  const panels = document.createElement("div");
  panels.className = "viz-approval-panels";

  const policyPanel = document.createElement("div");
  policyPanel.className = "viz-column";
  policyPanel.appendChild(makeVizText("h4", "", viz.policyTitle || "Набор действий"));
  const policyRows = (viz.policyItems || []).map((item, index) => {
    const row = document.createElement("div");
    row.className = "viz-policy-item";
    setVizDelay(row, 380 + index * 50);
    const label = makeVizText("span", "viz-policy-label", item.label);
    const badge = makeVizText("span", "viz-policy-badge", "");
    row.appendChild(label);
    row.appendChild(badge);
    policyPanel.appendChild(row);
    return { row, badge, states: item.stateByStage || [] };
  });

  const sandboxPanel = document.createElement("div");
  sandboxPanel.className = "viz-column";
  sandboxPanel.appendChild(makeVizText("h4", "", viz.sandboxTitle || "Песочница"));
  const sandboxLines = (viz.sandboxLines || []).map((line, index) => {
    const item = makeVizText("div", "viz-line", line);
    setVizDelay(item, 420 + index * 40);
    sandboxPanel.appendChild(item);
    return item;
  });
  const requestPending = makeVizText(
    "div",
    "viz-live-line viz-live-line-pending",
    viz.requestPending || "Опасный шаг ещё не потребовал подтверждения."
  );
  const requestLine = makeVizText(
    "div",
    "viz-live-line viz-live-line-request is-collapsed",
    viz.requestLine || "Появился запрос на подтверждение."
  );
  const resultLine = makeVizText(
    "div",
    "viz-live-line viz-live-line-approved is-collapsed",
    viz.resultLine || "Действие выполнено после явного подтверждения."
  );
  sandboxPanel.appendChild(requestPending);
  sandboxPanel.appendChild(requestLine);
  sandboxPanel.appendChild(resultLine);

  panels.appendChild(policyPanel);
  panels.appendChild(sandboxPanel);
  loop.appendChild(panels);

  root.appendChild(loop);
  root._approvalViz = {
    status,
    stageItems,
    playButton,
    stepButtons,
    phaseCards,
    policyRows,
    sandboxPanel,
    requestPending,
    requestLine,
    resultLine
  };
  return root;
}

function renderCheckpointViz(viz) {
  const root = document.createElement("div");
  root.className = "detail-viz";
  const caption = makeVizText("p", "viz-caption", viz.caption);
  setVizDelay(caption, 20);
  root.appendChild(caption);

  const loop = document.createElement("div");
  loop.className = "viz-checkpoint-loop";

  const controls = document.createElement("div");
  controls.className = "viz-controls";
  setVizDelay(controls, 50);

  const playButton = document.createElement("button");
  playButton.type = "button";
  playButton.className = "viz-control-btn viz-play-btn";
  playButton.textContent = "❚❚";
  controls.appendChild(playButton);

  const stepper = document.createElement("div");
  stepper.className = "viz-stepper";
  const stepButtons = (viz.stages || []).map((title, index) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "viz-step-btn";
    button.textContent = `${index + 1}. ${title}`;
    stepper.appendChild(button);
    return button;
  });
  controls.appendChild(stepper);
  loop.appendChild(controls);

  const status = makeVizText("div", "viz-loop-status", "");
  setVizDelay(status, 70);
  loop.appendChild(status);

  const stages = document.createElement("div");
  stages.className = "viz-stage-row";
  const stageItems = (viz.stages || []).map((title, index) => {
    const item = document.createElement("div");
    item.className = "viz-stage";
    setVizDelay(item, 100 + index * 60);
    item.appendChild(makeVizText("span", "viz-stage-step", `${index + 1}`));
    item.appendChild(makeVizText("strong", "viz-stage-label", title));
    stages.appendChild(item);
    return item;
  });
  loop.appendChild(stages);

  const loadCard = document.createElement("div");
  loadCard.className = "viz-load-card";
  loadCard.appendChild(makeVizText("h4", "", viz.loadTitle || "Стоимость восстановления"));
  const loadMeter = document.createElement("div");
  loadMeter.className = "viz-meter";
  const loadFill = document.createElement("div");
  loadFill.className = "viz-meter-fill";
  loadFill.dataset.state = "safe";
  loadFill.style.width = `${(viz.loadPercents || [18])[0]}%`;
  loadMeter.appendChild(loadFill);
  const loadLabels = document.createElement("div");
  loadLabels.className = "viz-meter-labels";
  const loadLabel = makeVizText("span", "", "");
  const loadValue = makeVizText("span", "", "");
  loadLabels.appendChild(loadLabel);
  loadLabels.appendChild(loadValue);
  const loadCopy = makeVizText("div", "viz-load-copy", "");
  loadCard.appendChild(loadMeter);
  loadCard.appendChild(loadLabels);
  loadCard.appendChild(loadCopy);
  loop.appendChild(loadCard);

  const panels = document.createElement("div");
  panels.className = "viz-checkpoint-panels";

  const workspacePanel = document.createElement("div");
  workspacePanel.className = "viz-column";
  workspacePanel.appendChild(makeVizText("h4", "", viz.workspaceTitle || "Рабочее состояние"));
  const workspaceLines = (viz.workspaceLines || []).map((line, index) => {
    const item = makeVizText("div", "viz-live-line", line.text);
    if (line.risky) item.classList.add("is-risky", "is-collapsed");
    if (line.restore) item.classList.add("is-restore", "is-collapsed");
    if (line.continued) item.classList.add("is-continued", "is-collapsed");
    setVizDelay(item, 420 + index * 50);
    workspacePanel.appendChild(item);
    return item;
  });

  const checkpointPanel = document.createElement("div");
  checkpointPanel.className = "viz-column viz-checkpoint-panel";
  checkpointPanel.appendChild(makeVizText("h4", "", viz.checkpointTitle || "Checkpoint"));
  const checkpointPending = makeVizText(
    "div",
    "viz-live-line viz-live-line-pending is-collapsed",
    viz.checkpointPending || "Снимок ещё не создан."
  );
  checkpointPanel.appendChild(checkpointPending);
  const checkpointLines = (viz.checkpointLines || []).map((line, index) => {
    const item = makeVizText("div", "viz-live-line viz-live-line-checkpoint is-collapsed", line);
    setVizDelay(item, 570 + index * 50);
    checkpointPanel.appendChild(item);
    return item;
  });
  const restoredLine = makeVizText(
    "div",
    "viz-live-line viz-live-line-restored is-collapsed",
    viz.restoredLine || "Состояние восстановлено из checkpoint."
  );
  checkpointPanel.appendChild(restoredLine);

  panels.appendChild(workspacePanel);
  panels.appendChild(checkpointPanel);
  loop.appendChild(panels);

  root.appendChild(loop);
  root._checkpointViz = {
    status,
    stageItems,
    playButton,
    stepButtons,
    loadFill,
    loadLabel,
    loadValue,
    loadCopy,
    workspacePanel,
    checkpointPanel,
    workspaceLines,
    checkpointPending,
    checkpointLines,
    restoredLine
  };
  return root;
}

function renderSummaryPyramidViz(viz) {
  const root = document.createElement("div");
  root.className = "detail-viz";
  const caption = makeVizText("p", "viz-caption", viz.caption);
  setVizDelay(caption, 20);
  root.appendChild(caption);

  const loop = document.createElement("div");
  loop.className = "viz-pyramid-loop";

  const controls = document.createElement("div");
  controls.className = "viz-controls";
  setVizDelay(controls, 50);

  const playButton = document.createElement("button");
  playButton.type = "button";
  playButton.className = "viz-control-btn viz-play-btn";
  playButton.textContent = "❚❚";
  controls.appendChild(playButton);

  const stepper = document.createElement("div");
  stepper.className = "viz-stepper";
  const stepButtons = (viz.stages || []).map((title, index) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "viz-step-btn";
    button.textContent = `${index + 1}. ${title}`;
    stepper.appendChild(button);
    return button;
  });
  controls.appendChild(stepper);
  loop.appendChild(controls);

  const status = makeVizText("div", "viz-loop-status", "");
  setVizDelay(status, 70);
  loop.appendChild(status);

  const stages = document.createElement("div");
  stages.className = "viz-stage-row";
  const stageItems = (viz.stages || []).map((title, index) => {
    const item = document.createElement("div");
    item.className = "viz-stage";
    setVizDelay(item, 100 + index * 60);
    item.appendChild(makeVizText("span", "viz-stage-step", `${index + 1}`));
    item.appendChild(makeVizText("strong", "viz-stage-label", title));
    stages.appendChild(item);
    return item;
  });
  loop.appendChild(stages);

  const pyramid = document.createElement("div");
  pyramid.className = "viz-pyramid";
  const levelCards = (viz.levels || []).map((level, levelIndex) => {
    const card = document.createElement("div");
    card.className = "viz-level-card";
    card.dataset.tone = level.tone || "default";
    setVizDelay(card, 240 + levelIndex * 60);
    card.appendChild(makeVizText("h4", "", level.title));
    const body = document.createElement("div");
    body.className = "viz-level-body";
    const lines = (level.lines || []).map((line, lineIndex) => {
      const item = makeVizText("div", "viz-line", line);
      if (levelIndex > 0) item.classList.add("is-collapsed");
      setVizDelay(item, 320 + levelIndex * 80 + lineIndex * 40);
      body.appendChild(item);
      return item;
    });
    card.appendChild(body);
    pyramid.appendChild(card);
    return { card, lines };
  });
  loop.appendChild(pyramid);

  const returnPanel = document.createElement("div");
  returnPanel.className = "viz-column";
  returnPanel.appendChild(makeVizText("h4", "", viz.returnTitle || "Возврат к деталям"));
  const returnPending = makeVizText(
    "div",
    "viz-live-line viz-live-line-pending",
    viz.returnPending || "Детали не раскрываются, пока верхнего уровня достаточно."
  );
  const returnLine = makeVizText(
    "div",
    "viz-live-line viz-live-line-returned is-collapsed",
    viz.returnLine || "Агент точечно раскрывает только нужную подветку."
  );
  returnPanel.appendChild(returnPending);
  returnPanel.appendChild(returnLine);
  loop.appendChild(returnPanel);

  root.appendChild(loop);
  root._summaryPyramidViz = {
    status,
    stageItems,
    playButton,
    stepButtons,
    levelCards,
    returnPanel,
    returnPending,
    returnLine
  };
  return root;
}

function renderSummaryCheckViz(viz) {
  const root = document.createElement("div");
  root.className = "detail-viz";
  const caption = makeVizText("p", "viz-caption", viz.caption);
  setVizDelay(caption, 20);
  root.appendChild(caption);

  const loop = document.createElement("div");
  loop.className = "viz-summary-check-loop";

  const controls = document.createElement("div");
  controls.className = "viz-controls";
  setVizDelay(controls, 50);

  const playButton = document.createElement("button");
  playButton.type = "button";
  playButton.className = "viz-control-btn viz-play-btn";
  playButton.textContent = "❚❚";
  controls.appendChild(playButton);

  const stepper = document.createElement("div");
  stepper.className = "viz-stepper";
  const stepButtons = (viz.stages || []).map((title, index) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "viz-step-btn";
    button.textContent = `${index + 1}. ${title}`;
    stepper.appendChild(button);
    return button;
  });
  controls.appendChild(stepper);
  loop.appendChild(controls);

  const status = makeVizText("div", "viz-loop-status", "");
  setVizDelay(status, 70);
  loop.appendChild(status);

  const stages = document.createElement("div");
  stages.className = "viz-stage-row";
  const stageItems = (viz.stages || []).map((title, index) => {
    const item = document.createElement("div");
    item.className = "viz-stage";
    setVizDelay(item, 100 + index * 60);
    item.appendChild(makeVizText("span", "viz-stage-step", `${index + 1}`));
    item.appendChild(makeVizText("strong", "viz-stage-label", title));
    stages.appendChild(item);
    return item;
  });
  loop.appendChild(stages);

  const panels = document.createElement("div");
  panels.className = "viz-summary-check-panels";

  const summaryPanel = document.createElement("div");
  summaryPanel.className = "viz-column";
  summaryPanel.appendChild(makeVizText("h4", "", viz.summaryTitle || "Summary"));
  const summaryLines = (viz.summaryLines || []).map((line, index) => {
    const item = makeVizText("div", "viz-line", line);
    setVizDelay(item, 320 + index * 40);
    summaryPanel.appendChild(item);
    return item;
  });
  const missingLine = makeVizText(
    "div",
    "viz-live-line viz-live-line-request is-collapsed",
    viz.missingLine || "Проверка нашла конкретный пропуск."
  );
  const fixedLine = makeVizText(
    "div",
    "viz-live-line viz-live-line-approved is-collapsed",
    viz.fixedLine || "Summary исправлена после проверки."
  );
  summaryPanel.appendChild(missingLine);
  summaryPanel.appendChild(fixedLine);

  const checklistPanel = document.createElement("div");
  checklistPanel.className = "viz-column";
  checklistPanel.appendChild(makeVizText("h4", "", viz.checklistTitle || "Checklist"));
  const checklistRows = (viz.checklist || []).map((item, index) => {
    const row = document.createElement("div");
    row.className = "viz-check-item";
    setVizDelay(row, 380 + index * 50);
    const label = makeVizText("span", "viz-check-label", item.label);
    const badge = makeVizText("span", "viz-check-badge", "");
    row.appendChild(label);
    row.appendChild(badge);
    checklistPanel.appendChild(row);
    return { badge, passAt: item.passAt ?? 3 };
  });

  panels.appendChild(summaryPanel);
  panels.appendChild(checklistPanel);
  loop.appendChild(panels);

  root.appendChild(loop);
  root._summaryCheckViz = {
    status,
    stageItems,
    playButton,
    stepButtons,
    summaryPanel,
    checklistPanel,
    summaryLines,
    missingLine,
    fixedLine,
    checklistRows
  };
  return root;
}

function renderToolLoadingViz(viz) {
  const root = document.createElement("div");
  root.className = "detail-viz";
  const caption = makeVizText("p", "viz-caption", viz.caption);
  setVizDelay(caption, 20);
  root.appendChild(caption);

  const loop = document.createElement("div");
  loop.className = "viz-tool-loading-loop";

  const controls = document.createElement("div");
  controls.className = "viz-controls";
  setVizDelay(controls, 50);

  const playButton = document.createElement("button");
  playButton.type = "button";
  playButton.className = "viz-control-btn viz-play-btn";
  playButton.textContent = "❚❚";
  controls.appendChild(playButton);

  const stepper = document.createElement("div");
  stepper.className = "viz-stepper";
  const stepButtons = (viz.stages || []).map((title, index) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "viz-step-btn";
    button.textContent = `${index + 1}. ${title}`;
    stepper.appendChild(button);
    return button;
  });
  controls.appendChild(stepper);
  loop.appendChild(controls);

  const status = makeVizText("div", "viz-loop-status", "");
  setVizDelay(status, 70);
  loop.appendChild(status);

  const stages = document.createElement("div");
  stages.className = "viz-stage-row";
  const stageItems = (viz.stages || []).map((title, index) => {
    const item = document.createElement("div");
    item.className = "viz-stage";
    setVizDelay(item, 100 + index * 60);
    item.appendChild(makeVizText("span", "viz-stage-step", `${index + 1}`));
    item.appendChild(makeVizText("strong", "viz-stage-label", title));
    stages.appendChild(item);
    return item;
  });
  loop.appendChild(stages);

  const loadCard = document.createElement("div");
  loadCard.className = "viz-load-card";
  loadCard.appendChild(makeVizText("h4", "", "Нагрузка определений в prompt"));
  const loadMeter = document.createElement("div");
  loadMeter.className = "viz-meter";
  const loadFill = document.createElement("div");
  loadFill.className = "viz-meter-fill";
  loadFill.dataset.state = "high";
  loadFill.style.width = `${(viz.loadPercents || [92])[0]}%`;
  loadMeter.appendChild(loadFill);
  const loadLabels = document.createElement("div");
  loadLabels.className = "viz-meter-labels";
  const loadLabel = makeVizText("span", "", "");
  const loadValue = makeVizText("span", "", "");
  loadLabels.appendChild(loadLabel);
  loadLabels.appendChild(loadValue);
  loadCard.appendChild(loadMeter);
  loadCard.appendChild(loadLabels);
  loop.appendChild(loadCard);

  const panels = document.createElement("div");
  panels.className = "viz-tool-loading-panels";

  const catalogPanel = document.createElement("div");
  catalogPanel.className = "viz-column";
  catalogPanel.appendChild(makeVizText("h4", "", viz.catalogTitle || "Каталог"));
  const catalogLines = (viz.catalogLines || []).map((line, index) => {
    const item = makeVizText("div", "viz-line", line);
    setVizDelay(item, 340 + index * 28);
    catalogPanel.appendChild(item);
    return item;
  });

  const selectedPanel = document.createElement("div");
  selectedPanel.className = "viz-column";
  selectedPanel.appendChild(makeVizText("h4", "", viz.selectedTitle || "Выбрано"));
  const selectedLines = (viz.selectedLines || []).map((line, index) => {
    const item = makeVizText("div", "viz-live-line viz-live-line-approved is-collapsed", line);
    setVizDelay(item, 500 + index * 45);
    selectedPanel.appendChild(item);
    return item;
  });
  const skippedLine = makeVizText(
    "div",
    "viz-live-line viz-live-line-pending is-collapsed",
    viz.skippedLine || "Остальные tools пока не грузятся в prompt."
  );
  selectedPanel.appendChild(skippedLine);

  const windowPanel = document.createElement("div");
  windowPanel.className = "viz-column";
  windowPanel.appendChild(makeVizText("h4", "", viz.windowTitle || "Активное окно"));
  const windowLines = (viz.windowLines || []).map((line, index) => {
    const item = makeVizText("div", "viz-live-line viz-live-line-continue is-collapsed", line);
    setVizDelay(item, 650 + index * 45);
    windowPanel.appendChild(item);
    return item;
  });

  panels.appendChild(catalogPanel);
  panels.appendChild(selectedPanel);
  panels.appendChild(windowPanel);
  loop.appendChild(panels);

  root.appendChild(loop);
  root._toolLoadingViz = {
    status,
    stageItems,
    playButton,
    stepButtons,
    loadFill,
    loadLabel,
    loadValue,
    selectedPanel,
    windowPanel,
    selectedLines,
    skippedLine,
    windowLines
  };
  return root;
}

function renderStackViz(viz) {
  const root = document.createElement("div");
  root.className = "detail-viz";
  const caption = makeVizText("p", "viz-caption", viz.caption);
  setVizDelay(caption, 20);
  root.appendChild(caption);

  const stack = document.createElement("div");
  stack.className = "viz-stack";
  stack.appendChild(makeVizText("h4", "", viz.title));
  viz.layers.forEach((layer, index) => {
    const item = document.createElement("div");
    item.className = "viz-stack-layer";
    item.dataset.tone = layer.tone || "default";
    setVizDelay(item, 90 + index * 70);
    const strong = document.createElement("strong");
    strong.textContent = layer.title;
    item.appendChild(strong);
    item.append(layer.text);
    stack.appendChild(item);
  });
  root.appendChild(stack);
  if (viz.note) {
    const note = makeVizText("div", "viz-note", viz.note);
    setVizDelay(note, 90 + viz.layers.length * 70);
    root.appendChild(note);
  }
  return root;
}

function initCompactionViz(root, viz) {
  const refs = root._compactionViz;
  if (!refs) return null;

  const timeouts = new Set();
  let disposed = false;
  let currentStageIndex = 0;
  let isPlaying = true;
  const stageDurations = viz.stageDurations || [2600, 3200, 3200, 2800];

  const later = (fn, delay) => {
    const id = setTimeout(() => {
      timeouts.delete(id);
      if (!disposed) {
        fn();
      }
    }, delay);
    timeouts.add(id);
  };

  const clearTimers = () => {
    timeouts.forEach((id) => clearTimeout(id));
    timeouts.clear();
  };

  const setStage = (index, statusText) => {
    refs.status.textContent = statusText;
    refs.stageItems.forEach((item, itemIndex) => {
      item.classList.toggle("is-active", itemIndex === index);
      item.classList.toggle("is-done", itemIndex < index);
    });
    refs.stepButtons.forEach((button, buttonIndex) => {
      button.classList.toggle("is-active", buttonIndex === index);
    });
    currentStageIndex = index;
  };

  const setMeter = (percent, label, state) => {
    refs.fill.style.width = `${percent}%`;
    refs.fill.dataset.state = state;
    refs.meterLabel.textContent = label;
    refs.meterValue.textContent = `${percent}% окна`;
  };

  const setOldTailVisible = (visible) => {
    refs.lines.forEach((line) => {
      if (!line.classList.contains("is-old")) return;
      line.classList.toggle("is-collapsed", !visible);
    });
  };

  const setReinjectedVisible = (visible) => {
    refs.reinjectedLine.classList.toggle("is-collapsed", !visible);
  };

  const updatePlayButton = () => {
    refs.playButton.textContent = isPlaying ? "❚❚" : "▶";
    refs.playButton.classList.toggle("is-paused", !isPlaying);
  };

  const applyStage = (index) => {
    refs.threshold.classList.remove("is-alert");
    refs.summary.classList.remove("is-visible");
    if (index === 0) {
      setOldTailVisible(true);
      setReinjectedVisible(false);
      setStage(0, viz.statuses?.grow || "");
      setMeter(viz.startMeterPercent || 42, "Контекст ещё помещается", "safe");
      return;
    }
    if (index === 1) {
      setOldTailVisible(true);
      setReinjectedVisible(false);
      refs.threshold.classList.add("is-alert");
      setStage(1, viz.statuses?.threshold || "");
      setMeter(viz.peakMeterPercent || viz.beforeMeterPercent || 91, "Контекст подошёл к порогу", "high");
      return;
    }
    if (index === 2) {
      refs.threshold.classList.add("is-alert");
      setStage(2, viz.statuses?.compact || "");
      setOldTailVisible(false);
      setReinjectedVisible(false);
      refs.summary.classList.add("is-visible");
      setMeter(viz.settledMeterPercent || viz.afterMeterPercent || 42, "Старый хвост свёрнут в компактное состояние", "safe");
      return;
    }
    setStage(3, viz.statuses?.continue || "");
    setOldTailVisible(false);
    setReinjectedVisible(true);
    refs.summary.classList.add("is-visible");
    setMeter(viz.settledMeterPercent || viz.afterMeterPercent || 42, "Работа продолжается с новым компактным окном", "safe");
  };

  const scheduleNext = () => {
    if (!isPlaying || disposed) return;
    later(() => {
      const nextStage = (currentStageIndex + 1) % refs.stageItems.length;
      applyStage(nextStage);
      scheduleNext();
    }, stageDurations[currentStageIndex] || 2800);
  };

  refs.playButton.addEventListener("click", () => {
    isPlaying = !isPlaying;
    updatePlayButton();
    clearTimers();
    if (isPlaying) {
      scheduleNext();
    }
  });

  refs.stepButtons.forEach((button, index) => {
    button.addEventListener("click", () => {
      isPlaying = false;
      updatePlayButton();
      clearTimers();
      applyStage(index);
    });
  });

  updatePlayButton();
  applyStage(0);
  scheduleNext();

  return () => {
    disposed = true;
    clearTimers();
  };
}

function initHandoffViz(root, viz) {
  const refs = root._handoffViz;
  if (!refs) return null;

  const timeouts = new Set();
  let disposed = false;
  let currentStageIndex = 0;
  let isPlaying = true;
  const stageDurations = viz.stageDurations || [2800, 3600, 3400, 3600];
  const mainLoads = viz.mainLoadPercents || [34, 36, 36, 44];
  const workerLoads = viz.workerLoadPercents || [12, 74, 61, 0];

  const later = (fn, delay) => {
    const id = setTimeout(() => {
      timeouts.delete(id);
      if (!disposed) {
        fn();
      }
    }, delay);
    timeouts.add(id);
  };

  const clearTimers = () => {
    timeouts.forEach((id) => clearTimeout(id));
    timeouts.clear();
  };

  const setStage = (index, statusText) => {
    refs.status.textContent = statusText;
    refs.stageItems.forEach((item, itemIndex) => {
      item.classList.toggle("is-active", itemIndex === index);
      item.classList.toggle("is-done", itemIndex < index);
    });
    refs.stepButtons.forEach((button, buttonIndex) => {
      button.classList.toggle("is-active", buttonIndex === index);
    });
    currentStageIndex = index;
  };

  const updatePlayButton = () => {
    refs.playButton.textContent = isPlaying ? "❚❚" : "▶";
    refs.playButton.classList.toggle("is-paused", !isPlaying);
  };

  const setLoad = (fill, value, copy, percent, state, text) => {
    fill.style.width = `${percent}%`;
    fill.dataset.state = state;
    value.textContent = `${percent}% окна`;
    copy.textContent = text;
  };

  const setVisibility = (elements, visible) => {
    elements.forEach((element) => {
      element.classList.toggle("is-collapsed", !visible);
    });
  };

  const setPanelMode = (panel, mode) => {
    panel.classList.toggle("is-focused", mode === "focused");
    panel.classList.toggle("is-dimmed", mode === "dimmed");
  };

  const applyStage = (index) => {
    const traceLines = refs.workerLines.filter((line) => line.classList.contains("is-trace"));
    const resultLines = refs.workerLines.filter((line) => line.classList.contains("is-result"));

    refs.artifactPendingLine.classList.add("is-collapsed");
    setVisibility(refs.artifactLines, false);
    setVisibility([refs.returnedLine, refs.continueLine], false);
    setVisibility(traceLines, false);
    setVisibility(resultLines, false);

    if (index === 0) {
      setStage(0, viz.statuses?.delegate || "");
      setLoad(refs.mainFill, refs.mainLoadValue, refs.mainLoadCopy, mainLoads[0], "safe", "Держит только цель, рамку задачи и handoff.");
      setLoad(refs.workerFill, refs.workerLoadValue, refs.workerLoadCopy, workerLoads[0], "safe", "Получает подзадачу и отдельный write scope.");
      setPanelMode(refs.mainPanel, "focused");
      setPanelMode(refs.workerPanel, "");
      setPanelMode(refs.artifactPanel, "dimmed");
      refs.artifactPendingLine.classList.remove("is-collapsed");
      return;
    }

    if (index === 1) {
      setStage(1, viz.statuses?.isolate || "");
      setLoad(refs.mainFill, refs.mainLoadValue, refs.mainLoadCopy, mainLoads[1], "safe", "Не растёт вместе с исследованием сабагента.");
      setLoad(refs.workerFill, refs.workerLoadValue, refs.workerLoadCopy, workerLoads[1], "high", "Несёт длинный след поиска, чтения и запусков.");
      setPanelMode(refs.mainPanel, "dimmed");
      setPanelMode(refs.workerPanel, "focused");
      setPanelMode(refs.artifactPanel, "dimmed");
      refs.artifactPendingLine.classList.remove("is-collapsed");
      setVisibility(traceLines, true);
      return;
    }

    if (index === 2) {
      setStage(2, viz.statuses?.artifact || "");
      setLoad(refs.mainFill, refs.mainLoadValue, refs.mainLoadCopy, mainLoads[2], "safe", "Ждёт только готовый результат и не тащит рабочий шум.");
      setLoad(refs.workerFill, refs.workerLoadValue, refs.workerLoadCopy, workerLoads[2], "high", "Сводит находки в итог и собирает артефакт.");
      setPanelMode(refs.mainPanel, "dimmed");
      setPanelMode(refs.workerPanel, "focused");
      setPanelMode(refs.artifactPanel, "focused");
      setVisibility(traceLines, true);
      setVisibility(resultLines, true);
      setVisibility(refs.artifactLines, true);
      return;
    }

    setStage(3, viz.statuses?.return || "");
    setLoad(refs.mainFill, refs.mainLoadValue, refs.mainLoadCopy, mainLoads[3], "safe", "Получает только компактный возврат и точку входа в артефакт.");
    setLoad(refs.workerFill, refs.workerLoadValue, refs.workerLoadCopy, workerLoads[3], "safe", "Окно сабагента можно закрыть после возврата.");
    setPanelMode(refs.mainPanel, "focused");
    setPanelMode(refs.workerPanel, "dimmed");
    setPanelMode(refs.artifactPanel, "focused");
    setVisibility(resultLines, true);
    setVisibility(refs.artifactLines, true);
    setVisibility([refs.returnedLine, refs.continueLine], true);
  };

  const scheduleNext = () => {
    if (!isPlaying || disposed) return;
    later(() => {
      const nextStage = (currentStageIndex + 1) % refs.stageItems.length;
      applyStage(nextStage);
      scheduleNext();
    }, stageDurations[currentStageIndex] || 3200);
  };

  refs.playButton.addEventListener("click", () => {
    isPlaying = !isPlaying;
    updatePlayButton();
    clearTimers();
    if (isPlaying) {
      scheduleNext();
    }
  });

  refs.stepButtons.forEach((button, index) => {
    button.addEventListener("click", () => {
      isPlaying = false;
      updatePlayButton();
      clearTimers();
      applyStage(index);
    });
  });

  updatePlayButton();
  applyStage(0);
  scheduleNext();

  return () => {
    disposed = true;
    clearTimers();
  };
}

function initApprovalViz(root, viz) {
  const refs = root._approvalViz;
  if (!refs) return null;

  const timeouts = new Set();
  let disposed = false;
  let currentStageIndex = 0;
  let isPlaying = true;
  const stageDurations = viz.stageDurations || [2800, 3200, 3400, 3400];

  const later = (fn, delay) => {
    const id = setTimeout(() => {
      timeouts.delete(id);
      if (!disposed) {
        fn();
      }
    }, delay);
    timeouts.add(id);
  };

  const clearTimers = () => {
    timeouts.forEach((id) => clearTimeout(id));
    timeouts.clear();
  };

  const setStage = (index, statusText) => {
    refs.status.textContent = statusText;
    refs.stageItems.forEach((item, itemIndex) => {
      item.classList.toggle("is-active", itemIndex === index);
      item.classList.toggle("is-done", itemIndex < index);
    });
    refs.stepButtons.forEach((button, buttonIndex) => {
      button.classList.toggle("is-active", buttonIndex === index);
    });
    refs.phaseCards.forEach((card, cardIndex) => {
      card.classList.toggle("is-active", cardIndex === index);
      card.classList.toggle("is-done", cardIndex < index);
    });
    currentStageIndex = index;
  };

  const updatePlayButton = () => {
    refs.playButton.textContent = isPlaying ? "❚❚" : "▶";
    refs.playButton.classList.toggle("is-paused", !isPlaying);
  };

  const setVisibility = (element, visible) => {
    element.classList.toggle("is-collapsed", !visible);
  };

  const setPolicyState = (badge, state) => {
    const labels = {
      blocked: "Закрыт",
      allowed: "Разрешён",
      pending: "Запрос",
      approved: "По approve"
    };
    badge.dataset.state = state || "blocked";
    badge.textContent = labels[state] || "Закрыт";
  };

  const applyStage = (index) => {
    refs.policyRows.forEach(({ badge, states }) => {
      setPolicyState(badge, states[index]);
    });
    refs.sandboxPanel.classList.remove("is-focused");
    setVisibility(refs.requestPending, false);
    setVisibility(refs.requestLine, false);
    setVisibility(refs.resultLine, false);

    if (index === 0) {
      setStage(0, viz.statuses?.analyze || "");
      setVisibility(refs.requestPending, true);
      return;
    }

    if (index === 1) {
      setStage(1, viz.statuses?.prepare || "");
      setVisibility(refs.requestPending, true);
      return;
    }

    if (index === 2) {
      setStage(2, viz.statuses?.request || "");
      refs.sandboxPanel.classList.add("is-focused");
      setVisibility(refs.requestLine, true);
      return;
    }

    setStage(3, viz.statuses?.execute || "");
    refs.sandboxPanel.classList.add("is-focused");
    setVisibility(refs.resultLine, true);
  }

  const scheduleNext = () => {
    if (!isPlaying || disposed) return;
    later(() => {
      const nextStage = (currentStageIndex + 1) % refs.stageItems.length;
      applyStage(nextStage);
      scheduleNext();
    }, stageDurations[currentStageIndex] || 3200);
  };

  refs.playButton.addEventListener("click", () => {
    isPlaying = !isPlaying;
    updatePlayButton();
    clearTimers();
    if (isPlaying) {
      scheduleNext();
    }
  });

  refs.stepButtons.forEach((button, index) => {
    button.addEventListener("click", () => {
      isPlaying = false;
      updatePlayButton();
      clearTimers();
      applyStage(index);
    });
  });

  updatePlayButton();
  applyStage(0);
  scheduleNext();

  return () => {
    disposed = true;
    clearTimers();
  };
}

function initCheckpointViz(root, viz) {
  const refs = root._checkpointViz;
  if (!refs) return null;

  const timeouts = new Set();
  let disposed = false;
  let currentStageIndex = 0;
  let isPlaying = true;
  const stageDurations = viz.stageDurations || [2800, 3400, 3200, 3400];
  const loadPercents = viz.loadPercents || [18, 82, 26, 34];
  const loadLabels = viz.loadLabels || [];

  const later = (fn, delay) => {
    const id = setTimeout(() => {
      timeouts.delete(id);
      if (!disposed) {
        fn();
      }
    }, delay);
    timeouts.add(id);
  };

  const clearTimers = () => {
    timeouts.forEach((id) => clearTimeout(id));
    timeouts.clear();
  };

  const setStage = (index, statusText) => {
    refs.status.textContent = statusText;
    refs.stageItems.forEach((item, itemIndex) => {
      item.classList.toggle("is-active", itemIndex === index);
      item.classList.toggle("is-done", itemIndex < index);
    });
    refs.stepButtons.forEach((button, buttonIndex) => {
      button.classList.toggle("is-active", buttonIndex === index);
    });
    currentStageIndex = index;
  };

  const updatePlayButton = () => {
    refs.playButton.textContent = isPlaying ? "❚❚" : "▶";
    refs.playButton.classList.toggle("is-paused", !isPlaying);
  };

  const setLoad = (index, state) => {
    const percent = loadPercents[index] ?? loadPercents[0] ?? 20;
    refs.loadFill.style.width = `${percent}%`;
    refs.loadFill.dataset.state = state;
    refs.loadLabel.textContent = loadLabels[index] || "";
    refs.loadValue.textContent = `${percent}% усилия`;
    refs.loadCopy.textContent = loadLabels[index] || "";
  };

  const setVisibility = (elements, visible) => {
    const list = Array.isArray(elements) ? elements : [elements];
    list.forEach((element) => {
      element.classList.toggle("is-collapsed", !visible);
    });
  };

  const riskyLines = refs.workspaceLines.filter((line) => line.classList.contains("is-risky"));
  const restoreLines = refs.workspaceLines.filter((line) => line.classList.contains("is-restore"));
  const continuedLines = refs.workspaceLines.filter((line) => line.classList.contains("is-continued"));

  const applyStage = (index) => {
    refs.workspacePanel.classList.remove("is-focused");
    refs.checkpointPanel.classList.remove("is-focused");
    setVisibility(riskyLines, false);
    setVisibility(restoreLines, false);
    setVisibility(continuedLines, false);
    setVisibility(refs.checkpointLines, false);
    setVisibility(refs.restoredLine, false);
    setVisibility(refs.checkpointPending, false);

    if (index === 0) {
      setStage(0, viz.statuses?.stable || "");
      refs.checkpointPanel.classList.add("is-focused");
      setLoad(0, "safe");
      setVisibility(refs.checkpointLines, true);
      return;
    }

    if (index === 1) {
      setStage(1, viz.statuses?.risky || "");
      refs.workspacePanel.classList.add("is-focused");
      refs.checkpointPanel.classList.add("is-focused");
      setLoad(1, "high");
      setVisibility(riskyLines, true);
      setVisibility(refs.checkpointLines, true);
      return;
    }

    if (index === 2) {
      setStage(2, viz.statuses?.restore || "");
      refs.workspacePanel.classList.add("is-focused");
      refs.checkpointPanel.classList.add("is-focused");
      setLoad(2, "safe");
      setVisibility(restoreLines, true);
      setVisibility(refs.checkpointLines, true);
      setVisibility(refs.restoredLine, true);
      return;
    }

    setStage(3, viz.statuses?.continue || "");
    refs.workspacePanel.classList.add("is-focused");
    refs.checkpointPanel.classList.add("is-focused");
    setLoad(3, "safe");
    setVisibility(continuedLines, true);
    setVisibility(refs.checkpointLines, true);
    setVisibility(refs.restoredLine, true);
  };

  const scheduleNext = () => {
    if (!isPlaying || disposed) return;
    later(() => {
      const nextStage = (currentStageIndex + 1) % refs.stageItems.length;
      applyStage(nextStage);
      scheduleNext();
    }, stageDurations[currentStageIndex] || 3200);
  };

  refs.playButton.addEventListener("click", () => {
    isPlaying = !isPlaying;
    updatePlayButton();
    clearTimers();
    if (isPlaying) {
      scheduleNext();
    }
  });

  refs.stepButtons.forEach((button, index) => {
    button.addEventListener("click", () => {
      isPlaying = false;
      updatePlayButton();
      clearTimers();
      applyStage(index);
    });
  });

  updatePlayButton();
  applyStage(0);
  scheduleNext();

  return () => {
    disposed = true;
    clearTimers();
  };
}

function initSummaryPyramidViz(root, viz) {
  const refs = root._summaryPyramidViz;
  if (!refs) return null;

  const timeouts = new Set();
  let disposed = false;
  let currentStageIndex = 0;
  let isPlaying = true;
  const stageDurations = viz.stageDurations || [2600, 3200, 3200, 3400];

  const later = (fn, delay) => {
    const id = setTimeout(() => {
      timeouts.delete(id);
      if (!disposed) fn();
    }, delay);
    timeouts.add(id);
  };

  const clearTimers = () => {
    timeouts.forEach((id) => clearTimeout(id));
    timeouts.clear();
  };

  const setStage = (index, statusText) => {
    refs.status.textContent = statusText;
    refs.stageItems.forEach((item, itemIndex) => {
      item.classList.toggle("is-active", itemIndex === index);
      item.classList.toggle("is-done", itemIndex < index);
    });
    refs.stepButtons.forEach((button, buttonIndex) => {
      button.classList.toggle("is-active", buttonIndex === index);
    });
    currentStageIndex = index;
  };

  const updatePlayButton = () => {
    refs.playButton.textContent = isPlaying ? "❚❚" : "▶";
    refs.playButton.classList.toggle("is-paused", !isPlaying);
  };

  const setVisibility = (elements, visible) => {
    elements.forEach((element) => {
      element.classList.toggle("is-collapsed", !visible);
    });
  };

  const applyStage = (index) => {
    refs.levelCards.forEach(({ card, lines }, levelIndex) => {
      card.classList.toggle("is-focused", levelIndex === Math.min(index, refs.levelCards.length - 1));
      card.classList.toggle("is-dimmed", levelIndex > index);
      setVisibility(lines, levelIndex <= index);
    });
    refs.returnPanel.classList.remove("is-focused");
    refs.returnPending.classList.add("is-collapsed");
    refs.returnLine.classList.add("is-collapsed");

    if (index === 0) {
      setStage(0, viz.statuses?.local || "");
      return;
    }
    if (index === 1) {
      setStage(1, viz.statuses?.middle || "");
      return;
    }
    if (index === 2) {
      setStage(2, viz.statuses?.top || "");
      return;
    }

    setStage(3, viz.statuses?.reenter || "");
    refs.returnPanel.classList.add("is-focused");
    refs.returnLine.classList.remove("is-collapsed");
  };

  const scheduleNext = () => {
    if (!isPlaying || disposed) return;
    later(() => {
      const nextStage = (currentStageIndex + 1) % refs.stageItems.length;
      applyStage(nextStage);
      scheduleNext();
    }, stageDurations[currentStageIndex] || 3200);
  };

  refs.playButton.addEventListener("click", () => {
    isPlaying = !isPlaying;
    updatePlayButton();
    clearTimers();
    if (isPlaying) scheduleNext();
  });

  refs.stepButtons.forEach((button, index) => {
    button.addEventListener("click", () => {
      isPlaying = false;
      updatePlayButton();
      clearTimers();
      applyStage(index);
    });
  });

  updatePlayButton();
  applyStage(0);
  scheduleNext();

  return () => {
    disposed = true;
    clearTimers();
  };
}

function initSummaryCheckViz(root, viz) {
  const refs = root._summaryCheckViz;
  if (!refs) return null;

  const timeouts = new Set();
  let disposed = false;
  let currentStageIndex = 0;
  let isPlaying = true;
  const stageDurations = viz.stageDurations || [2600, 3000, 3200, 3400];

  const later = (fn, delay) => {
    const id = setTimeout(() => {
      timeouts.delete(id);
      if (!disposed) fn();
    }, delay);
    timeouts.add(id);
  };

  const clearTimers = () => {
    timeouts.forEach((id) => clearTimeout(id));
    timeouts.clear();
  };

  const setStage = (index, statusText) => {
    refs.status.textContent = statusText;
    refs.stageItems.forEach((item, itemIndex) => {
      item.classList.toggle("is-active", itemIndex === index);
      item.classList.toggle("is-done", itemIndex < index);
    });
    refs.stepButtons.forEach((button, buttonIndex) => {
      button.classList.toggle("is-active", buttonIndex === index);
    });
    currentStageIndex = index;
  };

  const updatePlayButton = () => {
    refs.playButton.textContent = isPlaying ? "❚❚" : "▶";
    refs.playButton.classList.toggle("is-paused", !isPlaying);
  };

  const setBadgeState = (badge, state) => {
    const labels = {
      pending: "Проверить",
      pass: "Ок",
      fail: "Пробел"
    };
    badge.dataset.state = state;
    badge.textContent = labels[state];
  };

  const applyStage = (index) => {
    refs.summaryPanel.classList.remove("is-focused");
    refs.checklistPanel.classList.remove("is-focused");
    refs.missingLine.classList.add("is-collapsed");
    refs.fixedLine.classList.add("is-collapsed");
    refs.checklistRows.forEach(({ badge, passAt }) => {
      let state = "pending";
      if (index >= 3) state = "pass";
      else if (index === 2) state = passAt <= 2 ? "pass" : "fail";
      else if (index === 1) state = passAt <= 1 ? "pass" : "pending";
      setBadgeState(badge, state);
    });

    if (index === 0) {
      setStage(0, viz.statuses?.draft || "");
      refs.summaryPanel.classList.add("is-focused");
      return;
    }
    if (index === 1) {
      setStage(1, viz.statuses?.review || "");
      refs.summaryPanel.classList.add("is-focused");
      refs.checklistPanel.classList.add("is-focused");
      return;
    }
    if (index === 2) {
      setStage(2, viz.statuses?.gap || "");
      refs.checklistPanel.classList.add("is-focused");
      refs.missingLine.classList.remove("is-collapsed");
      return;
    }

    setStage(3, viz.statuses?.fixed || "");
    refs.summaryPanel.classList.add("is-focused");
    refs.checklistPanel.classList.add("is-focused");
    refs.fixedLine.classList.remove("is-collapsed");
  };

  const scheduleNext = () => {
    if (!isPlaying || disposed) return;
    later(() => {
      const nextStage = (currentStageIndex + 1) % refs.stageItems.length;
      applyStage(nextStage);
      scheduleNext();
    }, stageDurations[currentStageIndex] || 3200);
  };

  refs.playButton.addEventListener("click", () => {
    isPlaying = !isPlaying;
    updatePlayButton();
    clearTimers();
    if (isPlaying) scheduleNext();
  });

  refs.stepButtons.forEach((button, index) => {
    button.addEventListener("click", () => {
      isPlaying = false;
      updatePlayButton();
      clearTimers();
      applyStage(index);
    });
  });

  updatePlayButton();
  applyStage(0);
  scheduleNext();

  return () => {
    disposed = true;
    clearTimers();
  };
}

function initToolLoadingViz(root, viz) {
  const refs = root._toolLoadingViz;
  if (!refs) return null;

  const timeouts = new Set();
  let disposed = false;
  let currentStageIndex = 0;
  let isPlaying = true;
  const stageDurations = viz.stageDurations || [2500, 3200, 3200, 3400];
  const loadPercents = viz.loadPercents || [92, 54, 34, 34];

  const later = (fn, delay) => {
    const id = setTimeout(() => {
      timeouts.delete(id);
      if (!disposed) fn();
    }, delay);
    timeouts.add(id);
  };

  const clearTimers = () => {
    timeouts.forEach((id) => clearTimeout(id));
    timeouts.clear();
  };

  const setStage = (index, statusText) => {
    refs.status.textContent = statusText;
    refs.stageItems.forEach((item, itemIndex) => {
      item.classList.toggle("is-active", itemIndex === index);
      item.classList.toggle("is-done", itemIndex < index);
    });
    refs.stepButtons.forEach((button, buttonIndex) => {
      button.classList.toggle("is-active", buttonIndex === index);
    });
    currentStageIndex = index;
  };

  const updatePlayButton = () => {
    refs.playButton.textContent = isPlaying ? "❚❚" : "▶";
    refs.playButton.classList.toggle("is-paused", !isPlaying);
  };

  const setVisibility = (elements, visible) => {
    elements.forEach((element) => {
      element.classList.toggle("is-collapsed", !visible);
    });
  };

  const setLoad = (index) => {
    const percent = loadPercents[index] ?? loadPercents[0] ?? 90;
    const state = percent > 60 ? "high" : "safe";
    refs.loadFill.style.width = `${percent}%`;
    refs.loadFill.dataset.state = state;
    refs.loadLabel.textContent = percent > 60 ? "Слишком много схем сразу" : "В окне только нужные схемы";
    refs.loadValue.textContent = `${percent}% набора`;
  };

  const applyStage = (index) => {
    refs.selectedPanel.classList.remove("is-focused");
    refs.windowPanel.classList.remove("is-focused");
    setVisibility(refs.selectedLines, false);
    refs.skippedLine.classList.add("is-collapsed");
    setVisibility(refs.windowLines, false);
    setLoad(index);

    if (index === 0) {
      setStage(0, viz.statuses?.catalog || "");
      return;
    }
    if (index === 1) {
      setStage(1, viz.statuses?.select || "");
      refs.selectedPanel.classList.add("is-focused");
      setVisibility(refs.selectedLines, true);
      refs.skippedLine.classList.remove("is-collapsed");
      return;
    }
    if (index === 2) {
      setStage(2, viz.statuses?.load || "");
      refs.selectedPanel.classList.add("is-focused");
      refs.windowPanel.classList.add("is-focused");
      setVisibility(refs.selectedLines, true);
      refs.skippedLine.classList.remove("is-collapsed");
      setVisibility(refs.windowLines, true);
      return;
    }

    setStage(3, viz.statuses?.work || "");
    refs.windowPanel.classList.add("is-focused");
    setVisibility(refs.selectedLines, true);
    refs.skippedLine.classList.remove("is-collapsed");
    setVisibility(refs.windowLines, true);
  };

  const scheduleNext = () => {
    if (!isPlaying || disposed) return;
    later(() => {
      const nextStage = (currentStageIndex + 1) % refs.stageItems.length;
      applyStage(nextStage);
      scheduleNext();
    }, stageDurations[currentStageIndex] || 3200);
  };

  refs.playButton.addEventListener("click", () => {
    isPlaying = !isPlaying;
    updatePlayButton();
    clearTimers();
    if (isPlaying) scheduleNext();
  });

  refs.stepButtons.forEach((button, index) => {
    button.addEventListener("click", () => {
      isPlaying = false;
      updatePlayButton();
      clearTimers();
      applyStage(index);
    });
  });

  updatePlayButton();
  applyStage(0);
  scheduleNext();

  return () => {
    disposed = true;
    clearTimers();
  };
}

function renderViz(node) {
  if (!node.viz) return null;

  if (node.viz.type === "compaction-flow") {
    const element = renderCompactionViz(node.viz);
    return {
      element,
      init() {
        return initCompactionViz(element, node.viz);
      }
    };
  }
  if (node.viz.type === "tool-pruning") {
    return { element: renderPruningViz(node.viz) };
  }
  if (node.viz.type === "subagent-handoff") {
    const element = renderHandoffViz(node.viz);
    return {
      element,
      init() {
        return initHandoffViz(element, node.viz);
      }
    };
  }
  if (node.viz.type === "approval-flow") {
    const element = renderApprovalViz(node.viz);
    return {
      element,
      init() {
        return initApprovalViz(element, node.viz);
      }
    };
  }
  if (node.viz.type === "checkpoint-restore") {
    const element = renderCheckpointViz(node.viz);
    return {
      element,
      init() {
        return initCheckpointViz(element, node.viz);
      }
    };
  }
  if (node.viz.type === "summary-pyramid") {
    const element = renderSummaryPyramidViz(node.viz);
    return {
      element,
      init() {
        return initSummaryPyramidViz(element, node.viz);
      }
    };
  }
  if (node.viz.type === "summary-check") {
    const element = renderSummaryCheckViz(node.viz);
    return {
      element,
      init() {
        return initSummaryCheckViz(element, node.viz);
      }
    };
  }
  if (node.viz.type === "tool-loading") {
    const element = renderToolLoadingViz(node.viz);
    return {
      element,
      init() {
        return initToolLoadingViz(element, node.viz);
      }
    };
  }
  if (node.viz.type === "context-stack") {
    return { element: renderStackViz(node.viz) };
  }

  return null;
}

function matchesNodeSelf(node) {
  const text = state.search.trim().toLowerCase();
  const tagMatch = state.filter === "all" || (node.tags || []).includes(state.filter);
  if (!tagMatch) return false;
  if (!text) return true;

  const sourceText = (node.sourceIds || [])
    .map((id) => {
      const source = data.sources[id];
      return source ? `${source.title} ${source.publisher} ${source.kind}` : "";
    })
    .join(" ")
    .toLowerCase();

  const haystack = [
    node.title,
    node.eyebrow,
    node.summary,
    node.why,
    node.example,
    ...(node.insights || []),
    ...(node.tags || []),
    sourceText
  ]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();

  return haystack.includes(text);
}

function computeVisibility() {
  const hasActiveFilter = state.filter !== "all" || state.search.trim() !== "";
  const keepSet = new Set();
  const autoExpand = hasActiveFilter ? new Set([treeRoot.id]) : new Set();

  function walk(node, ancestors = []) {
    const selfMatch = matchesNodeSelf(node);
    let descendantMatch = false;

    node.children.forEach((child) => {
      if (walk(child, [...ancestors, node.id])) {
        descendantMatch = true;
      }
    });

    const keep = !hasActiveFilter || selfMatch || descendantMatch;
    if (keep) {
      keepSet.add(node.id);
    }
    if (hasActiveFilter && descendantMatch) {
      autoExpand.add(node.id);
      ancestors.forEach((id) => autoExpand.add(id));
    }
    if (hasActiveFilter && selfMatch) {
      ancestors.forEach((id) => autoExpand.add(id));
    }

    return selfMatch || descendantMatch;
  }

  walk(treeRoot);
  return { hasActiveFilter, keepSet, autoExpand };
}

function isExpanded(node, visibility) {
  return state.expanded.has(node.id) || visibility.autoExpand.has(node.id);
}

function getVisibleChildren(node, visibility) {
  if (!node.children.length) return [];
  if (!isExpanded(node, visibility)) return [];
  return node.children.filter((child) => visibility.keepSet.has(child.id));
}

function collectRenderableNodes(node, visibility, result = []) {
  if (!visibility.keepSet.has(node.id)) return result;
  result.push(node);
  getVisibleChildren(node, visibility).forEach((child) => {
    collectRenderableNodes(child, visibility, result);
  });
  return result;
}

function computeFullWeight(node) {
  if (!node.children.length) return 1;
  return node.children.reduce((sum, child) => sum + computeFullWeight(child), 0);
}

function getRadius(depth) {
  const radii = BOARD.radii;
  if (depth < radii.length) return radii[depth];
  return radii[radii.length - 1] + (depth - radii.length + 1) * 260;
}

function getNodeSize(depth) {
  if (depth === 0) return { width: 300, height: 148 };
  if (depth === 1) return { width: 236, height: 118 };
  if (depth === 2) return { width: 194, height: 96 };
  return { width: 160, height: 78 };
}

function applyManualOffsets(layoutMap) {
  Object.entries(state.manualOffsets).forEach(([nodeId, offset]) => {
    const layout = layoutMap.get(nodeId);
    if (!layout) return;
    layout.x += offset.x || 0;
    layout.y += offset.y || 0;
  });
}

function relaxCollisions(layoutMap) {
  const movableNodes = allNodes.filter((node) => node.depth > 0 && layoutMap.has(node.id));

  for (let iter = 0; iter < 18; iter += 1) {
    for (let i = 0; i < movableNodes.length; i += 1) {
      for (let j = i + 1; j < movableNodes.length; j += 1) {
        const a = movableNodes[i];
        const b = movableNodes[j];
        if (Math.abs(a.depth - b.depth) > 2) continue;

        const aLayout = layoutMap.get(a.id);
        const bLayout = layoutMap.get(b.id);
        if (!aLayout || !bLayout) continue;

        const aSize = getNodeSize(a.depth);
        const bSize = getNodeSize(b.depth);
        const minDx = (aSize.width + bSize.width) / 2 + 34;
        const minDy = (aSize.height + bSize.height) / 2 + 28;
        const dx = bLayout.x - aLayout.x;
        const dy = bLayout.y - aLayout.y;

        if (Math.abs(dx) >= minDx || Math.abs(dy) >= minDy) continue;

        const signX = dx === 0 ? 1 : dx > 0 ? 1 : -1;
        const signY = dy === 0 ? 1 : dy > 0 ? 1 : -1;
        const pushX = ((minDx - Math.abs(dx)) / 2) * signX;
        const pushY = ((minDy - Math.abs(dy)) / 2) * signY;

        const aPinned = Boolean(state.manualOffsets[a.id]);
        const bPinned = Boolean(state.manualOffsets[b.id]);
        const radialPush = 10 + Math.min(a.depth, b.depth) * 8;

        if (!aPinned) {
          aLayout.x -= pushX;
          aLayout.y -= pushY;
          const aRadiusX = aLayout.x - BOARD.centerX;
          const aRadiusY = aLayout.y - BOARD.centerY;
          const aLength = Math.hypot(aRadiusX, aRadiusY) || 1;
          aLayout.x += (aRadiusX / aLength) * radialPush;
          aLayout.y += (aRadiusY / aLength) * radialPush;
        }
        if (!bPinned) {
          bLayout.x += pushX;
          bLayout.y += pushY;
          const bRadiusX = bLayout.x - BOARD.centerX;
          const bRadiusY = bLayout.y - BOARD.centerY;
          const bLength = Math.hypot(bRadiusX, bRadiusY) || 1;
          bLayout.x += (bRadiusX / bLength) * radialPush;
          bLayout.y += (bRadiusY / bLength) * radialPush;
        }
      }
    }
  }
}

function computeStableLayout() {
  const layoutMap = new Map();
  const rootSpanStart = -Math.PI + 0.18;
  const rootSpanEnd = Math.PI - 0.18;

  function place(node, startAngle, endAngle) {
    const angle = node.depth === 0 ? -Math.PI / 2 : (startAngle + endAngle) / 2;
    const radius = getRadius(node.depth);
    const x = node.depth === 0 ? BOARD.centerX : BOARD.centerX + Math.cos(angle) * radius;
    const y = node.depth === 0 ? BOARD.centerY : BOARD.centerY + Math.sin(angle) * radius;

    layoutMap.set(node.id, {
      x,
      y,
      angle,
      startAngle,
      endAngle
    });

    const children = node.children;
    if (!children.length) return;

    const totalWeight = children.reduce((sum, child) => sum + computeFullWeight(child), 0);
    let cursor = startAngle;

    children.forEach((child) => {
      const span = ((endAngle - startAngle) * computeFullWeight(child)) / totalWeight;
      const padding = Math.min(0.1, span * 0.18);
      place(child, cursor + padding, cursor + span - padding);
      cursor += span;
    });
  }

  place(treeRoot, rootSpanStart, rootSpanEnd);
  relaxCollisions(layoutMap);
  return layoutMap;
}

const stableLayoutMap = computeStableLayout();

function getLayoutMap() {
  const layoutMap = new Map();
  stableLayoutMap.forEach((value, key) => {
    layoutMap.set(key, { ...value });
  });
  applyManualOffsets(layoutMap);
  return layoutMap;
}

function updateTransform() {
  board.style.transform = `translate(${state.tx}px, ${state.ty}px) scale(${state.scale})`;
}

function centerBoard() {
  const rect = viewport.getBoundingClientRect();
  const fit = Math.min(rect.width / BOARD.width, rect.height / BOARD.height);
  state.scale = Math.max(0.2, Math.min(0.5, fit * 1.34));
  state.tx = rect.width / 2 - BOARD.centerX * state.scale;
  state.ty = rect.height / 2 - BOARD.centerY * state.scale;
  updateTransform();
}

function zoomAt(factor, clientX, clientY) {
  const rect = viewport.getBoundingClientRect();
  const pointX = clientX ? clientX - rect.left : rect.width / 2;
  const pointY = clientY ? clientY - rect.top : rect.height / 2;
  const worldX = (pointX - state.tx) / state.scale;
  const worldY = (pointY - state.ty) / state.scale;
  state.scale = Math.max(0.22, Math.min(1.2, state.scale * factor));
  state.tx = pointX - worldX * state.scale;
  state.ty = pointY - worldY * state.scale;
  updateTransform();
}

function getNodeMeta(node, visibleChildCount) {
  if (visibleChildCount) return `${visibleChildCount} веток`;
  if (node.sourceIds?.length) return `${node.sourceIds.length} источников`;
  if (node.tags?.length) return node.tags[0];
  return "node";
}

function makeConnectionPath(parentLayout, childLayout, parentNode, childNode, muted) {
  const sourceAngle = parentNode.depth === 0 ? childLayout.angle : parentLayout.angle;
  const c1Distance = parentNode.depth === 0 ? 170 : 110 + parentNode.depth * 34;
  const c2Distance = 100 + childNode.depth * 28;
  const c1x = parentLayout.x + Math.cos(sourceAngle) * c1Distance;
  const c1y = parentLayout.y + Math.sin(sourceAngle) * c1Distance;
  const c2x = childLayout.x - Math.cos(childLayout.angle) * c2Distance;
  const c2y = childLayout.y - Math.sin(childLayout.angle) * c2Distance;

  const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
  path.setAttribute(
    "d",
    `M ${parentLayout.x} ${parentLayout.y} C ${c1x} ${c1y}, ${c2x} ${c2y}, ${childLayout.x} ${childLayout.y}`
  );
  path.setAttribute("class", `connection${muted ? " is-muted" : ""}`);
  path.setAttribute("stroke", childNode.color);
  return path;
}

function makeNode(node, layout, visibility) {
  const shell = document.createElement("div");
  shell.className = "node-shell";
  shell.style.left = `${layout.x}px`;
  shell.style.top = `${layout.y}px`;

  const visibleChildren = getVisibleChildren(node, visibility);
  const hasChildren = node.children.length > 0;
  const card = document.createElement("button");
  card.type = "button";
  card.className = "node-card";
  card.dataset.depth = String(node.depth);
  card.style.setProperty("--node-color", node.color);
  if (node.viz) {
    card.classList.add("has-viz");
  }

  if (state.selectedNodeId === node.id) {
    card.classList.add("is-selected");
  }

  const matched = visibility.keepSet.has(node.id);
  if (visibility.hasActiveFilter && !matched) {
    card.classList.add("is-muted");
  }

  const kicker = node.depth === 0 ? "Root" : node.depth === 1 ? node.eyebrow || "Cluster" : nodeMap[node.parentId]?.title || "Branch";
  const summaryLimit = node.depth === 0 ? 150 : node.depth === 1 ? 95 : node.depth === 2 ? 72 : 0;
  const summary = summaryLimit ? shorten(node.summary, summaryLimit) : "";
  const leftTag = (node.tags || []).slice(0, 2).join(" · ") || "context";

  card.innerHTML = `
    <span class="node-kicker">
      <span class="node-dot"></span>
      <span>${kicker}</span>
    </span>
    ${node.viz ? '<span class="node-viz-badge">Механика</span>' : ""}
    <div class="node-title">${node.title}</div>
    ${summary ? `<div class="node-summary">${summary}</div>` : ""}
    <div class="node-meta">
      <span>${leftTag}</span>
      <span class="node-hint">${getNodeMeta(node, visibleChildren.length)}</span>
    </div>
  `;

  card.addEventListener("pointerdown", (event) => {
    if (event.target.closest(".node-toggle")) return;
    state.draggedNodeId = node.id;
    state.pointerNodeId = node.id;
    state.nodeDragMoved = false;
    const currentOffset = state.manualOffsets[node.id] || { x: 0, y: 0 };
    state.nodeDragStartOffsetX = currentOffset.x;
    state.nodeDragStartOffsetY = currentOffset.y;
    state.dragStartX = event.clientX;
    state.dragStartY = event.clientY;
    card.classList.add("is-dragging");
    viewport.setPointerCapture(event.pointerId);
  });

  shell.appendChild(card);

  if (hasChildren) {
    const toggle = document.createElement("button");
    toggle.type = "button";
    toggle.className = "node-toggle";
    toggle.textContent = isExpanded(node, visibility) ? "−" : "+";
    toggle.addEventListener("click", (event) => {
      event.stopPropagation();
      if (state.expanded.has(node.id)) {
        state.expanded.delete(node.id);
      } else {
        state.expanded.add(node.id);
      }
      render();
    });
    shell.appendChild(toggle);
  }

  return shell;
}

function renderDetail() {
  const node = nodeMap[state.selectedNodeId];
  if (activeVizCleanup) {
    activeVizCleanup();
    activeVizCleanup = null;
  }
  document.getElementById("breadcrumb").textContent = node.path.join(" / ");
  document.getElementById("detail-title").textContent = node.title;
  document.getElementById("detail-subtitle").textContent = node.summary;
  document.getElementById("detail-why").textContent = node.why;
  document.getElementById("detail-example").textContent = node.example;

  const vizCard = document.getElementById("detail-viz-card");
  const vizBox = document.getElementById("detail-viz");
  const detailDock = document.getElementById("detail-dock");
  vizBox.innerHTML = "";
  const vizResult = renderViz(node);
  vizCard.hidden = !vizResult;
  if (detailDock) {
    detailDock.classList.toggle("has-viz", Boolean(vizResult));
  }
  if (vizResult) {
    vizBox.appendChild(vizResult.element);
    if (typeof vizResult.init === "function") {
      activeVizCleanup = vizResult.init() || null;
    }
  }

  const insightsBox = document.getElementById("detail-insights");
  insightsBox.innerHTML = "";
  (node.insights || []).forEach((insight) => {
    const item = document.createElement("div");
    item.className = "bullet";
    item.textContent = insight;
    insightsBox.appendChild(item);
  });

  const tagsBox = document.getElementById("detail-tags");
  tagsBox.innerHTML = "";
  (node.tags || []).forEach((tag) => {
    const tagEl = document.createElement("span");
    tagEl.className = "tag";
    tagEl.textContent = tag;
    tagsBox.appendChild(tagEl);
  });

  const sourcesBox = document.getElementById("detail-sources");
  sourcesBox.innerHTML = "";
  (node.sourceIds || []).forEach((sourceId) => {
    const source = data.sources[sourceId];
    if (source) {
      sourcesBox.appendChild(makeSourceLink(source));
    }
  });
}

function render() {
  const visibility = computeVisibility();
  if (!visibility.keepSet.has(state.selectedNodeId)) {
    state.selectedNodeId = treeRoot.id;
  }
  const layoutMap = getLayoutMap();
  const renderableNodes = collectRenderableNodes(treeRoot, visibility);

  nodeLayer.innerHTML = "";
  connections.innerHTML = "";

  const orderedNodes = renderableNodes
    .filter((node) => layoutMap.has(node.id))
    .sort((a, b) => a.depth - b.depth);

  orderedNodes.forEach((node) => {
    if (!node.parentId || !layoutMap.has(node.parentId)) return;
    const parentNode = nodeMap[node.parentId];
    const parentLayout = layoutMap.get(node.parentId);
    const childLayout = layoutMap.get(node.id);
    const muted = visibility.hasActiveFilter && !matchesNodeSelf(node) && !matchesNodeSelf(parentNode);
    connections.appendChild(makeConnectionPath(parentLayout, childLayout, parentNode, node, muted));
  });

  orderedNodes.forEach((node) => {
    nodeLayer.appendChild(makeNode(node, layoutMap.get(node.id), visibility));
  });

  renderDetail();
}

function applyFilter(nextFilter) {
  state.filter = nextFilter;
  chips.forEach((chip) => chip.classList.toggle("is-active", chip.dataset.filter === nextFilter));
  render();
}

function initFilters() {
  chips.forEach((chip) => {
    chip.addEventListener("click", () => applyFilter(chip.dataset.filter));
  });

  const searchInput = document.getElementById("search");
  if (searchInput) {
    searchInput.addEventListener("input", (event) => {
      state.search = event.target.value;
      render();
    });
  }
}

function initZoom() {
  const zoomInBtn = document.getElementById("zoom-in");
  const zoomOutBtn = document.getElementById("zoom-out");
  const resetViewBtn = document.getElementById("reset-view");

  if (zoomInBtn) zoomInBtn.addEventListener("click", () => zoomAt(1.1));
  if (zoomOutBtn) zoomOutBtn.addEventListener("click", () => zoomAt(0.9));
  if (resetViewBtn) resetViewBtn.addEventListener("click", centerBoard);

  viewport.addEventListener(
    "wheel",
    (event) => {
      event.preventDefault();
      zoomAt(event.deltaY < 0 ? 1.08 : 0.92, event.clientX, event.clientY);
    },
    { passive: false }
  );
}

function initPan() {
  const stopDrag = (pointerId) => {
    if (!state.isDragging) return;
    state.isDragging = false;
    viewport.classList.remove("is-dragging");
    viewport.releasePointerCapture(pointerId);
  };

  const stopNodeDrag = (pointerId) => {
    if (!state.draggedNodeId) return;
    const draggingCard = nodeLayer.querySelector(".node-card.is-dragging");
    if (draggingCard) draggingCard.classList.remove("is-dragging");
    const releasedNodeId = state.draggedNodeId;
    const shouldSelect = !state.nodeDragMoved;
    state.nodeDragMoved = false;
    state.draggedNodeId = null;
    state.pointerNodeId = null;
    viewport.releasePointerCapture(pointerId);
    if (shouldSelect) {
      state.selectedNodeId = releasedNodeId;
      render();
    }
  };

  viewport.addEventListener("pointerdown", (event) => {
    if (state.draggedNodeId) return;
    if (event.target.closest(".node-card") || event.target.closest(".node-toggle")) return;
    state.isDragging = true;
    viewport.classList.add("is-dragging");
    state.dragStartX = event.clientX;
    state.dragStartY = event.clientY;
    state.dragOriginX = state.tx;
    state.dragOriginY = state.ty;
    viewport.setPointerCapture(event.pointerId);
  });

  viewport.addEventListener("pointermove", (event) => {
    if (state.draggedNodeId) {
      const dx = (event.clientX - state.dragStartX) / state.scale;
      const dy = (event.clientY - state.dragStartY) / state.scale;
      if (Math.abs(dx) > 4 || Math.abs(dy) > 4) {
        state.nodeDragMoved = true;
      }
      state.manualOffsets[state.draggedNodeId] = {
        x: state.nodeDragStartOffsetX + dx,
        y: state.nodeDragStartOffsetY + dy
      };
      render();
      return;
    }
    if (!state.isDragging) return;
    state.tx = state.dragOriginX + event.clientX - state.dragStartX;
    state.ty = state.dragOriginY + event.clientY - state.dragStartY;
    updateTransform();
  });

  viewport.addEventListener("pointerup", (event) => {
    stopNodeDrag(event.pointerId);
    stopDrag(event.pointerId);
  });

  viewport.addEventListener("pointercancel", (event) => {
    stopNodeDrag(event.pointerId);
    stopDrag(event.pointerId);
  });
}

function initActions() {
  const expandAllBtn = document.getElementById("expand-all");
  const collapseAllBtn = document.getElementById("collapse-all");
  if (!expandAllBtn || !collapseAllBtn) return;

  expandAllBtn.addEventListener("click", () => {
    state.expanded = new Set(allNodes.filter((node) => node.children.length).map((node) => node.id));
    render();
  });

  collapseAllBtn.addEventListener("click", () => {
    state.expanded = new Set();
    render();
  });
}

function initResponsive() {
  const observer = new ResizeObserver(() => {
    centerBoard();
  });
  observer.observe(viewport);
}

initFilters();
initZoom();
initPan();
initActions();
initResponsive();
centerBoard();
render();
