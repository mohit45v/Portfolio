import React, { useEffect, useState } from 'react';
import { Eye } from 'lucide-react';

// The old counterapi.dev v1 endpoint is permanently gone (HTTP 410 — deprecated),
// and v2 requires a registered workspace. Rather than fire a request that always
// fails, the counter stays dormant until a real API is configured.
//
// Set VITE_API_URL in .env once the portfolio API ships; the counter then reads
// `${VITE_API_URL}/v1/views` and renders itself automatically.
const API_URL = import.meta.env.VITE_API_URL;

export const PageViews = () => {
  const [views, setViews] = useState(null);

  useEffect(() => {
    if (!API_URL) return;

    const controller = new AbortController();

    fetch(`${API_URL}/v1/views`, { method: 'POST', signal: controller.signal })
      .then(res => (res.ok ? res.json() : Promise.reject(new Error(`HTTP ${res.status}`))))
      .then(data => {
        if (typeof data?.count === 'number') setViews(data.count);
      })
      .catch(() => {
        // Decorative: never let a counter outage change what the page shows.
      });

    return () => controller.abort();
  }, []);

  if (views === null) return null;

  return (
    <div className="flex items-center gap-2 text-text-muted bg-white/5 px-3 py-1 rounded-full border border-white/10 font-mono text-xs">
      <Eye size={14} className="text-primary" />
      <span>{views.toLocaleString()} views</span>
    </div>
  );
};
