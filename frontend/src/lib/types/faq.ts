import { z } from "zod";

export const faqSchema = z.object({
  id: z.number(),
  question: z.string(),
  answer: z.string(),
  date: z.string(),
});

export const faqResponseSchema = z.object({
  data: z.array(faqSchema),
  total: z.number(),
  totalPages: z.number(),
});

export type FAQ = z.infer<typeof faqSchema>;
export type FAQResponse = z.infer<typeof faqResponseSchema>;

export interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  onClear: () => void;
  placeholder?: string;
}

export interface FAQCardProps extends Omit<FAQ, 'id'> {}

export interface FAQListProps {
  faqs: FAQ[];
  isLoading: boolean;
}

export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  isLoading: boolean;
}

export interface QuestionFormData {
  name: string;
  gender: 'nam' | 'nu';
  age: number;
  question: string;
}

export interface AskQuestionFormProps {
  onSubmit: (data: QuestionFormData) => Promise<void>;
  onCancel?: () => void;
  isSubmitting?: boolean;
}