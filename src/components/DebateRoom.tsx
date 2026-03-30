"use client";

import {
  LiveKitRoom,
  VideoTrack,
  useParticipants,
  useTracks,
  useLocalParticipant,
  useRoomContext,
} from "@livekit/components-react";
import "@livekit/components-styles";
import { Track, RoomEvent } from "livekit-client";
import { useState, useEffect, useCallback } from "react";

function DebaterVideo({
  participant,
  side,
}: {
  participant: { identity: string; name?: string; sid: string };
  side: "left" | "right";
}) {
  const tracks = useTracks([Track.Source.Camera]);
  const videoTrack = tracks.find(
    (t) => t.participant.identity === participant.identity
  );

  const bg = side === "left" ? "bg-forest/10" : "bg-gold/10";
  const badge = side === "left" ? "bg-forest text-cream" : "bg-gold text-charcoal";
  const initial = (participant.name || participant.identity).slice(0, 2).toUpperCase();

  return (
    <div className="flex-1 flex flex-col items-center p-4">
      <div className={`w-full aspect-video rounded-xl overflow-hidden ${bg} relative flex items-center justify-center`}>
        {videoTrack ? (
          <VideoTrack
            trackRef={videoTrack}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className={`w-24 h-24 rounded-full ${badge} flex items-center justify-center text-3xl font-serif font-bold shadow-xl`}>
            {initial}
          </div>
        )}
        <div className="absolute bottom-2 left-2 bg-black/60 text-white text-xs px-2 py-1 rounded-full">
          {participant.name || participant.identity}
        </div>
      </div>
    </div>
  );
}

function AudienceCounter() {
  const participants = useParticipants();
  const room = useRoomContext();
  const [count, setCount] = useState(participants.length);

  const updateCount = useCallback(() => {
    setCount(room.numParticipants);
  }, [room]);

  useEffect(() => {
    setCount(participants.length);
    room.on(RoomEvent.ParticipantConnected, updateCount);
    room.on(RoomEvent.ParticipantDisconnected, updateCount);
    return () => {
      room.off(RoomEvent.ParticipantConnected, updateCount);
      room.off(RoomEvent.ParticipantDisconnected, updateCount);
    };
  }, [room, participants.length, updateCount]);

  return (
    <div className="flex items-center gap-1.5 text-charcoal/60">
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        <path d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
      </svg>
      <span className="text-sm font-semibold">{count}</span>
    </div>
  );
}

function DebateControls({ onLeave }: { onLeave: () => void }) {
  const { localParticipant } = useLocalParticipant();
  const [micEnabled, setMicEnabled] = useState(true);
  const [camEnabled, setCamEnabled] = useState(true);
  const canPublish = localParticipant.permissions?.canPublish ?? false;

  const toggleMic = async () => {
    await localParticipant.setMicrophoneEnabled(!micEnabled);
    setMicEnabled(!micEnabled);
  };

  const toggleCam = async () => {
    await localParticipant.setCameraEnabled(!camEnabled);
    setCamEnabled(!camEnabled);
  };

  return (
    <div className="flex items-center justify-center gap-3 py-4">
      {canPublish && (
        <>
          <button
            onClick={toggleMic}
            className={`w-12 h-12 rounded-full flex items-center justify-center transition-colors ${
              micEnabled ? "bg-forest text-cream" : "bg-red-500 text-white"
            }`}
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              {micEnabled ? (
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" />
              )}
            </svg>
          </button>
          <button
            onClick={toggleCam}
            className={`w-12 h-12 rounded-full flex items-center justify-center transition-colors ${
              camEnabled ? "bg-forest text-cream" : "bg-red-500 text-white"
            }`}
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              {camEnabled ? (
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
              )}
            </svg>
          </button>
        </>
      )}
      <button
        onClick={onLeave}
        className="px-6 h-12 rounded-full bg-red-500 text-white font-semibold flex items-center gap-2 hover:bg-red-600 transition-colors"
      >
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
        </svg>
        Ka Bax
      </button>
    </div>
  );
}

function RoomContent({ onLeave }: { onLeave: () => void }) {
  const participants = useParticipants();
  const debaters = participants.filter(
    (p) => p.permissions?.canPublish
  );

  return (
    <div className="min-h-screen bg-cream">
      <div className="bg-forest-dark text-cream">
        <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2 bg-red-600/90 px-3 py-1 rounded-full text-xs font-bold">
            <span className="w-2 h-2 bg-white rounded-full animate-live-pulse" />
            TOOS AH
          </div>
          <h1 className="font-serif font-bold text-lg">Dood Toos ah</h1>
          <AudienceCounter />
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-6">
        <div className="bg-cream-light rounded-2xl shadow-xl overflow-hidden border-l-4 border-l-forest">
          <div className="flex flex-col sm:flex-row">
            {debaters.length > 0 ? (
              debaters.slice(0, 2).map((p, i) => (
                <DebaterVideo
                  key={p.sid}
                  participant={p}
                  side={i === 0 ? "left" : "right"}
                />
              ))
            ) : (
              <div className="flex-1 flex items-center justify-center py-20 text-charcoal/40">
                <p className="font-serif text-lg">Sugitaan... Doodayaasha wali kama soo galinin</p>
              </div>
            )}
          </div>
        </div>

        <div className="mt-4 bg-cream-light rounded-xl shadow-md">
          <DebateControls onLeave={onLeave} />
        </div>
      </div>
    </div>
  );
}

export default function DebateRoom({
  token,
  wsUrl,
  onLeave,
}: {
  token: string;
  wsUrl: string;
  onLeave: () => void;
}) {
  return (
    <LiveKitRoom
      token={token}
      serverUrl={wsUrl}
      connect={true}
      video={true}
      audio={true}
      data-lk-theme="default"
    >
      <RoomContent onLeave={onLeave} />
    </LiveKitRoom>
  );
}
