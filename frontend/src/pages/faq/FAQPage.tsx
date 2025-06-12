import { useState } from "react";
import { usePagination } from "@/hooks/usePagination";
import { useUrlParams } from "@/hooks/useURLParams";
import { useNavigate } from "react-router-dom";
import SearchBar from "@/components/layout/SearchBar";
import FAQList from "@/components/layout/FAQList";
import { Button } from "@/components/ui/button";
import { Pagination, PaginationContent, PaginationItem, PaginationNext, PaginationPrevious, PaginationLink, PaginationEllipsis } from "@/components/ui/pagination";
import type { FAQ, FAQResponse } from "@/lib/types/faq";

// Mock data (will be replaced with API call)
const ALL_FAQS: FAQ[] = Array.from({ length: 50 }, (_, i) => ({
  id: i + 1,
  question: `Câu hỏi ${i + 1}: ${[
    "Thụ tinh trong ống nghiệm có đau không?",
    "Chi phí IUI là bao nhiêu?",
    "Làm sao để tăng khả năng thụ thai?",
    "Khi nào nên gặp bác sĩ?",
    "Quy trình IVF mất bao lâu?"
  ][i % 5]}`,
  answer: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  date: `${Math.floor(Math.random() * 28) + 1}/${Math.floor(Math.random() * 12) + 1}/2023`,
}));

const ITEMS_PER_PAGE = 6;

async function fetchFAQs(page: number, search: string): Promise<FAQResponse> {
  await new Promise((resolve) => setTimeout(resolve, 500));

  let filteredFAQs = ALL_FAQS;
  if (search) {
    filteredFAQs = filteredFAQs.filter(
      (faq) =>
        faq.question.toLowerCase().includes(search.toLowerCase()) ||
        faq.answer.toLowerCase().includes(search.toLowerCase())
    );
  }

  const total = filteredFAQs.length;
  const totalPages = Math.ceil(total / ITEMS_PER_PAGE);
  const startIndex = (page - 1) * ITEMS_PER_PAGE;
  const data = filteredFAQs.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  return { data, total, totalPages };
}

export default function FAQPage() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const { updateParams, getParam } = useUrlParams();

  const { data, currentPage, totalPages, isLoading, goToPage } = usePagination({
    fetchFn: (page) => fetchFAQs(page, searchTerm),
    dependencies: [searchTerm],
    initialPage: Number.parseInt(getParam("page") || "1"),
    onPageChange: (page) => updateParams({ page: page.toString() }),
  });

  const handleSearch = (value: string) => {
    setSearchTerm(value);
    updateParams({ search: value, page: "1" });
  };

  const handleClearSearch = () => {
    setSearchTerm("");
    updateParams({ search: "", page: "1" });
  };

  const handlePageChange = (pageNumber: number) => {
    if (pageNumber > 0 && pageNumber <= totalPages) {
      goToPage(pageNumber);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <section className="bg-[#004c77] text-white py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Hỏi đáp miễn phí với bác sĩ
            </h1>
            <div className="max-w-md mx-auto space-y-4">
              <SearchBar
                value={searchTerm}
                onChange={handleSearch}
                onClear={handleClearSearch}
                placeholder="Tìm kiếm câu hỏi..."
              />
              <Button 
                onClick={() => navigate("question")}
                className="w-full bg-white text-[#004c77] hover:bg-gray-100"
              >
                Đặt câu hỏi với bác sĩ
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="mb-8 text-center">
            <p className="text-gray-600">
              Tìm thấy {data?.total || 0} câu hỏi
              {searchTerm && ` cho "${searchTerm}"`}
            </p>
          </div>

          <FAQList 
            faqs={data?.data || []} 
            isLoading={isLoading} 
          />

          {totalPages > 1 && (
            <Pagination className="my-8">
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    onClick={() => handlePageChange(currentPage - 1)}
                    aria-disabled={currentPage === 1 || isLoading}
                  />
                </PaginationItem>
                {Array.from({ length: totalPages }, (_, i) => {
                  const pageNumber = i + 1;
                  if (
                    pageNumber === 1 ||
                    pageNumber === totalPages ||
                    (pageNumber >= currentPage - 1 && pageNumber <= currentPage + 1)
                  ) {
                    return (
                      <PaginationItem key={pageNumber}>
                        <PaginationLink
                          onClick={() => handlePageChange(pageNumber)}
                          isActive={pageNumber === currentPage}
                          aria-disabled={isLoading}
                        >
                          {pageNumber}
                        </PaginationLink>
                      </PaginationItem>
                    );
                  }
                  if (pageNumber === currentPage - 2 || pageNumber === currentPage + 2) {
                    return (
                      <PaginationItem key={`ellipsis-${pageNumber}`}>
                        <PaginationEllipsis />
                      </PaginationItem>
                    );
                  }
                  return null;
                })}
                <PaginationItem>
                  <PaginationNext
                    onClick={() => handlePageChange(currentPage + 1)}
                    aria-disabled={currentPage === totalPages || isLoading}
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          )}
        </div>
      </section>
    </div>
  );
}