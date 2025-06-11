import { useState } from "react";
import DoctorCard from "@/components/layout/DoctorCard";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const doctors = [
  {
    id: 1,
    name: "Dr. Nguyễn Văn A",
    image: "", // Thay thế bằng đường dẫn hình ảnh thực tế
  },
  {
    id: 2,
    name: "Dr. Trần Thị B",
    image: "", // Thay thế bằng đường dẫn hình ảnh thực tế
  },
  {
    id: 3,
    name: "Dr. Lê Văn C",
    image: "", // Thay thế bằng đường dẫn hình ảnh thực tế
  },
  {
    id: 4,
    name: "Dr. Phạm Thị D",
    image: "", // Thay thế bằng đường dẫn hình ảnh thực tế
  },
  {
    id: 5,
    name: "Dr. Hồ Văn E",
    image: "", // Thay thế bằng đường dẫn hình ảnh thực tế
  },
  {
    id: 6,
    name: "Dr. Võ Thị F",
    image: "", // Thay thế bằng đường dẫn hình ảnh thực tế
  },
  {
    id: 7,
    name: "Dr. Mai Văn G",
    image: "", // Thay thế bằng đường dẫn hình ảnh thực tế
  },
  {
    id: 8,
    name: "Dr. Nguyễn Văn A",
    image: "", // Thay thế bằng đường dẫn hình ảnh thực tế
  },
  {
    id: 9,
    name: "Dr. Trần Thị B",
    image: "", // Thay thế bằng đường dẫn hình ảnh thực tế
  },
  {
    id: 10,
    name: "Dr. Lê Văn C",
    image: "", // Thay thế bằng đường dẫn hình ảnh thực tế
  },
  {
    id: 11,
    name: "Dr. Phạm Thị D",
    image: "", // Thay thế bằng đường dẫn hình ảnh thực tế
  },
  {
    id: 12,
    name: "Dr. Hồ Văn E",
    image: "", // Thay thế bằng đường dẫn hình ảnh thực tế
  },
  {
    id: 13,
    name: "Dr. Võ Thị F",
    image: "", // Thay thế bằng đường dẫn hình ảnh thực tế
  },
  {
    id: 14,
    name: "Dr. Mai Văn G",
    image: "", // Thay thế bằng đường dẫn hình ảnh thực tế
  },
];

const ITEMS_PER_PAGE = 8;

export default function DoctorListPage() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const filteredDoctors = doctors.filter((doc) =>
    doc.name.toLowerCase().includes(search.toLowerCase())
  );

  const totalPages = Math.ceil(filteredDoctors.length / ITEMS_PER_PAGE);
  const start = (page - 1) * ITEMS_PER_PAGE;
  const paginatedDoctors = filteredDoctors.slice(start, start + ITEMS_PER_PAGE);

  return (
    <div className="min-h-screen bg-gray-100">
      <section
        id="our-doctors"
        className="py-20"
        style={{ backgroundColor: "#ffdbb3" }}
      >
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8 text-primary">
            Đội ngũ bác sĩ của chúng tôi
          </h2>

          <div className="max-w-md mx-auto mb-8">
            <Input
              className="bg-white border-2 border-gray-400 shadow-md focus:border-indigo-500 focus:ring focus:ring-indigo-200"
              placeholder="Tìm kiếm bác sĩ..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {paginatedDoctors.map((doctor) => (
              <DoctorCard
                key={doctor.id}
                id={doctor.id}
                name={doctor.name}
                image={doctor.image}
                onClick={() => navigate(`/doctors/${doctor.id}`)}
              />
            ))}
          </div>

          {totalPages > 1 && (
            <div className="flex justify-center gap-4 mt-10">
              <Button
                variant="outline"
                onClick={() => setPage(page - 1)}
                disabled={page === 1}
              >
                Trang trước
              </Button>
              <span className="px-4 py-2 text-gray-700">
                {page} / {totalPages}
              </span>
              <Button
                variant="outline"
                onClick={() => setPage(page + 1)}
                disabled={page === totalPages}
              >
                Trang sau
              </Button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
