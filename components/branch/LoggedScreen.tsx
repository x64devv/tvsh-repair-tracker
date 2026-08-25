'use client';

import { Check } from 'lucide-react';
import type { CSSProperties } from 'react';

const kicker: CSSProperties = {
  fontSize: 11,
  letterSpacing: '.14em',
  textTransform: 'uppercase',
  color: 'var(--color-neutral-600)',
};

const summaryRow: CSSProperties = {
  display: 'flex',
  justifyContent: 'space-between',
  fontSize: 13,
};

const SUMMARY: [string, string][] = [
  ['Customer', 'Rudo Chikwanha · 077 461 0937'],
  ['Product', 'Samsung 55" QLED TV'],
  ['Fault', 'No picture, sound only'],
  ['Destination', 'PSU Kelvin Road, Graniteside'],
  ['Cover', 'In warranty · no charge'],
];

/** Branch portal · repair logged. */
export default function LoggedScreen({
  onOpenRepair,
  onOpenTrack,
}: {
  onOpenRepair: () => void;
  onOpenTrack: () => void;
}) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 22 }}>
      <div>
        <div style={kicker}>Repairs · TVSH-49281</div>
        <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: 31, margin: '6px 0 0' }}>
          Repair logged
        </h1>
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1.15fr .85fr',
          gap: 26,
          alignItems: 'start',
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
          <div
            style={{
              background: 'var(--color-accent-2-500)',
              borderRadius: 'var(--radius-lg)',
              padding: 26,
              color: 'var(--color-neutral-100)',
              display: 'flex',
              gap: 18,
              alignItems: 'center',
            }}
          >
            <div
              style={{
                width: 48,
                height: 48,
                flex: 'none',
                borderRadius: 999,
                background: 'rgba(249,244,237,.2)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Check size={24} color="#f9f4ed" strokeWidth={2.75} />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              <div style={{ fontFamily: 'var(--font-heading)', fontSize: 25, lineHeight: 1.1 }}>
                Job TVSH-49281 created
              </div>
              <div style={{ fontSize: 14, lineHeight: 1.5 }}>
                Booked in at Africa Unity Square and queued for the Graniteside service centre. Slip
                printed for the customer.
              </div>
            </div>
          </div>

          <div
            className="card"
            style={{
              borderRadius: 'var(--radius-lg)',
              display: 'flex',
              flexDirection: 'column',
              gap: 12,
            }}
          >
            <div className="card-kicker">Job summary</div>
            {SUMMARY.map(([label, value]) => (
              <div key={label} style={summaryRow}>
                <span style={{ color: 'var(--color-neutral-700)' }}>{label}</span>
                <span style={{ fontWeight: 600 }}>{value}</span>
              </div>
            ))}
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
          <div
            className="card"
            style={{
              borderRadius: 'var(--radius-lg)',
              display: 'flex',
              flexDirection: 'column',
              gap: 12,
            }}
          >
            <div className="card-kicker">Sent to the customer</div>
            <div
              style={{
                background: 'var(--color-bg)',
                borderRadius: 14,
                padding: 14,
                fontSize: 13,
                lineHeight: 1.5,
              }}
            >
              Hi Rudo 👋 Your Samsung 55&quot; QLED is booked in at Africa Unity Square. Job TVSH-49281.
              Track it any time: <span style={{ color: 'var(--color-accent-700)' }}>tvsh.co.zw/r/49281</span>
            </div>
            <div style={{ fontSize: 12, color: 'var(--color-neutral-700)' }}>
              WhatsApp delivered · SMS delivered · slip printed
            </div>
          </div>

          <div style={{ fontSize: 13, lineHeight: 1.6, color: 'var(--color-neutral-800)' }}>
            Rudo leaves the branch already able to see the status. No &quot;phone us next week&quot;.
          </div>

          <button
            className="btn btn-primary btn-block"
            style={{ borderRadius: 999, minHeight: 50, fontSize: 15, marginTop: 0 }}
            onClick={onOpenRepair}
          >
            Switch to Rudo&apos;s phone
          </button>
          <button className="btn btn-ghost btn-block" style={{ marginTop: 0 }} onClick={onOpenTrack}>
            Show the manual lookup screen
          </button>
        </div>
      </div>
    </div>
  );
}
