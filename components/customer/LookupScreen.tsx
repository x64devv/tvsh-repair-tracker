'use client';

import type { CSSProperties } from 'react';

const pillInput: CSSProperties = {
  borderRadius: 999,
  minHeight: 48,
  padding: '10px 18px',
  fontSize: 16,
};

/** Customer · manual lookup. */
export default function LookupScreen({
  onOpenRepair,
  onOpenChat,
}: {
  onOpenRepair: () => void;
  onOpenChat: () => void;
}) {
  return (
    <div
      style={{
        height: '100%',
        boxSizing: 'border-box',
        padding: '62px 22px 44px',
        background: 'var(--color-bg)',
        display: 'flex',
        flexDirection: 'column',
        gap: 24,
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <div
          style={{
            width: 34,
            height: 34,
            borderRadius: 999,
            background: 'var(--color-accent)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'var(--color-bg)',
            fontFamily: 'var(--font-heading)',
            fontSize: 15,
          }}
        >
          T
        </div>
        <div style={{ fontFamily: 'var(--font-heading)', fontSize: 16 }}>TV Sales &amp; Home</div>
      </div>

      <div>
        <h2
          style={{
            fontFamily: 'var(--font-heading)',
            fontSize: 33,
            lineHeight: 1.08,
            margin: '0 0 10px',
          }}
        >
          Track your repair
        </h2>
        <p style={{ margin: 0, fontSize: 15, lineHeight: 1.55, color: 'var(--color-neutral-700)' }}>
          Pop in the job number from your branch slip and we&apos;ll show you exactly where your product
          is.
        </p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        <div className="field">
          <label htmlFor="job-number">Job number</label>
          <input id="job-number" className="input" style={pillInput} defaultValue="TVSH-49281" />
        </div>
        <div className="field">
          <label htmlFor="mobile-number">Mobile number</label>
          <input id="mobile-number" className="input" style={pillInput} defaultValue="077 461 0937" />
        </div>
        <button
          className="btn btn-primary btn-block"
          style={{ borderRadius: 999, minHeight: 52, fontSize: 16 }}
          onClick={onOpenRepair}
        >
          Show me my repair
        </button>
      </div>

      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 12,
          color: 'var(--color-neutral-600)',
          fontSize: 12,
        }}
      >
        <div style={{ flex: 1, height: 1, background: 'var(--color-divider)' }} />
        or
        <div style={{ flex: 1, height: 1, background: 'var(--color-divider)' }} />
      </div>

      <div
        style={{
          background: 'var(--color-accent-2-200)',
          borderRadius: 'var(--radius-lg)',
          padding: '20px 22px',
          display: 'flex',
          flexDirection: 'column',
          gap: 8,
        }}
      >
        <div style={{ fontFamily: 'var(--font-heading)', fontSize: 17 }}>Arrive by link instead</div>
        <div style={{ fontSize: 14, lineHeight: 1.5, color: 'var(--color-accent-2-800)' }}>
          Tapping the link in the WhatsApp from the branch opens your status with no login at all.
        </div>
        <button
          className="btn btn-secondary"
          style={{
            borderRadius: 999,
            alignSelf: 'flex-start',
            marginTop: 6,
            borderColor: 'var(--color-accent-2-600)',
            color: 'var(--color-accent-2-800)',
          }}
          onClick={onOpenChat}
        >
          Open the WhatsApp chat
        </button>
      </div>

      <div style={{ marginTop: 'auto', fontSize: 12, color: 'var(--color-neutral-600)' }}>
        Lost your slip? Any branch can re-send the link.
      </div>
    </div>
  );
}
