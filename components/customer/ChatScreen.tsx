'use client';

import { ArrowRight, ChevronLeft } from 'lucide-react';
import { useEffect, useRef } from 'react';
import { PROMPTS, type Msg } from '../../lib/repair';

/** Customer · WhatsApp assistant. */
export default function ChatScreen({
  msgs,
  typing,
  onAsk,
  onBack,
}: {
  msgs: Msg[];
  typing: boolean;
  onAsk: (label: string) => void;
  onBack: () => void;
}) {
  const transcriptRef = useRef<HTMLDivElement>(null);

  // Keep the newest bubble in view without ever scrolling the page behind the frame.
  useEffect(() => {
    const el = transcriptRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [msgs, typing]);

  return (
    <div
      style={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        background: 'var(--color-neutral-200)',
      }}
    >
      {/* header */}
      <div
        style={{
          padding: '58px 18px 14px',
          background: 'var(--color-accent-2-800)',
          color: 'var(--color-neutral-100)',
          display: 'flex',
          alignItems: 'center',
          gap: 12,
        }}
      >
        <div style={{ cursor: 'pointer', padding: 4, display: 'flex' }} onClick={onBack}>
          <ChevronLeft size={20} color="#f9f4ed" strokeWidth={2.75} />
        </div>
        <div
          style={{
            width: 36,
            height: 36,
            borderRadius: 999,
            background: 'var(--color-accent)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontFamily: 'var(--font-heading)',
            fontSize: 15,
            color: 'var(--color-bg)',
          }}
        >
          T
        </div>
        <div>
          <div style={{ fontWeight: 600, fontSize: 15 }}>TV Sales &amp; Home</div>
          <div style={{ fontSize: 12, opacity: 0.75 }}>Repair assistant · replies instantly</div>
        </div>
      </div>

      {/* transcript */}
      <div
        ref={transcriptRef}
        style={{
          flex: 1,
          overflow: 'auto',
          padding: '16px 16px 8px',
          display: 'flex',
          flexDirection: 'column',
          gap: 10,
        }}
      >
        <div
          style={{
            alignSelf: 'center',
            background: 'var(--color-neutral-300)',
            borderRadius: 999,
            padding: '4px 12px',
            fontSize: 11,
            color: 'var(--color-neutral-800)',
          }}
        >
          Today
        </div>

        {msgs.map((m, i) =>
          m.mine ? (
            <div
              key={i}
              style={{
                alignSelf: 'flex-end',
                maxWidth: '78%',
                background: 'var(--color-accent-2-200)',
                borderRadius: '18px 18px 4px 18px',
                padding: '11px 14px',
                fontSize: 14,
                lineHeight: 1.45,
              }}
            >
              {m.text}
            </div>
          ) : (
            <div
              key={i}
              style={{
                alignSelf: 'flex-start',
                maxWidth: '84%',
                background: 'var(--color-neutral-100)',
                borderRadius: '18px 18px 18px 4px',
                padding: '12px 14px',
                fontSize: 14,
                lineHeight: 1.5,
                display: 'flex',
                flexDirection: 'column',
                gap: 8,
              }}
            >
              {m.lines.map((line, j) => (
                <div key={j}>{line}</div>
              ))}
            </div>
          )
        )}

        {typing && (
          <div
            style={{
              alignSelf: 'flex-start',
              background: 'var(--color-neutral-100)',
              borderRadius: 18,
              padding: '11px 15px',
              display: 'flex',
              gap: 5,
            }}
          >
            <div style={{ width: 7, height: 7, borderRadius: 999, background: 'var(--color-neutral-400)' }} />
            <div style={{ width: 7, height: 7, borderRadius: 999, background: 'var(--color-neutral-500)' }} />
            <div style={{ width: 7, height: 7, borderRadius: 999, background: 'var(--color-neutral-400)' }} />
          </div>
        )}
      </div>

      {/* prompt chips */}
      <div
        style={{
          padding: '10px 14px 12px',
          display: 'flex',
          gap: 8,
          flexWrap: 'wrap',
          background: 'var(--color-neutral-200)',
        }}
      >
        {PROMPTS.map((label) => (
          <div
            key={label}
            onClick={() => onAsk(label)}
            style={{
              background: 'var(--color-neutral-100)',
              border: '1px solid var(--color-neutral-300)',
              borderRadius: 999,
              padding: '9px 14px',
              fontSize: 13,
              cursor: 'pointer',
            }}
          >
            {label}
          </div>
        ))}
      </div>

      {/* composer (static by design — the chips stand in for free text) */}
      <div
        style={{
          padding: '4px 14px 40px',
          background: 'var(--color-neutral-200)',
          display: 'flex',
          gap: 10,
          alignItems: 'center',
        }}
      >
        <div
          style={{
            flex: 1,
            background: 'var(--color-neutral-100)',
            borderRadius: 999,
            padding: '12px 16px',
            fontSize: 14,
            color: 'var(--color-neutral-600)',
          }}
        >
          Tap a question above
        </div>
        <div
          style={{
            width: 44,
            height: 44,
            borderRadius: 999,
            background: 'var(--color-accent)',
            flex: 'none',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <ArrowRight size={20} color="#f5ead8" strokeWidth={2.75} />
        </div>
      </div>
    </div>
  );
}
