import type { FAQCardProps } from "@/lib/types/faq";

export default function FAQCard({ question, answer, date }: FAQCardProps) {
  return (
    <div className="bg-gray-50 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
      <h3 className="font-semibold text-lg mb-2">{question}</h3>
      <p className="text-gray-600">{answer}</p>
      <div className="text-sm text-gray-500 mt-4">
        Ngày đăng: {date}
      </div>
    </div>
  );
}