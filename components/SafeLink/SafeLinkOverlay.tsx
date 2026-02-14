import React from 'react';

interface SafeLinkOverlayProps {
    step: 'verification' | 'timer';
    timer: number;
    initialTimer: number;
    onVerify: () => void;
    onFinish: () => void;
    isProcessing: boolean;
}

const SafeLinkOverlay: React.FC<SafeLinkOverlayProps> = ({
    step,
    timer,
    initialTimer,
    onVerify,
    onFinish,
    isProcessing
}) => {
    const progressWidth = ((initialTimer - timer) / initialTimer) * 100;

    return (
        <div className="my-8 w-full max-w-2xl mx-auto">
            {/* Human Verification Step */}
            {step === 'verification' && (
                <div className={`hmv ${isProcessing ? 'alt' : ''}`} id="hmVrfy">
                    <div className="hmvH bef">Verify that You are not a Robot</div>
                    <div className="hmvH aft">Are you a Robot?</div>

                    <div className="hmvD">
                        <svg viewBox="0 0 50 50" x="0px" y="0px">
                            <path d="M25.251,6.461c-10.318,0-18.683,8.365-18.683,18.683h4.068c0-8.071,6.543-14.615,14.615-14.615V6.461z">
                                <animateTransform attributeName="transform" attributeType="xml" dur="0.6s" from="0 25 25" repeatCount="indefinite" to="360 25 25" type="rotate" />
                            </path>
                        </svg>
                        Generating Link... Please Wait
                    </div>

                    <button className="button pstL" onClick={onVerify} disabled={isProcessing}>
                        I am not a Robot
                    </button>
                </div>
            )}

            {/* Timer Step */}
            {step === 'timer' && (
                <div className="aSlT" id="aSlCnt">
                    <div className="w-full">
                        <div className="aSlP" style={{ display: timer > 0 ? 'flex' : 'none' }}>
                            <div className="aSlW" style={{ width: `${progressWidth}%` }} />
                            <span className="aSlC">
                                Please wait <span className="aSlCd">{timer}</span> seconds...
                            </span>
                        </div>

                        <div className={`aScr ${timer === 0 ? 'visible' : ''}`}>
                            <div className="aScrH">
                                Scroll Down and click on <span className="hglt">Go to Link</span> for destination
                            </div>
                            <div className="aScrD">
                                <svg className="line" viewBox="0 0 24 24">
                                    <path d="M22 11.07V12a10 10 0 1 1-5.93-9.14" />
                                    <polyline points="23 3 12 14 9 11" />
                                </svg>
                                Congrats! Link is Generated
                            </div>
                        </div>

                        <div className={`aSlB ${timer === 0 ? 'visible' : ''}`}>
                            <a
                                href="#"
                                className="button safeGoL"
                                title="Go to Link"
                                onClick={(e) => {
                                    e.preventDefault();
                                    onFinish();
                                }}
                            >
                                <i className="icon demo"></i>Go to Link
                            </a>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default SafeLinkOverlay;
