import DoctorImg from "@/assets/doctor1.jpg";
interface DoctorCardProps {
  id: number;
  name: string;
  image: string;
  role?: string;
  onClick?: () => void;
}

export default function DoctorCard({
  //id,
  name,
  //image,
  role = "Bác sĩ chuyên khoa",
  onClick,
}: DoctorCardProps) {
  return (
    <div
      onClick={onClick}
      className="bg-white rounded-lg shadow-md p-6 text-center cursor-pointer hover:shadow-lg transition"
    >
      <img
        src={DoctorImg}
        alt={`Doctor ${name}`}
        className="w-32 h-32 rounded-full object-cover mx-auto"
      />
      <h3 className="text-xl font-semibold mb-2">{name}</h3>
      <p className="text-gray-700">{role}</p>
    </div>
  );
}
