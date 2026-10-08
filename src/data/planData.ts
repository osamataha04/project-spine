export interface TodoItem {
  id: string;
  text: string;
  completed: boolean;
  category: string;
  phase: string;
}

export interface ChecklistItem {
  id: string;
  text: string;
  completed: boolean;
  target: string;
}

export const phases = [
  {
    id: 0,
    name: "Phase 0",
    title: "Pre-Service Sprint",
    duration: "~6 months",
    hoursPerWeek: 20,
    color: "#3b82f6",
    description: "Register ACCA, Applied Knowledge complete, CV + Excel built, applications live at all targets in parallel.",
    milestones: [
      "Register ACCA & confirm exemptions",
      "Complete Applied Knowledge (BT, MA, FA)",
      "Build CV v1 & LinkedIn profile",
      "Complete Excel advanced course",
      "Begin Knowledge Spine (Kieso Ch.1-10)",
      "Submit applications to all targets",
      "Build first 3-statement model from blank sheet",
      "Complete first mock interview",
      "Secure offer or strong pipeline"
    ]
  },
  {
    id: 1,
    name: "Phase 1",
    title: "Military Service",
    duration: "~12-15 months",
    hoursPerWeek: "0-5",
    color: "#f59e0b",
    description: "Maintenance mode only. Light English practice, 1 ACCA paper if feasible. Zero progress expected — that's fine.",
    milestones: [
      "Confirm exact service duration",
      "Set up deferred-start with employer if offer exists",
      "Light English practice when possible",
      "Stay in touch with recruiter if deferred start",
      "Mental preparation for Phase 2 intensity"
    ]
  },
  {
    id: 2,
    name: "Phase 2",
    title: "Banking / Investment Banking",
    duration: "Years 1-2",
    hoursPerWeek: 20,
    color: "#10b981",
    description: "Full-time job + 20hrs/wk study. ACCA Applied Skills → Strategic Professional. CFA Level I. Build quantified track record.",
    milestones: [
      "Start PER objective logging",
      "Complete ACCA Applied Skills (6 papers)",
      "Begin Strategic Professional",
      "Pass CFA Level I (Year 2)",
      "Build Power BI + SQL skills (Year 1)",
      "Build Python for finance skills (Year 2)",
      "Month 18: Restart Big 4 lateral prep",
      "2+ years quantified experience on CV"
    ]
  },
  {
    id: 3,
    name: "Phase 3",
    title: "Elite Lateral",
    duration: "Year 3+",
    hoursPerWeek: 20,
    color: "#8b5cf6",
    description: "Lateral into Big 4 Audit/Advisory, elite IB, or MNC Tier 2. ACCA Strategic Professional completion. CFA Level II.",
    milestones: [
      "Complete ACCA Strategic Professional",
      "Achieve ACCA full membership",
      "Pass CFA Level II",
      "Lateral to Big 4 / Elite IB / MNC",
      "Build referral network at target firms",
      "Begin side income streams (tutoring, consulting)"
    ]
  },
  {
    id: 4,
    name: "Phase 4",
    title: "Manager → CFO",
    duration: "Years 5-15",
    hoursPerWeek: 20,
    color: "#ec4899",
    description: "Manager → Senior Manager → Financial Controller → Director → VP Finance → CFO. Egypt or Gulf/EU relocation.",
    milestones: [
      "Years 5-7: Manager / Senior Manager",
      "Years 8-11: Financial Controller",
      "Years 12-15: CFO track",
      "Gulf/EU relocation achieved",
      "Board reporting ownership",
      "MBA only if specific unlock signal"
    ]
  }
];

export const incomeTimeline = [
  { phase: "Phase 0", period: "Months 1-6", min: 0, max: 0, label: "No income (savings/family)", color: "#3b82f6" },
  { phase: "Phase 1", period: "Service", min: 0, max: 500, label: "Nominal conscript pay", color: "#f59e0b" },
  { phase: "Phase 2 Y1", period: "Entry Bank", min: 5000, max: 8000, label: "CSR / Junior Analyst", color: "#10b981" },
  { phase: "Phase 2 Y1", period: "Credit Analyst", min: 7000, max: 17000, label: "Credit Analyst (Cairo median ~12K)", color: "#10b981" },
  { phase: "Phase 2 Y1", period: "Credit Risk", min: 15000, max: 25000, label: "Credit Risk Analyst (NBE)", color: "#10b981" },
  { phase: "Phase 2 Y2", period: "End Y2", min: 18000, max: 35000, label: "Promoted (higher at IB)", color: "#10b981" },
  { phase: "Phase 3", period: "Year 3", min: 20000, max: 35000, label: "Big 4 Senior Associate", color: "#8b5cf6" },
  { phase: "Phase 3", period: "Year 3", min: 25000, max: 45000, label: "MNC FP&A Manager (junior)", color: "#8b5cf6" },
  { phase: "Years 5-7", period: "Manager", min: 40000, max: 70000, label: "Manager level", color: "#ec4899" },
  { phase: "Years 8-11", period: "Controller", min: 47500, max: 60000, label: "Financial Controller (~570K/yr)", color: "#ec4899" },
  { phase: "Years 12-15", period: "CFO Egypt", min: 100000, max: 140000, label: "CFO (~1.4M+/yr)", color: "#ec4899" },
];

export const baselineExpenses = [
  { item: "Rent (room/shared or family home)", amount: "2,000–4,000" },
  { item: "Food", amount: "2,500–4,000" },
  { item: "Internet + phone", amount: "600–1,000" },
  { item: "Transport", amount: "500–1,000" },
  { item: "Study materials (ACCA books, exam fees)", amount: "1,500–2,500" },
  { item: "Miscellaneous", amount: "1,000–1,500" },
];

export const hourBudgets = {
  phase0: [
    { track: "ACCA Applied Knowledge", hours: 9, color: "#3b82f6" },
    { track: "Knowledge Spine primary sources", hours: 3, color: "#8b5cf6" },
    { track: "English", hours: 3, color: "#10b981" },
    { track: "Excel / Tools", hours: 2, color: "#f59e0b" },
    { track: "Applications, CV, outreach", hours: 2, color: "#ec4899" },
    { track: "Mock interviews / technical drilling", hours: 2, color: "#06b6d4" },
  ],
  phase2: [
    { track: "ACCA Applied Skills → Strategic Professional", hours: 10, color: "#3b82f6" },
    { track: "Knowledge Spine catch-up", hours: 5, color: "#8b5cf6" },
    { track: "Tools (Power BI/SQL/Python)", hours: 3, color: "#f59e0b" },
    { track: "CFA Level I prep (Year 2)", hours: 2, color: "#10b981" },
  ],
  phase3: [
    { track: "ACCA Strategic Professional / CFA Level II", hours: 10, color: "#3b82f6" },
    { track: "Knowledge Spine maintenance + academic rigor", hours: 4, color: "#8b5cf6" },
    { track: "Tools maintenance", hours: 2, color: "#f59e0b" },
    { track: "Side income / consulting", hours: 4, color: "#10b981" },
  ]
};

export const knowledgeSpine = [
  {
    discipline: "Financial Accounting",
    text: "Kieso, Weygandt & Warfield — Intermediate Accounting",
    secondary: "IFRS 9/15/16, IAS 1/2/16/36/37 from IFRS.org",
    depthCheck: "Build full financial statements from trial balance, unaided, under 45 min, with IFRS justification"
  },
  {
    discipline: "Managerial/Cost Accounting",
    text: "Horngren, Datar & Rajan — Cost Accounting: A Managerial Emphasis",
    secondary: "",
    depthCheck: ""
  },
  {
    discipline: "Corporate Finance",
    text: "Brealey, Myers & Allen — Principles of Corporate Finance",
    secondary: "Berk & DeMarzo — Corporate Finance",
    depthCheck: "Derive WACC from first principles, explain M&M with/without taxes, build NPV/IRR decision unaided"
  },
  {
    discipline: "Valuation (highest-leverage for IB)",
    text: "Aswath Damodaran — Investment Valuation + free NYU Stern course",
    secondary: "Rosenbaum & Pearl — Investment Banking (MANDATORY for IB targeting)",
    depthCheck: "Build DCF from scratch with defensible WACC + terminal value, sanity-checked against comps"
  },
  {
    discipline: "Financial Statement Analysis",
    text: "Stephen Penman — Financial Statement Analysis and Security Valuation",
    secondary: "",
    depthCheck: "Read unfamiliar 10-K cold, identify 2-3 real red flags, under an hour"
  },
  {
    discipline: "Economics",
    text: "Mankiw (foundation) → Pindyck & Rubinfeld (micro) → Blanchard (macro)",
    secondary: "",
    depthCheck: "FX/rates exposure, treasury-relevant and IB-relevant"
  },
  {
    discipline: "Financial Modeling",
    text: "Wall Street Prep / Breaking Into Wall Street / CFI Financial Modeling path",
    secondary: "",
    depthCheck: "Fully linked 3-statement model from blank sheet, no template"
  },
  {
    discipline: "Strategy & Case Method (Domain 3 only)",
    text: "Cosentino — Case in Point + Victor Cheng free material",
    secondary: "",
    depthCheck: "Only if pursuing consulting lateral, Year 3"
  },
  {
    discipline: "Academic Rigor Add-on",
    text: "Fama-French, M&M 1958, Jensen-Meckling papers + FT/Economist weekly",
    secondary: "Follow one real company's quarterly earnings end-to-end",
    depthCheck: "5-10 most cited corporate finance papers discussable in plain language"
  }
];

export const toolStack = [
  {
    tier: "Tier 1 — Non-negotiable (Phase 0)",
    tools: [
      { name: "Excel (Advanced)", desc: "Financial modeling, pivot tables, VLOOKUP/XLOOKUP, macros" },
      { name: "PowerPoint", desc: "Board/client presentation fluency" }
    ]
  },
  {
    tier: "Tier 2 — BI & Data (Phase 2 Year 1)",
    tools: [
      { name: "Power BI", desc: "Microsoft's free learning path" },
      { name: "Tableau", desc: "Common at US-HQ'd MNCs" },
      { name: "SQL (query-level)", desc: "Mode Analytics, W3Schools" }
    ]
  },
  {
    tier: "Tier 3 — Financial Analysis (Phase 2 Year 2)",
    tools: [
      { name: "3-statement/DCF modeling", desc: "CFI, Wall Street Prep" },
      { name: "SAP FI/CO or Oracle NetSuite", desc: "Whichever employer uses — on the job" },
      { name: "Python for finance", desc: "pandas, openpyxl — Corey Schafer YouTube, Kaggle free course" }
    ]
  },
  {
    tier: "Tier 4 — Emerging/AI (ongoing)",
    tools: [
      { name: "AI-assisted audit/analytics", desc: "Firm-proprietary, learned on the job" },
      { name: "AI for drafting/variance-analysis", desc: "Practice as portfolio exercise before employment" }
    ]
  }
];

export const targetEmployers = {
  entryTier: [
    { name: "NBE", type: "Retail/Corporate Bank" },
    { name: "CIB", type: "Retail/Corporate Bank" },
    { name: "QNB Egypt", type: "Retail/Corporate Bank" },
    { name: "Banque Misr", type: "Retail/Corporate Bank" },
    { name: "AAIB", type: "Retail/Corporate Bank" },
    { name: "Banque du Caire", type: "Retail/Corporate Bank" },
    { name: "EFG Hermes", type: "Investment Bank" },
    { name: "CI Capital", type: "Investment Bank" },
    { name: "HSBC Egypt (IB division)", type: "Investment Bank" },
    { name: "BDO Egypt", type: "Mid-tier Audit" },
    { name: "Grant Thornton Egypt", type: "Mid-tier Audit" },
    { name: "Mazars Egypt", type: "Mid-tier Audit" },
    { name: "RSM Egypt", type: "Mid-tier Audit" },
  ],
  eliteTier: [
    { name: "Deloitte", type: "Big 4" },
    { name: "PwC", type: "Big 4" },
    { name: "EY", type: "Big 4" },
    { name: "KPMG", type: "Big 4" },
    { name: "EFG Hermes (Senior)", type: "Elite IB" },
    { name: "CI Capital (Senior)", type: "Elite IB" },
    { name: "Unilever Egypt", type: "MNC Finance" },
    { name: "Nestlé Egypt", type: "MNC Finance" },
    { name: "Coca-Cola Egypt", type: "MNC Finance" },
    { name: "Vodafone Egypt", type: "MNC Finance" },
    { name: "GSK", type: "MNC Finance" },
    { name: "Schneider Electric", type: "MNC Finance" },
  ],
  seniorTier: [
    { name: "CIB Regional", type: "Finance Leadership" },
    { name: "QNB Regional", type: "Finance Leadership" },
    { name: "HSBC Regional", type: "Finance Leadership" },
    { name: "MNC Regional CFO/Controller", type: "Dubai/Riyadh/London" },
  ]
};

export const preApplicationChecklists = {
  banks: [
    "ACCA Applied Knowledge in progress or complete",
    "Numerical reasoning / aptitude test practice (AssessmentDay, JobTestPrep)",
    "Business-English fluency",
    "2-3 STAR behavioral stories prepared"
  ],
  investmentBanks: [
    "Rosenbaum & Pearl fully worked through — comps, precedents, DCF, LBO basics",
    "Can build 3-statement model and DCF from blank sheet, timed",
    "Can walk through a recent real deal and discuss it",
    "Strong Excel + financial modeling demonstrable live in interview",
    "Genuine, specific 'why this firm' answer — researched their recent deals"
  ],
  big4: [
    "2+ years quantified experience on CV",
    "Warm referral or informational conversation with current employee",
    "ACCA Strategic Professional underway/complete",
    "3-statement model from blank sheet, under 90 min",
    "DCF with defensible assumptions, under 60 min",
    "IFRS 15/16 explained from actual standard, not summary",
    "Unfamiliar 10-K red-flag identification, under 45 min",
    "5+ academic corporate finance papers discussable",
    "FT/Economist weekly reader",
    "4+ consecutive quarters of one real company's earnings tracked"
  ],
  mnc: [
    "ACCA full membership or very near",
    "Power BI + SQL demonstrable",
    "Can walk through real budgeting/forecasting process end-to-end"
  ],
  gulf: [
    "ACCA full membership",
    "Confirm sponsorship salary threshold",
    "If Saudi-specific: consider CIFE (Islamic Finance)"
  ]
};

export const phase0MonthlyPlan = [
  {
    month: "Month 1",
    title: "Foundation",
    tasks: [
      "Register ACCA, confirm exemptions. Begin BT paper.",
      "Kieso Ch.1-3. Excel course (complete one, don't browse).",
      "CV v1 built. LinkedIn profile completed, target firms followed."
    ]
  },
  {
    month: "Month 2",
    title: "Applied Knowledge Push",
    tasks: [
      "MA paper, then FA paper toward completion.",
      "Kieso Ch.4-10. Damodaran NYU Stern lectures begin (first 5-6).",
      "First LinkedIn outreach batch (5-10 messages) — informational."
    ]
  },
  {
    month: "Month 3",
    title: "Applications Open",
    tasks: [
      "Applied Knowledge complete.",
      "Begin ACCA Financial Reporting (FR). IFRS 15/16 alongside.",
      "Applications submitted to ALL targets in parallel.",
      "Begin Rosenbaum & Pearl if targeting IB specifically."
    ]
  },
  {
    month: "Month 4",
    title: "Depth + First Interview Prep",
    tasks: [
      "PM paper. Brealey/Myers Ch.1-9 (NPV, WACC, capital budgeting).",
      "First 3-statement model from blank sheet — redo weekly.",
      "Add 1-2 hrs/wk numerical reasoning practice.",
      "First mock interview, technical + one behavioral story."
    ]
  },
  {
    month: "Month 5",
    title: "Interview-Grade Sharpening",
    tasks: [
      "TX, AA papers. Full DCF build, timed, under 60 min.",
      "Read one real 10-K end-to-end, identify observations.",
      "Second mock interview — IB-style if targeting EFG/CI Capital.",
      "Any real interview invite overrides this schedule immediately."
    ]
  },
  {
    month: "Month 6+",
    title: "Interview Cycle + Offer Push",
    tasks: [
      "FM paper toward completion.",
      "Full interview-readiness: technical checklist, STAR stories.",
      "Offer negotiation — discuss deferred start for service.",
      "If no offer: widen net further, extend this month."
    ]
  }
];

export const adjacentDomains = [
  { field: "Internal Audit / Governance", credential: "CIA", effort: "Low", strongest: "Egypt, Gulf, global" },
  { field: "Forensic Accounting / Fraud", credential: "CFE", effort: "Low-moderate", strongest: "Growing in Egypt/Gulf banking" },
  { field: "Corporate Treasury", credential: "CTP", effort: "Low", strongest: "MNC regional treasury hubs" },
  { field: "Financial Risk Management", credential: "FRM (GARP)", effort: "Moderate", strongest: "Banks/fintechs, UK/EU" },
  { field: "IT/Systems Audit", credential: "CISA", effort: "Moderate", strongest: "Big 4 Tech Risk, banks" },
  { field: "AML/Compliance", credential: "CAMS", effort: "Low", strongest: "Very strong in Gulf banking" },
  { field: "Wealth/Financial Planning", credential: "CFP", effort: "Moderate", strongest: "Gulf/Egypt private banking" },
  { field: "Islamic Finance", credential: "CIFE", effort: "Low", strongest: "Strong for Saudi specifically" },
  { field: "ESG / Sustainability", credential: "CFA ESG Cert", effort: "Low", strongest: "EU-linked MNCs" },
];

export const eliminatedItems = [
  { item: "Egyptian local CPA-equivalent as primary", reason: "ACCA is more internationally portable" },
  { item: "US CPA as primary", reason: "Requires US-specific credits; optional add-on only" },
  { item: "CMA as primary", reason: "Narrower than ACCA; optional add-on only" },
  { item: "Full-time MBA immediately", reason: "No work experience yet; reconsider Year 6-8" },
  { item: "Case-interview heavy prep before Year 3", reason: "Premature — consulting is lateral" },
  { item: "CFA Level III immediately", reason: "Sequenced after ACCA Applied Skills, Year 3+" },
  { item: "Entrepreneurship/startup track", reason: "High variance, doesn't trace to stated goal" },
  { item: "Stacking ACCA+CPA+CMA+CIMA simultaneously", reason: "ACCA alone sufficient for full ladder" },
  { item: "Actuarial science", reason: "Genuinely different quant track, not a low-effort pivot" },
];

export const visaStrategy = [
  {
    region: "Gulf (UAE/Saudi/Qatar)",
    difficulty: "Easiest",
    color: "#10b981",
    path: "No lottery, strong demand for ACCA-qualified. Big 4 and IBs with Gulf offices — apply internally once inside.",
    route: "Path A — Primary"
  },
  {
    region: "UK/EU",
    difficulty: "Achievable, moderate",
    color: "#3b82f6",
    path: "ACCA recognized in 180+ countries. UK Skilled Worker Visa / EU Blue Card, employer-sponsored.",
    route: "Path B"
  },
  {
    region: "USA",
    difficulty: "Genuinely hard",
    color: "#ef4444",
    path: "H-1B lottery-capped. Realistic route: US Master's + OPT first. Not in core plan; reassess Year 5+.",
    route: "Path C — Deferred"
  }
];

export const dailyTodos = [
  { id: "acca-1", text: "ACCA Paper Study: Complete 1 section of current paper (e.g., BT Ch.3 'Business organisation structure' — read theory + do 10 practice questions)", category: "ACCA Study (1h 20min)", phase: "0" },
  { id: "acca-2", text: "ACCA Practice: Work through 15-20 exam-style MCQs or section questions from BPP/Kaplan exam kit for current paper", category: "ACCA Study (1h 20min)", phase: "0" },
  { id: "acca-3", text: "ACCA Review: Re-read incorrect answers from yesterday's practice, write 1-page summary of weak areas", category: "ACCA Study (1h 20min)", phase: "0" },
  { id: "ks-1", text: "Kieso Intermediate Accounting: Read assigned chapter (e.g., Ch.2 'Conceptual Framework') — take notes on 3 key IFRS concepts", category: "Knowledge Spine (25min)", phase: "0" },
  { id: "ks-2", text: "Damodaran NYU Stern Lecture: Watch 1 lecture (45-60 min) on valuation/DCF — write down 5 key formulas", category: "Knowledge Spine (25min)", phase: "0" },
  { id: "ks-3", text: "Brealey/Myers Corporate Finance: Read 1 section (e.g., Ch.3 'NPV rules') — solve 2 end-of-chapter problems", category: "Knowledge Spine (25min)", phase: "0" },
  { id: "ks-4", text: "Rosenbaum & Pearl IB book: Work through 1 modeling exercise (e.g., build comps table for a real company like EFG Hermes)", category: "Knowledge Spine (25min)", phase: "0" },
  { id: "ks-5", text: "IFRS Standard Reading: Read actual IFRS 15 or IFRS 16 standard text (10-15 pages) — summarize key recognition criteria", category: "Knowledge Spine (25min)", phase: "0" },
  { id: "eng-1", text: "English Speaking: Record yourself answering 1 behavioral interview question in English (e.g., 'Walk me through a DCF') — listen back, fix pronunciation", category: "English (25min)", phase: "0" },
  { id: "eng-2", text: "English Writing: Write 1 LinkedIn post or email draft in professional English (150-200 words) — use Grammarly to check", category: "English (25min)", phase: "0" },
  { id: "eng-3", text: "English Listening: Watch 1 finance podcast/video in English (e.g., FT News Briefing, Bloomberg Markets) — write 3 new vocabulary words", category: "English (25min)", phase: "0" },
  { id: "eng-4", text: "English Reading: Read 1 article from FT/Economist/WSJ — summarize main argument in 3 sentences (English)", category: "English (25min)", phase: "0" },
  { id: "tools-1", text: "Excel: Complete 1 module from Excel course (e.g., 'Pivot Tables' or 'XLOOKUP') — practice with sample dataset", category: "Tools (17min)", phase: "0" },
  { id: "tools-2", text: "Financial Modeling: Build/rebuild 1 component of 3-statement model (e.g., income statement linkages, depreciation schedule)", category: "Tools (17min)", phase: "0" },
  { id: "tools-3", text: "DCF Practice: Time yourself building a DCF (target: under 60 min) — compare to previous attempt, note improvements", category: "Tools (17min)", phase: "0" },
  { id: "tools-4", text: "Power BI (Phase 2 Y1): Complete 1 lesson from Microsoft Learn Power BI path — build 1 visualization", category: "Tools (17min)", phase: "0" },
  { id: "tools-5", text: "SQL (Phase 2 Y1): Write 3 SQL queries (SELECT, JOIN, GROUP BY) on sample database from W3Schools/Mode Analytics", category: "Tools (17min)", phase: "0" },
  { id: "app-1", text: "Job Applications: Submit 1 application to target employer (bank/IB/mid-tier/Big4) — customize CV bullet points for that role", category: "Applications (17min)", phase: "0" },
  { id: "app-2", text: "LinkedIn Outreach: Send 2-3 connection requests with personalized notes to alumni/employees at target firms", category: "Applications (17min)", phase: "0" },
  { id: "app-3", text: "CV Refinement: Update 1 CV bullet with quantified achievement (e.g., 'Built financial model covering EGP 50M portfolio')", category: "Applications (17min)", phase: "0" },
  { id: "app-4", text: "Research Target Firm: Read 1 recent news article about target employer (e.g., EFG Hermes recent deal) — prepare 1 'why this firm' point", category: "Applications (17min)", phase: "0" },
  { id: "mock-1", text: "Technical Drill: Practice 1 technical question aloud (e.g., 'How does depreciation affect all 3 statements?') — time yourself, aim for 2-min answer", category: "Mock Interviews (17min)", phase: "0" },
  { id: "mock-2", text: "Behavioral Prep: Write/refine 1 STAR story for common question (e.g., 'Tell me about a time you handled pressure')", category: "Mock Interviews (17min)", phase: "0" },
  { id: "mock-3", text: "Mock Interview: Do 1 full mock interview (technical + behavioral) with friend/mentor/record yourself — get feedback", category: "Mock Interviews (17min)", phase: "0" },
  { id: "mock-4", text: "Numerical Reasoning: Complete 1 practice test (15-20 questions) from AssessmentDay/JobTestPrep — review incorrect answers", category: "Mock Interviews (17min)", phase: "0" },
  { id: "aware-1", text: "FT/Economist: Read 1 article — identify how it connects to ACCA topics (e.g., IFRS changes, corporate governance)", category: "Market Awareness (10min)", phase: "0" },
  { id: "aware-2", text: "Earnings Call: Listen to 1 quarterly earnings call (e.g., CIB, EFG Hermes) — note 2-3 key financial metrics discussed", category: "Market Awareness (10min)", phase: "0" },
  { id: "aware-3", text: "Company Deep Dive: Research 1 public company's latest annual report — identify 1 red flag or strength in financials", category: "Market Awareness (10min)", phase: "0" },
  { id: "meta-1", text: "Morning Review (5 min): Check today's plan, prioritize tasks, set 3 specific goals for the day", category: "Daily Review (10min)", phase: "0" },
  { id: "meta-2", text: "Evening Reflection (5 min): Log what you completed, what you learned, adjust tomorrow's plan if needed", category: "Daily Review (10min)", phase: "0" },
  { id: "health-1", text: "Exercise: 30 min physical activity (walk, gym, sports) — non-negotiable for mental clarity and stamina", category: "Health (30min)", phase: "0" },
  { id: "health-2", text: "Breaks: Take 5-min break every 50 min during study sessions (Pomodoro technique) — stretch, hydrate, rest eyes", category: "Health (30min)", phase: "0" },
];
