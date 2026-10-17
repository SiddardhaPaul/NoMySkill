import { TrunkDepartment, BranchCategory, TwigSubStream, LeafCourse } from '../types/tree';

export const TRUNK_DEPARTMENTS: TrunkDepartment[] = [
  {
    id: 'tech-engineering',
    name: 'Technical & Engineering',
    tagline: 'Foundations of modern computing, architecture & intelligent systems',
    description: 'Deep engineering disciplines encompassing AI, Cloud computing, Cybersecurity, Systems programming, and Infrastructure.',
    iconName: 'Cpu',
    colorTone: {
      badgeBg: 'bg-amber-950/20',
      badgeText: 'text-amber-800',
      border: 'border-amber-700/30',
      accent: 'text-amber-700',
      gradient: 'from-amber-900/10 via-amber-800/5 to-transparent'
    },
    branchesCount: 8
  },
  {
    id: 'business-operations',
    name: 'Business & Operations',
    tagline: 'Driving organizational scale, capital allocation & commercial growth',
    description: 'Core leadership engines spanning Strategy, Financial Engineering, Marketing, Human Capital, and Accounting.',
    iconName: 'TrendingUp',
    colorTone: {
      badgeBg: 'bg-emerald-950/20',
      badgeText: 'text-emerald-800',
      border: 'border-emerald-700/30',
      accent: 'text-emerald-700',
      gradient: 'from-emerald-900/10 via-emerald-800/5 to-transparent'
    },
    branchesCount: 5
  },
  {
    id: 'creative-service',
    name: 'Creative & Service Industries',
    tagline: 'Crafting premium customer experiences, hospitality & service excellence',
    description: 'People-first industries transforming guest journeys, hotel administration, event production, and customer satisfaction.',
    iconName: 'Sparkles',
    colorTone: {
      badgeBg: 'bg-teal-950/20',
      badgeText: 'text-teal-800',
      border: 'border-teal-700/30',
      accent: 'text-teal-700',
      gradient: 'from-teal-900/10 via-teal-800/5 to-transparent'
    },
    branchesCount: 4
  },
  {
    id: 'education-human',
    name: 'Education & Human Sciences',
    tagline: 'Advancing transformative pedagogical models & instructional design',
    description: 'Empowering future educators, corporate learning architects, and instructional technologists with modern curricula.',
    iconName: 'GraduationCap',
    colorTone: {
      badgeBg: 'bg-indigo-950/20',
      badgeText: 'text-indigo-800',
      border: 'border-indigo-700/30',
      accent: 'text-indigo-700',
      gradient: 'from-indigo-900/10 via-indigo-800/5 to-transparent'
    },
    branchesCount: 2
  }
];

export const BRANCH_CATEGORIES: BranchCategory[] = [
  // Under Technical & Engineering
  {
    id: 'branch-ai',
    departmentId: 'tech-engineering',
    name: 'AI & Machine Intelligence',
    description: 'Generative models, neural networks, inference engines, and production MLOps.',
    iconName: 'Brain'
  },
  {
    id: 'branch-cloud',
    departmentId: 'tech-engineering',
    name: 'Cloud & Distributed Systems',
    description: 'Multi-cloud architectures, Kubernetes, microservices, and serverless computing.',
    iconName: 'Cloud'
  },
  {
    id: 'branch-data-science',
    departmentId: 'tech-engineering',
    name: 'Data Science & Analytics',
    description: 'Predictive statistical modeling, big data pipelines, and quantitative insights.',
    iconName: 'Database'
  },
  {
    id: 'branch-programming',
    departmentId: 'tech-engineering',
    name: 'Programming & Systems',
    description: 'Full-stack engineering, compiled languages (Rust/Go), and enterprise codebases.',
    iconName: 'Code'
  },
  {
    id: 'branch-cybersecurity',
    departmentId: 'tech-engineering',
    name: 'Cybersecurity & Defense',
    description: 'Threat hunting, zero-trust architecture, cryptography, and penetration testing.',
    iconName: 'ShieldCheck'
  },
  {
    id: 'branch-software-support',
    departmentId: 'tech-engineering',
    name: 'Software Support & SRE',
    description: 'Reliability engineering, post-mortem analysis, and tier-3 production troubleshooting.',
    iconName: 'Wrench'
  },
  {
    id: 'branch-engineering-support',
    departmentId: 'tech-engineering',
    name: 'Engineering Support & DevOps',
    description: 'CI/CD pipelines, automated testing rigs, and developer velocity platforms.',
    iconName: 'Layers'
  },
  {
    id: 'branch-industrial-manufacturing',
    departmentId: 'tech-engineering',
    name: 'Industrial Engineering & Manufacturing',
    description: 'Smart Factory Industry 4.0, Lean Six Sigma, robotics automation, and digital twins.',
    iconName: 'Factory'
  },

  // Under Business & Operations
  {
    id: 'branch-hr',
    departmentId: 'business-operations',
    name: 'Human Resources & People Ops',
    description: 'Talent architecture, people analytics, workforce planning, and organizational psychology.',
    iconName: 'Users'
  },
  {
    id: 'branch-marketing',
    departmentId: 'business-operations',
    name: 'Marketing & Brand Strategy',
    description: 'Omnichannel growth, digital acquisition, programmatic ads, and brand resonance.',
    iconName: 'Target'
  },
  {
    id: 'branch-accounting',
    departmentId: 'business-operations',
    name: 'Accounting & Auditing',
    description: 'GAAP compliance, financial controls, forensic auditing, and tax structuring.',
    iconName: 'BookOpen'
  },
  {
    id: 'branch-business-strategy',
    departmentId: 'business-operations',
    name: 'Business Strategy & Scaling',
    description: 'Corporate development, market positioning, unit economics, and executive leadership.',
    iconName: 'Compass'
  },
  {
    id: 'branch-finance',
    departmentId: 'business-operations',
    name: 'Finance & Capital Markets',
    description: 'Valuation, venture capital, quantitative risk models, and corporate treasury.',
    iconName: 'Coins'
  },

  // Under Creative & Service Industries
  {
    id: 'branch-hotel-mgmt',
    departmentId: 'creative-service',
    name: 'Hotel Management',
    description: 'Luxury resort operations, yield management, guest amenities, and food & beverage.',
    iconName: 'Hotel'
  },
  {
    id: 'branch-hospitality',
    departmentId: 'creative-service',
    name: 'Hospitality & Event Planning',
    description: 'High-touch concierge design, conference logistics, and sustainable tourism.',
    iconName: 'GlassWater'
  },
  {
    id: 'branch-support-services',
    departmentId: 'creative-service',
    name: 'Support Services Management',
    description: 'Tiered client desk administration, SLA contract governance, and escalation flow.',
    iconName: 'Headphones'
  },
  {
    id: 'branch-customer-experience',
    departmentId: 'creative-service',
    name: 'Customer Experience (CX)',
    description: 'Omnichannel journey mapping, Net Promoter Score optimization, and retention science.',
    iconName: 'HeartHandshake'
  },

  // Under Education & Human Sciences
  {
    id: 'branch-teaching-pedagogy',
    departmentId: 'education-human',
    name: 'Teaching & Pedagogy',
    description: 'Active learning methodologies, hybrid classroom orchestration, and differentiated instruction.',
    iconName: 'School'
  },
  {
    id: 'branch-instructional-design',
    departmentId: 'education-human',
    name: 'Instructional Design & EdTech',
    description: 'ADDIE framework, interactive SCORM module creation, and LMS curriculum architecture.',
    iconName: 'FileSpreadsheet'
  }
];

export const TWIG_SUB_STREAMS: TwigSubStream[] = [
  // AI Branch Twigs
  {
    id: 'twig-gen-ai',
    branchId: 'branch-ai',
    departmentId: 'tech-engineering',
    name: 'Generative AI & LLMs',
    description: 'Prompt architecture, Retrieval-Augmented Generation (RAG), and model fine-tuning.',
    skillsFocus: ['LLM Fine-tuning', 'Vector Databases', 'Prompt Engineering', 'LangChain / LlamaIndex']
  },
  {
    id: 'twig-comp-vision',
    branchId: 'branch-ai',
    departmentId: 'tech-engineering',
    name: 'Computer Vision',
    description: 'Real-time object detection, segmentation models, and optical flow analysis.',
    skillsFocus: ['YOLOv8', 'PyTorch Vision', 'OpenCV', 'Diffusion Architecture']
  },
  {
    id: 'twig-nlp',
    branchId: 'branch-ai',
    departmentId: 'tech-engineering',
    name: 'Natural Language Processing',
    description: 'Transformer semantics, multilingual sentiment engines, and speech recognition.',
    skillsFocus: ['Transformers', 'BERT / RoBERTa', 'Tokenization', 'Intent Classification']
  },
  {
    id: 'twig-mlops',
    branchId: 'branch-ai',
    departmentId: 'tech-engineering',
    name: 'MLOps & Inference Scale',
    description: 'Automated ML pipelines, model monitoring, quantisation, and low-latency serving.',
    skillsFocus: ['MLflow', 'Kubeflow', 'Triton Server', 'Model Drift Monitoring']
  },
  {
    id: 'twig-prompt-engineering',
    branchId: 'branch-ai',
    departmentId: 'tech-engineering',
    name: 'Prompt Engineering & Context Design',
    description: 'Few-shot framing, Chain-of-Thought prompting, system prompt guardrails, and deterministic LLM evaluation.',
    skillsFocus: ['System Prompt Architecture', 'Chain-of-Thought', 'Prompt Injection Defense', 'LLM Eval Frameworks']
  },
  {
    id: 'twig-machine-learning',
    branchId: 'branch-ai',
    departmentId: 'tech-engineering',
    name: 'Machine Learning & Predictive Systems',
    description: 'Supervised & unsupervised learning, gradient boosting (XGBoost), neural nets, and statistical cross-validation.',
    skillsFocus: ['Scikit-Learn', 'XGBoost / LightGBM', 'Feature Engineering', 'Hyperparameter Tuning']
  },

  // Cloud Branch Twigs
  {
    id: 'twig-cloud-arch',
    branchId: 'branch-cloud',
    departmentId: 'tech-engineering',
    name: 'Cloud Solutions Architecture',
    description: 'Enterprise multi-region VPC design, hybrid cloud federations, and cost governance.',
    skillsFocus: ['AWS Solutions', 'GCP Architect', 'Terraform', 'FinOps']
  },
  {
    id: 'twig-kubernetes',
    branchId: 'branch-cloud',
    departmentId: 'tech-engineering',
    name: 'Kubernetes & Containers',
    description: 'Orchestrating microservices at scale with ingress, service mesh, and GitOps.',
    skillsFocus: ['K8s Cluster Ops', 'Helm', 'ArgoCD', 'Istio Mesh']
  },

  // Programming Branch Twigs
  {
    id: 'twig-fullstack',
    branchId: 'branch-programming',
    departmentId: 'tech-engineering',
    name: 'Full-Stack Modern Web',
    description: 'Production React, Next.js, Node.js microservices, and database persistence.',
    skillsFocus: ['React 19', 'TypeScript', 'Node.js', 'PostgreSQL / Prisma']
  },
  {
    id: 'twig-systems-rust',
    branchId: 'branch-programming',
    departmentId: 'tech-engineering',
    name: 'High-Performance Systems (Rust)',
    description: 'Memory safety without GC, concurrent multithreading, and low-level network drivers.',
    skillsFocus: ['Rust Ownership', 'Tokio Async', 'WebAssembly', 'Zero-Cost Abstractions']
  },

  // Cybersecurity Branch Twigs
  {
    id: 'twig-ethical-hacking',
    branchId: 'branch-cybersecurity',
    departmentId: 'tech-engineering',
    name: 'Ethical Hacking & Red Teaming',
    description: 'Offensive vulnerability assessment, exploitation frameworks, and penetration tests.',
    skillsFocus: ['Burp Suite', 'Metasploit', 'Network Forensics', 'OWASP Top 10']
  },
  {
    id: 'twig-zero-trust',
    branchId: 'branch-cybersecurity',
    departmentId: 'tech-engineering',
    name: 'Zero Trust & SecOps',
    description: 'Identity-driven perimeter defense, SIEM analytics, and automated incident triage.',
    skillsFocus: ['IAM Architecture', 'Splunk / Sentinel', 'SOC Procedures', 'Cryptography']
  },

  // Software Support & Engineering Support
  {
    id: 'twig-sre-ops',
    branchId: 'branch-software-support',
    departmentId: 'tech-engineering',
    name: 'Site Reliability Engineering',
    description: 'SLO/SLI budgeting, chaos engineering drills, and automated telemetry.',
    skillsFocus: ['Prometheus & Grafana', 'OpenTelemetry', 'Chaos Mesh', 'Incident Runbooks']
  },
  {
    id: 'twig-cicd-devops',
    branchId: 'branch-engineering-support',
    departmentId: 'tech-engineering',
    name: 'CI/CD & Developer Velocity',
    description: 'High-throughput build pipelines, artifact caching, and ephemeral test preview environments.',
    skillsFocus: ['GitHub Actions', 'Docker BuildKit', 'Release Automation', 'SonarQube']
  },

  // Industrial Engineering & Smart Manufacturing Twigs
  {
    id: 'twig-smart-factory',
    branchId: 'branch-industrial-manufacturing',
    departmentId: 'tech-engineering',
    name: 'Smart Factory & Industry 4.0 IoT',
    description: 'Industrial IoT protocols (MQTT/OPC-UA), SCADA systems, digital twins, and predictive maintenance telemetry.',
    skillsFocus: ['Industrial IoT', 'PLC & SCADA', 'Digital Twins', 'Predictive Maintenance']
  },
  {
    id: 'twig-lean-six-sigma',
    branchId: 'branch-industrial-manufacturing',
    departmentId: 'tech-engineering',
    name: 'Lean Manufacturing & Six Sigma',
    description: 'DMAIC methodologies, Value Stream Mapping, Kaizen continuous improvement, and statistical process control (SPC).',
    skillsFocus: ['DMAIC Framework', 'Value Stream Mapping', 'SPC Analytics', 'Root Cause 5-Whys']
  },

  // Marketing Branch Twigs
  {
    id: 'twig-digital-marketing',
    branchId: 'branch-marketing',
    departmentId: 'business-operations',
    name: 'Digital Marketing & Growth',
    description: 'Funnel attribution, conversion rate optimization (CRO), and email lifecycle journeys.',
    skillsFocus: ['Growth Loops', 'HubSpot / Klaviyo', 'CRO Testing', 'Attribution Modeling']
  },
  {
    id: 'twig-seo-semantic',
    branchId: 'branch-marketing',
    departmentId: 'business-operations',
    name: 'SEO & Semantic Web',
    description: 'Search architecture, programmatic content generation, and entity graph optimization.',
    skillsFocus: ['Technical SEO', 'Schema Markup', 'Core Web Vitals', 'Keyword Clustering']
  },
  {
    id: 'twig-content-strategy',
    branchId: 'branch-marketing',
    departmentId: 'business-operations',
    name: 'Content Strategy & Storytelling',
    description: 'Editorial brand guidelines, B2B thought leadership, and multimedia syndication.',
    skillsFocus: ['Editorial Calendars', 'Copywriting Psychology', 'Omnichannel Distribution', 'Podcast / Video']
  },
  {
    id: 'twig-performance-ads',
    branchId: 'branch-marketing',
    departmentId: 'business-operations',
    name: 'Performance Ads & ROAS',
    description: 'Meta Ads Manager, Google Performance Max campaigns, and creative testing matrix.',
    skillsFocus: ['Paid Search', 'Meta Advertising', 'ROAS Optimization', 'Creative Ad Scripts']
  },

  // HR Branch Twigs
  {
    id: 'twig-talent-acq',
    branchId: 'branch-hr',
    departmentId: 'business-operations',
    name: 'Talent Acquisition & Sourcing',
    description: 'Technical hiring pipelines, behavioural interview scorecards, and executive search.',
    skillsFocus: ['ATS Mastery', 'Executive Sourcing', 'Structured Interviewing', 'Employer Brand']
  },
  {
    id: 'twig-people-analytics',
    branchId: 'branch-hr',
    departmentId: 'business-operations',
    name: 'People Analytics & Retention',
    description: 'Predictive churn modeling, compensation benchmarking, and organizational health metrics.',
    skillsFocus: ['HRIS Dashboards', 'eNPS Measurement', 'Total Rewards Modeling', 'Culture Audits']
  },

  // Accounting Branch Twigs
  {
    id: 'twig-gaap-auditing',
    branchId: 'branch-accounting',
    departmentId: 'business-operations',
    name: 'Corporate Accounting & Auditing',
    description: 'Financial statement preparation, SOX compliance checks, and internal controls.',
    skillsFocus: ['GAAP Principles', 'SOX 404 Testing', 'Ledger Reconciliation', 'Audit Trail Architecture']
  },

  // Business Strategy & Finance Twigs
  {
    id: 'twig-corp-strategy',
    branchId: 'branch-business-strategy',
    departmentId: 'business-operations',
    name: 'Corporate Strategy & Scale',
    description: 'Market entry frameworks, pricing elasticity, and defensible competitive moats.',
    skillsFocus: ['Porter 5 Forces', 'Unit Economics', 'Strategic Roadmapping', 'Board Pitching']
  },
  {
    id: 'twig-fin-modeling',
    branchId: 'branch-finance',
    departmentId: 'business-operations',
    name: 'Financial Modeling & Valuation',
    description: 'Discounted Cash Flow (DCF), LBO analysis, sensitivity modeling, and venture term sheets.',
    skillsFocus: ['3-Statement Models', 'DCF Valuation', 'Cap Table Engineering', 'Due Diligence']
  },

  // Hotel Management & Hospitality Twigs
  {
    id: 'twig-luxury-resort',
    branchId: 'branch-hotel-mgmt',
    departmentId: 'creative-service',
    name: 'Luxury Resort Operations',
    description: 'Five-star standard operating procedures, concierge excellence, and room yield maximizing.',
    skillsFocus: ['PMS Software (Opera)', 'RevPAR Optimization', 'VIP Guest Protocols', 'Housekeeping Logistics']
  },
  {
    id: 'twig-hospitality-events',
    branchId: 'branch-hospitality',
    departmentId: 'creative-service',
    name: 'Event Production & Banqueting',
    description: 'Large-scale summit coordination, VIP catering management, and vendor negotiations.',
    skillsFocus: ['Banquet Event Orders (BEO)', 'Floorplan Flow', 'Supplier Contracting', 'Crisis Protocol']
  },
  {
    id: 'twig-client-services',
    branchId: 'branch-support-services',
    departmentId: 'creative-service',
    name: 'Omnichannel Helpdesk & SLAs',
    description: 'Ticketing workflow routing, multi-tier escalation, and customer delight standards.',
    skillsFocus: ['Zendesk / Freshdesk', 'First-Contact Resolution', 'CSAT Frameworks', 'Knowledge Base Ops']
  },
  {
    id: 'twig-cx-mapping',
    branchId: 'branch-customer-experience',
    departmentId: 'creative-service',
    name: 'CX Journey Mapping',
    description: 'Touchpoint friction elimination, voice-of-the-customer synthesis, and loyalty loops.',
    skillsFocus: ['Service Blueprints', 'Miro Journey Mapping', 'NPS / CES Analytics', 'Customer Lifecycle']
  },

  // Education & Pedagogy Twigs
  {
    id: 'twig-active-pedagogy',
    branchId: 'branch-teaching-pedagogy',
    departmentId: 'education-human',
    name: 'Active Learning & Classroom Leadership',
    description: 'Socratic facilitation, gamified classroom dynamics, and differentiated student support.',
    skillsFocus: ['Flipped Classrooms', 'Formative Assessment', 'Rubric Architecture', 'Student Engagement']
  },
  {
    id: 'twig-addie-instructional',
    branchId: 'branch-instructional-design',
    departmentId: 'education-human',
    name: 'Instructional Design (ADDIE & LMS)',
    description: 'Systematic curriculum design, microlearning authoring, and SCORM/xAPI deployment.',
    skillsFocus: ['ADDIE Model', 'Storyline 360', 'Cognitive Load Theory', 'LMS Architecture']
  }
];

export const INITIAL_LEAF_COURSES: LeafCourse[] = [
  // 1. Leaf under AI -> Generative AI
  {
    id: 'course-genai-mastery',
    title: 'Enterprise Generative AI & Autonomous Agent Architecture',
    slug: 'enterprise-generative-ai-autonomous-agents',
    departmentId: 'tech-engineering',
    branchId: 'branch-ai',
    twigId: 'twig-gen-ai',
    summary: 'Build production-ready multi-agent RAG pipelines, fine-tune open models, and deploy scalable inference nodes.',
    description: 'This master-level leaf provides end-to-end implementation blueprints for modern GenAI engineers. You will learn to construct deterministic workflows on top of probabilistic foundation models, evaluate hallucinations, optimize vector embeddings, and integrate tool-calling agents into enterprise backend stacks.',
    thumbnail: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=1200&q=80',
    level: 'Advanced',
    durationHours: 32,
    rating: 4.9,
    reviewCount: 1420,
    price: 149,
    originalPrice: 249,
    isPopular: true,
    isFeatured: true,
    instructor: {
      id: 'inst-1',
      name: 'Dr. Elena Vance',
      role: 'Principal AI Architect & Research Fellow',
      company: 'Cognitive Foundry Labs',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&q=80',
      bio: 'Former senior research scientist at DeepMind. Over 15 years designing production neural systems and transformer models.',
      rating: 4.95,
      studentsCount: 38400
    },
    whatYouWillLearn: [
      'Design fault-tolerant multi-agent orchestrations with LangGraph and AutoGen',
      'Deploy enterprise Vector DB clusters with Milvus & Pinecone using hybrid sparse-dense search',
      'Implement structured JSON outputs and function calling with deterministic validation schemas',
      'Audit safety, prompt injection vectors, and implement zero-leakage enterprise guardrails'
    ],
    prerequisites: ['Proficiency in Python', 'Basic understanding of machine learning math'],
    chapters: [
      {
        id: 'ch-1',
        title: 'Foundations of Modern Foundation Models & Token Mechanics',
        lessons: [
          { id: 'les-1-1', title: 'Transformer Decoders, Attention Heads, and KV Caches', durationMinutes: 28, type: 'video' },
          { id: 'les-1-2', title: 'Tokenization Boundaries and Context Window Dynamics', durationMinutes: 24, type: 'video' },
          { id: 'les-1-3', title: 'Interactive Lab: Benchmarking Latency vs Quality across Models', durationMinutes: 45, type: 'lab' }
        ]
      },
      {
        id: 'ch-2',
        title: 'Production RAG: Chunking, Sparse-Dense Search & Re-ranking',
        lessons: [
          { id: 'les-2-1', title: 'Advanced Document Parsing & Semantic Chunking Strategies', durationMinutes: 35, type: 'video' },
          { id: 'les-2-2', title: 'Embedding Models & Cross-Encoder Re-rankers', durationMinutes: 30, type: 'video' },
          { id: 'les-2-3', title: 'Building a Multi-Tenant Knowledge Retriever with Redis & Qdrant', durationMinutes: 50, type: 'lab' }
        ]
      },
      {
        id: 'ch-3',
        title: 'Autonomous Multi-Agent Networks & Tool Invocations',
        lessons: [
          { id: 'les-3-1', title: 'Stateful Agent Graphs with LangGraph', durationMinutes: 42, type: 'video' },
          { id: 'les-3-2', title: 'Memory Persistence, Reflection, and Self-Correction Loops', durationMinutes: 38, type: 'video' },
          { id: 'les-3-3', title: 'Capstone Project: Autonomous Financial Analyst Agent', durationMinutes: 65, type: 'lab' }
        ]
      }
    ],
    quiz: [
      {
        id: 'q-1',
        question: 'What is the primary benefit of hybrid sparse-dense retrieval in an enterprise RAG system?',
        options: [
          'It replaces the LLM decoder with a faster rule-based engine',
          'It combines lexical exact-match keywords (BM25) with semantic vector embeddings to prevent recall gaps',
          'It reduces vector storage size to zero bytes',
          'It removes the need for chunking text documents'
        ],
        correctAnswer: 1,
        explanation: 'Hybrid retrieval blends BM25 (sparse keyword matches for specific codes or IDs) with dense semantic embeddings to prevent domain gaps.'
      },
      {
        id: 'q-2',
        question: 'What mechanism prevents infinite loops when autonomous agents invoke tools recursively?',
        options: [
          'Stateful recursion limits and explicit cycle exit conditions in the agent graph',
          'Decreasing the temperature to 0',
          'Increasing the token context window size to maximum',
          'Only using single-turn prompts without tool definitions'
        ],
        correctAnswer: 0,
        explanation: 'Stateful graphs require recursion boundaries and evaluation nodes that terminate or backtrack if a task remains unresolved.'
      },
      {
        id: 'q-3',
        question: 'Why is a cross-encoder re-ranker applied after initial vector retrieval?',
        options: [
          'It generates fresh embeddings for the user question',
          'It directly scores candidate query-document pairs together for drastically higher precision',
          'It compresses audio files into text tokens',
          'It encrypts documents before sending to the model'
        ],
        correctAnswer: 1,
        explanation: 'Cross-encoders process query and text jointly, yielding superior relevance rankings over bi-encoder cosine similarities.'
      }
    ],
    status: 'published',
    targetJobVacancies: [
      {
        title: 'Principal AI Solutions Architect',
        avgSalary: '₹30L - ₹38L CTC',
        demandLevel: 'Critical',
        hiringCompanies: ['OpenAI', 'Anthropic', 'Google Cloud', 'NVIDIA']
      },
      {
        title: 'Lead Autonomous Agents Engineer',
        avgSalary: '₹27L - ₹36L CTC',
        demandLevel: 'Critical',
        hiringCompanies: ['Microsoft', 'Palantir', 'Scale AI']
      }
    ]
  },

  // 2. Leaf under AI -> MLOps
  {
    id: 'course-mlops-scale',
    title: 'Production MLOps: CI/CD for AI, Triton & Kubernetes Serving',
    slug: 'production-mlops-kubernetes-serving',
    departmentId: 'tech-engineering',
    branchId: 'branch-ai',
    twigId: 'twig-mlops',
    summary: 'Automate model training workflows, monitor inference drift, and deploy sub-millisecond serving clusters.',
    description: 'Bridging data science with high-availability systems engineering. Master Docker containerization for CUDA workloads, Kubernetes GPU scheduling, Triton inference server optimization, and automated canary deployments.',
    thumbnail: 'https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?auto=format&fit=crop&w=1200&q=80',
    level: 'Advanced',
    durationHours: 26,
    rating: 4.85,
    reviewCount: 890,
    price: 129,
    originalPrice: 199,
    isPopular: false,
    isFeatured: true,
    instructor: {
      id: 'inst-2',
      name: 'Marcus Sterling',
      role: 'Staff Infrastructure Engineer',
      company: 'Vertex Scale Systems',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
      bio: 'Specialist in high-throughput low-latency inference architectures. Managed GPU clusters serving 50M+ requests per day.',
      rating: 4.9,
      studentsCount: 22100
    },
    whatYouWillLearn: [
      'Package PyTorch and ONNX models into high-performance Triton inference engines',
      'Configure Kubernetes GPU resource sharing with NVIDIA MIG (Multi-Instance GPU)',
      'Construct automated CI/CD retraining triggers based on statistical drift detection',
      'Optimize model memory footprint with FP16, INT8, and AWQ quantization'
    ],
    prerequisites: ['Linux fundamentals', 'Basic Docker and Kubernetes experience'],
    chapters: [
      {
        id: 'ch-mlops-1',
        title: 'Containerization, GPU Drivers & CUDA Orchestration',
        lessons: [
          { id: 'les-m-1', title: 'Building Minimalist CUDA Docker Images with Multi-Stage Builds', durationMinutes: 30, type: 'video' },
          { id: 'les-m-2', title: 'Configuring NVIDIA Container Toolkit in MicroK8s', durationMinutes: 25, type: 'video' }
        ]
      },
      {
        id: 'ch-mlops-2',
        title: 'Inference Engines: Triton, vLLM & TensorRT',
        lessons: [
          { id: 'les-m-3', title: 'Optimizing Model Throughput with Dynamic Batching', durationMinutes: 40, type: 'video' },
          { id: 'les-m-4', title: 'Hands-on Lab: Deploying vLLM with PagedAttention', durationMinutes: 50, type: 'lab' }
        ]
      }
    ],
    quiz: [
      {
        id: 'qm-1',
        question: 'What is the primary benefit of Dynamic Batching in model serving servers like Triton?',
        options: [
          'It combines individual client requests arriving within a short millisecond window into a single matrix multiplication',
          'It converts floating point weights to pure text files',
          'It replaces GPU hardware with standard RAM modules',
          'It creates duplicate servers for every single user'
        ],
        correctAnswer: 0,
        explanation: 'Dynamic batching maximizes GPU tensor core utilization by gathering discrete asynchronous requests into a unified batch.'
      }
    ],
    status: 'published',
    targetJobVacancies: [
      {
        title: 'Lead MLOps Infrastructure Engineer',
        avgSalary: '₹26L - ₹35L CTC',
        demandLevel: 'Critical',
        hiringCompanies: ['Meta', 'Uber', 'Scale AI', 'Databricks']
      },
      {
        title: 'High-Throughput AI Inference Architect',
        avgSalary: '₹28L - ₹38L CTC',
        demandLevel: 'Critical',
        hiringCompanies: ['NVIDIA', 'Groq', 'Lambda Labs']
      }
    ]
  },

  // 3. Leaf under Marketing -> Digital Marketing
  {
    id: 'course-growth-marketing-os',
    title: 'The Modern Growth Marketing OS: Funnels, Attribution & CRO',
    slug: 'modern-growth-marketing-os',
    departmentId: 'business-operations',
    branchId: 'branch-marketing',
    twigId: 'twig-digital-marketing',
    summary: 'Master full-funnel acquisition, multi-touch attribution modeling, landing page experimentation, and high-LTV retention.',
    description: 'Transform marketing from guesswork into an empirical, data-driven revenue engine. You will learn how modern hypergrowth companies construct viral loops, calculate blended CAC vs payback period, and execute multivariate CRO sprints.',
    thumbnail: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80',
    level: 'Intermediate',
    durationHours: 22,
    rating: 4.88,
    reviewCount: 2310,
    price: 99,
    originalPrice: 179,
    isPopular: true,
    isFeatured: true,
    instructor: {
      id: 'inst-3',
      name: 'Sofia Al-Mansoor',
      role: 'VP of Growth & Retention',
      company: 'Catalyst Velocity Group',
      avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=300&q=80',
      bio: 'Scaled 3 venture-backed B2B and consumer brands from ₹8 Cr to ₹400 Cr ARR. Expert in growth experimentation frameworks.',
      rating: 4.92,
      studentsCount: 45000
    },
    whatYouWillLearn: [
      'Construct multi-touch attribution models that account for post-iOS14 privacy restrictions',
      'Design high-converting landing page hierarchies with systematic A/B split hypothesis testing',
      'Optimize payback periods across organic, paid search, and partner acquisition channels',
      'Build automated email and SMS reactivation workflows based on cohort behavioral telemetry'
    ],
    prerequisites: ['Basic marketing familiarity', 'Excel or Google Sheets data comfort'],
    chapters: [
      {
        id: 'ch-gm-1',
        title: 'Unit Economics: CAC, LTV, Payback Windows & Growth Loops',
        lessons: [
          { id: 'les-gm-1', title: 'Why Traditional Linear Funnels Fail: The Flywheel Framework', durationMinutes: 24, type: 'video' },
          { id: 'les-gm-2', title: 'Modeling Blended vs Paid CAC with Sensitivity Spreadsheets', durationMinutes: 32, type: 'video' }
        ]
      },
      {
        id: 'ch-gm-2',
        title: 'Conversion Rate Optimization (CRO) & Scientific A/B Testing',
        lessons: [
          { id: 'les-gm-3', title: 'Information Hierarchy on Above-the-Fold Screens', durationMinutes: 28, type: 'video' },
          { id: 'les-gm-4', title: 'Lab: Designing a High-Converting B2B SaaS Product Tour', durationMinutes: 45, type: 'lab' }
        ]
      }
    ],
    quiz: [
      {
        id: 'qgm-1',
        question: 'What defines a healthy SaaS customer acquisition payback period for early-to-mid stage scale?',
        options: [
          'Typically under 12 months (or ideally 6–8 months for self-serve models)',
          '5 to 7 years after initial purchase',
          'It should always be exactly 0 days',
          'Payback period does not matter as long as gross revenue is increasing'
        ],
        correctAnswer: 0,
        explanation: 'A 12-month or faster payback period ensures capital recycling velocity and protects cash runway.'
      }
    ],
    status: 'published',
    targetJobVacancies: [
      {
        title: 'VP of Growth Marketing',
        avgSalary: '₹26L - ₹37L CTC',
        demandLevel: 'Critical',
        hiringCompanies: ['HubSpot', 'Shopify', 'Figma', 'Canva']
      },
      {
        title: 'Performance Marketing & CRO Director',
        avgSalary: '₹22L - ₹30L CTC',
        demandLevel: 'Very High',
        hiringCompanies: ['Stripe', 'DoorDash', 'Klarna']
      }
    ]
  },

  // 4. Leaf under Marketing -> SEO & Semantic Web
  {
    id: 'course-semantic-seo',
    title: 'Semantic SEO, Knowledge Graphs & Entity-Based Search',
    slug: 'semantic-seo-knowledge-graphs',
    departmentId: 'business-operations',
    branchId: 'branch-marketing',
    twigId: 'twig-seo-semantic',
    summary: 'Dominate Google AI Overviews and traditional SERPs with semantic content graphs, schema markup, and topical authority.',
    description: 'Learn modern search mechanics beyond keyword stuffing. Discover how search engines build entity graphs, understand latent semantic indexing, and reward comprehensive topical clusters. Includes automated schema markup and technical web performance tuning.',
    thumbnail: 'https://images.unsplash.com/photo-1571786256017-aee7a0c009b6?auto=format&fit=crop&w=1200&q=80',
    level: 'Intermediate',
    durationHours: 18,
    rating: 4.82,
    reviewCount: 1105,
    price: 89,
    originalPrice: 149,
    isPopular: false,
    isFeatured: false,
    instructor: {
      id: 'inst-4',
      name: 'David Chen',
      role: 'Head of Search Engineering',
      company: 'Apex Organic Media',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80',
      bio: 'Author of "The Semantic Web Architecture". Consulted for Fortune 500 publishing brands generating 100M+ organic monthly visits.',
      rating: 4.88,
      studentsCount: 19800
    },
    whatYouWillLearn: [
      'Structure JSON-LD semantic graphs linking Organization, Course, Person, and FAQ entities',
      'Design topical authority clusters that satisfy Google Search Quality Rater Guidelines (E-E-A-T)',
      'Optimize Core Web Vitals (LCP, INP, CLS) for instant indexing and ranking advantages',
      'Structure content to appear directly in generative AI overview snippets'
    ],
    prerequisites: ['Basic HTML knowledge'],
    chapters: [
      {
        id: 'ch-seo-1',
        title: 'Entity-First Architecture & Knowledge Graph Mechanics',
        lessons: [
          { id: 'les-seo-1', title: 'How Google Replaced Strings with Things', durationMinutes: 20, type: 'video' },
          { id: 'les-seo-2', title: 'Writing Nested JSON-LD Hierarchies with Schema.org', durationMinutes: 35, type: 'video' }
        ]
      }
    ],
    quiz: [
      {
        id: 'qseo-1',
        question: 'Which Core Web Vital measures interactive responsiveness to user clicks and taps?',
        options: ['Interaction to Next Paint (INP)', 'Cumulative Layout Shift (CLS)', 'First Contentful Paint (FCP)', 'Domain Authority (DA)'],
        correctAnswer: 0,
        explanation: 'INP evaluates overall page responsiveness by measuring the latency of all click, tap, and keyboard interactions.'
      }
    ],
    status: 'published',
    targetJobVacancies: [
      {
        title: 'Director of Search & Semantic Intelligence',
        avgSalary: '₹22L - ₹29L CTC',
        demandLevel: 'High',
        hiringCompanies: ['The New York Times', 'Red Ventures', 'Pinterest', 'Etsy']
      },
      {
        title: 'Technical Web Architect & Organic Growth Lead',
        avgSalary: '₹19L - ₹26L CTC',
        demandLevel: 'Very High',
        hiringCompanies: ['Zillow', 'Tripadvisor', 'Expedia Group']
      }
    ]
  },

  // 5. Leaf under Business Operations -> HR -> Talent Acquisition
  {
    id: 'course-talent-acquisition-ai',
    title: 'Executive Talent Acquisition & AI-Powered Workforce Planning',
    slug: 'executive-talent-acquisition-workforce-planning',
    departmentId: 'business-operations',
    branchId: 'branch-hr',
    twigId: 'twig-talent-acq',
    summary: 'Build high-velocity hiring systems, reduce bias with structured scorecards, and recruit top-tier technical and executive talent.',
    description: 'A comprehensive curriculum for HR executives and talent leads. Learn modern sourcing algorithms, calibrate competency rubrics, negotiate competitive equity compensation packages, and craft irresistible employer branding.',
    thumbnail: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80',
    level: 'Intermediate',
    durationHours: 19,
    rating: 4.79,
    reviewCount: 760,
    price: 99,
    originalPrice: 159,
    isPopular: false,
    isFeatured: false,
    instructor: {
      id: 'inst-5',
      name: 'Claire Beauchamp',
      role: 'Chief People Officer',
      company: 'Horizon Human Capital',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=300&q=80',
      bio: '20+ years leading global talent teams at scale. Designed talent frameworks for unicorn tech companies and international NGOs.',
      rating: 4.87,
      studentsCount: 14200
    },
    whatYouWillLearn: [
      'Create calibrated, competency-based interview rubrics that eliminate interviewer halo bias',
      'Leverage AI sourcing tools and boolean string queries for passive talent identification',
      'Structure attractive stock option, RSU, and base compensation offers',
      'Measure quality of hire, time-to-fill, and candidate Net Promoter Score'
    ],
    prerequisites: ['Basic understanding of human resource workflows'],
    chapters: [
      {
        id: 'ch-ta-1',
        title: 'Structured Interviewing & Objective Competency Models',
        lessons: [
          { id: 'les-ta-1', title: 'Why Unstructured Interviews Predict Nothing (And How to Fix It)', durationMinutes: 22, type: 'video' },
          { id: 'les-ta-2', title: 'Drafting Behavior-Anchored Rating Scales (BARS)', durationMinutes: 30, type: 'video' }
        ]
      }
    ],
    quiz: [
      {
        id: 'qta-1',
        question: 'What is a BARS (Behaviorally Anchored Rating Scale) primarily designed to do?',
        options: [
          'Calculate employee tax deductions automatically',
          'Standardize interview evaluation by tying specific numerical ratings to defined observable behaviors',
          'Shorten the interview duration to under 5 minutes',
          'Conduct background checks on criminal records'
        ],
        correctAnswer: 1,
        explanation: 'BARS combines qualitative and quantitative assessment by anchoring numeric scores to specific observable actions.'
      }
    ],
    status: 'published',
    targetJobVacancies: [
      {
        title: 'VP of Talent Acquisition & People Ops',
        avgSalary: '₹24L - ₹34L CTC',
        demandLevel: 'Critical',
        hiringCompanies: ['Carta', 'Rippling', 'Notion', 'Coinbase']
      },
      {
        title: 'Strategic Workforce Planning Partner',
        avgSalary: '₹20L - ₹27L CTC',
        demandLevel: 'High',
        hiringCompanies: ['Deloitte', 'McKinsey', 'Accenture']
      }
    ]
  },

  // 6. Leaf under Technical & Engineering -> Cloud -> Kubernetes
  {
    id: 'course-kubernetes-microservices',
    title: 'Cloud-Native Kubernetes: GitOps, Service Mesh & Multi-Cluster Ops',
    slug: 'cloud-native-kubernetes-gitops-mesh',
    departmentId: 'tech-engineering',
    branchId: 'branch-cloud',
    twigId: 'twig-kubernetes',
    summary: 'Design zero-downtime microservices clusters, master ArgoCD declarative GitOps, Istio mTLS security, and autoscaling.',
    description: 'The definitive hands-on leaf for Cloud Engineers and DevOps professionals. Go far beyond simple pod deployments: configure ingress controllers, horizontal pod autoscalers (HPA), zero-trust service meshes with Istio, and multi-region disaster recovery.',
    thumbnail: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&q=80',
    level: 'Advanced',
    durationHours: 35,
    rating: 4.93,
    reviewCount: 3120,
    price: 139,
    originalPrice: 229,
    isPopular: true,
    isFeatured: true,
    instructor: {
      id: 'inst-6',
      name: 'Torin Lindqvist',
      role: 'Principal Cloud Architect (CKA, CKS)',
      company: 'Nordic Cloud Alliance',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80',
      bio: 'Kubernetes certified architect and open source maintainer. Architected container clusters for major European telecom networks.',
      rating: 4.96,
      studentsCount: 52000
    },
    whatYouWillLearn: [
      'Deploy enterprise GitOps pipelines with ArgoCD and Helm chart values versioning',
      'Configure Istio Service Mesh with mutual TLS (mTLS) and canary traffic splitting',
      'Optimize cluster autoscaling with Karpenter on AWS and Cluster Autoscaler on GCP',
      'Implement strict NetworkPolicies to isolate sensitive database workloads'
    ],
    prerequisites: ['Docker proficiency', 'Intermediate Linux system administration'],
    chapters: [
      {
        id: 'ch-k8s-1',
        title: 'Cluster Control Plane Architecture & Storage Drivers (CSI)',
        lessons: [
          { id: 'les-k8s-1', title: 'etcd Raft Consensus, Kube-API-Server Bottlenecks & Tuning', durationMinutes: 32, type: 'video' },
          { id: 'les-k8s-2', title: 'Persistent Volumes, CSI Plugins, and Dynamic Provisioning', durationMinutes: 28, type: 'video' }
        ]
      }
    ],
    quiz: [
      {
        id: 'qk8s-1',
        question: 'In GitOps with ArgoCD, what is the single source of truth for the desired cluster state?',
        options: ['The Git repository containing declarative manifests', 'The local docker daemon on the engineer laptop', 'The AWS management console UI', 'The etcd backup snapshot only'],
        correctAnswer: 0,
        explanation: 'GitOps dictates that all infrastructure manifests are versioned in Git, and the cluster controller reconciles live state to match.'
      }
    ],
    status: 'published',
    targetJobVacancies: [
      {
        title: 'Principal Cloud Platform & Kubernetes Architect',
        avgSalary: '₹27L - ₹37L CTC',
        demandLevel: 'Critical',
        hiringCompanies: ['Red Hat', 'AWS', 'Google Cloud', 'Cisco']
      },
      {
        title: 'Senior DevOps / Infrastructure Reliability Engineer',
        avgSalary: '₹23L - ₹31L CTC',
        demandLevel: 'Very High',
        hiringCompanies: ['Spotify', 'Twilio', 'Square']
      }
    ]
  },

  // 7. Leaf under Technical & Engineering -> Programming -> Rust
  {
    id: 'course-rust-systems-architecture',
    title: 'Rust Systems Architecture: Memory Safety, Concurrency & High Throughput',
    slug: 'rust-systems-architecture-concurrency',
    departmentId: 'tech-engineering',
    branchId: 'branch-programming',
    twigId: 'twig-systems-rust',
    summary: 'Master the borrow checker, async runtime mechanics with Tokio, zero-cost abstractions, and high-performance network services.',
    description: 'Tackle the most loved programming language in depth. Understand lifetimes, trait systems, dynamic vs static dispatch, safe lockless concurrency, and build blazing-fast HTTP/gRPC services capable of handling millions of connections.',
    thumbnail: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1200&q=80',
    level: 'Advanced',
    durationHours: 38,
    rating: 4.96,
    reviewCount: 1850,
    price: 159,
    originalPrice: 249,
    isPopular: true,
    isFeatured: true,
    instructor: {
      id: 'inst-7',
      name: 'Kaelen Vance',
      role: 'Staff Systems Programmer',
      company: 'Rustacean Systems Labs',
      avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=300&q=80',
      bio: 'Core contributor to low-latency network proxies and database storage engines written in Rust.',
      rating: 4.98,
      studentsCount: 29500
    },
    whatYouWillLearn: [
      'Master ownership, borrowing, and explicit lifetime annotations across complex structs',
      'Build lockless, multi-producer multi-consumer pipelines using crossbeam & arc-swap',
      'Architect async web services with Axum, Tokio, and Tower middleware layers',
      'Interface with C libraries safely using FFI (Foreign Function Interface)'
    ],
    prerequisites: ['Prior experience in C, C++, Go, or Java'],
    chapters: [
      {
        id: 'ch-rust-1',
        title: 'Ownership Mechanics, Lifetimes & The Type System',
        lessons: [
          { id: 'les-rust-1', title: 'Stack vs Heap Allocation and Move Semantics', durationMinutes: 26, type: 'video' },
          { id: 'les-rust-2', title: 'Deconstructing Trait Bounds and Static Monomorphization', durationMinutes: 34, type: 'video' }
        ]
      }
    ],
    quiz: [
      {
        id: 'qrust-1',
        question: 'How does Rust achieve memory safety without a garbage collector?',
        options: [
          'Through compile-time ownership rules, borrowing checks, and deterministic RAII destruction',
          'By running an invisible background thread that clears RAM periodically',
          'By prohibiting the use of heap memory completely',
          'By converting all variables into global pointers'
        ],
        correctAnswer: 0,
        explanation: 'Rust validates ownership and borrow lifetimes during compilation, inserting zero-overhead drop calls at precise scope exits.'
      }
    ],
    status: 'published',
    targetJobVacancies: [
      {
        title: 'Senior Systems Software Engineer (Rust)',
        avgSalary: '₹26L - ₹38L CTC',
        demandLevel: 'Critical',
        hiringCompanies: ['Cloudflare', 'Figma', 'Discord', '1Password']
      },
      {
        title: 'High-Frequency Trading (HFT) Systems Developer',
        avgSalary: '₹30L - ₹44L CTC',
        demandLevel: 'Critical',
        hiringCompanies: ['Jane Street', 'Citadel Securities', 'Hudson River Trading']
      }
    ]
  },

  // 8. Leaf under Creative & Service -> Hotel Management -> Luxury Resort
  {
    id: 'course-luxury-resort-hospitality',
    title: 'Luxury Resort Operations & 5-Star Guest Journey Management',
    slug: 'luxury-resort-operations-guest-journey',
    departmentId: 'creative-service',
    branchId: 'branch-hotel-mgmt',
    twigId: 'twig-luxury-resort',
    summary: 'Master Forbes 5-Star guest protocols, Property Management Systems (Opera PMS), room yield revenue, and sustainable luxury.',
    description: 'Designed for hospitality professionals and aspiring general managers. Learn world-class service standards, high-end guest personalization, luxury F&B dining operations, crisis de-escalation, and maximizing RevPAR through intelligent dynamic rate allocation.',
    thumbnail: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80',
    level: 'Beginner',
    durationHours: 20,
    rating: 4.86,
    reviewCount: 940,
    price: 95,
    originalPrice: 160,
    isPopular: false,
    isFeatured: true,
    instructor: {
      id: 'inst-8',
      name: 'Antoine Delacroix',
      role: 'Former Managing Director, Grand Palace Riviera',
      company: 'Delacroix Hospitality Institute',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=300&q=80',
      bio: '25 years heading flagship 5-star properties across Monaco, Paris, and the Maldives. Forbes Travel Guide consultant.',
      rating: 4.91,
      studentsCount: 11800
    },
    whatYouWillLearn: [
      'Implement Forbes Travel Guide 5-star emotional engagement standards and service timing benchmarks',
      'Optimize room inventory yield, ADR (Average Daily Rate), and RevPAR using PMS forecasting',
      'Manage high-net-worth VIP arrivals, privacy protocols, and bespoke experiential itineraries',
      'Lead cross-departmental operations: Front Desk, Concierge, Housekeeping, and Fine Dining'
    ],
    prerequisites: ['Passion for hospitality and customer experience excellence'],
    chapters: [
      {
        id: 'ch-hotel-1',
        title: 'The Anatomy of 5-Star Service Standards',
        lessons: [
          { id: 'les-h-1', title: 'Emotional Intelligence and Anticipatory Hospitality', durationMinutes: 22, type: 'video' },
          { id: 'les-h-2', title: 'The 15-Minute Check-In Benchmark & Opera PMS Workflows', durationMinutes: 30, type: 'video' }
        ]
      }
    ],
    quiz: [
      {
        id: 'qh-1',
        question: 'What does RevPAR stand for in hotel financial metrics?',
        options: ['Revenue Per Available Room', 'Return on Event Value Performance', 'Reinvested Profit and Account Reserve', 'Reservation Price Average Ratio'],
        correctAnswer: 0,
        explanation: 'RevPAR is calculated by multiplying Average Daily Rate (ADR) by the occupancy rate, providing a unified metric of room revenue efficiency.'
      }
    ],
    status: 'published',
    targetJobVacancies: [
      {
        title: 'Luxury Hotel General Manager / Resort Director',
        avgSalary: '₹22L - ₹35L CTC',
        demandLevel: 'Very High',
        hiringCompanies: ['Four Seasons Hotels', 'Ritz-Carlton', 'Aman Resorts', 'Marriott Luxury']
      },
      {
        title: 'Guest Experience & Hospitality Operations Lead',
        avgSalary: '₹15L - ₹23L CTC',
        demandLevel: 'High',
        hiringCompanies: ['Hyatt Regency', 'Hilton Worldwide', 'Accor']
      }
    ]
  },

  // 9. Leaf under Education & Human Sciences -> Teaching & Pedagogy
  {
    id: 'course-modern-pedagogy-mastery',
    title: 'Transformative Pedagogy: Active Learning & Differentiated Instruction',
    slug: 'transformative-pedagogy-active-learning',
    departmentId: 'education-human',
    branchId: 'branch-teaching-pedagogy',
    twigId: 'twig-active-pedagogy',
    summary: 'Empower modern learners with cognitive science principles, flipped classrooms, formative assessment, and inclusive dialogue.',
    description: 'Transform traditional lecture-based teaching into high-retention active discovery. Grounded in contemporary educational psychology and Universal Design for Learning (UDL), this leaf provides practical tools to inspire student ownership and academic mastery.',
    thumbnail: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=1200&q=80',
    level: 'Beginner',
    durationHours: 16,
    rating: 4.91,
    reviewCount: 680,
    price: 79,
    originalPrice: 129,
    isPopular: false,
    isFeatured: true,
    instructor: {
      id: 'inst-9',
      name: 'Dr. Sarah Jennings',
      role: 'Professor of Learning Sciences',
      company: 'Cambridge Pedagogy Research Group',
      avatar: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=300&q=80',
      bio: 'Award-winning educational researcher. Author of "The Engaged Mind" and curriculum advisor to university departments worldwide.',
      rating: 4.94,
      studentsCount: 16500
    },
    whatYouWillLearn: [
      'Implement Socratic questioning and peer-instruction protocols that drive conceptual understanding',
      'Design differentiated learning pathways aligned with Universal Design for Learning (UDL)',
      'Construct formative micro-assessments that diagnose misconceptions before exams',
      'Orchestrate psychological safety and vibrant classroom discourse in hybrid settings'
    ],
    prerequisites: ['Interest in teaching, tutoring, or academic curriculum design'],
    chapters: [
      {
        id: 'ch-ped-1',
        title: 'Cognitive Architecture: Working Memory & Retrieval Practice',
        lessons: [
          { id: 'les-p-1', title: 'Why Passive Listening Fails: The Cognitive Load Theory', durationMinutes: 25, type: 'video' },
          { id: 'les-p-2', title: 'Structuring 5-Minute Retrieval Warmups and Formative Exit Tickets', durationMinutes: 28, type: 'video' }
        ]
      }
    ],
    quiz: [
      {
        id: 'qped-1',
        question: 'According to Cognitive Load Theory, what happens when working memory is overloaded with extraneous information?',
        options: [
          'Schema acquisition and long-term memory encoding are severely impaired',
          'Students automatically memorize concepts faster',
          'The brain increases its attention capacity tenfold',
          'It improves performance in creative problem solving'
        ],
        correctAnswer: 0,
        explanation: 'Working memory has strict capacity limits; reducing extraneous cognitive load frees mental resources for germane schema construction.'
      }
    ],
    status: 'published',
    targetJobVacancies: [
      {
        title: 'Director of Academic Curriculum & Pedagogy',
        avgSalary: '₹18L - ₹26L CTC',
        demandLevel: 'High',
        hiringCompanies: ['Stanford Online', 'Harvard University DCE', 'Coursera', 'Khan Academy']
      },
      {
        title: 'Learning Experience & Pedagogy Specialist',
        avgSalary: '₹14L - ₹21L CTC',
        demandLevel: 'Very High',
        hiringCompanies: ['Duolingo', 'Udemy', 'Guild Education']
      }
    ]
  },

  // 10. Leaf under Education -> Instructional Design -> ADDIE
  {
    id: 'course-instructional-design-addie',
    title: 'The Complete Instructional Design Mastery: ADDIE, Storyline & LMS',
    slug: 'instructional-design-addie-storyline-lms',
    departmentId: 'education-human',
    branchId: 'branch-instructional-design',
    twigId: 'twig-addie-instructional',
    summary: 'Design corporate training and online higher-ed courses using ADDIE, SAM agile frameworks, Storyline 360, and SCORM/xAPI packaging.',
    description: 'The definitive blueprint for becoming a highly paid Instructional Designer. Learn needs analysis, adult learning theories (Andragogy), drafting interactive storyboards, recording voiceover pacing, and packaging modules for modern Learning Management Systems.',
    thumbnail: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=1200&q=80',
    level: 'Intermediate',
    durationHours: 24,
    rating: 4.87,
    reviewCount: 820,
    price: 110,
    originalPrice: 180,
    isPopular: false,
    isFeatured: false,
    instructor: {
      id: 'inst-10',
      name: 'Raymond Patel',
      role: 'Director of Learning Experience Design',
      company: 'EdTech Architects Global',
      avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=300&q=80',
      bio: 'Pioneered microlearning architectures for Fortune 100 enterprise onboarding programs. 12+ years in instructional authoring.',
      rating: 4.89,
      studentsCount: 15300
    },
    whatYouWillLearn: [
      'Execute the 5 phases of ADDIE (Analysis, Design, Development, Implementation, Evaluation) systematically',
      'Build branching scenario simulations with Articulate Storyline 360 and Camtasia',
      'Track granular learner behaviors using xAPI (Experience API) and Tin Can statements',
      'Calculate Kirkpatrick Level 4 training ROI metrics for executive stakeholders'
    ],
    prerequisites: ['Basic computer proficiency and passion for educational content creation'],
    chapters: [
      {
        id: 'ch-id-1',
        title: 'Needs Analysis & Writing Bloom’s Taxonomy Objectives',
        lessons: [
          { id: 'les-id-1', title: 'Differentiating Training Problems from Operational Problems', durationMinutes: 20, type: 'video' },
          { id: 'les-id-2', title: 'Writing Measurable Behavioral Objectives (ABCD Method)', durationMinutes: 25, type: 'video' }
        ]
      }
    ],
    quiz: [
      {
        id: 'qid-1',
        question: 'What is Level 4 of the Kirkpatrick Model of Training Evaluation?',
        options: ['Results: Targeted business outcomes and organizational ROI achieved', 'Reaction: Learner satisfaction ratings', 'Learning: Post-test quiz scores', 'Behavior: On-the-job skill transfer'],
        correctAnswer: 0,
        explanation: 'Kirkpatrick Level 4 measures the ultimate organizational impact and business results (e.g. reduced errors, increased revenue).'
      }
    ],
    status: 'published',
    targetJobVacancies: [
      {
        title: 'Senior Instructional Designer & EdTech Lead',
        avgSalary: '₹18L - ₹26L CTC',
        demandLevel: 'Critical',
        hiringCompanies: ['Amazon Global Learning', 'Microsoft Academy', 'Salesforce Trailhead']
      },
      {
        title: 'Enterprise Learning Experience Architect (LXD)',
        avgSalary: '₹17L - ₹24L CTC',
        demandLevel: 'Very High',
        hiringCompanies: ['Accenture', 'PwC Training', 'Target Academy']
      }
    ]
  },

  // 11. Leaf under Business Operations -> Finance -> Financial Modeling
  {
    id: 'course-financial-modeling-valuation',
    title: 'Wall Street Financial Modeling: 3-Statement, DCF, LBO & M&A',
    slug: 'wall-street-financial-modeling-valuation',
    departmentId: 'business-operations',
    branchId: 'branch-finance',
    twigId: 'twig-fin-modeling',
    summary: 'Build institutional-grade 3-statement forecast models, Discounted Cash Flow valuations, dynamic debt schedules, and LBO returns.',
    description: 'Learn the exact financial engineering methodologies practiced at Goldman Sachs, Morgan Stanley, and premier Private Equity funds. Master Excel shortcuts, circular reference breakers, debt waterfall schedules, and sensitivity tables.',
    thumbnail: 'https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?auto=format&fit=crop&w=1200&q=80',
    level: 'Advanced',
    durationHours: 30,
    rating: 4.94,
    reviewCount: 2450,
    price: 139,
    originalPrice: 220,
    isPopular: true,
    isFeatured: false,
    instructor: {
      id: 'inst-11',
      name: 'Julian Montgomery',
      role: 'Ex-Goldman Sachs M&A VP & Fund Manager',
      company: 'Apex Capital Partners',
      avatar: 'https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?auto=format&fit=crop&w=300&q=80',
      bio: 'Executed ₹65,000 Cr+ in cross-border M&A and leveraged buyout transactions. Trained incoming investment banking analyst classes.',
      rating: 4.97,
      studentsCount: 34000
    },
    whatYouWillLearn: [
      'Link the Income Statement, Balance Sheet, and Cash Flow Statement seamlessly without balancing plugs',
      'Calculate Weighted Average Cost of Capital (WACC) and Enterprise Value via DCF',
      'Model senior debt, mezzanine tranches, and equity returns (IRR and MoIC) in an LBO structure',
      'Create 2-way data table sensitivities for exit multiples and revenue growth rates'
    ],
    prerequisites: ['Basic accounting understanding (debits/credits, income statements)'],
    chapters: [
      {
        id: 'ch-fin-1',
        title: '3-Statement Financial Modeling from Blank Canvas',
        lessons: [
          { id: 'les-fin-1', title: 'Income Statement Drivers and Revenue Build Methodologies', durationMinutes: 30, type: 'video' },
          { id: 'les-fin-2', title: 'Working Capital Schedules and Cash Flow Linkage', durationMinutes: 40, type: 'video' }
        ]
      }
    ],
    quiz: [
      {
        id: 'qfin-1',
        question: 'If Depreciation increases by ₹10 with a 20% tax rate, how does Net Income change?',
        options: ['Net Income decreases by ₹8', 'Net Income increases by ₹10', 'Net Income is unaffected', 'Net Income decreases by ₹2'],
        correctAnswer: 0,
        explanation: 'The ₹10 pretax depreciation reduces operating income by ₹10. With a 20% tax rate (₹2 tax shield), Net Income decreases by ₹8.'
      }
    ],
    status: 'published',
    targetJobVacancies: [
      {
        title: 'Investment Banking Associate (M&A / Capital Markets)',
        avgSalary: '₹28L - ₹42L CTC',
        demandLevel: 'Critical',
        hiringCompanies: ['Goldman Sachs', 'Morgan Stanley', 'JPMorgan Chase', 'Evercore']
      },
      {
        title: 'Private Equity Investment Analyst',
        avgSalary: '₹26L - ₹38L CTC',
        demandLevel: 'Critical',
        hiringCompanies: ['Blackstone', 'KKR', 'Carlyle Group']
      }
    ]
  },

  // 12. Leaf under Technical & Engineering -> Software Support -> SRE
  {
    id: 'course-sre-incident-management',
    title: 'Site Reliability Engineering: SLOs, Chaos Drills & Post-Mortems',
    slug: 'site-reliability-engineering-slo-incident',
    departmentId: 'tech-engineering',
    branchId: 'branch-software-support',
    twigId: 'twig-sre-ops',
    summary: 'Master Google SRE principles, error budgets, automated alert fatigue reduction, and high-stakes production incident triage.',
    description: 'Learn how modern tier-1 engineering organizations maintain 99.99% availability. Understand how to negotiate Error Budgets between product velocity and system stability, write blameless post-mortems, and conduct live chaos engineering experiments.',
    thumbnail: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80',
    level: 'Intermediate',
    durationHours: 21,
    rating: 4.88,
    reviewCount: 915,
    price: 99,
    originalPrice: 169,
    isPopular: false,
    isFeatured: false,
    instructor: {
      id: 'inst-12',
      name: 'Nadia Volkova',
      role: 'Staff SRE & Incident Commander',
      company: 'OmniCloud Global SRE',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
      bio: 'Headed live incident response for payment systems processing billions in transaction volume. Certified Chaos Engineering practitioner.',
      rating: 4.91,
      studentsCount: 17200
    },
    whatYouWillLearn: [
      'Define customer-centric Service Level Indicators (SLIs) and Service Level Objectives (SLOs)',
      'Establish Error Budget policies that govern feature release velocity',
      'Conduct blameless post-mortem investigations with root cause timeline analysis',
      'Implement circuit breakers and exponential backoff jitter in distributed microservices'
    ],
    prerequisites: ['Basic Unix command line and microservices architecture awareness'],
    chapters: [
      {
        id: 'ch-sre-1',
        title: 'SLIs, SLOs and Error Budget Math',
        lessons: [
          { id: 'les-sre-1', title: 'Why 100% Uptime is the Wrong Target', durationMinutes: 20, type: 'video' },
          { id: 'les-sre-2', title: 'Calculating Burn Rates and Multi-Window Multi-Burn-Rate Alerts', durationMinutes: 32, type: 'video' }
        ]
      }
    ],
    quiz: [
      {
        id: 'qsre-1',
        question: 'What is the primary purpose of an Error Budget in SRE?',
        options: [
          'To objectively balance the pace of new product features against system reliability requirements',
          'To fine software engineers for writing bugs',
          'To purchase replacement servers when hardware fails',
          'To set a ceiling on AWS cloud billing invoices'
        ],
        correctAnswer: 0,
        explanation: 'Error Budgets provide an objective agreement between product and engineering: when budget is intact, innovate fast; when exhausted, focus on reliability.'
      }
    ],
    status: 'published',
    targetJobVacancies: [
      {
        title: 'Staff Site Reliability Engineer (SRE)',
        avgSalary: '₹26L - ₹36L CTC',
        demandLevel: 'Critical',
        hiringCompanies: ['Google', 'Meta', 'Cloudflare', 'Stripe']
      },
      {
        title: 'Production Incident Commander',
        avgSalary: '₹24L - ₹33L CTC',
        demandLevel: 'Very High',
        hiringCompanies: ['Datadog', 'Amazon AWS', 'Netflix']
      }
    ]
  },

  // 13. Leaf under AI -> Prompt Engineering
  {
    id: 'course-prompt-engineering',
    title: 'Enterprise Prompt Engineering, Context Architecture & AI Guardrails',
    slug: 'enterprise-prompt-engineering-context-architecture',
    departmentId: 'tech-engineering',
    branchId: 'branch-ai',
    twigId: 'twig-prompt-engineering',
    summary: 'Master few-shot calibration, system prompt hierarchies, structured JSON schema outputs, and adversarial injection defense.',
    description: 'Transform prompt authoring into a deterministic software engineering discipline. Master Chain-of-Thought prompting, automated prompt evaluation rigs, few-shot demonstration selectors, and zero-leakage security boundaries for enterprise LLM apps.',
    thumbnail: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80',
    level: 'Intermediate',
    durationHours: 24,
    rating: 4.94,
    reviewCount: 1640,
    price: 119,
    originalPrice: 199,
    isPopular: true,
    isFeatured: true,
    instructor: {
      id: 'inst-pe-1',
      name: 'Dr. Aris Thorne',
      role: 'Head of Prompt Systems & Alignment',
      company: 'Synthetica AI',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
      bio: 'Pioneered structured prompting standards used across Fortune 50 enterprise conversational AI systems.',
      rating: 4.97,
      studentsCount: 31200
    },
    whatYouWillLearn: [
      'Design unbreakable system prompt contracts with deterministic validation schemas',
      'Implement automated Prompt Injection and Jailbreak defense test suites',
      'Optimize token efficiency and context window compression algorithms',
      'Evaluate model drift and prompt regressions with benchmark datasets'
    ],
    prerequisites: ['Basic Python or API testing experience', 'Familiarity with foundational LLMs'],
    chapters: [
      {
        id: 'ch-pe-1',
        title: 'System Prompt Engineering & Few-Shot Demonstators',
        lessons: [
          { id: 'les-pe-1', title: 'The Anatomy of a Production System Prompt', durationMinutes: 24, type: 'video' },
          { id: 'les-pe-2', title: 'Dynamic In-Context Few-Shot Retrieval with Vector DBs', durationMinutes: 32, type: 'video' }
        ]
      }
    ],
    quiz: [
      {
        id: 'qpe-1',
        question: 'What is the most reliable method to guarantee strictly formatted JSON outputs from modern LLMs?',
        options: [
          'Using Constrained Decoding / JSON Schema validation enforcement at the API level',
          'Asking nicely in the prompt with capital letters',
          'Lowering the temperature to negative values',
          'Removing system prompts entirely'
        ],
        correctAnswer: 0,
        explanation: 'Grammar-constrained sampling forces the model vocabulary logits to follow strict JSON schema rules deterministically.'
      }
    ],
    status: 'published',
    targetJobVacancies: [
      {
        title: 'Principal Prompt Engineer & Context Architect',
        avgSalary: '₹23L - ₹31L CTC',
        demandLevel: 'Critical',
        hiringCompanies: ['Anthropic', 'OpenAI', 'Microsoft AI', 'Palantir']
      },
      {
        title: 'LLM Systems Evaluation Specialist',
        avgSalary: '₹22L - ₹29L CTC',
        demandLevel: 'Very High',
        hiringCompanies: ['Scale AI', 'Meta', 'Amazon AWS']
      }
    ]
  },

  // 14. Leaf under AI -> Machine Learning
  {
    id: 'course-applied-machine-learning',
    title: 'Applied Machine Learning & Predictive Algorithms Masterclass',
    slug: 'applied-machine-learning-predictive-algorithms',
    departmentId: 'tech-engineering',
    branchId: 'branch-ai',
    twigId: 'twig-machine-learning',
    summary: 'Master end-to-end predictive modeling with Scikit-Learn, XGBoost, feature pipelines, and cross-validation diagnostics.',
    description: 'A comprehensive curriculum taking engineers from raw tabular and text data to production ML models. Master feature engineering, regularized regressions, gradient boosted decision trees, hyperparameter tuning with Optuna, and SHAP explainability.',
    thumbnail: 'https://images.unsplash.com/photo-1504639725590-34d0984388bd?auto=format&fit=crop&w=1200&q=80',
    level: 'Intermediate',
    durationHours: 30,
    rating: 4.89,
    reviewCount: 1220,
    price: 139,
    originalPrice: 229,
    isPopular: true,
    isFeatured: true,
    instructor: {
      id: 'inst-ml-1',
      name: 'Priya Narayanan',
      role: 'Staff Machine Learning Scientist',
      company: 'Quantum Matrix Labs',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&q=80',
      bio: 'Ex-Kaggle Grandmaster. Built customer predictive lifetime and churn models processing petabyte data streams.',
      rating: 4.93,
      studentsCount: 28400
    },
    whatYouWillLearn: [
      'Build robust feature engineering pipelines with categorical encoding and scaling',
      'Train high-accuracy Gradient Boosted Trees with XGBoost and LightGBM',
      'Diagnose overfitting with learning curves and stratified K-fold cross-validation',
      'Interpret black-box models using SHAP (Shapley Additive exPlanations)'
    ],
    prerequisites: ['Proficiency in Python and basic statistics'],
    chapters: [
      {
        id: 'ch-ml-1',
        title: 'Supervised Learning Foundations & Feature Engineering',
        lessons: [
          { id: 'les-ml-1', title: 'Bias-Variance Tradeoff in High-Dimensional Spaces', durationMinutes: 28, type: 'video' },
          { id: 'les-ml-2', title: 'Feature Preprocessing and ColumnTransformers in Scikit-Learn', durationMinutes: 36, type: 'video' }
        ]
      }
    ],
    quiz: [
      {
        id: 'qml-1',
        question: 'Why should feature scaling (e.g. StandardScaler) be fit only on the training set, not the entire dataset?',
        options: [
          'To prevent data leakage from the test distribution into the training pipeline',
          'Because computers run out of memory otherwise',
          'Scaling only works on negative numbers',
          'It is purely a matter of personal preference with zero statistical impact'
        ],
        correctAnswer: 0,
        explanation: 'Fitting transformers on the test split leaks statistical parameters (mean/variance) from unseen data, invalidating generalization tests.'
      }
    ],
    status: 'published',
    targetJobVacancies: [
      {
        title: 'Senior Machine Learning Engineer',
        avgSalary: '₹26L - ₹36L CTC',
        demandLevel: 'Critical',
        hiringCompanies: ['NVIDIA', 'Google DeepMind', 'Apple', 'Databricks']
      },
      {
        title: 'Predictive Modeling Data Scientist',
        avgSalary: '₹22L - ₹30L CTC',
        demandLevel: 'Very High',
        hiringCompanies: ['Stripe', 'Uber', 'Airbnb']
      }
    ]
  },

  // 15. Leaf under Industrial Engineering -> Smart Factory
  {
    id: 'course-smart-manufacturing-iot',
    title: 'Industrial Engineering 4.0: Smart Factories, IoT & Digital Twins',
    slug: 'industrial-engineering-smart-factories-iot',
    departmentId: 'tech-engineering',
    branchId: 'branch-industrial-manufacturing',
    twigId: 'twig-smart-factory',
    summary: 'Deploy industrial IoT protocols with MQTT/OPC-UA, build real-time digital twins, and automate shop-floor telemetry.',
    description: 'Transform legacy factories into intelligent Industry 4.0 manufacturing powerhouses. Master OT/IT convergence, PLC & SCADA integration, automated edge compute, predictive maintenance analytics, and machine vision inspection.',
    thumbnail: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1200&q=80',
    level: 'Advanced',
    durationHours: 28,
    rating: 4.92,
    reviewCount: 980,
    price: 149,
    originalPrice: 240,
    isPopular: false,
    isFeatured: true,
    instructor: {
      id: 'inst-ie-1',
      name: 'Dr. Klaus von Weber',
      role: 'VP of Industrial Automation',
      company: 'AeroDynamics & Smart Robotics Group',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80',
      bio: '30 years modernizing automotive and aerospace assembly lines across Germany and the United States.',
      rating: 4.96,
      studentsCount: 16200
    },
    whatYouWillLearn: [
      'Bridge OT (Operational Technology) and IT using edge gateways and OPC-UA / MQTT',
      'Construct real-time Digital Twins for assembly lines and CNC machining centers',
      'Implement predictive maintenance algorithms that reduce unplanned downtime by 40%',
      'Deploy automated vision cameras on robotic arms for sub-millimeter quality control'
    ],
    prerequisites: ['Basic electrical or mechanical awareness', 'Familiarity with networking concepts'],
    chapters: [
      {
        id: 'ch-ie-1',
        title: 'Industry 4.0 Architecture & OT/IT Connectivity',
        lessons: [
          { id: 'les-ie-1', title: 'The Automation Pyramid: From Sensor to Cloud ERP', durationMinutes: 26, type: 'video' },
          { id: 'les-ie-2', title: 'Configuring Industrial Edge Gateways with Node-RED & MQTT', durationMinutes: 38, type: 'video' }
        ]
      }
    ],
    quiz: [
      {
        id: 'qie-1',
        question: 'What is the primary advantage of OPC-UA in smart manufacturing environments?',
        options: [
          'It provides platform-independent, secure, semantic data modeling across diverse industrial PLCs',
          'It replaces electric power with wireless batteries',
          'It deletes the need for quality assurance inspections',
          'It requires no network cables or wireless signals'
        ],
        correctAnswer: 0,
        explanation: 'OPC-UA offers open, vendor-neutral industrial communication with built-in encryption and complex data structuring.'
      }
    ],
    status: 'published',
    targetJobVacancies: [
      {
        title: 'Smart Manufacturing Systems Architect',
        avgSalary: '₹22L - ₹31L CTC',
        demandLevel: 'Critical',
        hiringCompanies: ['Siemens', 'Tesla Gigafactory', 'General Electric', 'Boeing']
      },
      {
        title: 'Industrial Automation & Robotics Lead',
        avgSalary: '₹21L - ₹30L CTC',
        demandLevel: 'Very High',
        hiringCompanies: ['Honeywell', 'Rockwell Automation', 'Schneider Electric']
      }
    ]
  },

  // 16. Leaf under Industrial Engineering -> Lean Six Sigma
  {
    id: 'course-lean-manufacturing-six-sigma',
    title: 'Advanced Lean Manufacturing, Six Sigma Black Belt & Process Engineering',
    slug: 'advanced-lean-manufacturing-six-sigma-black-belt',
    departmentId: 'tech-engineering',
    branchId: 'branch-industrial-manufacturing',
    twigId: 'twig-lean-six-sigma',
    summary: 'Master DMAIC, Value Stream Mapping, Kaizen continuous improvement, and Statistical Process Control (SPC).',
    description: 'The definitive executive masterclass in industrial efficiency and defect elimination. Master the 8 Wastes of Lean, 5S workplace organization, Kanban pull systems, Gage R&R measurement system analysis, and process capability indices (Cp, Cpk).',
    thumbnail: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1200&q=80',
    level: 'Intermediate',
    durationHours: 26,
    rating: 4.88,
    reviewCount: 1140,
    price: 129,
    originalPrice: 199,
    isPopular: true,
    isFeatured: false,
    instructor: {
      id: 'inst-ie-2',
      name: 'Victoria Morales (CSSBB)',
      role: 'Master Black Belt & Operational Excellence Director',
      company: 'Apex Lean Operations Consultancy',
      avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=300&q=80',
      bio: 'Led operational transformations saving over ₹360 Cr across medical device and automotive manufacturing plants.',
      rating: 4.92,
      studentsCount: 22800
    },
    whatYouWillLearn: [
      'Execute full-cycle DMAIC (Define, Measure, Analyze, Improve, Control) projects',
      'Create current-state and future-state Value Stream Maps (VSM) to eliminate waste',
      'Calculate OEE (Overall Equipment Effectiveness) and takt time for balanced lines',
      'Conduct ANOVA and hypothesis tests using Minitab to isolate root causes'
    ],
    prerequisites: ['Basic mathematics and interest in operational excellence'],
    chapters: [
      {
        id: 'ch-lss-1',
        title: 'Value Stream Mapping & Eliminating the 8 Wastes (Muda)',
        lessons: [
          { id: 'les-lss-1', title: 'Identifying Overproduction, Waiting, and Defects on the Gemba', durationMinutes: 24, type: 'video' },
          { id: 'les-lss-2', title: 'Calculating Takt Time vs Cycle Time to Eliminate Bottlenecks', durationMinutes: 30, type: 'video' }
        ]
      }
    ],
    quiz: [
      {
        id: 'qlss-1',
        question: 'What does a process capability index Cpk >= 1.33 indicate in Six Sigma manufacturing?',
        options: [
          'The process is capable and operating within specifications with low defect risk (4 Sigma level or higher)',
          'The entire factory must shut down immediately for repairs',
          'The products have a 50% defect rate',
          'It means zero measurements were recorded'
        ],
        correctAnswer: 0,
        explanation: 'A Cpk of 1.33 or greater indicates the process spread is well centered within upper and lower customer specification limits.'
      }
    ],
    status: 'published',
    targetJobVacancies: [
      {
        title: 'Director of Continuous Improvement & Lean',
        avgSalary: '₹23L - ₹34L CTC',
        demandLevel: 'Critical',
        hiringCompanies: ['Toyota North America', '3M', 'Caterpillar', 'Lockheed Martin']
      },
      {
        title: 'Lead Manufacturing Operations Engineer',
        avgSalary: '₹20L - ₹28L CTC',
        demandLevel: 'Very High',
        hiringCompanies: ['Intel', 'Johnson & Johnson', 'Procter & Gamble']
      }
    ]
  }
];

export const INITIAL_USER_ENROLLMENTS: Record<string, import('../types/tree').UserEnrollment> = {
  'course-genai-mastery': {
    courseId: 'course-genai-mastery',
    enrolledAt: '2026-09-18T10:00:00Z',
    progressPercent: 65,
    completedLessonIds: ['les-1-1', 'les-1-2', 'les-1-3', 'les-2-1'],
    notes: 'Key takeaway: Always use cross-encoder re-ranking for enterprise search queries containing exact invoice or acronym IDs.',
    certificateEarned: false
  },
  'course-growth-marketing-os': {
    courseId: 'course-growth-marketing-os',
    enrolledAt: '2026-08-10T14:30:00Z',
    progressPercent: 100,
    completedLessonIds: ['les-gm-1', 'les-gm-2', 'les-gm-3', 'les-gm-4'],
    quizScore: 100,
    quizPassed: true,
    certificateEarned: true,
    certificateId: 'CERT-NOMYSKILL-2026-9481',
    notes: 'Completed all chapters! Payback window should be calibrated against net gross margin, not top-line billings.'
  }
};
