import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface FAQProps {
  question: string;
  answer: string;
  value: string;
}

const FAQList: FAQProps[] = [
  {
    question: "Who can enroll in Pakish.ORG programs?",
    answer:
      "Our programs are designed for women and youth in Pakistan who want to build a career in IT, AI, or digital freelancing. No prior tech experience is required for the Fast-Track program.",
    value: "item-1",
  },
  {
    question: "Do all students get free courses?",
    answer:
      "No. Standard fees apply for regular enrollments. Pakish.ORG reserves limited free or subsidized seats for eligible women and students who cannot afford the fee, under the Fi Sabilillah quota. Need-based support is subject to eligibility review and seat availability.",
    value: "item-2",
  },
  {
    question: "Who qualifies for a free or subsidized seat?",
    answer:
      "Eligible women, students, or learners who genuinely cannot afford the standard fee may qualify for a limited free or subsidized seat under the Fi Sabilillah quota. Eligibility is reviewed during counseling and enrollment based on need and available quota.",
    value: "item-3",
  },
  {
    question: "How do I apply for the subsidized quota?",
    answer:
      "Contact us with the subject \"Subsidized Quota Eligibility\" or reach out via WhatsApp. Our team will discuss your situation during counseling, review eligibility, and confirm whether a subsidized seat is available for your chosen program.",
    value: "item-4",
  },
  {
    question: "Can I attend classes online?",
    answer:
      "Absolutely. In addition to our Gulshan-e-Iqbal, Karachi and Lodhran campuses, all programs are available online via Zoom so you can learn from anywhere in Pakistan.",
    value: "item-5",
  },
  {
    question: "What is the difference between the three programs?",
    answer:
      "The 1-Month Fast-Track covers freelancing basics with Canva and ChatGPT. The 3-Month Advanced program focuses on WordPress, SMM, SEO, and prompt engineering. The 6-Month Pro Developer track teaches Next.js, AI integration, and high-ticket global freelancing.",
    value: "item-6",
  },
  {
    question: "How can I support or sponsor Pakish.ORG?",
    answer:
      "You can support our cause through donations, sponsorships, or by referring students. Visit our contact section or reach out to us directly to learn how you can contribute to empowering women in tech.",
    value: "item-7",
  },
];

export const FAQSection = () => {
  return (
    <section id="faq" className="container md:w-[700px] py-16 sm:py-24">
      <div className="text-center mb-8">
        <p className="text-lg text-primary text-center mb-2 tracking-wider">
          FAQS
        </p>

        <h2 className="text-3xl md:text-4xl text-center font-bold">
          Common Questions
        </h2>
      </div>

      <Accordion type="single" collapsible className="AccordionRoot">
        {FAQList.map(({ question, answer, value }) => (
          <AccordionItem key={value} value={value}>
            <AccordionTrigger className="text-left">
              {question}
            </AccordionTrigger>

            <AccordionContent>{answer}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
};
