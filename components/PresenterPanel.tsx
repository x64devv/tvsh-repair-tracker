'use client';

/**
 * Presenter controls — for the person driving the demo, not the audience.
 * Stays collapsed by default.
 */
export default function PresenterPanel({
  open,
  screenLabel,
  stepNo,
  stageName,
  onToggle,
  onAdvance,
  onMarkReady,
  onReset,
}: {
  open: boolean;
  screenLabel: string;
  stepNo: number;
  stageName: string;
  onToggle: () => void;
  onAdvance: () => void;
  onMarkReady: () => void;
  onReset: () => void;
}) {
  return (
    <div
      style={{
        position: 'absolute',
        top: 20,
        right: 24,
        zIndex: 5,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-end',
        gap: 12,
      }}
    >
      {!open && (
        <div
          onClick={onToggle}
          aria-label="Presenter controls"
          style={{
            width: 36,
            height: 36,
            borderRadius: 999,
            background: 'var(--color-neutral-200)',
            color: 'var(--color-neutral-700)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            fontSize: 13,
            fontWeight: 600,
          }}
        >
          ···
        </div>
      )}

      {open && (
        <div
          className="card"
          style={{
            borderRadius: 'var(--radius-lg)',
            display: 'flex',
            flexDirection: 'column',
            gap: 14,
            boxShadow: 'var(--shadow-lg)',
            width: 340,
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 10 }}>
            <div className="card-kicker">Presenter controls</div>
            <div
              onClick={onToggle}
              style={{ cursor: 'pointer', fontSize: 13, color: 'var(--color-neutral-600)' }}
            >
              Hide
            </div>
          </div>

          <div style={{ fontSize: 13, lineHeight: 1.5, color: 'var(--color-neutral-700)' }}>
            Fake a service-centre update mid-demo — the customer&apos;s phone reacts the way it would when
            Graniteside logs a milestone.
          </div>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
            <button className="btn btn-primary" style={{ borderRadius: 999 }} onClick={onAdvance}>
              Log next PSU milestone
            </button>
            <button className="btn btn-secondary" style={{ borderRadius: 999 }} onClick={onMarkReady}>
              Jump to &quot;ready&quot;
            </button>
            <button className="btn btn-ghost" onClick={onReset}>
              Restart at the branch
            </button>
          </div>

          <div style={{ fontSize: 12, color: 'var(--color-neutral-600)' }}>
            Now showing: {screenLabel} · step {stepNo} of 8 — {stageName}
          </div>

          <div
            style={{
              borderTop: '1px solid var(--color-divider)',
              paddingTop: 12,
              display: 'flex',
              flexDirection: 'column',
              gap: 6,
              fontSize: 12,
              lineHeight: 1.6,
              color: 'var(--color-neutral-700)',
            }}
          >
            <div style={{ fontWeight: 600, color: 'var(--color-text)', fontSize: 13 }}>Demo path</div>
            <div>1 · Branch portal: capture the return, log the repair.</div>
            <div>2 · Job number issued, WhatsApp link goes out.</div>
            <div>3 · Hand over to the customer&apos;s phone.</div>
            <div>4 · Status screen, technician note, delivery switch.</div>
            <div>5 · WhatsApp prompts, then jump to &quot;ready&quot; and rate.</div>
          </div>
        </div>
      )}
    </div>
  );
}
