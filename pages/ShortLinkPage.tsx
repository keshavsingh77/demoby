
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const ShortLinkPage: React.FC = () => {
    const { shortCode } = useParams<{ shortCode: string }>();
    const navigate = useNavigate();
    const [status, setStatus] = useState<string>("Initializing...");
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const resolveLink = async () => {
            if (!shortCode) return;
            setStatus("Verifying Token...");

            try {
                // Call Vercel API
                const res = await fetch(`/api/resolve?code=${shortCode}`);
                const data = await res.json();

                if (res.ok && data.url) {
                    setStatus("Redirecting...");

                    // The data.url might be a FULL URL (http...) OR a TOKEN
                    // We need to determine if it's a token for /verify/ or a full link
                    // Assuming Bot saves "clean" tokens or full URLs?
                    // Safe logic: If it looks like a URL, go there (but user wants Verification Flow!)
                    // User wants: Link -> Token Verification Flow.
                    // So Bot should save the TOKEN (e.g. Base64), NOT the full /#/verify/TOKEN URL.
                    // Or if it saves full URL, we strip it?

                    // Let's assume Bot saves whatever "target" is.
                    // If target is "https://t.me/...", we should route to /verify/BASE64(target)?
                    // Or if Bot *already* saved encoded token? 

                    // Simplest: Bot saves the "Base64 Token".
                    // API returns { url: "BASE64_TOKEN" }.
                    // We navigate to /verify/BASE64_TOKEN

                    // If API returns full URL "https://.../#/verify/TOKEN", extract TOKEN.

                    let token = data.url;
                    if (token.includes('/#/verify/')) {
                        token = token.split('/#/verify/')[1];
                    }

                    // Navigate to Verify Page
                    navigate(`/verify/${token}`, { replace: true });

                } else {
                    setError(data.error || "Link not found");
                }
            } catch (e) {
                console.error(e);
                setError("Connection Error");
            }
        };

        resolveLink();
    }, [shortCode, navigate]);

    if (error) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
                <div className="text-center">
                    <h1 className="text-3xl font-bold text-red-500 mb-2">Error</h1>
                    <p>{error}</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-black text-white">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-500 mb-6"></div>
            <h2 className="text-2xl font-semibold tracking-wider animate-pulse">{status}</h2>
        </div>
    );
};

export default ShortLinkPage;
