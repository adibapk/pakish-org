import type { Course } from "./types";

export const businessEnglishCourse: Course = {
  id: "course-business-english",
  slug: "business-english-professional-communication",
  title: "Business English & Professional Communication",
  shortTitle: "Business English",
  category: "business",
  level: "all-levels",
  duration: "Consultation-led (1 day to 3 months)",
  durationMode: "consultation-led",
  catalogueGroup: "professional-skills",
  showOnHomepageFeatured: false,
  toolsSectionLabel: "Skills & Practice Areas",
  summary:
    "Build the confidence to speak clearly, write professionally, and communicate effectively at work through a practical program tailored to your level and goals.",
  overview: [
    "Business English & Professional Communication is a practical professional-skills program for university students, job seekers, employees, entrepreneurs, and client-facing team members who need stronger spoken and written English for real workplace situations.",
    "The focus is balanced communication — not grammar theory alone. You will practise meetings, interviews, presentations, emails, customer introductions, supplier correspondence, and short professional documents in contexts that match your career goals.",
    "Admission begins through Pakish Institute's normal form. Our team arranges an initial needs-assessment conversation, and selected learners may consult with Irfan Velmi before the recommended format, level, duration, schedule, delivery mode, and fee are confirmed.",
    "One-day awareness workshops, one-month courses, and three-month frameworks are possible starting points — not a promise that every format is always scheduled. IELTS-oriented preparation can be discussed and customized after assessment.",
  ],
  learningOutcomes: [
    "Communicate more clearly and confidently in workplace and professional situations",
    "Organize ideas for prepared and extempore speaking",
    "Write clearer professional emails, letters, applications, and short business documents",
    "Prepare for interviews and introduce professional experience effectively",
    "Improve presentation delivery, listening, body language, posture, and eye contact",
    "Adapt tone and vocabulary for customers, colleagues, suppliers, and managers",
    "Build sustainable reading, vocabulary, editing, and self-correction habits",
    "Understand practical next steps for an IELTS preparation plan when that is your goal",
  ],
  whoShouldJoin: [
    "University students and graduates preparing for professional life",
    "Job seekers preparing for interviews and workplace communication",
    "Employees who write emails or participate in meetings",
    "Entrepreneurs, self-employed professionals, and business owners",
    "Sales, customer-service, and client-facing team members",
    "Learners seeking a customized IELTS preparation discussion after assessment",
  ],
  tools: [
    "Spoken English practice",
    "Professional email writing",
    "Interview preparation",
    "Presentation skills",
    "CV and application language",
    "Customer and supplier correspondence",
    "Meeting communication",
    "IELTS preparation planning",
  ],
  curriculum: [
    {
      id: "be-m1",
      title: "English Foundations & Needs Assessment",
      description:
        "Establish your current level, goals, and a realistic learning plan.",
      order: 1,
      lessons: [
        {
          id: "be-m1-l1",
          title: "Current-level assessment",
          summary: "Speaking, writing, and comprehension baseline.",
          order: 1,
        },
        {
          id: "be-m1-l2",
          title: "Practical grammar and sentence clarity",
          summary: "Grammar applied to real messages, not isolated drills.",
          order: 2,
        },
        {
          id: "be-m1-l3",
          title: "Vocabulary and reading habits",
          summary: "Build sustainable professional vocabulary routines.",
          order: 3,
        },
        {
          id: "be-m1-l4",
          title: "Personal goals and learning plan",
          summary: "Align format and module depth with your objectives.",
          order: 4,
        },
      ],
    },
    {
      id: "be-m2",
      title: "Confident Speaking & Everyday Fluency",
      description:
        "Develop clarity, structure, and confidence in spoken English.",
      order: 2,
      lessons: [
        {
          id: "be-m2-l1",
          title: "Pronunciation and clarity",
          order: 1,
        },
        {
          id: "be-m2-l2",
          title: "Structured conversation practice",
          order: 2,
        },
        {
          id: "be-m2-l3",
          title: "Prepared and extempore speaking",
          order: 3,
        },
        {
          id: "be-m2-l4",
          title: "Listening and response practice",
          order: 4,
        },
      ],
    },
    {
      id: "be-m3",
      title: "Professional Writing",
      description:
        "Write with appropriate tone, structure, and professionalism.",
      order: 3,
      lessons: [
        {
          id: "be-m3-l1",
          title: "Email structure and tone",
          order: 1,
        },
        {
          id: "be-m3-l2",
          title: "Applications and formal letters",
          order: 2,
        },
        {
          id: "be-m3-l3",
          title: "Customer and supplier correspondence",
          order: 3,
        },
        {
          id: "be-m3-l4",
          title: "Editing for clarity and professionalism",
          order: 4,
        },
      ],
    },
    {
      id: "be-m4",
      title: "Workplace & Business Communication",
      description:
        "Handle everyday business interactions with confidence.",
      order: 4,
      lessons: [
        {
          id: "be-m4-l1",
          title: "Meetings, introductions, and follow-ups",
          order: 1,
        },
        {
          id: "be-m4-l2",
          title: "Client and sales communication basics",
          order: 2,
        },
        {
          id: "be-m4-l3",
          title: "Quotations and short workplace documents",
          order: 3,
        },
      ],
    },
    {
      id: "be-m5",
      title: "Interviews, CVs & Professional Presence",
      description:
        "Present yourself clearly in hiring and public-speaking contexts.",
      order: 5,
      lessons: [
        {
          id: "be-m5-l1",
          title: "Interview questions and response structure",
          order: 1,
        },
        {
          id: "be-m5-l2",
          title: "CV and profile language",
          order: 2,
        },
        {
          id: "be-m5-l3",
          title: "Presentations and public speaking",
          order: 3,
        },
        {
          id: "be-m5-l4",
          title: "Body language, posture, and eye contact",
          order: 4,
        },
      ],
    },
    {
      id: "be-m6",
      title: "Customized Goal Track",
      description:
        "Learner-specific practice, including IELTS planning when requested.",
      order: 6,
      lessons: [
        {
          id: "be-m6-l1",
          title: "Learner-specific practice plan",
          order: 1,
        },
        {
          id: "be-m6-l2",
          title: "Workplace or team scenarios",
          order: 2,
        },
        {
          id: "be-m6-l3",
          title: "IELTS orientation and preparation planning",
          summary: "Consultation-led; not an official IELTS test programme.",
          order: 3,
        },
        {
          id: "be-m6-l4",
          title: "Final feedback and continued-practice roadmap",
          order: 4,
        },
      ],
    },
  ],
  faq: [
    {
      question: "Is this course suitable for beginners?",
      answer:
        "Yes. The programme begins with a needs assessment so your starting level, pace, and module emphasis can be adjusted. Beginners receive foundational support before more advanced workplace practice.",
    },
    {
      question:
        "Is it only for business owners or also for students and employees?",
      answer:
        "It is designed for university students, job seekers, employees, entrepreneurs, managers, and client-facing team members — anyone who needs stronger professional English for study, work, or career growth.",
    },
    {
      question: "How long is the course?",
      answer:
        "Duration is confirmed after consultation. Frameworks may range from a one-day awareness workshop to a one-month or three-month plan depending on your goals, current level, and preferred intensity. Module depth adapts to the selected format.",
    },
    {
      question: "Are online, campus, group, or team options available?",
      answer:
        "Yes. Pakish Institute can discuss live online, campus, individual, group, and team formats after understanding your goals and schedule. Delivery is confirmed during the consultation process.",
    },
    {
      question: "How are fees decided?",
      answer:
        "Fees are customized based on duration, format, group size, and learning goals. Pakish Institute provides a clear plan and fee outline after the initial needs assessment — there is no fixed brochure price on the website.",
    },
    {
      question: "Does the program include IELTS preparation?",
      answer:
        "IELTS-oriented preparation can be discussed and tailored after assessment when that is your goal. Pakish Institute is not an IELTS test centre, partner, or accredited provider, and no band score is guaranteed.",
    },
    {
      question: "How do I apply?",
      answer:
        "Submit the Pakish Institute admission form and select Business English & Professional Communication. Our admissions team will contact you to arrange the needs-assessment conversation and next steps.",
    },
  ],
  pricing: {
    mode: "custom-quote",
    displayLabel: "Customized plan and fee",
    note:
      "Duration, format, group size, and learning goals are confirmed after consultation.",
  },
  instructor: {
    name: "Irfan Velmi",
    role: "Senior Business English & Professional Communication Instructor",
    bio: [
      "Irfan Velmi leads practical training in spoken English, professional writing, confidence-building, interview preparation, and business correspondence.",
      "Sessions focus on learner-specific communication goals, guided practice, feedback, and realistic workplace scenarios rather than theory-only instruction.",
    ],
    image: {
      src: "/images/courses/business-english/irfan-velmi-portrait.webp",
      alt: "Business English instructor Irfan Velmi",
      width: 640,
      height: 800,
    },
  },
  media: {
    spotlight: {
      src: "/images/courses/business-english/irfan-velmi-classroom.webp",
      alt: "Irfan Velmi leading a professional English communication session",
      width: 1200,
      height: 675,
      caption:
        "Live, consultation-led sessions with guided practice in spoken and written professional English.",
    },
  },
  cta: {
    primaryLabel: "Request a Course Consultation",
    secondaryLabel: "Ask About IELTS Preparation",
    secondaryPrefillMessage:
      "I am interested in Business English & Professional Communication and would like to discuss IELTS preparation options after assessment.",
  },
  seo: {
    title: "Business English Course in Karachi | Pakish Institute",
    description:
      "Improve spoken and written English for work, interviews, presentations and business correspondence through customized training with Irfan Velmi at Pakish Institute.",
    keywords: [
      "business English course in Karachi",
      "professional communication course Karachi",
      "spoken English for professionals Karachi",
      "business communication training Karachi",
      "customized English communication course",
      "IELTS preparation consultation Karachi",
    ],
    ogImage: "/og/courses-business-english-professional-communication.png",
    ogTitle: "Business English & Professional Communication",
    ogDescription: "Speaking · Writing · Workplace Confidence",
  },
  updatedAt: "2026-09-26",
  published: true,
  order: 7,
};
