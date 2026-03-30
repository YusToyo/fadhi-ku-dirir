"use client";

import { archivedDebates, categories } from "@/lib/mock-data";
import Link from "next/link";
import { useState } from "react";

export default function ArchivePage() {
  const [activeCategory, setActiveCategory] = useState("Dhammaan");

  const filtered =
    activeCategory === "Dhammaan"
      ? archivedDebates
      : archivedDebates.filter((d) => d.category === activeCategory);

  return (
    <div className="min-h-screen bg-cream mic-pattern">
      {/* Header */}
      <section className="bg-cream border-b-2 border-gold py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold mb-3 text-charcoal">
            Kaydka Doodaha
          </h1>
          <p className="text-forest/70 text-lg">Past Debates Archive</p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Category Filter */}
        <div className="flex flex-wrap gap-2 mb-8 justify-center">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
                activeCategory === cat
                  ? "bg-forest text-cream shadow-md"
                  : "bg-white text-charcoal/60 hover:text-forest hover:bg-forest/5 border border-forest/10"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Debate Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((debate) => (
            <Link
              key={debate.id}
              href={`/debate/${debate.id}`}
              className="bg-cream-light rounded-xl shadow-md hover:shadow-xl transition-all overflow-hidden group border-t-4 border-t-forest"
            >
              {/* Thumbnail placeholder */}
              <div className="aspect-video bg-gradient-to-br from-forest/10 to-gold/10 relative flex items-center justify-center">
                <div className="flex gap-4">
                  <div className="w-16 h-16 rounded-full bg-forest text-cream flex items-center justify-center text-lg font-serif font-bold shadow-lg">
                    {debate.debaters[0].avatar}
                  </div>
                  <div className="w-16 h-16 rounded-full bg-gold text-charcoal flex items-center justify-center text-lg font-serif font-bold shadow-lg">
                    {debate.debaters[1].avatar}
                  </div>
                </div>

                {/* Winner badge */}
                {debate.winner && (
                  <div className="absolute top-3 right-3 bg-gold text-charcoal px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1">
                    <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                    </svg>
                    Guulaystay
                  </div>
                )}

                {/* Play overlay */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all flex items-center justify-center">
                  <div className="w-14 h-14 rounded-full bg-white/90 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-lg">
                    <svg className="w-6 h-6 text-forest ml-1" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                </div>

                {/* Category tag */}
                <div className="absolute top-3 left-3">
                  <span className="bg-white/90 text-forest text-xs font-semibold px-2.5 py-1 rounded-full">
                    {debate.category}
                  </span>
                </div>
              </div>

              <div className="p-5">
                <h3 className="font-serif font-bold text-lg mb-1 group-hover:text-forest transition-colors line-clamp-2">
                  {debate.topic}
                </h3>
                <p className="text-charcoal/40 text-sm mb-3">{debate.topicEn}</p>

                <div className="flex items-center justify-between text-sm">
                  <div className="text-charcoal/50">
                    {debate.debaters[0].name} vs {debate.debaters[1].name}
                  </div>
                </div>

                {/* Stats */}
                <div className="flex items-center justify-between mt-3 pt-3 border-t border-forest/5 text-xs text-charcoal/40">
                  <span>
                    {new Date(debate.date).toLocaleDateString("so-SO", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </span>
                  <div className="flex items-center gap-1">
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                      <path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                    {debate.viewCount?.toLocaleString()}
                  </div>
                </div>

                {/* Winner Bar */}
                {debate.winner && (
                  <div className="mt-3">
                    <div className="h-1.5 bg-cream rounded-full overflow-hidden flex">
                      <div
                        className="bg-forest h-full rounded-l-full"
                        style={{ width: `${debate.debaters[0].pollPercentage}%` }}
                      />
                      <div
                        className="bg-gold h-full rounded-r-full"
                        style={{ width: `${debate.debaters[1].pollPercentage}%` }}
                      />
                    </div>
                    <p className="text-xs text-forest font-semibold mt-1">
                      Guulaystay: {debate.winner}
                    </p>
                  </div>
                )}
              </div>
            </Link>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-20 text-charcoal/40">
            <p className="font-serif text-xl">Wali dood lama helin qaybtan.</p>
            <p className="text-sm mt-1">No debates found in this category.</p>
          </div>
        )}
      </div>
    </div>
  );
}
