window.MINDMAP_DATA = {
  meta: {
    title: "Контекстная инженерия",
    subtitle:
      "Интерактивная карта для проектирования LLM-агентов, coding workflows и long-running sessions",
    summary:
      "Контекстная инженерия отвечает не за красивый prompt сам по себе, а за то, какие данные, инструменты, артефакты и следы работы модель видит на каждом шаге.",
    editingNote:
      "Все содержимое карты лежит в mindmap-data.js: можно добавлять новые кластеры, узлы, примеры и источники без сборки проекта."
  },
  sources: {
    "anthropic-context": {
      title: "Anthropic: Effective context engineering for AI agents",
      publisher: "Anthropic",
      kind: "Guide",
      url: "https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents"
    },
    "anthropic-context-management": {
      title: "Claude: Managing context on the Claude Developer Platform",
      publisher: "Anthropic / Claude",
      kind: "Product update",
      url: "https://www.anthropic.com/news/context-management"
    },
    "anthropic-agents": {
      title: "Building Effective AI Agents",
      publisher: "Anthropic",
      kind: "Architecture guide",
      url: "https://resources.anthropic.com/building-effective-ai-agents"
    },
    "anthropic-multi-agent": {
      title: "Anthropic: How we built our multi-agent research system",
      publisher: "Anthropic",
      kind: "Engineering post",
      url: "https://www.anthropic.com/engineering/multi-agent-research-system"
    },
    "anthropic-tools": {
      title: "Anthropic: Writing effective tools for agents — with agents",
      publisher: "Anthropic",
      kind: "Engineering post",
      url: "https://www.anthropic.com/engineering/writing-tools-for-agents"
    },
    "mcp-intro": {
      title: "What is the Model Context Protocol (MCP)?",
      publisher: "Model Context Protocol",
      kind: "Official docs",
      url: "https://modelcontextprotocol.io/docs/getting-started/intro"
    },
    "mcp-spec": {
      title: "Model Context Protocol Specification",
      publisher: "Model Context Protocol",
      kind: "Specification",
      url: "https://spec.modelcontextprotocol.io/"
    },
    react: {
      title: "ReAct: Synergizing Reasoning and Acting in Language Models",
      publisher: "arXiv / ICLR",
      kind: "Paper",
      url: "https://arxiv.org/abs/2210.03629"
    },
    toolformer: {
      title: "Toolformer: Language Models Can Teach Themselves to Use Tools",
      publisher: "arXiv",
      kind: "Paper",
      url: "https://arxiv.org/abs/2302.04761"
    },
    graphrag: {
      title: "Microsoft Research: Project GraphRAG",
      publisher: "Microsoft Research",
      kind: "Project",
      url: "https://www.microsoft.com/en-us/research/project/graphrag/"
    },
    "langchain-context": {
      title: "LangChain Docs: Context engineering in agents",
      publisher: "LangChain",
      kind: "Docs",
      url: "https://docs.langchain.com/oss/python/langchain/context-engineering"
    },
    "swe-bench": {
      title: "SWE-bench",
      publisher: "GitHub / Princeton NLP",
      kind: "Benchmark",
      url: "https://github.com/swe-bench/SWE-bench"
    },
    "terminal-bench": {
      title: "Terminal-Bench",
      publisher: "GitHub / Harbor Framework",
      kind: "Benchmark",
      url: "https://github.com/harbor-framework/terminal-bench"
    },
    acon: {
      title: "ACON: Compressing Context to Enhance Inference Efficiency of Code LLMs",
      publisher: "arXiv",
      kind: "Paper",
      url: "https://arxiv.org/abs/2510.00615"
    },
    "active-context-compression": {
      title: "Active Context Compression: Autonomous Memory Management in Language Agents",
      publisher: "arXiv",
      kind: "Paper",
      url: "https://arxiv.org/abs/2601.07190"
    },
    "claude-code-overview": {
      title: "Claude Code overview",
      publisher: "Claude",
      kind: "Official docs",
      url: "https://code.claude.com/docs/en/overview"
    },
    "claude-code-mcp": {
      title: "Claude Code MCP",
      publisher: "Claude",
      kind: "Official docs",
      url: "https://code.claude.com/docs/en/mcp"
    },
    "claude-code-context-window": {
      title: "Claude Code: Explore the context window",
      publisher: "Claude",
      kind: "Official docs",
      url: "https://code.claude.com/docs/en/context-window"
    },
    "gemini-cli": {
      title: "Gemini CLI documentation",
      publisher: "Google",
      kind: "Official docs",
      url: "https://google-gemini.github.io/gemini-cli/"
    },
    "gemini-cli-tools": {
      title: "Gemini CLI tools and MCP",
      publisher: "Google",
      kind: "Official docs",
      url: "https://google-gemini.github.io/gemini-cli/docs/tools/"
    },
    "gemini-cli-context": {
      title: "Gemini CLI: GEMINI.md context files",
      publisher: "Google",
      kind: "Official docs",
      url: "https://google-gemini.github.io/gemini-cli/docs/cli/gemini-md.html"
    },
    "gemini-cli-checkpointing": {
      title: "Gemini CLI: Checkpointing",
      publisher: "Google",
      kind: "Official docs",
      url: "https://google-gemini.github.io/gemini-cli/docs/checkpointing.html"
    },
    "gemini-cli-trusted-folders": {
      title: "Gemini CLI: Trusted Folders",
      publisher: "Google",
      kind: "Official docs",
      url: "https://google-gemini.github.io/gemini-cli/docs/cli/trusted-folders.html"
    },
    "codex-cli": {
      title: "Codex CLI",
      publisher: "OpenAI",
      kind: "Official docs",
      url: "https://developers.openai.com/codex/cli"
    },
    "codex-agents-md": {
      title: "Codex: AGENTS.md",
      publisher: "OpenAI",
      kind: "Official docs",
      url: "https://developers.openai.com/codex/guides/agents-md"
    },
    "codex-security": {
      title: "Codex: Agent approvals & security",
      publisher: "OpenAI",
      kind: "Official docs",
      url: "https://developers.openai.com/codex/agent-approvals-security"
    },
    "codex-hooks": {
      title: "Codex: Hooks",
      publisher: "OpenAI",
      kind: "Official docs",
      url: "https://developers.openai.com/codex/hooks"
    },
    "codex-subagents": {
      title: "Codex: Subagents",
      publisher: "OpenAI",
      kind: "Official docs",
      url: "https://developers.openai.com/codex/subagents"
    },
    "codex-mcp": {
      title: "Codex: Model Context Protocol",
      publisher: "OpenAI",
      kind: "Official docs",
      url: "https://developers.openai.com/codex/mcp"
    },
    "opencode-docs": {
      title: "OpenCode documentation",
      publisher: "OpenCode",
      kind: "Official docs",
      url: "https://opencode.ai/docs/"
    },
    "opencode-agents": {
      title: "OpenCode agents",
      publisher: "OpenCode",
      kind: "Official docs",
      url: "https://opencode.ai/docs/agents/"
    },
    "opencode-config": {
      title: "OpenCode config",
      publisher: "OpenCode",
      kind: "Official docs",
      url: "https://opencode.ai/docs/config/"
    },
    "opencode-permissions": {
      title: "OpenCode permissions",
      publisher: "OpenCode",
      kind: "Official docs",
      url: "https://opencode.ai/docs/permissions/"
    },
    "forgecode-docs": {
      title: "ForgeCode documentation",
      publisher: "ForgeCode",
      kind: "Official docs",
      url: "https://forgecode.dev/docs/"
    },
    "forgecode-services": {
      title: "ForgeCode services",
      publisher: "ForgeCode",
      kind: "Official docs",
      url: "https://forgecode.dev/docs/forge-services/"
    },
    "forgecode-compaction": {
      title: "ForgeCode context compaction",
      publisher: "ForgeCode",
      kind: "Official docs",
      url: "https://forgecode.dev/docs/context-compaction/"
    },
    "forgecode-skills": {
      title: "ForgeCode skills",
      publisher: "ForgeCode",
      kind: "Official docs",
      url: "https://forgecode.dev/docs/skills/"
    }
  },
  root: {
    id: "root",
    title: "Контекстная инженерия",
    eyebrow: "Root",
    angle: 0,
    color: "#0f766e",
    tags: ["основа", "runtime", "agent"],
    summary:
      "Дизайн всего набора токенов, который попадает в модель на текущем шаге: инструкции, tools, память, история, артефакты, результаты поиска и вывод команд.",
    why:
      "У агентных систем проблема обычно не в том, что контекста мало, а в том, что в окне слишком много шума, слишком слабая селекция и неясно, что нужно сохранить между шагами.",
    example:
      "Coding agent читает не весь репозиторий, а только релевантные файлы, последние tool outputs, проектные правила, краткое состояние задачи и результаты последней проверки.",
    insights: [
      "Больше контекста не означает лучшее качество: полезность токенов убывает.",
      "Рабочая единица здесь не prompt, а весь runtime вокруг модели.",
      "Хороший harness управляет не только включением данных, но и их форматом, временем подачи и жизненным циклом."
    ],
    sourceIds: [
      "anthropic-context",
      "anthropic-context-management",
      "anthropic-agents"
    ]
  },
  clusters: [
    {
      id: "basics",
      title: "Определение и цели",
      eyebrow: "Mental model",
      angle: 318,
      color: "#0f766e",
      tags: ["основа", "mental-model"],
      summary:
        "Что вообще считается контекстом, почему prompt engineering уже недостаточно и какие trade-offs нужно балансировать.",
      why:
        "Без общей модели легко спорить о retrieval, compaction и memory разными словами, хотя речь идёт об одном и том же runtime-слое.",
      example:
        "Если агент решает задачу 90 минут, то контекстом становятся не только сообщения, но и вывод тестов, найденные файлы, правила проекта, checkpoints и внешние ресурсы.",
      insights: [
        "Цель не максимизировать длину окна, а полезность каждого токена.",
        "Контекстная инженерия расширяет prompt engineering до управления всем состоянием модели.",
        "Хорошая система одновременно оптимизирует solve rate, стоимость, latency и воспроизводимость."
      ],
      sourceIds: [
        "anthropic-context",
        "anthropic-agents",
        "langchain-context"
      ],
      children: [
        {
          id: "definition",
          title: "Что входит в контекст",
          tags: ["основа", "state"],
          summary:
            "Инструкции, tool definitions, внешние файлы, история, промежуточные результаты, память и артефакты.",
          why:
            "Именно поэтому контекстная инженерия почти всегда упирается в runtime, а не только в wording system prompt.",
          example:
            "В coding agent один turn может включать AGENTS.md, выбранные файлы, diff, лог тестов и список доступных tools.",
          insights: [
            "Разные источники данных живут по разным правилам retention.",
            "Часть контекста статична, часть создаётся самим агентом по ходу работы."
          ],
          sourceIds: ["anthropic-context", "langchain-context"]
        },
        {
          id: "goals",
          title: "Цели хорошей системы",
          tags: ["основа", "metrics"],
          summary:
            "Повышать качество решения при ограничениях окна, цены, скорости и надёжности долгих сессий.",
          why:
            "Нельзя оценивать контекстную политику по одной метрике вроде tokens saved.",
          example:
            "Дешёвая summary, которая теряет важный edge case, уменьшит cost, но ухудшит final pass rate.",
          insights: [
            "Контекстная политика всегда многокритериальна.",
            "Для production-систем важна повторяемость: два похожих запуска должны видеть сопоставимый набор сигналов."
          ],
          sourceIds: ["anthropic-context", "anthropic-agents", "swe-bench"]
        },
        {
          id: "tensions",
          title: "Ключевые trade-offs",
          tags: ["tradeoff", "design"],
          summary:
            "Полнота vs шум, recall vs cost, гибкость vs управляемость, долговечная память vs свежесть данных.",
          why:
            "Большинство спорных архитектурных решений на практике оказываются разными точками на этих осях.",
          example:
            "Полезно держать в окне свежие tool outputs, но старые логи тестов лучше отрезать или свернуть.",
          insights: [
            "Отбор контекста обычно важнее, чем наращивание размера окна.",
            "Чем богаче toolset, тем выше риск token bloat и prompt injection."
          ],
          sourceIds: ["anthropic-context", "mcp-intro", "langchain-context"]
        },
        {
          id: "agent-runtime",
          title: "Почему это уже не prompt engineering",
          tags: ["runtime", "agent"],
          summary:
            "В агенте каждый ход меняет universe of possible context, поэтому выбор делается циклически, а не один раз в начале.",
          why:
            "Для long-running tasks сильнее влияет порядок и повторная инъекция информации, чем разовый красивый prompt.",
          example:
            "После десятков tool calls агенту нужно решить, что выбросить, что переписать в summary, а что сохранить как durable artifact.",
          insights: [
            "Контекстная инженерия работает на каждом шаге inference loop.",
            "Контроль времени подачи информации так же важен, как её наличие."
          ],
          sourceIds: ["anthropic-context", "react", "anthropic-context-management"]
        }
      ]
    },
    {
      id: "retrieval",
      title: "Сбор и селекция",
      eyebrow: "Retrieval",
      angle: 8,
      color: "#2563eb",
      tags: ["retrieval", "repo"],
      summary:
        "Как агент добывает релевантный контекст: exact search, semantic search, repo maps, reranking и staged reads.",
      why:
        "Если агент тянет в окно не те файлы и не те фрагменты, все последующие summary и planning уже строятся на шуме.",
      example:
        "Сначала exact/identifier search для локализации символа, потом чтение нескольких файлов, а не всего модуля.",
      insights: [
        "Для кода lexical search часто даёт более надёжную опору, чем чистый embedding search.",
        "Лучшие системы смешивают select-before-read и read-before-decide."
      ],
      sourceIds: ["react", "toolformer", "graphrag", "langchain-context"],
      children: [
        {
          id: "lexical-search",
          title: "Лексический поиск",
          tags: ["retrieval", "exact"],
          summary:
            "grep, ripgrep, regex, identifier и path search для точного нахождения символов и строк.",
          why:
            "В кодовой базе exact match часто важнее семантического сходства.",
          example:
            "Найти все вызовы `buildPrompt()` и потом открыть только связанные места.",
          insights: [
            "Особенно полезен для API names, error strings и config keys.",
            "Дешёвый и объяснимый базовый этап перед более дорогим retrieval."
          ],
          sourceIds: ["react", "langchain-context"]
        },
        {
          id: "semantic-search",
          title: "Семантический и гибридный поиск",
          tags: ["retrieval", "semantic"],
          summary:
            "Embeddings, reranking и гибридные схемы помогают, когда нужный фрагмент не совпадает по словам.",
          why:
            "Полезно для широких вопросов вроде архитектурных паттернов или неочевидных связей между файлами.",
          example:
            "Запрос про 'где реализована политика повторных попыток' можно решить через семантический поиск с последующим reranking по названиям методов.",
          insights: [
            "Чистый семантический поиск без reranking часто приносит красивый, но бесполезный шум.",
            "Для кода гибрид почти всегда устойчивее, чем один механизм."
          ],
          sourceIds: ["graphrag", "langchain-context"]
        },
        {
          id: "repo-map",
          title: "Карта репозитория и индексы",
          tags: ["retrieval", "index"],
          summary:
            "Предвычисленные AST, symbol graph, dependency graph и структурные карты помогают не читать репозиторий вслепую.",
          why:
            "Чем крупнее проект, тем меньше смысла в линейном обходе через историю сообщений.",
          example:
            "Агент сначала открывает карту зависимостей, а потом читает только вершины вокруг подозрительного узла.",
          insights: [
            "Индекс уменьшает число случайных чтений.",
            "Структурная карта полезна и для retrieval, и для compaction."
          ],
          sourceIds: ["graphrag", "anthropic-agents"]
        },
        {
          id: "tool-discovery",
          title: "Выбор инструмента до чтения",
          tags: ["retrieval", "tooling"],
          summary:
            "Нужно решить не только что читать, но и каким инструментом добывать информацию.",
          why:
            "В богатом tool catalog ошибка выбора сама по себе раздувает контекст и цену.",
          example:
            "Вместо full file read агент сначала использует поиск, потом scoped read, а не наоборот.",
          insights: [
            "Хороший runtime оптимизирует и retrieval path, и token path.",
            "Tool discovery становится частью контекстной политики."
          ],
          sourceIds: ["toolformer", "mcp-intro", "anthropic-context"]
        }
      ]
    },
    {
      id: "budgeting",
      title: "Управление объёмом контекста",
      eyebrow: "Control",
      angle: 52,
      color: "#7c3aed",
      tags: ["budget", "control"],
      summary:
        "Как не дать окну бесконтрольно разрастись: фазовое разделение, окна удержания, сокращение выводов инструментов и ограниченное исследование.",
      why:
        "Даже при большом контекстном окне модель теряет фокус задолго до формального лимита.",
      example:
        "Агент хранит подробно только несколько последних сообщений, а старые выводы инструментов вытесняет первыми.",
      insights: [
        "Лучший способ бороться с переполнением часто Prevention, а не героическое сжатие в самом конце.",
        "Нужно отдельно резервировать буфер для следующего шага, а не заполнять окно под ноль."
      ],
      sourceIds: ["anthropic-context", "anthropic-context-management", "langchain-context"],
      children: [
        {
          id: "prevention",
          title: "Prevention",
          tags: ["budget", "prevention"],
          summary:
            "Контекст ограничивается заранее: фазами, лимитами поиска, scoping по узлам графа, capped rounds.",
          why:
            "Структурные ограничения уменьшают потребность в агрессивной summary потом.",
          example:
            "Сначала только triage, потом только implementation, потом только validation.",
          insights: [
            "Prevention особенно полезен для benchmarked workflows.",
            "Хорошо сочетается с explicit task phases."
          ],
          sourceIds: ["anthropic-agents", "langchain-context"]
        },
        {
          id: "cure",
          title: "Cure",
          tags: ["budget", "cure"],
          summary:
            "Контекст растёт свободнее, а при приближении к порогу запускается compaction или selective eviction.",
          why:
            "Гибче для open-ended research и exploratory coding, но рискованнее для quality drift.",
          example:
            "На 75% окна агент сворачивает старую историю и оставляет свежий active working set.",
          insights: [
            "Cure требует хороших triggers и понятной политики reinjection.",
            "Если summary плохая, ошибка всплывёт не сразу, а через несколько ходов."
          ],
          sourceIds: ["anthropic-context-management", "anthropic-context"]
        },
        {
          id: "tool-output-pruning",
          title: "Pruning выводов инструментов",
          tags: ["budget", "tooling"],
          summary:
            "Старые логи, большие JSON и длинные выводы терминала чаще всего первыми становятся кандидатами на вынос из окна.",
          why:
            "Они дороги в токенах и редко нужны дословно спустя несколько ходов.",
          example:
            "Оставить только exit code, ключевые ошибки и ссылку на артефакт, а не весь stdout.",
          insights: [
            "Лучше хранить ссылку на большой вывод, чем держать его прямо в окне.",
            "Маскирование и отложенная подгрузка обычно дешевле полной повторной вставки."
          ],
          sourceIds: ["anthropic-context-management", "mcp-intro"]
        },
        {
          id: "reserved-buffer",
          title: "Резерв и окно удержания",
          tags: ["budget", "token"],
          summary:
            "Нужно заранее оставлять место под следующий turn, tool results и emergency summary.",
          why:
            "Агент, работающий на пределе окна, быстро становится хрупким и склонным к premature wrap-up.",
          example:
            "Держать 15-20% окна свободными для ответа модели и новых наблюдений.",
          insights: [
            "Свободный буфер уменьшает каскадные overflow ошибки.",
            "Retention window полезно задавать отдельно для истории, памяти и tool outputs."
          ],
          sourceIds: ["anthropic-context", "anthropic-context-management"]
        }
      ]
    },
    {
      id: "compression",
      title: "Compaction и Compression",
      eyebrow: "Compression",
      angle: 96,
      color: "#db2777",
      tags: ["compression", "summary"],
      summary:
        "Сжатие старого контекста без потери рабочего смысла: summary, иерархический Compaction, проверка качества и отдельные модели-сжиматели.",
      why:
        "Долгоживущие агенты почти неизбежно упираются в необходимость сокращать историю или превращать её в более дешёвое представление.",
      example:
        "После серии исследовательских шагов агент сохраняет план, сделанные выводы, открытые вопросы и ссылки на артефакты вместо полной истории.",
      insights: [
        "Сводка должна сохранять состояние, а не пересказывать красивый рассказ.",
        "Compaction полезно мыслить как системную операцию, а не как разовый трюк с промптом."
      ],
      sourceIds: [
        "anthropic-context",
        "anthropic-context-management",
        "langchain-context"
      ],
      children: [
        {
          id: "compaction",
          title: "Compaction как системная операция",
          tags: ["compression", "runtime"],
          summary:
            "Не просто summary текста, а перепаковка текущего рабочего состояния в более компактную форму.",
          why:
            "Нужно сохранить task state, next steps, decisions и unresolved issues.",
          example:
            "Вместо 30 сообщений сохранить 'что проверили', 'что сломано', 'какие файлы важны', 'что делать дальше'.",
          insights: [
            "Хороший compaction ориентирован на продолжение работы, а не на human-readable recap.",
            "Он должен быть совместим с последующей повторной загрузкой контекста."
          ],
          sourceIds: ["anthropic-context", "anthropic-context-management"]
        },
        {
          id: "hierarchical-summary",
          title: "Иерархическая сводка",
          tags: ["compression", "hierarchy"],
          summary:
            "Можно сжимать не всё одинаково, а иметь слой локальных сводок, промежуточных уровней и более абстрактной верхушки.",
          why:
            "Это снижает риск потерять критичную деталь при одном грубом сжатии всего хвоста.",
          example:
            "По каждому подэтапу есть локальная заметка, а сверху короткий общий статус.",
          insights: [
            "Подходит для исследования и многоагентных схем.",
            "Граф или DAG из сводок легче проверять и переиспользовать."
          ],
          sourceIds: ["graphrag", "anthropic-agents"]
        },
        {
          id: "verification",
          title: "Summary + проверка",
          tags: ["compression", "quality"],
          summary:
            "После сжатия полезно проверить, не выпали ли ограничения, пути к файлам, гипотезы и незакрытые блокеры.",
          why:
            "Самая дорогая ошибка Compaction обычно обнаруживается через несколько ходов, когда восстановить исходный смысл уже сложно.",
          example:
            "Сделать короткий список проверки: текущая цель, последний падающий тест, принятые решения, что ещё не проверено.",
          insights: [
            "Точность важнее литературности.",
            "Короткая проверка вопросами часто окупается."
          ],
          sourceIds: ["anthropic-context-management", "langchain-context"]
        },
        {
          id: "separate-compressor",
          title: "Отдельный compressor",
          tags: ["compression", "models"],
          summary:
            "Сжатие можно отдавать отдельной модели, сабагенту или даже специально настраиваемому контуру сжатия, чтобы основной агент не тратил лучшие токены на служебную работу.",
          why:
            "Это особенно полезно при большом количестве tool outputs и рутины.",
          example:
            "Основной агент пишет код дорогой моделью, а Compaction делает более дешёвый помощник.",
          insights: [
            "Требует строгого формата summary и проверки качества.",
            "Отдельный сжиматель должен знать, что считается критическим состоянием.",
            "Здесь лежат и исследовательские подходы вроде ACON, и прикладные фоновые схемы Compaction в реальных CLI-агентах."
          ],
          sourceIds: ["anthropic-agents", "langchain-context", "acon"],
          children: [
            {
              id: "compressor-acon",
              title: "ACON",
              tags: ["compression", "models", "research"],
              summary:
                "ACON показывает, что оптимизировать можно не только основную модель, но и сам контур сжатия: правила и подсказки для компрессора подстраиваются под задачу.",
              why:
                "Это полезно, когда проблема не в отсутствии сжимателя, а в том, что он систематически теряет нужный тип сигналов.",
              example:
                "Компрессор учат лучше сохранять пути к файлам, ограничения и промежуточные решения, а не общий рассказ о ходе работы.",
              insights: [
                "ACON стоит понимать как настройку поведения сжимателя, а не как ещё одно общее название для summary.",
                "Такой подход особенно уместен там, где качество Compaction заметно влияет на последующие ходы."
              ],
              sourceIds: ["acon"]
            },
            {
              id: "compressor-active-context",
              title: "Active Context Compression",
              tags: ["compression", "memory", "research"],
              summary:
                "Похожая линия работ рассматривает сжатие как автономное управление памятью: агент сам решает, что оставить в окне, что вынести наружу и что вернуть позже.",
              why:
                "Это помогает перейти от разовой сводки к непрерывной политике удержания состояния.",
              example:
                "Текущий фокус остаётся в активном окне, а старые наблюдения уходят в более дешёвое представление и возвращаются по мере надобности.",
              insights: [
                "Такой подход ближе к менеджеру памяти, чем к обычной суммаризации текста.",
                "Он хорошо сочетается с журналом решений, контрольными точками и адресуемыми артефактами."
              ],
              sourceIds: ["active-context-compression", "anthropic-context-management"]
            },
            {
              id: "compressor-product-patterns",
              title: "Прикладные варианты",
              tags: ["compression", "examples"],
              summary:
                "В реальных агентах сжиматель чаще выглядит не как отдельная статья, а как набор практических правил: пороги окна, фоновые сводки, артефакты и повторная подгрузка состояния.",
              why:
                "Это связывает исследовательские идеи вроде ACON с тем, что реально встречается в CLI-агентах.",
              example:
                "ForgeCode отдельно описывает context compaction, а другие терминальные агенты решают ту же задачу через память проекта, контрольные точки и бережную подачу tool output.",
              insights: [
                "Исследовательские и прикладные решения различаются формой, но управляют одной и той же проблемой переполнения окна.",
                "Сравнивать стоит не названия фич, а то, как именно система сохраняет рабочее состояние."
              ],
              sourceIds: ["forgecode-compaction", "claude-code-overview", "gemini-cli", "codex-cli"]
            }
          ]
        }
      ]
    },
    {
      id: "memory",
      title: "Память и состояние",
      eyebrow: "Memory",
      angle: 140,
      color: "#ea580c",
      tags: ["memory", "state"],
      summary:
        "Что хранить за пределами текущего окна: durable memory, files as memory, event logs, checkpoints и reusable artifacts.",
      why:
        "Невозможно поддерживать долгую работу, если единственный носитель состояния это chat history.",
      example:
        "Agent сохраняет архитектурные решения в memory directory, а не держит их в окне много часов подряд.",
      insights: [
        "Нужно разделять transient working context и durable state.",
        "Лучшая память адресуема и редактируема, а не просто длинная история сообщений."
      ],
      sourceIds: [
        "anthropic-context",
        "anthropic-context-management",
        "anthropic-agents"
      ],
      children: [
        {
          id: "session-memory",
          title: "Память текущего запуска",
          tags: ["memory", "session"],
          summary:
            "Краткоживущая рабочая память для текущего run: hypotheses, active files, next checks.",
          why:
            "Она меняется быстро и не должна навсегда загрязнять durable store.",
          example:
            "Список текущих подозреваемых файлов и двух последних ошибок из тестов.",
          insights: [
            "Полезно держать компактной и легко очищаемой.",
            "Часто ближе к scratchpad, чем к knowledge base."
          ],
          sourceIds: ["anthropic-context-management", "langchain-context"]
        },
        {
          id: "durable-memory",
          title: "Постоянная память и артефакты",
          tags: ["memory", "artifact"],
          summary:
            "Файлы, заметки, checkpoints и проектные артефакты, которые переживают смену окна или новую сессию.",
          why:
            "Без такого слоя агент заново открывает уже найденное и тратит токены на повторение.",
          example:
            "Отдельный markdown с принятыми решениями по refactor и ссылками на связанные файлы.",
          insights: [
            "Артефакты лучше chat history подходят для handoff между агентами.",
            "Полезно хранить не всё подряд, а только устойчивые выводы."
          ],
          sourceIds: ["anthropic-context-management", "anthropic-agents"]
        },
        {
          id: "event-log",
          title: "Журнал событий и воспроизведение",
          tags: ["memory", "events"],
          summary:
            "История действий как поток событий, который можно выборочно перечитывать, а не только целиком пересылать модели.",
          why:
            "Это делает long-horizon runs более воспроизводимыми и пригодными к отладке.",
          example:
            "Сохранять calls, результаты, timestamps и checkpoints, а потом доставать только нужный срез.",
          insights: [
            "Event log полезен и для дебага, и для evals.",
            "Replay-системы лучше масштабируются, чем бесконечный чат."
          ],
          sourceIds: ["anthropic-context-management", "anthropic-agents"]
        },
        {
          id: "files-as-memory",
          title: "Файлы как память",
          tags: ["memory", "files"],
          summary:
            "Это не отдельный тип памяти, а практичный способ её хранить: состояние лежит в обычных файлах, которые агент умеет читать и обновлять.",
          why:
            "Файлы проще версионировать, проверять глазами и выборочно возвращать в контекст по мере надобности.",
          example:
            "Держать `research-notes.md`, `plan.md`, `decisions.md` и подключать их выборочно.",
          insights: [
            "Это не самый эффектный, но очень инженерный способ сохранить состояние.",
            "Особенно удобен в задачах по коду."
          ],
          sourceIds: ["anthropic-context-management", "langchain-context"]
        }
      ]
    },
    {
      id: "orchestration",
      title: "Harness и координация",
      eyebrow: "Runtime",
      angle: 184,
      color: "#dc2626",
      tags: ["runtime", "multi-agent"],
      summary:
        "Всё, что делает модель агентом: системный стек инструкций, схемы инструментов, хуки, сабагенты, песочница, маршрутизация и цикл выполнения.",
      why:
        "Контекстная инженерия живёт в Harness. Именно он решает, что включить, когда вызвать инструмент, когда очистить историю и как передать состояние дальше.",
      example:
        "Один агент исследует код, другой пишет патч, а главный координирующий слой передаёт им только нужные части состояния.",
      insights: [
        "Agent = model + harness, а не просто model + prompt.",
        "Разделение ролей часто уменьшает шум лучше, чем одна огромная сессия."
      ],
      sourceIds: ["anthropic-agents", "react", "toolformer"],
      children: [
        {
          id: "harness",
          title: "Harness как объект дизайна",
          tags: ["runtime", "harness"],
          summary:
            "Harness задаёт порядок системных инструкций, политику контекста, работу с tools и execution environment.",
          why:
            "Два агента на одной модели могут сильно различаться именно из-за harness.",
          example:
            "Один scaffold aggressively compacts history, другой опирается на event log и artifacts.",
          insights: [
            "Сравнивать агентов без учёта harness методологически слабо.",
            "Именно harness определяет поведение на overflow и retry paths."
          ],
          sourceIds: ["anthropic-agents", "anthropic-context"]
        },
        {
          id: "subagents",
          title: "Сабагенты и навыки",
          tags: ["runtime", "multi-agent"],
          summary:
            "Изоляция подзадач в отдельных окнах помогает не тянуть весь контекст в одну монолитную сессию.",
          why:
            "Параллельная работа и раздельные context windows уменьшают contamination между режимами работы.",
          example:
            "Отдельный research subagent возвращает summary и список файлов, не таща весь trail поиска в основной поток.",
          insights: [
            "Сабагенты эффективны, когда write scopes и цели чётко разделены.",
            "Возврат summary вместо полной истории часто даёт лучший signal-to-noise."
          ],
          sourceIds: ["anthropic-agents", "anthropic-context"]
        },
        {
          id: "planner-executor",
          title: "Разделение планирования и исполнения",
          tags: ["runtime", "planning"],
          summary:
            "Планирование и исполнение можно разнести, чтобы reasoning не смешивался с длинной операционной историей.",
          why:
            "Планирующий слой работает с абстракцией, исполняющий с файловой и tool реальностью.",
          example:
            "Planner формирует шаги, executor читает файлы, запускает команды и возвращает observation summary.",
          insights: [
            "Подход полезен при сложных, но проверяемых задачах.",
            "Он же помогает делать cleaner eval traces."
          ],
          sourceIds: ["react", "anthropic-agents"]
        },
        {
          id: "routing-sandbox",
          title: "Маршрутизация, права, песочница",
          tags: ["runtime", "safety"],
          summary:
            "Этот узел про то, какие действия вообще доступны агенту, в какой фазе и с какими подтверждениями.",
          why:
            "Слишком широкий доступ и плохо разведённые права увеличивают и риск, и шум.",
          example:
            "Отдельный инструмент только для чтения на этапе разбора и отдельный подтверждаемый инструмент записи на этапе правок.",
          insights: [
            "Ограничения доступа влияют на форму контекста не меньше, чем summary.",
            "Хорошая изоляция уменьшает поверхность атаки."
          ],
          sourceIds: ["mcp-intro", "mcp-spec", "anthropic-agents"]
        },
        {
          id: "practical-systems",
          title: "Практические системы",
          tags: ["runtime", "examples"],
          summary:
            "Этот блок нужен не для витрины брендов, а для сравнения реальных harness-решений: где лежат инструкции, как растёт контекст, что считается памятью и как агент переживает длинную сессию.",
          why:
            "Одна и та же идея может называться по-разному. Смысл появляется только тогда, когда видно конкретный механизм: файл правил, режим подтверждений, hidden compaction agent, checkpoint или отдельный MCP-слой.",
          example:
            "Сравнивать стоит не лозунги на лендинге, а то, откуда агент берёт правила, как ограничивает действия, куда выносит состояние и в какой момент запускает Compaction.",
          insights: [
            "Лучшее сравнение идёт по осям: инструкции, память, права, инструменты, Compaction и handoff.",
            "Практические примеры полезны не для рейтинга, а для распознавания архитектурных паттернов."
          ],
          sourceIds: ["claude-code-overview", "codex-cli", "gemini-cli", "opencode-docs", "forgecode-docs"],
          children: [
            {
              id: "practical-axes",
              title: "Что именно сравнивать",
              tags: ["runtime", "examples", "mental-model"],
              summary:
                "Удобно сравнивать агентов не как монолиты, а как набор контекстных решений: файлы правил, память проекта, режимы прав, подключение внешних инструментов, Compaction и механизмы передачи состояния.",
              why:
                "Тогда видно, что два агента могут быть похожи по модели, но радикально различаться по полезности из-за harness.",
              example:
                "Один агент силён за счёт иерархии инструкций и подтверждений, другой за счёт checkpointing и богатой схемы сабагентов.",
              insights: [
                "Если сравнивать только качество ответов, архитектурные различия теряются.",
                "Эта ветка лучше читается как карта решений, а не как каталог продуктов."
              ],
              sourceIds: ["anthropic-agents", "anthropic-context", "langchain-context"]
            },
            {
              id: "system-claude-code",
              title: "Claude Code",
              tags: ["runtime", "examples", "mcp"],
              summary:
                "Claude Code хорошо показывает агент как harness: слои инструкций, контекстное окно, slash-команды, hooks, subagents и MCP собраны в одну явную систему.",
              why:
                "Он полезен как пример системы, где управление контекстом вынесено в отдельный пользовательский интерфейс и набор инженерных примитивов.",
              example:
                "Проект задаёт правила в `CLAUDE.md`, старое окно можно компактить через `/compact`, а внешние возможности подключаются через MCP-серверы.",
              insights: [
                "Здесь особенно хорошо видны раздельные слои инструкций, памяти и инструментов.",
                "Расширяемость через hooks, commands и MCP делает harness самостоятельным объектом дизайна."
              ],
              sourceIds: ["claude-code-overview", "claude-code-context-window", "claude-code-mcp"],
              children: [
                {
                  id: "claude-instructions-memory",
                  title: "Файлы правил и память",
                  tags: ["runtime", "examples", "memory"],
                  summary:
                    "Claude Code отдельно показывает, какие части контекста пришли из `CLAUDE.md`, auto-memory, текущей беседы и внешних инструментов.",
                  why:
                    "Это хороший пример неявного вопроса карты: не только что модель знает, но и откуда именно это знание взялось.",
                  example:
                    "В окне можно увидеть, что правила проекта пришли из `CLAUDE.md`, а долговременные пользовательские предпочтения из auto-memory.",
                  insights: [
                    "Файл правил и память здесь не смешаны в один безымянный prompt.",
                    "Прозрачность происхождения контекста помогает отладке и handoff."
                  ],
                  sourceIds: ["claude-code-overview", "claude-code-context-window"]
                },
                {
                  id: "claude-context-lifecycle",
                  title: "Жизненный цикл контекста",
                  tags: ["runtime", "examples", "compression"],
                  summary:
                    "Когда сессия разрастается, Claude Code сначала очищает старые результаты инструментов, а затем использует Compaction, чтобы сохранить рабочее состояние без переполнения окна.",
                  why:
                    "Это уже не общая фраза про summary, а конкретная политика роста окна и поддержания длинной сессии.",
                  example:
                    "Пользователь может вызвать `/compact`, а после Compaction в контекст возвращаются ключевые инструкции и рабочее состояние, а не вся история целиком.",
                  insights: [
                    "Порядок «очистить tool outputs -> компактить историю» сам по себе является контекстной политикой.",
                    "Такой подход ближе к управлению сессией, чем к обычной суммаризации переписки."
                  ],
                  sourceIds: ["claude-code-context-window"]
                },
                {
                  id: "claude-extensions-isolation",
                  title: "Команды, hooks, subagents, MCP",
                  tags: ["runtime", "examples", "mcp"],
                  summary:
                    "Claude Code расширяется несколькими разными путями: slash-команды задают готовые сценарии, hooks реагируют на события, subagents изолируют подзадачи, а MCP подключает внешний мир.",
                  why:
                    "Это наглядный пример того, что расширяемость агента не должна сводиться к одному универсальному механизму.",
                  example:
                    "Одна часть поведения оформляется как команда, другая как hook, а доступ к внешнему сервису уходит в MCP-сервер.",
                  insights: [
                    "Разные механизмы расширения хорошо разводят разные типы контекста и действий.",
                    "Изоляция подзадач через subagents уменьшает шум в основном окне."
                  ],
                  sourceIds: ["claude-code-overview", "claude-code-mcp"]
                }
              ]
            },
            {
              id: "system-codex-cli",
              title: "Codex CLI",
              tags: ["runtime", "examples", "safety"],
              summary:
                "Codex CLI удобен как пример жёстко инженерного harness: иерархия `AGENTS.md`, sandbox/approvals, hooks, MCP и subagents собраны вокруг терминального цикла работы.",
              why:
                "Здесь особенно ясно видно, что политика контекста и политика исполнения в агенте связаны напрямую.",
              example:
                "Правила лежат в `AGENTS.md`, а реальная автономность системы меняется в зависимости от sandbox mode, approval policy и доступных MCP-серверов.",
              insights: [
                "Это наглядный пример связи между контекстом, правами и наблюдаемостью действий.",
                "Инструкции здесь живут не только в prompt, но и в файловой и конфигурационной среде."
              ],
              sourceIds: ["codex-cli", "codex-agents-md", "codex-security", "codex-subagents", "codex-mcp"],
              children: [
                {
                  id: "codex-instruction-stack",
                  title: "Иерархия AGENTS.md",
                  tags: ["runtime", "examples", "memory"],
                  summary:
                    "Codex CLI использует `AGENTS.md` как явный носитель проектных инструкций; правила могут жить на нескольких уровнях и подхватываться по мере движения по дереву файлов.",
                  why:
                    "Это делает проектные правила частью адресуемого состояния, а не неявным куском стартового промпта.",
                  example:
                    "Правила для монорепозитория можно положить в корень, а для отдельного пакета в локальный `AGENTS.md` рядом с кодом.",
                  insights: [
                    "Такой подход хорошо сочетается с выборочным чтением и handoff.",
                    "Инструкции становятся версионируемым артефактом проекта."
                  ],
                  sourceIds: ["codex-agents-md"]
                },
                {
                  id: "codex-security-loop",
                  title: "Права, подтверждения, песочница",
                  tags: ["runtime", "examples", "safety"],
                  summary:
                    "У Codex CLI автономность не отделена от безопасности: sandbox mode и approval policy определяют, какие действия агент вообще может включить в свой рабочий цикл.",
                  why:
                    "Это прямо влияет на форму контекста: агент с чтением только репозитория мыслит иначе, чем агент с доступом к сети и записи.",
                  example:
                    "Один и тот же план правки кода может требовать подтверждения в одном режиме и выполняться автоматически в другом.",
                  insights: [
                    "Права здесь выступают не внешним ограничением, а частью архитектуры агента.",
                    "Контекстная политика меняется вместе с режимом исполнения."
                  ],
                  sourceIds: ["codex-security"]
                },
                {
                  id: "codex-extensions",
                  title: "Hooks, MCP, subagents",
                  tags: ["runtime", "examples", "mcp"],
                  summary:
                    "Codex CLI разводит расширяемость по нескольким механизмам: hooks для событий, MCP для внешних систем и subagents для изоляции ролей.",
                  why:
                    "Так удобнее проектировать не один гигантский агент, а управляемую систему взаимодействующих контуров.",
                  example:
                    "Проверка формата может жить в hook, чтение внешней базы в MCP, а исследовательская ветка в отдельном subagent.",
                  insights: [
                    "Разделение расширений по типу ответственности уменьшает перегрузку основного цикла.",
                    "Subagents здесь особенно полезны как способ вынести побочную работу из главного окна."
                  ],
                  sourceIds: ["codex-hooks", "codex-mcp", "codex-subagents"]
                }
              ]
            },
            {
              id: "system-gemini-cli",
              title: "Gemini CLI",
              tags: ["runtime", "examples", "mcp"],
              summary:
                "Gemini CLI выделяется сочетанием проектных context files, checkpointing, trusted folders, token caching и MCP: здесь хорошо видно, как продукт оформляет длинную инженерную сессию.",
              why:
                "Это сильный пример того, как память проекта и восстановление состояния становятся первыми продуктными функциями, а не скрытой внутренней логикой.",
              example:
                "Агент читает правила из `GEMINI.md`, умеет откатываться к checkpoint и может работать в безопасном режиме только внутри доверенных папок.",
              insights: [
                "Здесь явно видны опоры на проектную память и восстановление состояния.",
                "Checkpointing полезно рассматривать как соседний механизм к Compaction, а не как отдельную экзотику."
              ],
              sourceIds: ["gemini-cli", "gemini-cli-context", "gemini-cli-checkpointing", "gemini-cli-trusted-folders", "gemini-cli-tools"],
              children: [
                {
                  id: "gemini-context-files",
                  title: "GEMINI.md как адресуемая память",
                  tags: ["runtime", "examples", "memory"],
                  summary:
                    "Gemini CLI использует `GEMINI.md` как отдельный носитель проектного контекста: туда выносят команды, соглашения, архитектурные ориентиры и полезные ссылки.",
                  why:
                    "Так правила проекта живут отдельно от текущей беседы и легче переиспользуются между сессиями.",
                  example:
                    "В `GEMINI.md` можно держать стиль проекта, карту важных команд и напоминания по локальному запуску.",
                  insights: [
                    "Это хороший пример файлов как памяти, а не просто файлов как документации.",
                    "Чем стабильнее правила, тем больше смысла выносить их из беседы."
                  ],
                  sourceIds: ["gemini-cli-context"]
                },
                {
                  id: "gemini-checkpoints",
                  title: "Checkpointing и восстановление",
                  tags: ["runtime", "examples", "compression"],
                  summary:
                    "Gemini CLI оформляет длинную сессию через checkpointing: можно сохранить состояние и вернуться к нему, не пересобирая всё вручную из разговора.",
                  why:
                    "Это альтернатива идее, что единственный способ пережить долгую сессию — всё сильнее сжимать историю.",
                  example:
                    "После рискованной серии правок можно сохранить checkpoint и откатиться к нему, если гипотеза не подтвердилась.",
                  insights: [
                    "Checkpoint и Compaction решают разные задачи и хорошо работают вместе.",
                    "Восстановление состояния — это тоже часть контекстной инженерии."
                  ],
                  sourceIds: ["gemini-cli-checkpointing"]
                },
                {
                  id: "gemini-trust-tools",
                  title: "Trusted folders, инструменты, MCP",
                  tags: ["runtime", "examples", "safety"],
                  summary:
                    "Gemini CLI делает доверие частью рабочей модели: отдельный режим доверенных папок соседствует с встроенными инструментами и MCP-подключениями.",
                  why:
                    "Это хороший пример того, что границы безопасности можно вшивать в обычный пользовательский поток, а не только в корпоративные guardrails.",
                  example:
                    "Агент может быть доверен только проектной директории, но при этом использовать подключённые инструменты и MCP-серверы.",
                  insights: [
                    "Граница доверия влияет на форму допустимого контекста и действий.",
                    "Инструменты и безопасность здесь не разведены по разным продуктовым слоям."
                  ],
                  sourceIds: ["gemini-cli-trusted-folders", "gemini-cli-tools"]
                }
              ]
            },
            {
              id: "system-opencode",
              title: "OpenCode",
              tags: ["runtime", "examples", "multi-agent"],
              summary:
                "OpenCode интересен тем, что делает harness очень явным: агенты, провайдеры, разрешения, MCP, инструкции и даже служебные внутренние агенты доступны как конфигурация.",
              why:
                "Это полезный пример конфигурируемого harness, где разные роли можно разводить не только логически, но и на уровне структуры системы.",
              example:
                "Можно завести отдельного агента для планирования и отдельного для правок, а часть служебных задач вроде compaction отдать скрытому internal agent.",
              insights: [
                "Open-source инструменты особенно полезны для изучения формы harness без догадок по внешнему поведению.",
                "Разделение ролей и прав здесь видно на уровне конфигурации."
              ],
              sourceIds: ["opencode-docs", "opencode-agents", "opencode-config", "opencode-permissions"],
              children: [
                {
                  id: "opencode-agent-lineup",
                  title: "Явная линейка агентов",
                  tags: ["runtime", "examples", "multi-agent"],
                  summary:
                    "В OpenCode агенты описаны явно: есть рабочие роли вроде Build и Plan, исследовательские роли, а также скрытые внутренние агенты для compaction, заголовков и сводок.",
                  why:
                    "Это очень наглядно показывает, что multi-agent система может использовать сабагентов не только для бизнеса, но и для обслуживания собственной среды.",
                  example:
                    "Основной агент правит код, а hidden compaction agent занимается сокращением истории.",
                  insights: [
                    "Здесь лучше видно, что Compaction может быть не функцией одной модели, а отдельной роли.",
                    "Разделение ролей делает поведение системы понятнее и проверяемее."
                  ],
                  sourceIds: ["opencode-agents"]
                },
                {
                  id: "opencode-config-stack",
                  title: "Конфиг как слой контекста",
                  tags: ["runtime", "examples", "memory"],
                  summary:
                    "OpenCode выносит важные части поведения в конфиг: список агентов, инструкции, модели, режимы, MCP, команды и проектные настройки.",
                  why:
                    "Это превращает часть harness в редактируемый и версионируемый артефакт.",
                  example:
                    "Разные агенты могут иметь разные инструкции, права, шаги и модели в рамках одной установки.",
                  insights: [
                    "Когда harness описан конфигом, его проще обсуждать и менять как архитектуру.",
                    "Это уменьшает число неявных решений, спрятанных в коде рантайма."
                  ],
                  sourceIds: ["opencode-config"]
                },
                {
                  id: "opencode-permission-model",
                  title: "Разрешения и MCP",
                  tags: ["runtime", "examples", "safety"],
                  summary:
                    "OpenCode делает модель доступа довольно детализированной: можно ограничивать shell-команды, управлять правами по шаблонам и подключать внешние системы через MCP.",
                  why:
                    "Так контекстная политика и модель риска становятся частью одной и той же настройки.",
                  example:
                    "Чтение репозитория можно оставить свободным, а опасные shell-паттерны или запись ограничить правилами разрешений.",
                  insights: [
                    "Права здесь работают как часть runtime-дизайна, а не только как внешняя защита.",
                    "MCP расширяет систему, не превращая один prompt в свалку определений."
                  ],
                  sourceIds: ["opencode-permissions", "opencode-config"]
                }
              ]
            },
            {
              id: "system-forgecode",
              title: "ForgeCode",
              tags: ["runtime", "examples", "compression"],
              summary:
                "ForgeCode особенно полезен для карты, потому что у него слой контекста описан почти инженерным языком: context engine, services, skills и настраиваемая Compaction-политика.",
              why:
                "Это один из самых прямых прикладных примеров, где слой контекста вынесен в явную часть архитектуры, а не растворён в общих маркетинговых формулировках.",
              example:
                "Отдельно описаны Forge services, semantic/exact search, context compaction и skills, причём пороги Compaction вынесены в конфиг.",
              insights: [
                "Здесь особенно заметно, что контекстная инженерия живёт не только в промпте, но и в сервисном окружении агента.",
                "ForgeCode удобно использовать как практический контрпример к слишком узкому пониманию Compaction."
              ],
              sourceIds: ["forgecode-docs", "forgecode-services", "forgecode-compaction", "forgecode-skills"],
              children: [
                {
                  id: "forgecode-context-engine",
                  title: "Context engine и поиск",
                  tags: ["runtime", "examples", "retrieval"],
                  summary:
                    "ForgeCode явно разводит несколько способов добычи контекста: services поддерживают semantic search и exact search, а контекстный слой строится поверх этих сервисов.",
                  why:
                    "Это хороший прикладной пример, где retrieval описан не абстрактно, а как часть инфраструктуры агента.",
                  example:
                    "Для обзора кода можно идти через semantic search, а для точного символа через `fs_search`.",
                  insights: [
                    "Смешение semantic и exact retrieval здесь оформлено как инженерное решение, а не как случайный набор тулов.",
                    "Такой дизайн особенно полезен для больших репозиториев."
                  ],
                  sourceIds: ["forgecode-services"]
                },
                {
                  id: "forgecode-compaction-policy",
                  title: "Пороговая Compaction-политика",
                  tags: ["runtime", "examples", "compression"],
                  summary:
                    "ForgeCode описывает Compaction через конкретные параметры: token threshold, message threshold, retention window и eviction window.",
                  why:
                    "Это превращает абстрактную идею сжатия в управляемую политику с понятными рычагами.",
                  example:
                    "Можно отдельно настроить, сколько свежего контекста держать как есть и какую часть старой истории сворачивать.",
                  insights: [
                    "Это один из самых наглядных примеров Cure-подхода с явными порогами.",
                    "Параметры удержания и вытеснения помогают говорить о Compaction без туманных формулировок."
                  ],
                  sourceIds: ["forgecode-compaction"]
                },
                {
                  id: "forgecode-skills-runtime",
                  title: "Skills и сервисное окружение",
                  tags: ["runtime", "examples", "memory"],
                  summary:
                    "ForgeCode усиливает агента не только через контекст окна, но и через skills и сервисное окружение: переиспользуемые инструкции, процедуры и подключённые компоненты живут рядом с основным агентом.",
                  why:
                    "Это хороший пример того, как часть знаний и поведения можно вынести из беседы в постоянные артефакты среды.",
                  example:
                    "Проект может положить собственные skills рядом с кодом и тем самым переиспользовать типовые сценарии без копирования их в каждую сессию.",
                  insights: [
                    "Skills здесь выступают как адресуемая рабочая память и библиотека процедур.",
                    "Сервисное окружение так же важно для агента, как и содержимое prompt."
                  ],
                  sourceIds: ["forgecode-skills", "forgecode-docs"]
                }
              ]
            }
          ]
        }
      ]
    },
    {
      id: "tooling",
      title: "MCP и слой инструментов",
      eyebrow: "Protocol",
      angle: 228,
      color: "#0891b2",
      tags: ["tooling", "mcp"],
      summary:
        "Протоколы и schemas, через которые агент подключается к внешним данным, сервисам и исполнителям.",
      why:
        "Когда tools много, проблемой становится уже не наличие интеграций, а масштабирование их описаний и безопасная доставка в контекст.",
      example:
        "Через MCP один и тот же агент может подключать файловую систему, БД, документацию и browser-инструменты по общему интерфейсу.",
      insights: [
        "Tool layer сам становится частью контекстного бюджета.",
        "Не только результаты tools, но и их определения стоят токены."
      ],
      sourceIds: ["mcp-intro", "mcp-spec", "toolformer"],
      children: [
        {
          id: "mcp",
          title: "MCP как стандартная шина",
          tags: ["mcp", "protocol"],
          summary:
            "Model Context Protocol стандартизирует, как AI-приложения подключаются к внешним tools, данным и workflows.",
          why:
            "Это позволяет мыслить про tool ecosystem как про слой инфраструктуры, а не про набор ad-hoc интеграций.",
          example:
            "Один клиент может одинаково работать с локальными файлами, задачником и корпоративной документацией.",
          insights: [
            "MCP важен не только для interop, но и для систематизации tool discovery.",
            "Чем стандартнее интерфейсы, тем легче строить evals и guardrails."
          ],
          sourceIds: ["mcp-intro", "mcp-spec"]
        },
        {
          id: "deferred-loading",
          title: "Отложенная загрузка",
          tags: ["tooling", "budget"],
          summary:
            "Не все tool definitions нужно грузить в prompt сразу; полезно поднимать только релевантный поднабор.",
          why:
            "Иначе описания tools могут съедать тысячи токенов до начала реальной работы.",
          example:
            "Сначала выбрать 3-5 подходящих tools по задаче, а не отправлять каталог из десятков серверов.",
          insights: [
            "Ленивая загрузка особенно важна для MCP-rich environments.",
            "Это напрямую связывает tooling и token economics."
          ],
          sourceIds: ["mcp-intro", "anthropic-context"]
        },
        {
          id: "tool-schemas",
          title: "Схемы инструментов и форма ответов",
          tags: ["tooling", "schema"],
          summary:
            "Плохо спроектированные tools возвращают слишком много лишнего или неструктурированный шум.",
          why:
            "Иногда лучший способ улучшить контекст это не compress history, а переписать tool contract.",
          example:
            "Вместо полного файла вернуть найденные секции, offsets и краткую метаинформацию.",
          insights: [
            "Хороший schema дизайн уменьшает downstream pruning.",
            "Tool result format нужно проектировать под дальнейшую agent работу."
          ],
          sourceIds: ["mcp-spec", "toolformer"]
        },
        {
          id: "tool-safety",
          title: "Безопасность и границы",
          tags: ["tooling", "security"],
          summary:
            "С ростом слоя инструментов растут риск внедрения вредных инструкций, утечки данных и неуместных действий.",
          why:
            "Контекстная инженерия без границ доверия и безопасности быстро превращается в источник проблем.",
          example:
            "Отделить недоверенный веб-контент от доверенных правил проекта и требовать явного подтверждения для опасных действий.",
          insights: [
            "Модель доверия для внешних инструментов должна быть явной частью дизайна.",
            "Нельзя считать все данные в контексте равноправными."
          ],
          sourceIds: ["mcp-spec", "mcp-intro"]
        }
      ]
    },
    {
      id: "evaluation",
      title: "Оценка и бенчмарки",
      eyebrow: "Evaluation",
      angle: 272,
      color: "#65a30d",
      tags: ["evaluation", "benchmark"],
      summary:
        "Как измерять не только итоговую долю успешных решений, но и качество поиска, сжатия, памяти и управления выводами инструментов.",
      why:
        "Без процессных метрик очень легко перепутать удачную модель с удачным Harness или с загрязнённым бенчмарком.",
      example:
        "Два агента могут одинаково решать задачи на маленьком наборе, но один при этом вдвое дороже и намного менее стабилен на длинных сериях.",
      insights: [
        "Нужны и сквозные бенчмарки, и точечные проверки внутри контура.",
        "Сравнение 'агент против агента' без разбора контекстной политики часто вводит в заблуждение."
      ],
      sourceIds: ["swe-bench", "terminal-bench", "anthropic-context"],
      children: [
        {
          id: "outcome-metrics",
          title: "Итоговые метрики",
          tags: ["evaluation", "metrics"],
          summary:
            "Доля успешных решений, pass@k, verified pass, успех на единицу стоимости и задержка до полезного результата.",
          why:
            "Это финальный пользовательский слой качества.",
          example:
            "Для coding agent важно не только написать patch, но и пройти тесты в реальной среде.",
          insights: [
            "Нужно считать результат вместе со стоимостью и временем.",
            "Проверенные бенчмарки полезнее сырых лидербордов."
          ],
          sourceIds: ["swe-bench", "terminal-bench"]
        },
        {
          id: "process-metrics",
          title: "Процессные метрики",
          tags: ["evaluation", "process"],
          summary:
            "Точность и полнота поиска, качество Compaction, частота переполнений, доля слишком больших выводов, частота повторного запроса данных.",
          why:
            "Именно такие метрики показывают, где ломается контекстная политика.",
          example:
            "Высокая доля успеха на коротких задачах может скрывать плохое сжатие, если длинные прогоны отдельно не измеряются.",
          insights: [
            "Процессные метрики нужны для настройки Harness.",
            "Они же помогают понять, что переносить в модель, а что оставлять в системном слое."
          ],
          sourceIds: ["anthropic-context", "langchain-context"]
        },
        {
          id: "benchmarks",
          title: "SWE-bench и Terminal-Bench",
          tags: ["evaluation", "benchmark"],
          summary:
            "SWE-bench оценивает решение реальных issue-patch задач, Terminal-Bench проверяет автономную работу в terminal sandbox.",
          why:
            "Вместе они покрывают разные аспекты agent engineering: код и long-horizon execution.",
          example:
            "SWE-bench лучше видит repository reasoning, Terminal-Bench лучше видит end-to-end tool use и устойчивость в shell.",
          insights: [
            "Ни один benchmark не покрывает контекстную инженерию целиком.",
            "Составлять выводы лучше по нескольким типам задач."
          ],
          sourceIds: ["swe-bench", "terminal-bench"]
        },
        {
          id: "benchmark-caveats",
          title: "В чём легко ошибиться",
          tags: ["evaluation", "risk"],
          summary:
            "Загрязнение набора, разный Harness, разные системные промпты, модели, правила повтора и среды выполнения.",
          why:
            "Итоговая цифра может отражать не то, что ты думаешь измеряешь.",
          example:
            "Нельзя честно приписать победу одной стратегии поиска, если одновременно поменялись модель, момент Compaction и режим песочницы.",
          insights: [
            "Сначала фиксируй переменные, потом сравнивай.",
            "Сильная оценка сочетает лидерборд и разбор трасс."
          ],
          sourceIds: ["anthropic-context", "swe-bench", "terminal-bench"]
        }
      ]
    }
  ]
};
