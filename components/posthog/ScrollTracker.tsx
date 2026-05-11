// components/posthog/ScrollTracker.tsx

"use client";

import { useEffect, useRef } from 'react';
import { usePostHog } from 'posthog-js/react';

interface ScrollTrackerProps {
  sectionName: string;
}

export default function ScrollTracker({ sectionName }: ScrollTrackerProps) {
  const ref = useRef<HTMLDivElement>(null);
  const posthog = usePostHog();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && posthog) {
          posthog.capture('section_viewed', {
            section_name: sectionName,
          });
          observer.disconnect(); 
        }
      },
      { threshold: 0.1 } 
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [posthog, sectionName]);

  return <div ref={ref} className="h-[1px] w-full invisible" aria-hidden="true" />;
}
