
import React, { useEffect, useRef, useState } from 'react';
import { ADSENSE_CLIENT, ADSENSE_SLOT } from '../constants';

interface AdUnitProps {
  className?: string;
  style?: React.CSSProperties;
}

const AdUnit: React.FC<AdUnitProps> = ({ className = '', style }) => {
  const adRef = useRef<HTMLModElement>(null);
  const [isPushed, setIsPushed] = useState(false);

  useEffect(() => {
    // Only attempt to push if the script is loaded and we haven't pushed for this specific instance yet
    if (typeof window !== 'undefined' && !isPushed) {
      const timer = setTimeout(() => {
        try {
          // Check if the element still exists and has width to prevent "availableWidth=0" error
          if (adRef.current && adRef.current.offsetWidth > 0) {
            // @ts-ignore
            (window.adsbygoogle = window.adsbygoogle || []).push({});
            setIsPushed(true);
          } else if (adRef.current) {
            // If width is still 0, retry once after a longer delay or just log silently
            console.warn('AdSense: Container width is 0, skipping push to avoid error.');
          }
        } catch (e) {
          // Silently handle common AdSense errors that don't break the app
          if (process.env.NODE_ENV === 'development') {
            console.error('AdSense push error:', e);
          }
        }
      }, 150); // Small delay to ensure layout is complete

      return () => clearTimeout(timer);
    }
  }, [isPushed]);

  return (
    <div className={`ad-container overflow-hidden my-6 min-h-[100px] w-full ${className}`}>
      <ins
        ref={adRef}
        className="adsbygoogle"
        style={style || { display: 'block', minWidth: '250px', minHeight: '90px' }}
        data-ad-client={ADSENSE_CLIENT}
        data-ad-slot={ADSENSE_SLOT}
        data-ad-format="auto"
        data-full-width-responsive="true"
      ></ins>
    </div>
  );
};

export default AdUnit;
