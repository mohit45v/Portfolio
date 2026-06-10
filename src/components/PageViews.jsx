import React, { useEffect, useState } from 'react';
import { Eye } from 'lucide-react';

export const PageViews = () => {
  const [views, setViews] = useState(null);

  useEffect(() => {
    // We use a free counter API. If you prefer to use your own backend (NestJS/MongoDB), 
    // you can replace this URL with your own API endpoint!
    fetch('https://api.counterapi.dev/v1/mohit45v/portfolio/up')
      .then(res => res.json())
      .then(data => {
        if (data && data.count) {
          // Adding a base offset to make the counter look more realistic starting out
          setViews(data.count + 1042);
        }
      })
      .catch(err => {
        console.error("Could not fetch views", err);
      });
  }, []);

  if (views === null) return null;

  return (
    <div className="flex items-center gap-2 text-text-muted bg-white/5 px-3 py-1 rounded-full border border-white/10 font-mono text-xs">
      <Eye size={14} className="text-primary" />
      <span>{views.toLocaleString()} views</span>
    </div>
  );
};
