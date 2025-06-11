import { GoogleLogin } from '@react-oauth/google';
import { useNavigate } from 'react-router-dom';

interface GoogleButtonProps {
  text: string;
  mode: 'login' | 'register';
}

export default function GoogleAuth({ mode }: GoogleButtonProps) {
  const navigate = useNavigate();

  const handleGoogleSuccess = async (credentialResponse: any) => {
    try {
      // Call your backend API with the Google credential
      const response = await fetch(`/api/auth/google/${mode}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          credential: credentialResponse.credential,
        }),
      });

      if (!response.ok) {
        throw new Error('Google authentication failed');
      }

      const data = await response.json();
      
      // Store the token in localStorage
      localStorage.setItem('token', data.token);
      
      // Redirect to dashboard
      navigate('/dashboard');
    } catch (error) {
      console.error('Google auth error:', error);
    }
  };

  return (
    <div className="w-full flex justify-center">
      <GoogleLogin
        onSuccess={handleGoogleSuccess}
        onError={() => console.error('Google Login Failed')}
        text={mode === 'login' ? 'signin_with' : 'signup_with'}
        shape="rectangular"
        locale="vi"
      />
    </div>
  );
}