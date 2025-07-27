import { useEffect, useState } from "react";
import DoctorCard from "@/components/layout/DoctorCard";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { getPublicDoctors } from "@/api/doctor-management";
import type { DoctorProfile } from "@/api/types";
import { toast } from "react-toastify";

export default function DoctorListPage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(0);
  const [doctors, setDoctors] = useState<DoctorProfile[]>([]);
  const [totalPages, setTotalPages] = useState(0);

  const fetchDoctors = async () => {
    try {
      setLoading(true);
      const response = await getPublicDoctors(page, 8, search);
      setDoctors(response.payload.content);
      setTotalPages(response.payload.totalPages);
    } catch (error) {
      console.error("Error fetching doctors:", error);
      toast.error("Không thể tải danh sách bác sĩ");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDoctors();
  }, [page, search]);

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
                setPage(0);
              }}
            />
          </div>

          {loading ? (
            <div className="text-center">Đang tải...</div>
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {doctors.map((doctor) => (
                  <DoctorCard
                    key={doctor.id}
                    id={doctor.id}
                    name={doctor.fullName || ""}
                    image={doctor.avatarUrl || ""}
                    specialty={doctor.specialty}
                    onClick={() =>
                      navigate(`/doctors/${doctor.id}`, { state: { doctor } })
                    }
                  />
                ))}
              </div>

              {totalPages > 1 && (
                <div className="flex justify-center gap-4 mt-10">
                  <Button
                    variant="outline"
                    onClick={() => setPage(page - 1)}
                    disabled={page === 0 || loading}
                  >
                    Trang trước
                  </Button>
                  <span className="px-4 py-2 text-gray-700">
                    {page + 1} / {totalPages}
                  </span>
                  <Button
                    variant="outline"
                    onClick={() => setPage(page + 1)}
                    disabled={page === totalPages - 1 || loading}
                  >
                    Trang sau
                  </Button>
                </div>
              )}
            </>
          )}
        </div>
      </section>
    </div>
  );
}
