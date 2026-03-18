import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function FAQ() {
  return (
    <section className="py-24 max-w-3xl mx-auto px-6">
      <h2 className="text-3xl font-bold text-center mb-10">
        Frequently Asked Questions
      </h2>
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="item-1">
          <AccordionTrigger>Is my payment safe?</AccordionTrigger>
          <AccordionContent>
            Yes. We use an Escrow system. Your money is held securely and only
            released to the operator after the trip is successfully completed.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger>How do I get paid as a Scout?</AccordionTrigger>
          <AccordionContent>
            Once the traveler you referred completes their journey, your GH₵ 20
            bounty is added to your wallet. You can withdraw to Mobile Money
            every Friday.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-3">
          <AccordionTrigger>What if the bus is cancelled?</AccordionTrigger>
          <AccordionContent>
            If an Operator cancels a trip, you receive a 100% refund immediately
            to your original payment method.
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </section>
  );
}

