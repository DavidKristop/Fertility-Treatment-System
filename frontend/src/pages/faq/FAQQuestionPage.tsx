import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import AskQuestionForm from "@/components/layout/AskQuestionForm";
import type { QuestionFormData } from "@/lib/types/faq";

export default function FAQQuestionPage() {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (data: QuestionFormData) => {
    setIsSubmitting(true);
    try {
      // TODO: Implement actual API call here
      await new Promise(resolve => setTimeout(resolve, 1000));
      navigate("/faq");
    } catch (error) {
      console.error('Failed to submit question:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <Button
          variant="ghost"
          className="mb-6 flex items-center text-gray-600 hover:text-gray-900"
          onClick={() => navigate("/faq")}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Quay lại danh sách câu hỏi
        </Button>

        <div className="max-w-2xl mx-auto">
          <AskQuestionForm
            onSubmit={handleSubmit}
            onCancel={() => navigate("/faq")}
            isSubmitting={isSubmitting}
          />
        </div>
      </div>
    </div>
  );
}