import React from 'react';
import { SeoHead } from '@/components/SeoHead';
import { Breadcrumbs } from '@/components/Layout';
import { glossaryTerms } from '@/data/glossary';
import { generateDefinedTermSetSchema, generateBreadcrumbSchema } from '@/utils/schema';
import { siteConfig } from '@/config/site';

export default function GlossaryPage() {
    // Group terms alphabetically
    const groupedTerms = glossaryTerms.reduce((acc, item) => {
        const firstLetter = item.term[0].toUpperCase();
        if (!acc[firstLetter]) {
            acc[firstLetter] = [];
        }
        acc[firstLetter].push(item);
        return acc;
    }, {} as Record<string, typeof glossaryTerms>);

    const sortedLetters = Object.keys(groupedTerms).sort();

    // Generate Schema
    const glossarySchema = generateDefinedTermSetSchema(glossaryTerms, siteConfig.url.current);
    const breadcrumbSchema = generateBreadcrumbSchema([
        { label: 'Главная', path: '/' },
        { label: 'Глоссарий' }
    ], siteConfig.url.current);

    return (
        <div className="container mx-auto px-4 py-8">
            <SeoHead
                title="Глоссарий кальянных терминов - Hookapedia"
                description="Полный словарь терминов кальянной индустрии. Узнайте, что такое оверпак, мелассоуловитель, касание и другие понятия."
                schema={glossarySchema}
            />

            {/* Breadcrumb Schema */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
            />

            <Breadcrumbs items={[
                { label: 'Главная', path: '/' },
                { label: 'Глоссарий' }
            ]} />

            <div className="max-w-4xl mx-auto">
                <div className="text-center mb-12">
                    <h1 className="text-3xl md:text-5xl font-bold text-white mb-4">Глоссарий</h1>
                    <p className="text-muted text-lg max-w-2xl mx-auto">
                        Справочник основных терминов и понятий кальянной культуры.
                        От новичка до профи — говорим на одном языке.
                    </p>
                </div>

                <div className="space-y-12">
                    {sortedLetters.map((letter) => (
                        <section key={letter} className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                            <div className="flex items-center gap-4 mb-6">
                                <h2 className="text-4xl font-bold text-primary opacity-80">{letter}</h2>
                                <div className="h-px bg-white/10 flex-grow" />
                            </div>

                            <div className="grid gap-4">
                                {groupedTerms[letter].map((item, index) => (
                                    <div
                                        key={index}
                                        className="group bg-surface rounded-xl p-6 border border-white/5 hover:border-primary/30 transition-all duration-300 hover:shadow-[0_0_20px_rgba(225,29,72,0.1)]"
                                    >
                                        <h3 className="text-xl font-bold text-white mb-2 group-hover:text-primary transition-colors">
                                            {item.term}
                                        </h3>
                                        <p className="text-muted leading-relaxed">
                                            {item.definition}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </section>
                    ))}
                </div>

                <div className="mt-16 p-8 rounded-2xl bg-gradient-to-br from-surface to-surface-light border border-white/10 text-center">
                    <h2 className="text-2xl font-bold text-white mb-3">Не нашли нужный термин?</h2>
                    <p className="text-muted mb-6">
                        Мы постоянно пополняем нашу базу знаний. Если вы не нашли определение какого-то термина,
                        напишите нам, и мы обязательно его добавим.
                    </p>
                    <a
                        href="mailto:info@hookapedia.ru"
                        className="inline-flex items-center justify-center px-6 py-3 rounded-xl bg-primary text-white font-bold hover:bg-primary-dark transition-colors"
                    >
                        Предложить термин
                    </a>
                </div>
            </div>
        </div>
    );
}
