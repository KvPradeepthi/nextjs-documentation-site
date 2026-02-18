'use client';

import { useState, useMemo } from 'react';

const SEARCH_DATA = [
  { id: 1, title: 'Introduction', content: 'Welcome to our documentation portal' },
  { id: 2, title: 'Getting Started', content: 'Get started with our platform' },
  { id: 3, title: 'API Basics', content: 'Learn the basics of our API' },
  { id: 4, title: 'Examples', content: 'See examples of how to use' },
  { id: 5, title: 'FAQ', content: 'Frequently asked questions' },
];

export default function Search() {
  const [query, setQuery] = useState('');

  const results = useMemo(() => {
    if (!query.trim()) return [];
    
    return SEARCH_DATA.filter((item) =>
      item.title.toLowerCase().includes(query.toLowerCase()) ||
      item.content.toLowerCase().includes(query.toLowerCase())
    );
  }, [query]);

  return (
    <div className="mb-8">
      <input
        data-testid="search-input"
        type="text"
        placeholder="Search documentation..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="w-full px-4 py-2 border rounded-lg dark:bg-slate-800 dark:border-gray-600"
      />
      
      {query && (
        <div data-testid="search-results" className="mt-4 space-y-2">
          {results.length > 0 ? (
            results.map((result) => (
              <div key={result.id} className="p-3 border rounded hover:bg-gray-50 dark:hover:bg-slate-800">
                <h4 className="font-semibold">{result.title}</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">{result.content}</p>
              </div>
            ))
          ) : (
            <div data-testid="search-no-results" className="p-4 text-center text-gray-500">
              No results found for "{query}"
            </div>
          )}
        </div>
      )}
    </div>
  );
}
