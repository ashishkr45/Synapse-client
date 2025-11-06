import { Link } from 'react-router-dom';

const ErrorPage = () => {
  // A reusable component for the faint background text
  const DecorText = ({ className }: { className?: string }) => (
    <p className={`absolute select-none text-2xl font-semibold text-gray-200 ${className}`}>
      404
    </p>
  );

  return (
    // Main container with a white background and relative positioning
    <div className="relative min-h-screen w-full overflow-hidden bg-white">
      
      {/* Top-left brand name */}
      <div className="absolute top-8 left-8 text-lg font-bold text-gray-400">
        <Link to="/">Second Brain</Link>
      </div>

      {/* Faint decorative "404"s in the background */}
      <DecorText className="top-8 right-8" />
      <DecorText className="top-1/3 left-1/4" />
      <DecorText className="bottom-1/2 right-1/3" />
      <DecorText className="bottom-8 right-8" />
      
      {/* Centered "back to home" link with a simple hover effect */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <Link 
          to="/" 
          className="text-lg font-medium text-indigo-600 hover:underline underline-offset-4"
        >
          back to home
        </Link>
      </div>

      {/* Main error message in the bottom-left corner */}
      <div className="absolute bottom-8 left-8 flex items-center space-x-4">
        <h1 className="text-8xl font-black text-indigo-600">404</h1>
        <p className="max-w-xs text-md font-medium text-indigo-600">
          indicates that the browser was able to communicate with the server, but the server could not find the requested resource.
        </p>
      </div>

    </div>
  );
};

export default ErrorPage;