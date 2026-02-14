import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchRandomPostId } from '../services/bloggerService';

const VerifyPage: React.FC = () => {
    const { token } = useParams<{ token: string }>();
    const navigate = useNavigate();
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const processToken = async () => {
            if (!token) {
                setError("Invalid link.");
                return;
            }

            try {
                // The 'token' here is the URL-safe encoded string provided by the bot.
                // We don't decode it here deeply; we pass it to the next step.
                // The PostPage expects 'url' query param to be the *encrypted* string.
                // The bot sends: .../verify/{EncodedDeepLink}
                // So 'token' IS 'EncodedDeepLink'.

                const postId = await fetchRandomPostId();
                if (postId) {
                    // Normalize token (replace URL-safe chars with standard Base64 chars)
                    // This ensures PostPage can decode it correctly
                    const normalizedToken = token.replace(/-/g, '+').replace(/_/g, '/');

                    // Redirect to PostPage Step 1
                    navigate(`/post/${postId}?step=1&url=${encodeURIComponent(normalizedToken)}`, { replace: true });
                } else {
                    setError("System busy. Please try again.");
                }
            } catch (e) {
                console.error(e);
                setError("Error processing link.");
            }
        };

        processToken();
    }, [token, navigate]);

    if (error) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="text-center p-8 bg-white rounded-2xl shadow-xl">
                    <div className="text-red-500 mb-4">
                        <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                    </div>
                    <h2 className="text-xl font-bold text-gray-900 mb-2">Link Error</h2>
                    <p className="text-gray-600">{error}</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-white">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-primary border-r-2 mb-4"></div>
            <h2 className="text-xl font-black text-gray-900 tracking-tight">Verifying Link...</h2>
            <p className="text-gray-400 text-sm mt-2">Please wait while we secure your connection.</p>
        </div>
    );
};

export default VerifyPage;
