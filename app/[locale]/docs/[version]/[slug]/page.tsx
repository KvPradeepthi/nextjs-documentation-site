import React, { useState } from 'react';
import Search from '@/components/Search';
import TableOfContents from '@/components/TableOfContents';
import CodeBlock from '@/components/CodeBlock';
import FeedbackWidget from '@/components/FeedbackWidget';

interface DocPageProps {
  params: {
    locale: string;
    version: string;
    slug: string;
  };
}

export async function generateStaticParams() {
  const versions = ['v1', 'v2', 'v3'];
  const locales = ['en', 'es', 'fr', 'de'];
  const slugs = ['introduction', 'getting-started', 'api-basics', 'examples', 'faq'];

  const paths = [];
  for (const locale of locales) {
    for (const version of versions) {
      for (const slug of slugs) {
        paths.push({
          locale,
          version,
          slug,
        });
      }
    }
  }
  return paths;
}

export const dynamicParams = true;
export const revalidate = 60;

const DOCS = {
  en: {
    introduction: 'Welcome to our documentation',
    'getting-started': 'Getting Started Guide',
  },
  es: {
    introduction: 'Bienvenido a nuestra documentación',
    'getting-started': 'Guía de introducción',
  },
  fr: {
    introduction: 'Bienvenue dans notre documentation',
    'getting-started': 'Guide de démarrage',
  },
  de: {
    introduction: 'Willkommen zu unserer Dokumentation',
    'getting-started': 'Erste Schritte',
  },
};

export default function DocPage({ params }: DocPageProps) {
  return (
    <div className="flex h-full">
      <main className="flex-1 overflow-auto">
        <article className="max-w-3xl mx-auto p-8">
          <Search />
          
          <div data-testid="doc-content">
            <h1>{DOCS[params.locale as keyof typeof DOCS]?.[params.slug as any] || params.slug}</h1>
            
            <section>
              <h2>Overview</h2>
              <p>This is the documentation page for {params.slug} in {params.locale} version {params.version}</p>
              
              <CodeBlock code='console.log("Hello, World!");' language="javascript" />
            </section>
            
            <TableOfContents />
          </div>
          
          <FeedbackWidget />
        </article>
      </main>
    </div>
  );
}
