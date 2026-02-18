'use client';

import { useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';

const NAV_ITEMS = [
  { slug: 'introduction', label: 'Introduction' },
  { slug: 'getting-started', label: 'Getting Started' },
  { slug: 'api-basics', label: 'API Basics' },
  { slug: 'examples', label: 'Examples' },
  { slug: 'faq', label: 'FAQ' },
];

const VERSIONS = ['v1', 'v2', 'v3'];

export default function Sidebar() {
  const router = useRouter();
  const pathname = usePathname();
  const [expanded, setExpanded] = useState(true);

  const segments = pathname.split('/');
  const currentVersion = segments.find(v => VERSIONS.includes(v)) || 'v1';
  const currentLocale = segments.find(l => ['en', 'es', 'fr', 'de'].includes(l)) || 'en';

  const switchVersion = (version: string) => {
    const newPath = pathname.replace(currentVersion, version);
    router.push(newPath);
  };

  return (
    <aside
      data-testid="sidebar"
      className={`w-64 border-r border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-slate-900 overflow-y-auto transition-all`}
    >
      <div className="p-6 space-y-6">
        <div>
          <label className="block text-sm font-semibold mb-2">Version</label>
          <select
            data-testid="version-selector"
            value={currentVersion}
            onChange={(e) => switchVersion(e.target.value)}
            className="w-full px-3 py-2 border rounded dark:bg-slate-800 dark:border-gray-600"
          >
            {VERSIONS.map((version) => (
              <option key={version} value={version} data-testid={`version-option-${version}`}>
                {version}
              </option>
            ))}
          </select>
        </div>

        <nav>
          <h3 className="text-xs font-semibold text-gray-600 dark:text-gray-400 mb-3">DOCUMENTATION</h3>
          <ul className="space-y-2">
            {NAV_ITEMS.map((item) => (
              <li key={item.slug}>
                <a
                  data-testid={`sidebar-nav-link-${item.slug}`}
                  href={`/${currentLocale}/docs/${currentVersion}/${item.slug}`}
                  className="block px-3 py-2 rounded hover:bg-gray-200 dark:hover:bg-slate-800 transition"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </aside>
  );
}
