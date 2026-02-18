'use client';

import { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useTheme } from 'next-themes';

const LOCALES = ['en', 'es', 'fr', 'de'];

export default function Header() {
  const router = useRouter();
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const currentLocale = pathname?.split('/')[1] || 'en';

  const switchLanguage = (locale: string) => {
    const pathSegments = pathname.split('/');
    if (LOCALES.includes(pathSegments[1])) {
      pathSegments[1] = locale;
    } else {
      pathSegments.unshift(locale);
    }
    router.push(pathSegments.join('/'));
  };

  if (!mounted) return <div className="h-16 border-b" />;

  return (
    <header className="h-16 border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-slate-900 flex items-center justify-between px-6">
      <div className="flex items-center gap-4">
        <h1 className="text-xl font-bold">Docs</h1>
      </div>
      
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-2">
          <label className="text-sm font-medium">Language:</label>
          <select
            data-testid="language-switcher"
            value={currentLocale}
            onChange={(e) => switchLanguage(e.target.value)}
            className="px-3 py-1 border rounded dark:bg-slate-800 dark:border-gray-600"
          >
            {LOCALES.map((locale) => (
              <option key={locale} value={locale}>
                {locale.toUpperCase()}
              </option>
            ))}
          </select>
        </div>

        <button
          data-testid="theme-toggle"
          onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          className="px-3 py-1 border rounded dark:bg-slate-800"
        >
          {theme === 'dark' ? '☀️' : '🌙'}
        </button>
      </div>
    </header>
  );
}
