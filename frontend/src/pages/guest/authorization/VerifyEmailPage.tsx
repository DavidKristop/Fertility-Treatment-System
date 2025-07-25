import { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { verifyEmail, resendVerifyEmail } from '@/api/auth';
import { toast } from 'react-toastify';
import { Button } from '@/components/ui/button';

export default function VerifyEmailPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const token = searchParams.get('token');
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [email, setEmail] = useState<string | null>(null);

  useEffect(() => {
    if (!token) {
      setStatus('error');
      return;
    }

    verifyEmail(token)
      .then((res) => {
        toast.success(res.message);
        setStatus('success');
      })
      .catch((err) => {
        toast.error(err.message);
        setStatus('error');
      });
  }, [token]);

  const handleResend = async () => {
    if (!email) {
      toast.error("Không thể gửi lại email vì thiếu địa chỉ.");
      return;
    }
    try {
      await resendVerifyEmail(email);
      toast.success('Email xác thực đã được gửi lại!');
    } catch (err: any) {
      toast.error(err.message);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen text-center px-4">
      {status === 'loading' && <p>Đang xác minh email của bạn...</p>}

      {status === 'success' && (
        <>
          <h2 className="text-2xl font-semibold mb-4">Xác minh email thành công!</h2>
          <Button onClick={() => navigate('/authorization/login')}>Đăng nhập</Button>
        </>
      )}

      {status === 'error' && (
        <>
          <h2 className="text-2xl font-semibold mb-4 text-red-500">Xác minh thất bại hoặc token đã hết hạn.</h2>
          <p className="mb-4">Vui lòng thử gửi lại email xác thực.</p>
          <input
            type="email"
            placeholder="Nhập email để gửi lại"
            className="border p-2 rounded mb-4"
            value={email ?? ''}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Button onClick={handleResend}>Gửi lại email xác thực</Button>
        </>
      )}
    </div>
  );
}