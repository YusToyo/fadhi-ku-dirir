import Link from "next/link";
import Image from "next/image";
import { liveDebate as mockLiveDebate, upcomingDebates as mockUpcoming, communityPollTopics } from "@/lib/mock-data";
import { isSanityConfigured, getLiveDebate, getDebates } from "@/lib/sanity";
import type { Debate } from "@/lib/mock-data";

export const dynamic = "force-dynamic";

function sanityToDebate(s: Record<string, unknown>): Debate {
  const nameA = (s.debaterA as Record<string, string>)?.name || "Debater A";
  const nameB = (s.debaterB as Record<string, string>)?.name || "Debater B";
  return {
    id: s.slug as string || s._id as string,
    topic: s.title as string,
    topicEn: (s.titleEn as string) || "",
    category: (s.category as string) || "Siyaasad",
    debaters: [
      { name: nameA, title: (s.debaterA as Record<string, string>)?.title || "", avatar: nameA.split(" ").map((w: string) => w[0]).join("").slice(0, 2), pollPercentage: 50 },
      { name: nameB, title: (s.debaterB as Record<string, string>)?.title || "", avatar: nameB.split(" ").map((w: string) => w[0]).join("").slice(0, 2), pollPercentage: 50 },
    ],
    date: s.scheduledAt ? new Date(s.scheduledAt as string).toISOString().split("T")[0] : "",
    time: s.scheduledAt ? new Date(s.scheduledAt as string).toLocaleTimeString("en", { hour: "2-digit", minute: "2-digit", hour12: false }) : "",
    isLive: (s.isLive as boolean) || false,
    viewers: 0,
    comments: [],
  };
}

function DebaterAvatar({ initials, side }: { initials: string; side: "left" | "right" }) {
  return (
    <div
      className={`w-20 h-20 sm:w-24 sm:h-24 rounded-full flex items-center justify-center text-xl sm:text-2xl font-serif font-bold shadow-lg ${
        side === "left"
          ? "bg-forest text-cream"
          : "bg-gold text-charcoal"
      }`}
    >
      {initials}
    </div>
  );
}

export default async function HomePage() {
  let liveDebate = mockLiveDebate;
  let upcomingDebates = mockUpcoming;

  if (isSanityConfigured()) {
    try {
      const [sanityLive, sanityAll] = await Promise.all([getLiveDebate(), getDebates()]);
      if (sanityLive) liveDebate = sanityToDebate(sanityLive);
      if (sanityAll?.length) {
        const upcoming = (sanityAll as Record<string, unknown>[])
          .filter((d: Record<string, unknown>) => !d.isLive)
          .slice(0, 3)
          .map(sanityToDebate);
        if (upcoming.length) upcomingDebates = upcoming;
      }
    } catch {
      // Fall back to mock data
    }
  }

  const d = liveDebate;

  return (
    <div className="mic-pattern">
      {/* Hero Section */}
      <section className="hero-cream py-20 sm:py-28 relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-10 left-10 w-40 h-40 border-2 border-forest rounded-full" />
          <div className="absolute bottom-10 right-10 w-60 h-60 border-2 border-forest rounded-full" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 border border-forest rounded-full" />
          <div className="absolute top-20 right-1/4 w-32 h-32 border border-gold rounded-full" />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center max-w-3xl mx-auto">
            <div className="flex justify-center mb-6">
              <Image src="/logo-transparent.png" alt="Fadhi Ku Dirir" width={100} height={100} className="h-24 w-auto drop-shadow-lg" />
            </div>
            <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-bold mb-4 tracking-tight text-charcoal">
              Madasha Doodaha<br />
              <span className="text-forest">Soomaaliyeed</span>
            </h1>
            <p className="text-xl sm:text-2xl text-forest/80 font-light mb-8">
              Daawo, Codeey, Go&apos;aanso
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/debate/live-1"
                className="bg-forest text-cream px-8 py-3.5 rounded-full font-semibold text-lg hover:bg-forest-dark transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
              >
                <span className="w-2.5 h-2.5 bg-red-500 rounded-full animate-live-pulse" />
                Daawo Live
              </Link>
              <Link
                href="/debate/live-1"
                className="border-2 border-gold text-gold px-8 py-3.5 rounded-full font-semibold text-lg hover:bg-gold hover:text-charcoal transition-all flex items-center justify-center gap-2"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z" />
                  <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
                  <line x1="12" y1="19" x2="12" y2="22" />
                </svg>
                Ka Qeybgal Doodda
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Live Debate */}
      <section className="py-16 sm:py-20 bg-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 bg-forest/10 text-forest px-4 py-1.5 rounded-full text-sm font-semibold mb-4">
              <span className="w-2 h-2 bg-forest rounded-full animate-live-pulse" />
              TOOS — LIVE NOW
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-charcoal">Doodda Socota</h2>
          </div>

          <Link href="/debate/live-1" className="block">
            <div className="bg-cream-light rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-shadow border-l-4 border-l-forest">
              <div className="bg-forest/5 px-6 py-4 border-b border-forest/10 flex items-center justify-between">
                <h3 className="font-serif text-lg sm:text-xl font-bold text-charcoal">
                  {d.topic}
                </h3>
                <span className="bg-forest text-cream text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 bg-cream rounded-full animate-live-pulse" />
                  LIVE
                </span>
              </div>

              <div className="p-6 sm:p-10">
                <p className="text-charcoal/50 text-sm text-center mb-6">{d.topicEn}</p>
                <div className="flex items-center justify-between gap-4 sm:gap-8">
                  <div className="flex-1 text-center">
                    <div className="flex justify-center">
                      <DebaterAvatar initials={d.debaters[0].avatar} side="left" />
                    </div>
                    <h4 className="font-serif font-bold text-lg mt-3">{d.debaters[0].name}</h4>
                    <p className="text-charcoal/50 text-sm">{d.debaters[0].title}</p>
                  </div>

                  <div className="flex flex-col items-center gap-3">
                    <div className="w-14 h-14 rounded-full bg-gold/20 flex items-center justify-center">
                      <span className="font-serif font-bold text-gold text-lg">VS</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-gold text-sm font-medium">
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                      {d.viewers.toLocaleString()}
                    </div>
                  </div>

                  <div className="flex-1 text-center">
                    <div className="flex justify-center">
                      <DebaterAvatar initials={d.debaters[1].avatar} side="right" />
                    </div>
                    <h4 className="font-serif font-bold text-lg mt-3">{d.debaters[1].name}</h4>
                    <p className="text-charcoal/50 text-sm">{d.debaters[1].title}</p>
                  </div>
                </div>

                <div className="mt-8">
                  <div className="flex justify-between text-sm font-semibold mb-2">
                    <span className="text-forest">{d.debaters[0].name} — {d.debaters[0].pollPercentage}%</span>
                    <span className="text-gold">{d.debaters[1].name} — {d.debaters[1].pollPercentage}%</span>
                  </div>
                  <div className="h-4 bg-cream rounded-full overflow-hidden flex">
                    <div
                      className="bg-forest h-full rounded-l-full transition-all duration-1000"
                      style={{ width: `${d.debaters[0].pollPercentage}%` }}
                    />
                    <div
                      className="bg-gold h-full rounded-r-full transition-all duration-1000"
                      style={{ width: `${d.debaters[1].pollPercentage}%` }}
                    />
                  </div>
                  <p className="text-center text-charcoal/40 text-xs mt-2">Codeynta tooska ah — Live Poll</p>
                </div>
              </div>
            </div>
          </Link>
        </div>
      </section>

      {/* Upcoming Debates */}
      <section className="py-16 bg-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-charcoal text-center mb-10">
            Doodaha Soo Socda
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {upcomingDebates.map((debate) => (
              <div
                key={debate.id}
                className="bg-cream-light rounded-xl shadow-md hover:shadow-lg transition-shadow overflow-hidden group border-t-4 border-t-forest"
              >
                <div className="p-5">
                  <span className="inline-block bg-forest/10 text-forest text-xs font-semibold uppercase tracking-wider px-3 py-1 rounded-full mb-3">
                    {debate.category}
                  </span>
                  <h3 className="font-serif font-bold text-lg mb-1 group-hover:text-forest transition-colors">
                    {debate.topic}
                  </h3>
                  <p className="text-charcoal/40 text-sm mb-4">{debate.topicEn}</p>

                  <div className="flex items-center gap-3 mb-4">
                    <div className="flex -space-x-2">
                      <div className="w-8 h-8 rounded-full bg-forest text-cream flex items-center justify-center text-xs font-bold border-2 border-cream-light">
                        {debate.debaters[0].avatar}
                      </div>
                      <div className="w-8 h-8 rounded-full bg-gold text-charcoal flex items-center justify-center text-xs font-bold border-2 border-cream-light">
                        {debate.debaters[1].avatar}
                      </div>
                    </div>
                    <div className="text-sm text-charcoal/60">
                      {debate.debaters[0].name} vs {debate.debaters[1].name}
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="text-sm text-gold font-medium">
                      <span className="font-semibold">
                        {new Date(debate.date).toLocaleDateString("so-SO", {
                          month: "short",
                          day: "numeric",
                        })}
                      </span>
                      {" "}&middot; {debate.time}
                    </div>
                    <button className="text-sm font-semibold text-forest border border-forest/30 px-4 py-1.5 rounded-full hover:bg-forest hover:text-cream transition-all">
                      Xasuusi
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 sm:py-20 bg-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-charcoal text-center mb-12">
            Sidee u Shaqeysaa?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                step: "1",
                title: "Dooro Dood",
                titleEn: "Choose a Debate",
                desc: "Ka dooro doodaha socda ama kuwa soo socda ee aad xiisaynayso.",
                icon: (
                  <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                    <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                ),
              },
              {
                step: "2",
                title: "Daawo & Codee",
                titleEn: "Daawo Live & Vote",
                desc: "Si toos ah u daawad doodda oo u codeey qofka aad taageerto.",
                icon: (
                  <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                    <path d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                    <path d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                ),
              },
              {
                step: "3",
                title: "Arag Natiijada",
                titleEn: "See Who Wins",
                desc: "Eeg qofka uu dadweynuhu taageeray oo gaaray guusha doodda.",
                icon: (
                  <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                    <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                ),
              },
            ].map((item) => (
              <div key={item.step} className="text-center group">
                <div className="relative mx-auto mb-5">
                  <div className="w-20 h-20 rounded-full bg-cream-light border-2 border-forest flex items-center justify-center mx-auto text-forest group-hover:bg-forest group-hover:text-cream transition-all duration-300">
                    {item.icon}
                  </div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-forest text-cream flex items-center justify-center text-sm font-serif font-bold">
                    {item.step}
                  </div>
                </div>
                <h3 className="font-serif font-bold text-xl mb-1 text-charcoal">{item.title}</h3>
                <p className="text-forest/60 text-xs mb-2 font-medium">{item.titleEn}</p>
                <p className="text-charcoal/60 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Community Poll */}
      <section className="py-16 sm:py-20 bg-cream-light">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-charcoal">
              U Codee Mawduuca Xiga
            </h2>
            <p className="text-forest/70 mt-2 font-medium">Vote for the next debate topic</p>
          </div>

          <div className="space-y-4">
            {communityPollTopics.map((topic) => (
              <div
                key={topic.id}
                className="bg-[#F5F0E8] rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow cursor-pointer group border border-forest/10"
              >
                <div className="flex items-start justify-between gap-4 mb-3">
                  <div className="flex-1">
                    <h4 className="font-semibold group-hover:text-forest transition-colors">{topic.topic}</h4>
                    <p className="text-charcoal/40 text-sm">{topic.topicEn}</p>
                  </div>
                  <span className="font-serif font-bold text-lg text-forest">{topic.percentage}%</span>
                </div>
                <div className="h-2.5 bg-cream-dark rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-1000 bg-forest"
                    style={{ width: `${topic.percentage}%` }}
                  />
                </div>
                <div className="flex items-center justify-between mt-2">
                  <p className="text-charcoal/30 text-xs">{topic.votes.toLocaleString()} codad</p>
                  <button className="text-xs font-semibold bg-gold text-charcoal px-4 py-1.5 rounded-full hover:bg-gold-light transition-colors opacity-0 group-hover:opacity-100">
                    Codee
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
