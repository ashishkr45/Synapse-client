import { GoogleLogin, CredentialResponse } from '@react-oauth/google';
import axios from 'axios';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navigation from '../components/nevBar';
import Footer from '../components/ui/footer';

interface LoginPageProps {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
}

const LoginPage: React.FC<LoginPageProps> = ({ isDarkMode, toggleDarkMode }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('app_token');
    if(token) {
      navigate('/dashboard')
    }
  }, []);

  // Add the 'CredentialResponse' type to the parameter
  const handleGoogleSuccess = async (credentialResponse: CredentialResponse) => {
    const idToken = credentialResponse.credential;
    try {
      // Send the token to your backend
      const res = await axios.post('http://localhost:3000/api/auth/google-login', { token: idToken });
      
      // Store your backend's token and navigate
      localStorage.setItem('app_token', res.data.token);
      navigate('/dashboard');
    } catch (error) {
      console.error("Login Failed:", error);
    }
  };

  return (
    <div className={`w-full min-h-screen transition-colors duration-300 ${
      isDarkMode ? 'bg-[#191a1a]' : 'bg-[#eaeaea]'
    }`}>
      <main className="relative pb-6">
        <Navigation isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />
        <div className='flex flex-col items-center justify-center px-4 py-24 sm:py-32'>
          <h1 className={`text-xl font-bold mb-6 ${isDarkMode ? 'text-white': 'text-black'}`}>Please Sign in to continue</h1>
          <GoogleLogin
            onSuccess={handleGoogleSuccess}
            onError={() => { console.log('Login Failed'); }}
          />
        </div>
        <Footer isDarkMode={isDarkMode} />
      </main>
    </div>
  );
};

export default LoginPage;