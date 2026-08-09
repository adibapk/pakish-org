import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { HOME_FAQS } from "@/lib/home-content";

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
        {HOME_FAQS.map(({ question, answer }, index) => (
          <AccordionItem key={question} value={`item-${index + 1}`}>
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
