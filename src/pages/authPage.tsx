import { GoogleLogin, CredentialResponse } from "@react-oauth/google";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import Navigation from "../components/nevBar";
import Footer from "../components/ui/footer";
import { api } from "../utility/api";

interface LoginPageProps {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
}

const LoginPage: React.FC<LoginPageProps> = ({
  isDarkMode,
  toggleDarkMode,
}) => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("app_token");
    if (token) {
      navigate("/dashboard");
    }
  }, []);

  const handleGoogleSuccess = async (
    credentialResponse: CredentialResponse,
  ) => {
    const idToken = credentialResponse.credential;
    if (!idToken) {
      toast.error("Login failed. Google did not return a credential.");
      return;
    }
    try {
      const res = await api.post("/auth/google-login", { token: idToken });
      const appToken = res.data?.token;

      if (!appToken) {
        throw new Error("No token returned from backend");
      }

      localStorage.setItem("app_token", appToken);

      toast.success("Login successful!");
      navigate("/dashboard");
    } catch (error) {
      console.error("Failed to get res:", error);
      toast.error("Login failed. Please try again.");
    }
  };

  return (
    <div
      className={`w-full min-h-screen transition-colors duration-300 ${
        isDarkMode ? "bg-[#191a1a]" : "bg-[#eaeaea]"
      }`}
    >
      <main className="relative pb-6">
        <Navigation isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />
        <div className="flex flex-col items-center justify-center px-4 py-24 sm:py-32">
          <h1
            className={`text-xl font-bold mb-6 ${isDarkMode ? "text-white" : "text-black"}`}
          >
            Please Sign in to continue
          </h1>
          <GoogleLogin
            onSuccess={handleGoogleSuccess}
            onError={() => {
              toast.error("Login failed. Please try again.");
            }}
          />
        </div>
        <Footer isDarkMode={isDarkMode} />
      </main>
    </div>
  );
};

export default LoginPage;
