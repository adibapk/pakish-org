import type { Course, CourseCatalogMeta } from "./types";

export const COURSE_CATALOG_META: CourseCatalogMeta = {
  heroHeading: "Learn Modern Technology Skills. Build Your Future.",
  heroDescription:
    "Practical, project-based training in AI, Web Development, Cloud and Digital Skills. Learn online through Google Meet or get customized training at your location.",
  seo: {
    title: "IT, AI & Digital Skills Courses | Pakish Institute",
    description:
      "Explore practical AI, web development, cloud, WordPress and freelancing courses at Pakish Institute. Live Google Meet classes or customized on-site training.",
    keywords: [
      "Pakish Institute courses",
      "AI training Pakistan",
      "web development course",
      "cloud DevOps training",
      "WordPress WooCommerce course",
      "AI freelancing course",
    ],
  },
};

export const TRAINING_FORMAT = [
  {
    title: "Live Google Meet Classes",
    description: "Instructor-led sessions with real-time interaction and Q&A.",
  },
  {
    title: "Practical Assignments",
    description: "Hands-on tasks that reinforce each module with real tools.",
  },
  {
    title: "Screen Sharing",
    description: "Follow demos step-by-step and get live walkthroughs.",
  },
  {
    title: "Real Project Based Learning",
    description: "Build portfolio-ready work, not just theory slides.",
  },
  {
    title: "Support & Guidance",
    description: "Mentorship and feedback throughout your training journey.",
  },
] as const;

export const TRAINING_OPTIONS = [
  {
    title: "Online individual classes",
    description: "One-to-one sessions tailored to your pace and goals.",
  },
  {
    title: "Group sessions",
    description: "Learn with peers in a structured live cohort.",
  },
  {
    title: "Office / team training",
    description: "Train your team at your workplace or preferred location.",
  },
  {
    title: "Customized workshops",
    description: "Agenda, duration and depth aligned to your specific needs.",
  },
] as const;

export const PRICING_DISCLAIMER =
  "Training fees may vary depending on course duration, number of participants, training format and customization requirements.";

export const courses: Course[] = [
  {
    id: "course-ai-productivity",
    slug: "ai-productivity",
    title: "AI Productivity & Automation",
    shortTitle: "AI Productivity",
    category: "ai",
    level: "all-levels",
    duration: "4–6 weeks",
    isoDuration: "P6W",
    summary:
      "Learn how to use modern AI tools to improve productivity, automate daily tasks and work smarter.",
    overview: [
      "AI Productivity & Automation is a practical program for professionals, freelancers and learners who want measurable time savings from modern AI tools — without becoming a developer.",
      "You will learn how to use ChatGPT, Claude, Gemini and related productivity tools for research, writing, documents, email and light workflow automation, with responsible habits for accuracy and privacy.",
      "Sessions are live on Google Meet with screen sharing, assignments and a personal productivity system you can apply immediately at work or in freelance delivery.",
    ],
    learningOutcomes: [
      "Use ChatGPT, Claude and Gemini effectively for everyday work",
      "Write stronger prompts for research, drafting and rewriting",
      "Create documents, emails and business communication with AI assistance",
      "Build reusable productivity workflows and prompt templates",
      "Apply basic automation patterns to reduce repetitive tasks",
      "Verify AI output and work responsibly with sensitive information",
    ],
    whoShouldJoin: [
      "Professionals who want to work faster with AI tools",
      "Freelancers improving delivery speed and quality",
      "Students and beginners exploring practical Generative AI",
      "Team members looking to automate routine admin work",
      "Managers evaluating AI tools for personal productivity",
    ],
    tools: [
      "ChatGPT",
      "Claude",
      "Google Gemini",
      "Notion AI / docs assistants",
      "Browser AI extensions",
      "Basic automation helpers",
    ],
    curriculum: [
      {
        id: "ai-prod-m1",
        title: "Generative AI Foundations",
        description:
          "Understand how modern Generative AI works and set up a productive multi-tool workspace.",
        order: 1,
        estimatedHours: 6,
        lessons: [
          {
            id: "ai-prod-m1-l1",
            title: "Introduction to Generative AI",
            summary: "What LLMs can and cannot do for daily work.",
            order: 1,
            estimatedMinutes: 60,
          },
          {
            id: "ai-prod-m1-l2",
            title: "ChatGPT practical usage",
            summary: "Chats, custom instructions, and high-quality drafting workflows.",
            order: 2,
            estimatedMinutes: 75,
          },
          {
            id: "ai-prod-m1-l3",
            title: "Claude and Gemini workflows",
            summary: "When to switch tools and how to compare outputs.",
            order: 3,
            estimatedMinutes: 75,
          },
        ],
        assignments: [
          {
            id: "ai-prod-m1-a1",
            title: "Multi-tool workspace setup",
            description: "Configure ChatGPT, Claude and Gemini for a real work use case.",
            order: 1,
            submissionType: "checklist",
          },
        ],
      },
      {
        id: "ai-prod-m2",
        title: "Prompt Engineering & AI Research",
        description:
          "Learn structured prompting and reliable research techniques.",
        order: 2,
        estimatedHours: 6,
        lessons: [
          {
            id: "ai-prod-m2-l1",
            title: "Prompt engineering",
            summary: "Roles, constraints, examples and iterative refinement.",
            order: 1,
            estimatedMinutes: 90,
          },
          {
            id: "ai-prod-m2-l2",
            title: "AI research techniques",
            summary: "Sources, summaries, comparisons and fact-checking habits.",
            order: 2,
            estimatedMinutes: 75,
          },
        ],
        assignments: [
          {
            id: "ai-prod-m2-a1",
            title: "Prompt library starter pack",
            description: "Build 10 reusable prompts for your role.",
            order: 1,
            submissionType: "file",
          },
        ],
      },
      {
        id: "ai-prod-m3",
        title: "Documents & Business Communication",
        description:
          "Turn AI assistance into polished documents and professional communication.",
        order: 3,
        estimatedHours: 6,
        lessons: [
          {
            id: "ai-prod-m3-l1",
            title: "Document creation",
            summary: "Reports, briefs, SOPs and structured long-form drafts.",
            order: 1,
            estimatedMinutes: 75,
          },
          {
            id: "ai-prod-m3-l2",
            title: "Email and business communication",
            summary: "Clear emails, follow-ups, meeting notes and negotiation drafts.",
            order: 2,
            estimatedMinutes: 75,
          },
        ],
        assignments: [
          {
            id: "ai-prod-m3-a1",
            title: "Communication pack",
            description: "Produce one document and three professional emails with AI support.",
            order: 1,
            submissionType: "file",
          },
        ],
      },
      {
        id: "ai-prod-m4",
        title: "Productivity Tools & Workflow Automation",
        description:
          "Connect AI tools into daily systems and light automation.",
        order: 4,
        estimatedHours: 6,
        lessons: [
          {
            id: "ai-prod-m4-l1",
            title: "AI productivity tools",
            summary: "Assistants, templates and personal operating systems.",
            order: 1,
            estimatedMinutes: 75,
          },
          {
            id: "ai-prod-m4-l2",
            title: "Workflow automation basics",
            summary: "Reduce repetitive steps with simple, reliable automations.",
            order: 2,
            estimatedMinutes: 90,
          },
        ],
        assignments: [
          {
            id: "ai-prod-m4-a1",
            title: "Personal productivity system",
            description: "Document and demo one end-to-end AI-assisted workflow.",
            order: 1,
            submissionType: "link",
          },
        ],
      },
    ],
    faq: [
      {
        question: "Do I need coding experience for AI Productivity & Automation?",
        answer:
          "No. This course is designed for non-technical professionals and freelancers. You will use AI tools through normal chat and productivity interfaces.",
      },
      {
        question: "Which AI tools will we use?",
        answer:
          "You will practice with ChatGPT, Claude and Google Gemini, plus common productivity assistants. Exact tool access can be adjusted to what you already use at work.",
      },
      {
        question: "Is training only online?",
        answer:
          "Primary delivery is live Google Meet classes. We also offer online individual classes, group sessions, office/team training and customized workshops.",
      },
      {
        question: "How is the fee decided?",
        answer:
          "Fees start from PKR 40,000 and depend on duration, participants, format and customization. Contact us for an exact quotation.",
      },
    ],
    pricing: {
      mode: "starting-from",
      displayLabel: "Starting from PKR 40,000",
      startingAmount: 40000,
      currency: "PKR",
      note: "Final fee depends on training format, duration and customization.",
    },
    seo: {
      title: "AI Productivity & Automation Course | Pakish Institute",
      description:
        "Learn ChatGPT, Claude and Gemini for productivity, research, documents and workflow automation. Live Google Meet or customized training in Pakistan.",
      keywords: [
        "AI productivity course",
        "AI automation training Pakistan",
        "ChatGPT productivity course",
        "Claude Gemini training",
        "prompt engineering course Pakistan",
      ],
      ogImage: "/og/courses-ai-productivity.png",
      ogTitle: "AI Productivity & Automation | Pakish Institute",
      ogDescription:
        "Practical Generative AI training for faster research, writing and everyday workflow automation.",
    },
    integrations: {
      lmsCourseId: "lms-ai-productivity",
      aiTutorId: "tutor-ai-productivity",
    },
    updatedAt: "2026-09-25",
    published: true,
    order: 1,
  },
  {
    id: "course-ai-business",
    slug: "ai-business",
    title: "AI for Business & Workplace Automation",
    shortTitle: "AI for Business",
    category: "business",
    level: "all-levels",
    duration: "Custom (2–8 weeks)",
    isoDuration: "P4W",
    summary:
      "Customized AI training for companies and teams to improve workflow, productivity and business processes.",
    overview: [
      "AI for Business & Workplace Automation helps organizations adopt AI in a practical, controlled way — focused on real processes, not hype.",
      "We map your team's workflows, train employees on AI assistants and document automation, and design department-specific playbooks for marketing, operations, support and admin teams.",
      "Delivery is customized: online workshops, group sessions or on-site office training with examples tailored to your tools and policies.",
    ],
    learningOutcomes: [
      "Identify high-ROI AI adoption opportunities across the organization",
      "Improve employee productivity with practical AI assistant workflows",
      "Automate documents, reports and recurring admin tasks",
      "Design safer customer support and internal communication workflows",
      "Build department-specific AI use cases and rollout playbooks",
      "Define a customized company training approach with clear next steps",
    ],
    whoShouldJoin: [
      "Business owners and department managers",
      "Operations, admin and HR teams",
      "Marketing, sales and customer support teams",
      "Companies planning structured AI upskilling",
      "Agencies training client-facing delivery teams",
    ],
    tools: [
      "ChatGPT / Team workspaces",
      "Claude",
      "Google Gemini",
      "Microsoft Copilot / Google Workspace AI",
      "Document and spreadsheet assistants",
      "Internal knowledge / SOP templates",
    ],
    curriculum: [
      {
        id: "ai-biz-m1",
        title: "AI Adoption in Organizations",
        description:
          "Build a shared foundation for responsible workplace AI adoption.",
        order: 1,
        estimatedHours: 5,
        lessons: [
          {
            id: "ai-biz-m1-l1",
            title: "AI adoption in organizations",
            summary: "Strategy, readiness and realistic expectations.",
            order: 1,
            estimatedMinutes: 60,
          },
          {
            id: "ai-biz-m1-l2",
            title: "Employee productivity workflows",
            summary: "High-impact daily tasks across common roles.",
            order: 2,
            estimatedMinutes: 75,
          },
        ],
        assignments: [
          {
            id: "ai-biz-m1-a1",
            title: "Opportunity map",
            description: "List 5 priority AI use cases for your team.",
            order: 1,
            submissionType: "file",
          },
        ],
      },
      {
        id: "ai-biz-m2",
        title: "AI Assistants & Document Automation",
        order: 2,
        estimatedHours: 6,
        lessons: [
          {
            id: "ai-biz-m2-l1",
            title: "AI assistants",
            summary: "Team standards for prompting, review and handoff.",
            order: 1,
            estimatedMinutes: 75,
          },
          {
            id: "ai-biz-m2-l2",
            title: "Document automation",
            summary: "Reports, SOPs, proposals and recurring templates.",
            order: 2,
            estimatedMinutes: 75,
          },
        ],
        assignments: [
          {
            id: "ai-biz-m2-a1",
            title: "Document automation pack",
            description: "Create one reusable document workflow for your department.",
            order: 1,
            submissionType: "file",
          },
        ],
      },
      {
        id: "ai-biz-m3",
        title: "Support & Business Process Improvement",
        order: 3,
        estimatedHours: 6,
        lessons: [
          {
            id: "ai-biz-m3-l1",
            title: "Customer support workflows",
            summary: "Faster replies with quality control and escalation rules.",
            order: 1,
            estimatedMinutes: 75,
          },
          {
            id: "ai-biz-m3-l2",
            title: "Business process improvement",
            summary: "Reduce friction in recurring internal processes.",
            order: 2,
            estimatedMinutes: 75,
          },
        ],
        assignments: [
          {
            id: "ai-biz-m3-a1",
            title: "Process improvement brief",
            description: "Redesign one support or operations process with AI assistance.",
            order: 1,
            submissionType: "text",
          },
        ],
      },
      {
        id: "ai-biz-m4",
        title: "Department Use Cases & Custom Training",
        order: 4,
        estimatedHours: 5,
        lessons: [
          {
            id: "ai-biz-m4-l1",
            title: "Department-specific AI use cases",
            summary: "Marketing, sales, finance, HR and operations examples.",
            order: 1,
            estimatedMinutes: 75,
          },
          {
            id: "ai-biz-m4-l2",
            title: "Customized company training approach",
            summary: "Rollout plan, policy notes and ongoing enablement.",
            order: 2,
            estimatedMinutes: 60,
          },
        ],
        assignments: [
          {
            id: "ai-biz-m4-a1",
            title: "Team rollout playbook",
            description: "Draft an internal AI usage playbook for your organization.",
            order: 1,
            submissionType: "file",
          },
        ],
      },
    ],
    faq: [
      {
        question: "Can this training be customized for our company?",
        answer:
          "Yes. This is a customized training package. We adapt agenda, examples, duration and delivery format to your tools, departments and policies.",
      },
      {
        question: "Do you train teams on-site?",
        answer:
          "Yes. Training is available through online individual classes, group sessions, office/team training and customized workshops.",
      },
      {
        question: "Is there a fixed fee?",
        answer:
          "No fixed public price. Contact us for a customized training plan and quotation based on participants, duration and scope.",
      },
      {
        question: "Which departments benefit most?",
        answer:
          "Operations, admin, customer support, marketing, sales and management teams typically see the fastest productivity gains.",
      },
    ],
    pricing: {
      mode: "custom-quote",
      displayLabel: "Customized Training Package",
      note: "Contact us for a customized training plan and quotation.",
    },
    seo: {
      title: "AI for Business & Workplace Automation | Pakish Institute",
      description:
        "Customized corporate AI training for teams in Pakistan. Improve employee productivity, document automation, support workflows and business processes.",
      keywords: [
        "corporate AI training Pakistan",
        "workplace AI automation",
        "business AI course",
        "AI for companies Pakistan",
        "team AI upskilling",
      ],
      ogImage: "/og/courses-ai-business.png",
      ogTitle: "AI for Business & Workplace Automation",
      ogDescription:
        "Customized AI training packages for companies and teams — productivity, automation and process improvement.",
    },
    integrations: {
      lmsCourseId: "lms-ai-business",
      aiTutorId: "tutor-ai-business",
    },
    updatedAt: "2026-09-25",
    published: true,
    order: 2,
  },
  {
    id: "course-full-stack-ai",
    slug: "full-stack-ai-development",
    title: "Modern Full Stack Web Development with AI",
    shortTitle: "Full Stack + AI",
    category: "web-development",
    level: "beginner",
    duration: "12–16 weeks",
    isoDuration: "P16W",
    summary:
      "Learn modern web development with latest technologies and AI-powered development tools.",
    overview: [
      "Modern Full Stack Web Development with AI takes you from web fundamentals to shipping real applications — using React, Next.js and AI coding assistants to accelerate learning.",
      "You will practice HTML/CSS, JavaScript, TypeScript, APIs, database basics and deployment while building portfolio projects with professional workflows.",
      "The course is project-based: live Google Meet classes, screen sharing, assignments and mentor guidance so you leave with work you can show employers or clients.",
    ],
    learningOutcomes: [
      "Build responsive websites with HTML, CSS and JavaScript",
      "Write cleaner application code with TypeScript",
      "Create interactive interfaces with React",
      "Build and deploy applications with Next.js",
      "Connect APIs and understand database basics",
      "Use AI coding assistants responsibly for faster development",
      "Deliver a real project with version control and deployment",
    ],
    whoShouldJoin: [
      "Beginners aiming for a web development career",
      "Career switchers entering tech",
      "Freelancers who want to offer modern web services",
      "Students who want AI-assisted coding skills",
      "Junior developers strengthening full stack fundamentals",
    ],
    tools: [
      "VS Code / Cursor",
      "HTML, CSS, JavaScript",
      "TypeScript",
      "React",
      "Next.js",
      "Git & GitHub",
      "AI coding assistants (Cursor / Copilot)",
      "Vercel or similar hosting",
    ],
    curriculum: [
      {
        id: "fs-m1",
        title: "Web Fundamentals",
        description: "Core building blocks of the modern web.",
        order: 1,
        estimatedHours: 20,
        lessons: [
          {
            id: "fs-m1-l1",
            title: "Web fundamentals",
            summary: "How the browser, servers and the web fit together.",
            order: 1,
            estimatedMinutes: 60,
          },
          {
            id: "fs-m1-l2",
            title: "HTML / CSS",
            summary: "Semantic markup, layouts and responsive design.",
            order: 2,
            estimatedMinutes: 150,
          },
          {
            id: "fs-m1-l3",
            title: "JavaScript",
            summary: "Variables, functions, DOM and async basics.",
            order: 3,
            estimatedMinutes: 180,
          },
        ],
        assignments: [
          {
            id: "fs-m1-a1",
            title: "Responsive landing page",
            description: "Build a multi-section responsive page from scratch.",
            order: 1,
            submissionType: "link",
          },
        ],
      },
      {
        id: "fs-m2",
        title: "TypeScript & React",
        order: 2,
        estimatedHours: 24,
        lessons: [
          {
            id: "fs-m2-l1",
            title: "TypeScript",
            summary: "Types, interfaces and safer application structure.",
            order: 1,
            estimatedMinutes: 120,
          },
          {
            id: "fs-m2-l2",
            title: "React",
            summary: "Components, state, props and reusable UI patterns.",
            order: 2,
            estimatedMinutes: 180,
          },
        ],
        assignments: [
          {
            id: "fs-m2-a1",
            title: "Interactive React app",
            description: "Build a small React app with typed components.",
            order: 1,
            submissionType: "link",
          },
        ],
      },
      {
        id: "fs-m3",
        title: "Next.js, APIs & Data",
        order: 3,
        estimatedHours: 24,
        lessons: [
          {
            id: "fs-m3-l1",
            title: "Next.js",
            summary: "Routing, rendering patterns and app structure.",
            order: 1,
            estimatedMinutes: 180,
          },
          {
            id: "fs-m3-l2",
            title: "APIs",
            summary: "Fetching data, forms and server/client boundaries.",
            order: 2,
            estimatedMinutes: 120,
          },
          {
            id: "fs-m3-l3",
            title: "Database basics",
            summary: "Models, CRUD concepts and connecting app data.",
            order: 3,
            estimatedMinutes: 120,
          },
        ],
        assignments: [
          {
            id: "fs-m3-a1",
            title: "Full stack feature",
            description: "Implement a feature with API + data persistence.",
            order: 1,
            submissionType: "link",
          },
        ],
      },
      {
        id: "fs-m4",
        title: "Deployment, AI Assistants & Real Projects",
        order: 4,
        estimatedHours: 20,
        lessons: [
          {
            id: "fs-m4-l1",
            title: "Deployment",
            summary: "Ship a live project with environment basics.",
            order: 1,
            estimatedMinutes: 90,
          },
          {
            id: "fs-m4-l2",
            title: "AI coding assistants",
            summary: "Use Cursor/Copilot for speed without losing understanding.",
            order: 2,
            estimatedMinutes: 90,
          },
          {
            id: "fs-m4-l3",
            title: "Real project development",
            summary: "Plan, build and present a portfolio-ready application.",
            order: 3,
            estimatedMinutes: 180,
          },
        ],
        assignments: [
          {
            id: "fs-m4-a1",
            title: "Capstone web project",
            description: "Deploy and present a complete portfolio project.",
            order: 1,
            submissionType: "link",
          },
        ],
      },
    ],
    faq: [
      {
        question: "Is this suitable for complete beginners?",
        answer:
          "Yes. We start from web fundamentals and progress to React, Next.js and deployment. Consistency and practice matter more than prior coding experience.",
      },
      {
        question: "Will we use AI coding tools?",
        answer:
          "Yes. You will learn to use AI coding assistants such as Cursor or Copilot to accelerate development while still understanding the code you ship.",
      },
      {
        question: "What project will I build?",
        answer:
          "You will complete stepwise assignments and a capstone real project suitable for a portfolio or client demo.",
      },
      {
        question: "How flexible is the schedule?",
        answer:
          "Duration is typically 12–16 weeks depending on pace and format. Individual, group and customized options are available.",
      },
    ],
    pricing: {
      mode: "starting-from",
      displayLabel: "Starting from PKR 90,000",
      startingAmount: 90000,
      currency: "PKR",
      note: "Fee may vary depending on course duration and training format.",
    },
    seo: {
      title: "Full Stack Web Development with AI Course | Pakish Institute",
      description:
        "Learn HTML, CSS, JavaScript, TypeScript, React, Next.js, APIs and deployment with AI coding assistants. Project-based training at Pakish Institute.",
      keywords: [
        "full stack web development course",
        "Next.js course Pakistan",
        "React TypeScript training",
        "AI web development course",
        "learn coding with AI Pakistan",
      ],
      ogImage: "/og/courses-full-stack-ai-development.png",
      ogTitle: "Modern Full Stack Web Development with AI",
      ogDescription:
        "From web fundamentals to Next.js projects — accelerated with AI coding assistants.",
    },
    integrations: {
      lmsCourseId: "lms-full-stack-ai",
      aiTutorId: "tutor-full-stack-ai",
    },
    updatedAt: "2026-09-25",
    published: true,
    order: 3,
  },
  {
    id: "course-wordpress-woocommerce",
    slug: "wordpress-woocommerce",
    title: "Professional WordPress & WooCommerce Development",
    shortTitle: "WordPress & WooCommerce",
    category: "web-development",
    level: "beginner",
    duration: "6–8 weeks",
    isoDuration: "P8W",
    summary:
      "Learn how to create professional business websites and e-commerce stores.",
    overview: [
      "Professional WordPress & WooCommerce Development teaches you to build, customize and deliver business websites and online stores that clients can actually use.",
      "You will cover WordPress fundamentals, theme customization, plugins, security, performance, WooCommerce setup, payments and the practical workflow of client projects.",
      "Training is hands-on with live demos, assignments and a business or store project you can add to your portfolio.",
    ],
    learningOutcomes: [
      "Set up and manage WordPress sites confidently",
      "Customize themes and essential plugins for business needs",
      "Improve website security and performance",
      "Build WooCommerce stores with products and checkout flows",
      "Configure payments and store essentials",
      "Deliver client-ready business websites with clear handover",
    ],
    whoShouldJoin: [
      "Beginners starting a web freelancing career",
      "Business owners managing their own websites",
      "Marketers who need WordPress and store skills",
      "Agency juniors handling client site delivery",
      "Anyone building service or product websites",
    ],
    tools: [
      "WordPress",
      "Popular page builders / block editor",
      "Essential plugins",
      "WooCommerce",
      "Payment gateways overview",
      "Hosting / staging environments",
    ],
    curriculum: [
      {
        id: "wp-m1",
        title: "WordPress Fundamentals",
        order: 1,
        estimatedHours: 10,
        lessons: [
          {
            id: "wp-m1-l1",
            title: "WordPress fundamentals",
            summary: "Installation, dashboard, posts, pages and media.",
            order: 1,
            estimatedMinutes: 120,
          },
          {
            id: "wp-m1-l2",
            title: "Theme customization",
            summary: "Themes, menus, widgets and brand-ready layouts.",
            order: 2,
            estimatedMinutes: 120,
          },
        ],
        assignments: [
          {
            id: "wp-m1-a1",
            title: "Business site skeleton",
            description: "Create a multi-page WordPress business site structure.",
            order: 1,
            submissionType: "link",
          },
        ],
      },
      {
        id: "wp-m2",
        title: "Plugins, Security & Performance",
        order: 2,
        estimatedHours: 10,
        lessons: [
          {
            id: "wp-m2-l1",
            title: "Plugins",
            summary: "Forms, SEO, caching and must-have extensions.",
            order: 1,
            estimatedMinutes: 90,
          },
          {
            id: "wp-m2-l2",
            title: "Website security",
            summary: "Hardening basics, updates and access control.",
            order: 2,
            estimatedMinutes: 75,
          },
          {
            id: "wp-m2-l3",
            title: "Performance optimization",
            summary: "Speed, images, caching and Core Web Vitals habits.",
            order: 3,
            estimatedMinutes: 75,
          },
        ],
        assignments: [
          {
            id: "wp-m2-a1",
            title: "Secure & optimize a site",
            description: "Apply security and performance checklist to a demo site.",
            order: 1,
            submissionType: "checklist",
          },
        ],
      },
      {
        id: "wp-m3",
        title: "WooCommerce Stores & Payments",
        order: 3,
        estimatedHours: 12,
        lessons: [
          {
            id: "wp-m3-l1",
            title: "WooCommerce stores",
            summary: "Products, categories, cart and checkout setup.",
            order: 1,
            estimatedMinutes: 150,
          },
          {
            id: "wp-m3-l2",
            title: "Payments",
            summary: "Payment options, order flow and store configuration.",
            order: 2,
            estimatedMinutes: 90,
          },
        ],
        assignments: [
          {
            id: "wp-m3-a1",
            title: "Demo store build",
            description: "Launch a small WooCommerce catalog with checkout configured.",
            order: 1,
            submissionType: "link",
          },
        ],
      },
      {
        id: "wp-m4",
        title: "Business Websites & Client Projects",
        order: 4,
        estimatedHours: 10,
        lessons: [
          {
            id: "wp-m4-l1",
            title: "Business websites",
            summary: "Service pages, CTAs and conversion-focused structure.",
            order: 1,
            estimatedMinutes: 90,
          },
          {
            id: "wp-m4-l2",
            title: "Client projects",
            summary: "Scoping, revisions, handover and maintenance basics.",
            order: 2,
            estimatedMinutes: 90,
          },
        ],
        assignments: [
          {
            id: "wp-m4-a1",
            title: "Client-ready project",
            description: "Deliver a polished business or store site with handover notes.",
            order: 1,
            submissionType: "file",
          },
        ],
      },
    ],
    faq: [
      {
        question: "Do I need design or coding skills first?",
        answer:
          "No. We start from WordPress fundamentals. Basic computer comfort is enough to begin.",
      },
      {
        question: "Will I learn e-commerce as well?",
        answer:
          "Yes. WooCommerce stores, products, checkout and payments are included in the curriculum.",
      },
      {
        question: "Can this help me freelancing?",
        answer:
          "Yes. The course emphasizes business websites and client project delivery so you can offer WordPress services professionally.",
      },
      {
        question: "What is the typical duration?",
        answer:
          "Most learners complete the program in about 6–8 weeks depending on schedule and training format.",
      },
    ],
    pricing: {
      mode: "starting-from",
      displayLabel: "Starting from PKR 50,000",
      startingAmount: 50000,
      currency: "PKR",
    },
    seo: {
      title: "WordPress & WooCommerce Development Course | Pakish Institute",
      description:
        "Learn WordPress, theme customization, plugins, security, performance and WooCommerce stores. Practical training for business websites and client projects.",
      keywords: [
        "WordPress course Pakistan",
        "WooCommerce training",
        "e-commerce website course",
        "WordPress freelancing course",
        "business website development training",
      ],
      ogImage: "/og/courses-wordpress-woocommerce.png",
      ogTitle: "Professional WordPress & WooCommerce Development",
      ogDescription:
        "Build business websites and WooCommerce stores with practical, client-ready skills.",
    },
    integrations: {
      lmsCourseId: "lms-wordpress-woocommerce",
      aiTutorId: "tutor-wordpress-woocommerce",
    },
    updatedAt: "2026-09-25",
    published: true,
    order: 4,
  },
  {
    id: "course-cloud-devops",
    slug: "cloud-devops",
    title: "Cloud, Servers & DevOps Fundamentals",
    shortTitle: "Cloud & DevOps",
    category: "cloud",
    level: "intermediate",
    duration: "8–10 weeks",
    isoDuration: "P10W",
    summary:
      "Learn Linux, cloud infrastructure, VPS management, deployment and server administration.",
    overview: [
      "Cloud, Servers & DevOps Fundamentals gives you practical skills to manage Linux servers, VPS environments and cloud deployments used by modern teams.",
      "You will learn domains and DNS, SSL, backups, security basics, cloud platform concepts and troubleshooting — with real demos on live infrastructure patterns.",
      "Ideal for developers, IT learners and freelancers who need to host and operate applications confidently.",
    ],
    learningOutcomes: [
      "Use Linux fundamentals for day-to-day server work",
      "Manage VPS environments and basic cloud resources",
      "Deploy applications to servers with repeatable steps",
      "Configure domains, DNS and SSL correctly",
      "Implement backups and foundational security practices",
      "Troubleshoot common cloud and server issues",
    ],
    whoShouldJoin: [
      "Developers who want deployment and server skills",
      "IT support learners moving into cloud roles",
      "Freelancers hosting client applications",
      "Teams needing practical DevOps fundamentals",
      "Students preparing for junior cloud / ops roles",
    ],
    tools: [
      "Linux (Ubuntu-focused)",
      "SSH & terminal tooling",
      "VPS providers",
      "Nginx / reverse proxy basics",
      "DNS & SSL tooling",
      "Cloud platform consoles",
      "Backup utilities",
    ],
    curriculum: [
      {
        id: "cloud-m1",
        title: "Linux Fundamentals",
        order: 1,
        estimatedHours: 12,
        lessons: [
          {
            id: "cloud-m1-l1",
            title: "Linux fundamentals",
            summary: "Filesystem, users, permissions and essential commands.",
            order: 1,
            estimatedMinutes: 150,
          },
          {
            id: "cloud-m1-l2",
            title: "VPS management",
            summary: "Provisioning, SSH access and basic service management.",
            order: 2,
            estimatedMinutes: 120,
          },
        ],
        assignments: [
          {
            id: "cloud-m1-a1",
            title: "First VPS setup",
            description: "Secure a fresh VPS with users, SSH and baseline packages.",
            order: 1,
            submissionType: "checklist",
          },
        ],
      },
      {
        id: "cloud-m2",
        title: "Cloud Concepts & Server Deployment",
        order: 2,
        estimatedHours: 12,
        lessons: [
          {
            id: "cloud-m2-l1",
            title: "Cloud concepts",
            summary: "Regions, compute, storage and networking mental models.",
            order: 1,
            estimatedMinutes: 90,
          },
          {
            id: "cloud-m2-l2",
            title: "Server deployment",
            summary: "Deploy and reverse-proxy a web application.",
            order: 2,
            estimatedMinutes: 150,
          },
        ],
        assignments: [
          {
            id: "cloud-m2-a1",
            title: "Deploy an application",
            description: "Ship a sample app to a VPS with a working public URL.",
            order: 1,
            submissionType: "link",
          },
        ],
      },
      {
        id: "cloud-m3",
        title: "Domains, SSL, Backups & Security",
        order: 3,
        estimatedHours: 12,
        lessons: [
          {
            id: "cloud-m3-l1",
            title: "Domains and DNS",
            summary: "Records, cutovers and common misconfiguration fixes.",
            order: 1,
            estimatedMinutes: 90,
          },
          {
            id: "cloud-m3-l2",
            title: "SSL",
            summary: "Certificates, HTTPS and renewal basics.",
            order: 2,
            estimatedMinutes: 60,
          },
          {
            id: "cloud-m3-l3",
            title: "Backups",
            summary: "What to back up, restore drills and retention habits.",
            order: 3,
            estimatedMinutes: 60,
          },
          {
            id: "cloud-m3-l4",
            title: "Security basics",
            summary: "Firewalls, updates, access control and hardening checklist.",
            order: 4,
            estimatedMinutes: 90,
          },
        ],
        assignments: [
          {
            id: "cloud-m3-a1",
            title: "Hardening & backup checklist",
            description: "Apply DNS/SSL, backup and security baseline to your VPS.",
            order: 1,
            submissionType: "checklist",
          },
        ],
      },
      {
        id: "cloud-m4",
        title: "Cloud Platforms & Troubleshooting",
        order: 4,
        estimatedHours: 10,
        lessons: [
          {
            id: "cloud-m4-l1",
            title: "Cloud platforms",
            summary: "Comparing practical options and operational trade-offs.",
            order: 1,
            estimatedMinutes: 90,
          },
          {
            id: "cloud-m4-l2",
            title: "Troubleshooting",
            summary: "Logs, common failures and systematic debugging.",
            order: 2,
            estimatedMinutes: 120,
          },
        ],
        assignments: [
          {
            id: "cloud-m4-a1",
            title: "Incident troubleshooting lab",
            description: "Diagnose and document a simulated production issue.",
            order: 1,
            submissionType: "text",
          },
        ],
      },
    ],
    faq: [
      {
        question: "Is this beginner-friendly?",
        answer:
          "It is best for learners with basic computer comfort who are ready for intermediate technical work. Absolute beginners in web development may prefer starting with a web course first.",
      },
      {
        question: "Will I get hands-on server practice?",
        answer:
          "Yes. The curriculum is practical: VPS management, deployment, DNS, SSL, backups and troubleshooting using real workflows.",
      },
      {
        question: "Which cloud platforms are covered?",
        answer:
          "We focus on transferable cloud concepts and VPS workflows, then compare common cloud platforms so skills apply across providers.",
      },
      {
        question: "Can teams take this as office training?",
        answer:
          "Yes. Delivery options include online individual classes, group sessions, office/team training and customized workshops.",
      },
    ],
    pricing: {
      mode: "starting-from",
      displayLabel: "Starting from PKR 75,000",
      startingAmount: 75000,
      currency: "PKR",
    },
    seo: {
      title: "Cloud, Servers & DevOps Fundamentals Course | Pakish Institute",
      description:
        "Learn Linux, VPS management, cloud concepts, deployment, DNS, SSL, backups, security and troubleshooting with practical training at Pakish Institute.",
      keywords: [
        "DevOps course Pakistan",
        "Linux cloud training",
        "VPS management course",
        "server administration training",
        "DNS SSL deployment course",
      ],
      ogImage: "/og/courses-cloud-devops.png",
      ogTitle: "Cloud, Servers & DevOps Fundamentals",
      ogDescription:
        "Practical Linux, VPS, deployment, DNS, SSL and cloud operations training.",
    },
    integrations: {
      lmsCourseId: "lms-cloud-devops",
      aiTutorId: "tutor-cloud-devops",
    },
    updatedAt: "2026-09-25",
    published: true,
    order: 5,
  },
  {
    id: "course-ai-freelancing",
    slug: "ai-freelancing",
    title: "AI-Powered Freelancing Career",
    shortTitle: "AI Freelancing",
    category: "freelancing",
    level: "beginner",
    duration: "4–6 weeks",
    isoDuration: "P6W",
    summary:
      "Learn how to use AI tools to deliver professional services and build a digital career.",
    overview: [
      "AI-Powered Freelancing Career helps you launch or upgrade a digital freelance practice by combining freelancing fundamentals with AI-assisted service delivery.",
      "You will practice finding opportunities, writing proposals, communicating with clients, building a portfolio and handling real-world projects — with AI tools that improve speed and quality.",
      "The goal is practical: leave with a service offer, samples and a repeatable productivity workflow you can use for paid work.",
    ],
    learningOutcomes: [
      "Understand freelancing fundamentals and safer client workflows",
      "Find relevant opportunities and position a clear service offer",
      "Deliver work faster with AI-assisted production workflows",
      "Write stronger proposals and client communication",
      "Create a starter portfolio that supports outreach",
      "Handle scoping, revisions and delivery for real projects",
    ],
    whoShouldJoin: [
      "Beginners starting a digital freelancing career",
      "Professionals seeking side-income skills",
      "Students building remote work readiness",
      "Service providers who want AI-accelerated delivery",
      "Career switchers exploring online work options",
    ],
    tools: [
      "ChatGPT / Claude / Gemini",
      "Canva or similar design tools",
      "Freelance platforms overview",
      "Proposal and CRM templates",
      "Portfolio site / Notion portfolio",
      "Productivity and task trackers",
    ],
    curriculum: [
      {
        id: "fl-m1",
        title: "Freelancing Foundations & Opportunities",
        order: 1,
        estimatedHours: 8,
        lessons: [
          {
            id: "fl-m1-l1",
            title: "Freelancing fundamentals",
            summary: "Services, niches, pricing mindset and professional basics.",
            order: 1,
            estimatedMinutes: 90,
          },
          {
            id: "fl-m1-l2",
            title: "Finding opportunities",
            summary: "Platforms, outreach channels and opportunity filtering.",
            order: 2,
            estimatedMinutes: 90,
          },
        ],
        assignments: [
          {
            id: "fl-m1-a1",
            title: "Service offer one-pager",
            description: "Define your niche, offer and starter pricing range.",
            order: 1,
            submissionType: "file",
          },
        ],
      },
      {
        id: "fl-m2",
        title: "AI Delivery & Client Communication",
        order: 2,
        estimatedHours: 8,
        lessons: [
          {
            id: "fl-m2-l1",
            title: "AI-assisted service delivery",
            summary: "Production workflows with quality control.",
            order: 1,
            estimatedMinutes: 90,
          },
          {
            id: "fl-m2-l2",
            title: "Client communication",
            summary: "Updates, expectations, revisions and professional tone.",
            order: 2,
            estimatedMinutes: 75,
          },
        ],
        assignments: [
          {
            id: "fl-m2-a1",
            title: "Delivery workflow demo",
            description: "Document an AI-assisted delivery process for one service.",
            order: 1,
            submissionType: "text",
          },
        ],
      },
      {
        id: "fl-m3",
        title: "Proposals & Portfolio Creation",
        order: 3,
        estimatedHours: 8,
        lessons: [
          {
            id: "fl-m3-l1",
            title: "Proposal writing",
            summary: "Winning structure, personalization and clear next steps.",
            order: 1,
            estimatedMinutes: 90,
          },
          {
            id: "fl-m3-l2",
            title: "Portfolio creation",
            summary: "Samples, case-study framing and profile presentation.",
            order: 2,
            estimatedMinutes: 90,
          },
        ],
        assignments: [
          {
            id: "fl-m3-a1",
            title: "Proposal + portfolio pack",
            description: "Write one proposal template and publish three portfolio samples.",
            order: 1,
            submissionType: "link",
          },
        ],
      },
      {
        id: "fl-m4",
        title: "Productivity & Real-World Projects",
        order: 4,
        estimatedHours: 8,
        lessons: [
          {
            id: "fl-m4-l1",
            title: "Productivity workflows",
            summary: "Task systems, templates and delivery calendars.",
            order: 1,
            estimatedMinutes: 75,
          },
          {
            id: "fl-m4-l2",
            title: "Real-world project handling",
            summary: "Scoping, milestones, revisions and handover.",
            order: 2,
            estimatedMinutes: 90,
          },
        ],
        assignments: [
          {
            id: "fl-m4-a1",
            title: "Capstone client simulation",
            description: "Complete a simulated client project from brief to delivery.",
            order: 1,
            submissionType: "file",
          },
        ],
      },
    ],
    faq: [
      {
        question: "Can beginners join without freelancing experience?",
        answer:
          "Yes. The course starts with freelancing fundamentals and builds toward proposals, portfolio work and project handling.",
      },
      {
        question: "Will AI replace the need for skills?",
        answer:
          "No. AI helps you deliver faster, but clients still hire for clear communication, quality control and reliable delivery — which this course emphasizes.",
      },
      {
        question: "Do you help with portfolio creation?",
        answer:
          "Yes. Portfolio creation is a dedicated part of the curriculum, including samples and presentation for outreach.",
      },
      {
        question: "How long does the course take?",
        answer:
          "Typical duration is 4–6 weeks depending on pace and whether you choose individual, group or customized training.",
      },
    ],
    pricing: {
      mode: "starting-from",
      displayLabel: "Starting from PKR 50,000",
      startingAmount: 50000,
      currency: "PKR",
    },
    seo: {
      title: "AI-Powered Freelancing Career Course | Pakish Institute",
      description:
        "Learn freelancing fundamentals, AI-assisted delivery, proposals, portfolio creation and real project handling. Practical digital career training at Pakish Institute.",
      keywords: [
        "AI freelancing course",
        "digital freelancing Pakistan",
        "AI career training",
        "freelance proposal writing course",
        "portfolio building for freelancers",
      ],
      ogImage: "/og/courses-ai-freelancing.png",
      ogTitle: "AI-Powered Freelancing Career",
      ogDescription:
        "Build freelance services, proposals and portfolios with AI-assisted delivery workflows.",
    },
    integrations: {
      lmsCourseId: "lms-ai-freelancing",
      aiTutorId: "tutor-ai-freelancing",
    },
    updatedAt: "2026-09-25",
    published: true,
    order: 6,
  },
];
