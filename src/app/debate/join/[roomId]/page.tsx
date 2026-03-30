"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import dynamic from "next/dynamic";

const DebateRoom = dynamic(() => import("@/components/DebateRoom"), {
  ssr: false,
});

type Role = "debaterA" | "debaterB" | "audience";

export default function JoinPage() {
  const params = useParams();
  const router = useRouter();
  const roomId = params.roomId as string;

  const [name, setName] = useState("");
  const [role, setRole] = useState<Role>("audience");
  const [token, setToken] = useState<string | null>(null);
  const [wsUrl, setWsUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleJoin = async () => {
    if (!name.trim()) {
      setError("Fadlan gali magacaaga");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/token", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          roomName: roomId,
          participantName: name.trim(),
          role: role === "audience" ? "audience" : "debater",
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to get token");
      }

      setToken(data.token);
      setWsUrl(data.wsUrl);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Khalad ayaa dhacay");
    } finally {
      setLoading(false);
    }
  };

  const handleLeave = () => {
    setToken(null);
    setWsUrl(null);
    router.push(`/debate/${roomId}`);
  };

  if (token && wsUrl) {
    return <DebateRoom token={token} wsUrl={wsUrl} onLeave={handleLeave} />;
  }

  const roles: { value: Role; label: string; desc: string }[] = [
    { value: "debaterA", label: "Doodayaha A", desc: "Muuji video & codka" },
    { value: "debaterB", label: "Doodayaha B", desc: "Muuji video & codka" },
    { value: "audience", label: "Daawade", desc: "Daawo kaliya" },
  ];

  return (
    <div className="min-h-screen bg-cream flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="bg-cream-light rounded-2xl shadow-xl p-8 border-l-4 border-l-forest">
          <div className="text-center mb-8">
            <h1 className="font-serif text-3xl font-bold text-forest mb-2">
              Ku Biir Doodda
            </h1>
            <p className="text-charcoal/50 text-sm">
              Qolka: <span className="font-semibold text-charcoal/70">{roomId}</span>
            </p>
          </div>

          {error && (
            <div className="mb-4 p-3 rounded-lg bg-red-50 text-red-600 text-sm">
              {error}
            </div>
          )}

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-charcoal/70 mb-2">
                Magacaaga
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Gali magacaaga..."
                className="w-full bg-cream rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-forest/20 placeholder:text-charcoal/30"
                onKeyDown={(e) => e.key === "Enter" && handleJoin()}
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-charcoal/70 mb-2">
                Doorka
              </label>
              <div className="space-y-2">
                {roles.map((r) => (
                  <button
                    key={r.value}
                    onClick={() => setRole(r.value)}
                    className={`w-full text-left px-4 py-3 rounded-xl transition-all ${
                      role === r.value
                        ? "bg-forest text-cream shadow-md"
                        : "bg-cream hover:bg-cream-dark"
                    }`}
                  >
                    <span className="font-semibold text-sm">{r.label}</span>
                    <span className={`block text-xs mt-0.5 ${
                      role === r.value ? "text-cream/70" : "text-charcoal/40"
                    }`}>
                      {r.desc}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={handleJoin}
              disabled={loading}
              className="w-full bg-forest text-cream py-3 rounded-xl font-semibold hover:bg-forest-light transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Xiriiraya..." : "Ku Biir Doodda"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
