import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { fetchRandomPostId } from '../services/bloggerService';

const SafeLinkPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const destination = searchParams.get('url');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const initLifeCycle = async () => {
      if (!destination) {
        setError("Invalid destination link.");
        return;
      }

      try {
        const randomPostId = await fetchRandomPostId();
        if (randomPostId) {
          // Redirect to the random post with step=1 and the destination
          // We encode the destination to ensure it passes correctly through the URL
          navigate(`/post/${randomPostId}?step=1&destination=${encodeURIComponent(destination)}`, { replace: true });
        } else {
          setError("Failed to initialize verification. Please try again.");
        }
      } catch (err) {
        console.error(err);
        setError("An error occurred. Please try again.");
      }
    };

    initLifeCycle();
  }, [destination, navigate]);

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center p-8 bg-white rounded-2xl shadow-lg">
          <h1 className="text-2xl font-bold text-red-500 mb-2">Error</h1>
          <p className="text-gray-600">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 space-y-4">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-primary border-r-2"></div>
      <p className="text-sm font-semibold text-gray-500">Initializing SafeLink...</p>
    </div>
  );
};

export default SafeLinkPage;
