import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

const SafeLinkPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const destination = searchParams.get('url');
  const [step, setStep] = useState(1);
  const [timer, setTimer] = useState(10);
  const [isTimerRunning, setIsTimerRunning] = useState(true);
  const [canContinue, setCanContinue] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [linkReady, setLinkReady] = useState(false);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isTimerRunning && timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    } else if (timer === 0) {
      setCanContinue(true);
      setIsTimerRunning(false);
    }
    return () => clearInterval(interval);
  }, [isTimerRunning, timer]);

  const handleStep1Continue = () => {
    setStep(2);
    setTimer(10); // Reset timer for step 2 if needed, or just use logic
    setCanContinue(false);
    setIsTimerRunning(true);
    window.scrollTo(0, 0);
  };

  const handleGenerateLink = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
      setLinkReady(true);
    }, 3000); // Simulate 3s delay
  };

  const handleGoToLink = () => {
    if (destination) {
      window.location.href = destination;
    } else {
      alert('No destination URL found!');
    }
  };

  if (!destination) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center p-8 bg-white rounded-2xl shadow-lg">
          <h1 className="text-2xl font-bold text-red-500 mb-2">Error</h1>
          <p className="text-gray-600">Invalid destination link.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center py-10 px-4">
      {/* Progress Header */}
      <div className="w-full max-w-md bg-white rounded-xl shadow-sm p-4 mb-6 border border-gray-100">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-semibold text-gray-500">Step {step}/2</span>
          <span className="text-sm font-semibold text-blue-600">
            {step === 1 ? 'Verification' : 'Link Generation'}
          </span>
        </div>
        <div className="w-full bg-gray-100 rounded-full h-2">
            <div 
                className="bg-blue-600 h-2 rounded-full transition-all duration-500 ease-out"
                style={{ width: step === 1 ? '50%' : '100%' }}
            ></div>
        </div>
      </div>

      {/* Main Content Card */}
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100 relative">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"></div>
        
        <div className="p-8 text-center space-y-6">
            
          {/* Step 1 Content */}
          {step === 1 && (
            <div className="space-y-6 animate-fade-in">
              <div className="relative w-24 h-24 mx-auto flex items-center justify-center">
                 <svg className="w-full h-full text-blue-100" viewBox="0 0 100 100">
                    <circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" strokeWidth="8" />
                 </svg>
                 <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-3xl font-bold text-blue-600">{timer}</span>
                 </div>
              </div>
              
              <div className="bg-orange-50 border border-orange-100 rounded-xl p-4">
                 <p className="text-orange-700 font-medium">Please wait {timer} seconds...</p>
                 <p className="text-xs text-orange-500 mt-1">Scroll down and click continue when ready</p>
              </div>

              {/* Fake Ad Area */}
              <div className="border-2 border-dashed border-gray-200 rounded-xl p-6 bg-gray-50">
                  <p className="text-gray-400 text-sm font-medium">Advertisement Area</p>
                  <div className="mt-2 h-20 bg-gray-200/50 rounded animate-pulse"></div>
              </div>

              {canContinue ? (
                <button
                  onClick={handleStep1Continue}
                  className="w-full py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl font-bold shadow-lg hover:shadow-blue-500/30 transform transition hover:-translate-y-1 active:translate-y-0"
                >
                  Click to Continue
                </button>
              ) : (
                <button
                  disabled
                  className="w-full py-4 bg-gray-200 text-gray-400 rounded-xl font-bold cursor-not-allowed"
                >
                  Please Wait...
                </button>
              )}
            </div>
          )}

          {/* Step 2 Content */}
          {step === 2 && (
            <div className="space-y-6 animate-fade-in">
                {!linkReady ? (
                    <>
                        <div className="bg-blue-50 p-6 rounded-2xl mb-4">
                            <h3 className="font-bold text-blue-800 mb-2">Final Step</h3>
                            <p className="text-blue-600 text-sm">Your link is almost ready.</p>
                        </div>
                        
                        {/* Fake Ad Area */}
                        <div className="border-2 border-dashed border-gray-200 rounded-xl p-6 bg-gray-50 mb-6">
                            <p className="text-gray-400 text-sm font-medium">Advertisement Area</p>
                            <div className="mt-2 h-20 bg-gray-200/50 rounded animate-pulse"></div>
                        </div>

                        <button
                            onClick={handleGenerateLink}
                            disabled={isGenerating}
                            className={`w-full py-4 rounded-xl font-bold shadow-lg transition-all ${
                                isGenerating 
                                ? 'bg-purple-100 text-purple-400 cursor-wait' 
                                : 'bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:shadow-purple-500/30 transform hover:-translate-y-1'
                            }`}
                        >
                            {isGenerating ? 'Generating...' : 'Generate Link'}
                        </button>
                    </>
                ) : (
                    <div className="space-y-4">
                        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                            </svg>
                        </div>
                        <h2 className="text-2xl font-bold text-gray-800">Link Ready!</h2>
                        <p className="text-gray-500">You can now proceed to your destination.</p>
                        
                        <button
                            onClick={handleGoToLink}
                            className="w-full py-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl font-bold shadow-lg hover:shadow-green-500/30 transform transition hover:-translate-y-1 active:translate-y-0"
                        >
                            Get Link
                        </button>
                    </div>
                )}
            </div>
          )}
        </div>
      </div>
      
      <div className="mt-8 text-center text-gray-400 text-xs">
        <p>Copyright © 2024 SafeLink. All rights reserved.</p>
        <div className="flex justify-center space-x-4 mt-2">
            <span>Privacy Policy</span>
            <span>Terms of Service</span>
        </div>
      </div>

    </div>
  );
};

export default SafeLinkPage;
