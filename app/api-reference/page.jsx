'use client';

import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';

const SwaggerUI = dynamic(() => import('swagger-ui-react'), {
  ssr: false,
  loading: () => <div className="p-8">Loading API Reference...</div>,
});

export default function ApiReferencePage() {
  const [spec, setSpec] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/openapi.json')
      .then((res) => res.json())
      .then((data) => {
        setSpec(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Failed to load API spec:', err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div className="p-8">Loading API Reference...</div>;
  }

  if (!spec) {
    return (
      <div className="p-8">
        <h1>API Reference</h1>
        <p>Failed to load API specification.</p>
      </div>
    );
  }

  return (
    <div className="p-4">
      <SwaggerUI spec={spec} />
    </div>
  );
}
