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
    question: "Are the courses really free or subsidized?",
    answer:
      "Yes. As a non-profit Fi Sabilillah initiative backed by Pakish Group, we offer free and subsidized training. We provide dedicated workspaces, internet, and mentorship to remove barriers to entry.",
    value: "item-2",
  },
  {
    question: "Can I attend classes online?",
    answer:
      "Absolutely. In addition to our Karachi and Lodhran campuses, all programs are available online via Zoom so you can learn from anywhere in Pakistan.",
    value: "item-3",
  },
  {
    question: "What is the difference between the three programs?",
    answer:
      "The 1-Month Fast-Track covers freelancing basics with Canva and ChatGPT. The 3-Month Advanced program focuses on WordPress, SMM, SEO, and prompt engineering. The 6-Month Pro Developer track teaches Next.js, AI integration, and high-ticket global freelancing.",
    value: "item-4",
  },
  {
    question: "How can I support or sponsor Pakish.ORG?",
    answer:
      "You can support our cause through donations, sponsorships, or by referring students. Visit our contact section or reach out to us directly to learn how you can contribute to empowering women in tech.",
    value: "item-5",
  },
];

export const FAQSection = () => {
  return (
    <section id="faq" className="container md:w-[700px] py-24 sm:py-32">
      <div className="text-center mb-8">
        <h2 className="text-lg text-primary text-center mb-2 tracking-wider">
          FAQS
        </h2>

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
