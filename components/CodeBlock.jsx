'use client';

import { useState } from 'react';
import toast from 'react-hot-toast';

export default function CodeBlock({ code, language = 'javascript' }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      toast.success('Copied to clipboard!');
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      toast.error('Failed to copy');
    }
  };

  return (
    <div data-testid="code-block" className="my-4 bg-gray-900 text-gray-100 rounded-lg overflow-hidden">
      <div className="flex items-center justify-between px-4 py-2 bg-gray-800 border-b border-gray-700">
        <span className="text-sm font-medium text-gray-400">{language}</span>
        <button
          data-testid="code-block-copy"
          onClick={handleCopy}
          className="px-3 py-1 text-sm bg-gray-700 hover:bg-gray-600 rounded transition"
        >
          {copied ? '✓ Copied' : 'Copy'}
        </button>
      </div>
      <pre className="px-4 py-3 overflow-x-auto">
        <code>{code}</code>
      </pre>
    </div>
  );
}
