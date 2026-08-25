'use client';

import type { ReactNode } from 'react';

const NAV = ['Dashboard', 'Repairs', 'Collections', 'Stock returns', 'Reports'];
const ACTIVE = 'Repairs';

/** Sidebar + main column shared by both branch-portal screens. */
export default function PortalShell({ children }: { children: ReactNode }) {
  return (
    <div
      style={{
        minHeight: '100%',
        display: 'flex',
        background: 'var(--color-bg)',
        fontFamily: 'var(--font-body)',
        color: 'var(--color-text)',
      }}
    >
      <div
        style={{
          width: 216,
          flex: 'none',
          background: 'var(--color-accent-700)',
          color: 'var(--color-neutral-100)',
          padding: '24px 18px',
          display: 'flex',
          flexDirection: 'column',
          gap: 26,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div
            style={{
              width: 32,
              height: 32,
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
          <div style={{ fontFamily: 'var(--font-heading)', fontSize: 15, lineHeight: 1.1 }}>
            TVSH Service
            <br />
            Portal
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 4, fontSize: 13 }}>
          {NAV.map((item) =>
            item === ACTIVE ? (
              <div
                key={item}
                style={{
                  padding: '9px 12px',
                  borderRadius: 999,
                  background: 'rgba(249,244,237,.18)',
                  fontWeight: 600,
                }}
              >
                {item}
              </div>
            ) : (
              <div key={item} style={{ padding: '9px 12px', borderRadius: 999, opacity: 0.75 }}>
                {item}
              </div>
            )
          )}
        </div>

        <div style={{ marginTop: 'auto', fontSize: 12, lineHeight: 1.5, opacity: 0.8 }}>
          <div style={{ fontWeight: 600, opacity: 1 }}>Africa Unity Square</div>
          <div>Tanaka M · Consultant</div>
          <div>Till 3 · Harare CBD</div>
        </div>
      </div>

      <div
        style={{
          flex: 1,
          padding: '26px 32px 34px',
          display: 'flex',
          flexDirection: 'column',
          gap: 22,
          minWidth: 0,
        }}
      >
        {children}
      </div>
    </div>
  );
}
