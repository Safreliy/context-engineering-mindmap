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
  document.getElementById("breadcrumb").textContent = node.path.join(" / ");
  document.getElementById("detail-title").textContent = node.title;
  document.getElementById("detail-subtitle").textContent = node.summary;
  document.getElementById("detail-why").textContent = node.why;
  document.getElementById("detail-example").textContent = node.example;

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
