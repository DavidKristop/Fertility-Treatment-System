import DoctorImg from "@/assets/doctor1.jpg";

interface DoctorCardProps {
  id: string;
  name: string;
  image: string;
  specialty: string;
  onClick?: () => void;
}

export default function DoctorCard({
  id,
  name,
  image,
  specialty,
  onClick,
}: DoctorCardProps) {
  return (
    <div
      onClick={onClick}
      className="bg-white rounded-lg shadow-md p-6 text-center cursor-pointer hover:shadow-lg transition"
    >
      <img
        src={image || DoctorImg}
        alt={`Doctor ${name}`}
        className="w-32 h-32 rounded-full object-cover mx-auto"
      />
      <h3 className="text-xl font-semibold mb-2">{name}</h3>
      <p className="text-gray-700">{specialty}</p>
    </div>
  );
}
