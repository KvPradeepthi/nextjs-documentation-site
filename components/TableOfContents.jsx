'use client';

import { useState, useEffect } from 'react';

const HEADINGS = [
  { id: 'overview', text: 'Overview', level: 2 },
  { id: 'getting-started', text: 'Getting Started', level: 2 },
  { id: 'installation', text: 'Installation', level: 3 },
  { id: 'configuration', text: 'Configuration', level: 3 },
  { id: 'usage', text: 'Usage', level: 2 },
  { id: 'examples', text: 'Examples', level: 2 },
];

export default function TableOfContents() {
  const [activeId, setActiveId] = useState('');

  useEffect(() => {
    setActiveId(HEADINGS[0]?.id || '');
  }, []);

  return (
    <nav data-testid="table-of-contents" className="mt-8 p-4 border rounded bg-gray-50 dark:bg-slate-800">
      <h3 className="font-semibold mb-4">On This Page</h3>
      <ul className="space-y-2 text-sm">
        {HEADINGS.map((heading) => (
          <li
            key={heading.id}
            style={{ marginLeft: `${(heading.level - 2) * 1.5}rem` }}
          >
            <a
              data-testid={`toc-link-${heading.id}`}
              href={`#${heading.id}`}
              data-active={activeId === heading.id}
              className={`block px-2 py-1 rounded ${
                activeId === heading.id
                  ? 'bg-blue-100 dark:bg-blue-900 text-blue-900 dark:text-blue-100 font-semibold'
                  : 'hover:bg-gray-200 dark:hover:bg-slate-700'
              }`}
              onClick={() => setActiveId(heading.id)}
            >
              {heading.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
