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
    <div className="min-h-145 flex flex-col items-center justify-center bg-gray-50 px-4 py-8">
      <div className="max-w-md w-full bg-gray-200 rounded-xl shadow-lg overflow-hidden flex min-h-0">
        {/* Chỉ giữ phần form, loại bỏ hình ảnh */}
        <div className="w-full">
          {/* children will include <Card>…</Card> */}
          {children}

          {/* bottomLink is something like 
                <div className="mt-4 text-center text-sm">
                  Chưa có tài khoản? <Link to="/authorization/register">Đăng ký ngay</Link>
                </div>
           */}
          <div className="mt-6 text-center text-sm">{bottomLink}</div>
        </div>
      </div>
    </div>
  );
}