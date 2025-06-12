import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import type { AskQuestionFormProps, QuestionFormData } from "@/lib/types/faq";

export default function AskQuestionForm({ onSubmit, onCancel, isSubmitting = false }: AskQuestionFormProps) {
  const [formData, setFormData] = useState<QuestionFormData>({
    name: '',
    gender: 'nam',
    age: 0,
    question: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSubmit(formData);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h2 className="text-xl font-semibold mb-6">ĐẶT CÂU HỎI</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Name */}
        <div>
          <Label htmlFor="name">Tên</Label>
          <Input 
            id="name" 
            placeholder="Nhập tên của bạn"
            className="mt-1"
            value={formData.name}
            onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
            required
          />
        </div>

        {/* Gender */}
        <div>
          <Label>Giới tính</Label>
          <RadioGroup 
            value={formData.gender} 
            onValueChange={(value: 'nam' | 'nu') => setFormData(prev => ({ ...prev, gender: value }))}
            className="flex gap-4 mt-1"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="nam" id="nam" />
              <Label htmlFor="nam">Nam</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="nu" id="nu" />
              <Label htmlFor="nu">Nữ</Label>
            </div>
          </RadioGroup>
        </div>

        {/* Age */}
        <div>
          <Label htmlFor="age">Tuổi</Label>
          <Input 
            id="age" 
            type="number" 
            placeholder="Nhập tuổi của bạn"
            className="mt-1"
            value={formData.age || ''}
            onChange={(e) => setFormData(prev => ({ ...prev, age: parseInt(e.target.value) || 0 }))}
            required
            min="0"
            max="120"
          />
        </div>

        {/* Question */}
        <div>
          <Label htmlFor="question">Nội dung câu hỏi</Label>
          <Textarea 
            id="question"
            placeholder="Mô tả chi tiết câu hỏi của bạn..."
            className="mt-1 h-32"
            value={formData.question}
            onChange={(e) => setFormData(prev => ({ ...prev, question: e.target.value }))}
            required
          />
        </div>

        {/* Update the button container styling */}
        <div className="flex flex-col sm:flex-row gap-4 mt-6">
          {onCancel && (
            <Button 
              type="button" 
              variant="outline" 
              onClick={onCancel}
              className="flex-1"
            >
              Hủy
            </Button>
          )}
          <Button 
            type="submit" 
            className="flex-1 bg-[#004c77] hover:bg-[#003c5f]"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Đang gửi..." : "Gửi"}
          </Button>
        </div>
      </form>
    </div>
  );
}