import { FooterSection } from "@/components/layout/sections/footer";
import { getAllCourses, getCoursePath } from "@/lib/courses";
import { absoluteUrl, createPageMetadata } from "@/lib/seo";
import type { Metadata } from "next";
import Link from "next/link";

const guides = {
  en: {
    path: "/course-fees", lang: "en-PK", heading: "Course fees and duration in Karachi",
    description: "Compare Pakish Institute course fees, study time and training formats before you choose a program in Karachi or online.",
    switchLabel: "Roman Urdu mein parhein",
    intro: "Use the starting fees below to shortlist a course. Your final fee depends on the format, duration and any changes to the syllabus. Admissions confirms the price and schedule before you commit.",
    course: "Course and syllabus", duration: "Duration", fee: "Starting fee", quote: "Individual quotation",
    format: "Can I study on campus or online?",
    formatText: "Campus groups meet on Main University Road when a cohort is scheduled. If the timing does not suit you, ask about live Google Meet classes or a tailored group session.",
    campus: "Visit the Gulshan-e-Iqbal campus page", next: "How do I choose a course?",
    choice: "Choose WordPress if you want to build a business website or shop. Choose full stack development if you want to write and deploy a web application. For office documents and repetitive tasks, start with AI Productivity. Business English begins with a conversation about the communication skills you want to practise.",
    apply: "Ask admissions about a course", workshop: "Explore free weekend workshops",
  },
  ur: {
    path: "/ur/course-fees", lang: "ur-Latn-PK", heading: "Karachi mein courses ki fees aur muddat",
    description: "Pakish Institute ke courses ki fees aur muddat dekhein. Gulshan-e-Iqbal campus aur live online classes ke options ka muqabla karein.",
    switchLabel: "Read in English",
    intro: "Neeche di gayi fees se aap apne budget ke mutabiq course chun sakte hain. Aakhri fees class ke tareeqe, muddat aur syllabus mein tabdeeli par munhasir hai. Dakhle se pehle admissions team fees aur schedule ki tasdeeq karti hai.",
    course: "Course aur syllabus", duration: "Muddat", fee: "Ibtidai fees", quote: "Fees mashware ke baad",
    format: "Campus par ya online kaise parh sakta hoon?",
    formatText: "Jab naya batch tay hota hai to campus classes Main University Road par hoti hain. Agar waqt aap ke liye munasib na ho to Google Meet par live class ya apne group ke liye alag session ke bare mein poochhein.",
    campus: "Gulshan-e-Iqbal campus ki tafseel dekhein", next: "Mere liye kaunsa course munasib hai?",
    choice: "Business website ya online dukaan banani ho to WordPress dekhein. Khud code likh kar web application chalani ho to full stack development chun sakte hain. Daftari documents aur baar baar hone wale kaam ke liye AI Productivity dekhein. Business English mein pehle aap se baat hoti hai ke aap kin mauqon par behtar English bolna ya likhna chahte hain.",
    apply: "Course ke bare mein admissions team se poochhein", workshop: "Muft weekend workshops dekhein",
  },
};

type Language = keyof typeof guides;

export function feeGuideMetadata(language: Language): Metadata {
  const guide = guides[language];
  const meta = createPageMetadata({
    title: guide.heading + " | Pakish Institute", description: guide.description,
    path: guide.path, absoluteTitle: true,
  });
  return {
    ...meta,
    alternates: {
      canonical: absoluteUrl(guide.path),
      languages: { "en-PK": absoluteUrl(guides.en.path), "ur-Latn-PK": absoluteUrl(guides.ur.path), "x-default": absoluteUrl(guides.en.path) },
    },
    openGraph: { ...meta.openGraph, locale: language === "en" ? "en_PK" : "ur_PK" },
  };
}

export function CourseFeeGuide({ language }: { language: Language }) {
  const guide = guides[language];
  const other = language === "en" ? guides.ur : guides.en;
  return (
    <>
      <article lang={guide.lang} className="container mx-auto max-w-4xl space-y-8 px-4 py-12">
        <header className="space-y-4">
          <Link href={other.path} hrefLang={other.lang} lang={other.lang} className="text-primary underline">{guide.switchLabel}</Link>
          <h1 className="text-3xl font-bold sm:text-5xl">{guide.heading}</h1>
          <p className="max-w-3xl leading-relaxed">{guide.intro}</p>
        </header>
        <table className="w-full text-left text-sm sm:text-base">
          <thead><tr className="border-b">{[guide.course, guide.duration, guide.fee].map((label) => <th scope="col" className="py-3 pr-2" key={label}>{label}</th>)}</tr></thead>
          <tbody>
            {getAllCourses().map((course) => (
              <tr className="border-b" key={course.slug}>
                <th scope="row" className="py-3 pr-2 font-medium">
                  <Link lang="en" className="text-primary underline" href={getCoursePath(course.slug)}>{course.title}</Link>
                </th>
                <td className="py-3 pr-2">{language === "en" ? course.duration : course.duration.replace("weeks", "haftay").replace("Custom", "Zaroorat ke mutabiq").replace("Consultation-led (1 day to 3 months)", "Mashware se (1 din se 3 mahine)")}</td>
                <td className="py-3">{course.pricing.startingAmount ? `PKR ${course.pricing.startingAmount.toLocaleString("en-PK")}` : guide.quote}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <section className="space-y-3">
          <h2 className="text-2xl font-bold">{guide.format}</h2>
          <p>{guide.formatText}</p>
          <Link className="text-primary underline" href="/campus/gulshan-e-iqbal">{guide.campus}</Link>
        </section>
        <section className="space-y-3">
          <h2 className="text-2xl font-bold">{guide.next}</h2>
          <p>{guide.choice}</p>
          <div className="flex flex-wrap gap-5">
            <Link className="text-primary underline" href="/admission">{guide.apply}</Link>
            <Link className="text-primary underline" href="/workshops">{guide.workshop}</Link>
          </div>
        </section>
      </article>
      <FooterSection />
    </>
  );
}
