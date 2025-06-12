import LoadingComponent from "@/components/common/LoadingComponent";
import type { FAQListProps } from "@/lib/types/faq";
import FAQCard from "./FAQCard";

export default function FAQList({ faqs, isLoading }: FAQListProps) {
  return (
    <LoadingComponent isLoading={isLoading}>
      <div className="max-w-3xl mx-auto space-y-6">
        {faqs.map((faq) => (
          <FAQCard
            key={faq.id}
            question={faq.question}
            answer={faq.answer}
            date={faq.date}
          />
        ))}
      </div>
    </LoadingComponent>
  );
}