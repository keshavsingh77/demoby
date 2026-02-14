import React, { useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { fetchRandomPostId } from '../services/bloggerService';
import { SafeLinkCrypto } from '../utils/crypto';

const SafeLinkPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [url, setUrl] = useState('');
  const [generatedLink, setGeneratedLink] = useState('');
  const [isCopied, setIsCopied] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  React.useEffect(() => {
    const autoUrl = searchParams.get('url');
    if (autoUrl) {
      setUrl(autoUrl);
      handleAutoProcess(autoUrl);
    }
  }, [searchParams]);

  const handleAutoProcess = async (targetUrl: string) => {
    setLoading(true);
    try {
      const postId = await fetchRandomPostId();
      if (!postId) {
        setError("Failed to fetch post ID.");
        setLoading(false);
        return;
      }
      const encryptedUrl = SafeLinkCrypto.encode(targetUrl);
      // Automatically redirect to the verification flow
      navigate(`/post/${postId}?step=1&url=${encodeURIComponent(encryptedUrl)}`);
    } catch (err) {
      console.error(err);
      setError("Error processing link.");
      setLoading(false);
    }
  };

  const handleGenerate = async () => {
    if (!url) {
      setError("Please enter a URL.");
      return;
    }
    setError(null);
    setLoading(true);

    try {
      const postId = await fetchRandomPostId();
      if (!postId) {
        setError("Failed to fetch a random post ID. Please try again.");
        return;
      }

      const encryptedUrl = SafeLinkCrypto.encode(url);
      const safeLink = `${window.location.origin}${window.location.pathname}#/post/${postId}?step=1&url=${encodeURIComponent(encryptedUrl)}`;

      setGeneratedLink(safeLink);
    } catch (err) {
      console.error(err);
      setError("An error occurred while generating the link.");
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedLink);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-2xl shadow-xl">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            SafeLink Generator
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Protect your links with simple human verification.
          </p>
        </div>

        <div className="mt-8 space-y-6">
          <div className="cArea">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Enter Link here <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              className="cInpt"
              placeholder="https://example.com"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
            />
            {error && <span className="n req">{error}</span>}
          </div>

          <div className={`cArea ${generatedLink ? '' : 'hidden'}`}>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Protected Link
            </label>
            <input
              type="text"
              className="cInpt bg-gray-50"
              readOnly
              value={generatedLink}
            />
          </div>

          <div className="flex gap-4">
            {!generatedLink ? (
              <button
                onClick={handleGenerate}
                disabled={loading}
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 transition-all"
              >
                {loading ? 'Generating...' : 'Protect Link'}
              </button>
            ) : (
              <>
                <button
                  onClick={copyToClipboard}
                  className="flex-1 flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-bold text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-all"
                >
                  {isCopied ? 'Copied!' : 'Copy'}
                </button>
                <a
                  href={generatedLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex justify-center py-3 px-4 border border-gray-300 rounded-lg shadow-sm text-sm font-bold text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all"
                >
                  View
                </a>
                <button
                  onClick={() => {
                    setGeneratedLink('');
                    setUrl('');
                  }}
                  className="px-3 rounded-lg border border-gray-200 text-gray-500 hover:text-red-500 hover:border-red-500 transition-colors"
                >
                  Reset
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SafeLinkPage;
