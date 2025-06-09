import FertilityImage from "@/assets/0VkgqLXqGNQTndYGcB8l2CFaBA6HB0aUZP6wR5a6.jpg";

interface AuthCardProps {
  children: React.ReactNode; // the <Card> contents (AuthHeader, AuthFormFields, GoogleLogin, etc.)
  bottomLink: React.ReactNode; // e.g. “Chưa có tài khoản? Đăng ký ngay!” or “Đã có tài khoản? Đăng nhập ngay!”
  submitButtonText: string; // e.g. "Đăng nhập" or "Đăng kí"
}

export default function AuthCard({
  children,
  bottomLink,
  //submitButtonText,
}: AuthCardProps) {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-6">
      <div className="max-w-3xl w-full bg-gray-200 rounded-xl shadow-lg overflow-hidden flex min-h-0">
        {/* Left: Image */}
        <div className="flex-1 min-h-0">
          <img
            src={FertilityImage}
            alt="Chữa hiếm muộn"
            className="h-full w-full object-cover"
          />
        </div>

        {/* Right: White card with form */}
        <div className="w-1/2 bg-white p-6">
          {/* children will include <Card>…</Card> */}
          {children}

          {/* bottomLink is something like 
                <div className="mt-4 text-center text-sm">
                  Chưa có tài khoản? <Link to="/authorization/register">Đăng ký ngay</Link>
                </div>
           */}
          <div className="mt-4 text-center text-sm">{bottomLink}</div>
        </div>
      </div>
    </div>
  );
}
