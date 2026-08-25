'use client';

import type { CSSProperties } from 'react';

const kicker: CSSProperties = {
  fontSize: 11,
  letterSpacing: '.14em',
  textTransform: 'uppercase',
  color: 'var(--color-neutral-600)',
};

const pillInput: CSSProperties = {
  borderRadius: 999,
  minHeight: 42,
  padding: '8px 16px',
  fontSize: 14,
};

const photoBox: CSSProperties = {
  width: 74,
  height: 56,
  borderRadius: 'var(--radius-md)',
  background: 'var(--color-neutral-200)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: 10,
  color: 'var(--color-neutral-700)',
  textAlign: 'center',
};

const row: CSSProperties = {
  display: 'flex',
  justifyContent: 'space-between',
  fontSize: 13,
  gap: 10,
};

/** Branch portal · log a repair. */
export default function IntakeScreen({ onLogJob }: { onLogJob: () => void }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 22 }}>
      <div
        style={{
          display: 'flex',
          alignItems: 'flex-end',
          justifyContent: 'space-between',
          gap: 20,
          flexWrap: 'wrap',
        }}
      >
        <div>
          <div style={kicker}>Repairs · new booking</div>
          <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: 31, margin: '6px 0 0' }}>
            Log a repair
          </h1>
        </div>
        <div style={{ display: 'flex', gap: 10 }}>
          <span className="tag tag-neutral">4 open at this branch</span>
          <span className="tag tag-accent-2">PSU collection 09:00</span>
        </div>
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1.25fr .85fr',
          gap: 26,
          alignItems: 'start',
        }}
      >
        {/* left column */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          <div
            className="card"
            style={{
              borderRadius: 'var(--radius-lg)',
              display: 'flex',
              flexDirection: 'column',
              gap: 16,
            }}
          >
            <div className="card-kicker">Customer</div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
              <div className="field">
                <label htmlFor="full-name">Full name</label>
                <input id="full-name" className="input" style={pillInput} defaultValue="Rudo Chikwanha" />
              </div>
              <div className="field">
                <label htmlFor="mobile">Mobile (WhatsApp)</label>
                <input id="mobile" className="input" style={pillInput} defaultValue="077 461 0937" />
              </div>
            </div>
            <div className="field">
              <label>Notification channel</label>
              <div style={{ display: 'flex', gap: 10 }}>
                <div
                  style={{
                    flex: 1,
                    borderRadius: 999,
                    padding: 10,
                    textAlign: 'center',
                    fontSize: 13,
                    fontWeight: 600,
                    background: 'var(--color-accent)',
                    color: 'var(--color-bg)',
                  }}
                >
                  WhatsApp + SMS
                </div>
                <div
                  style={{
                    flex: 1,
                    borderRadius: 999,
                    padding: 10,
                    textAlign: 'center',
                    fontSize: 13,
                    background: 'var(--color-bg)',
                    border: '1px solid var(--color-divider)',
                  }}
                >
                  SMS only
                </div>
                <div
                  style={{
                    flex: 1,
                    borderRadius: 999,
                    padding: 10,
                    textAlign: 'center',
                    fontSize: 13,
                    background: 'var(--color-bg)',
                    border: '1px solid var(--color-divider)',
                  }}
                >
                  Email
                </div>
              </div>
            </div>
          </div>

          <div
            className="card"
            style={{
              borderRadius: 'var(--radius-lg)',
              display: 'flex',
              flexDirection: 'column',
              gap: 16,
            }}
          >
            <div className="card-kicker">Product &amp; fault</div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
              <div className="field">
                <label htmlFor="product">Product</label>
                <input id="product" className="input" style={pillInput} defaultValue={'Samsung 55" QLED TV'} />
              </div>
              <div className="field">
                <label htmlFor="serial">Serial number</label>
                <input id="serial" className="input" style={pillInput} defaultValue="0AQ4 3H2P 8871" />
              </div>
            </div>
            <div className="field">
              <label htmlFor="fault">Reported fault</label>
              <textarea
                id="fault"
                className="input"
                style={{ borderRadius: 'var(--radius-md)', fontSize: 14, minHeight: 78 }}
                defaultValue="No picture, sound only. Started after a power cut."
              />
            </div>
            <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
              <div style={photoBox}>
                unit
                <br />
                photo
              </div>
              <div style={photoBox}>accessories</div>
              <div style={{ fontSize: 12, color: 'var(--color-neutral-700)', lineHeight: 1.5 }}>
                Condition photos taken at the counter travel with the job — protects branch and customer.
              </div>
            </div>
          </div>
        </div>

        {/* right column */}
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
            <div className="card-kicker">Warranty check</div>
            <div style={row}>
              <span style={{ color: 'var(--color-neutral-700)' }}>Purchased</span>
              <span style={{ fontWeight: 600, textAlign: 'right' }}>14 Mar 2025 · AUS branch</span>
            </div>
            <div style={row}>
              <span style={{ color: 'var(--color-neutral-700)' }}>Invoice</span>
              <span style={{ fontWeight: 600 }}>INV-AUS-208114</span>
            </div>
            <div style={{ ...row, alignItems: 'center' }}>
              <span style={{ color: 'var(--color-neutral-700)' }}>Cover</span>
              <span className="tag tag-accent-2" style={{ fontSize: 11 }}>
                In warranty · 24 months
              </span>
            </div>
            <div
              style={{
                fontSize: 12,
                color: 'var(--color-neutral-700)',
                lineHeight: 1.5,
                borderTop: '1px solid var(--color-divider)',
                paddingTop: 10,
              }}
            >
              Pulled from the sales record on the serial number — no proof of purchase needed from the
              customer.
            </div>
          </div>

          <div
            style={{
              background: 'var(--color-accent-100)',
              borderRadius: 'var(--radius-lg)',
              padding: '18px 20px',
              display: 'flex',
              flexDirection: 'column',
              gap: 10,
            }}
          >
            <div style={{ fontFamily: 'var(--font-heading)', fontSize: 17 }}>Route to</div>
            <div style={{ fontSize: 13, lineHeight: 1.55, color: 'var(--color-neutral-800)' }}>
              Product Service Centre
              <br />
              42 Kelvin Road, Graniteside, Harare
            </div>
            <div style={{ fontSize: 12, color: 'var(--color-neutral-700)' }}>
              Courier collects from this branch weekdays at 09:00. Average turnaround on TVs: 12 days.
            </div>
          </div>

          <button
            className="btn btn-primary btn-block"
            style={{ borderRadius: 999, minHeight: 50, fontSize: 15, marginTop: 0 }}
            onClick={onLogJob}
          >
            Log repair &amp; notify customer
          </button>
          <div
            style={{
              fontSize: 12,
              color: 'var(--color-neutral-600)',
              textAlign: 'center',
              lineHeight: 1.5,
            }}
          >
            Creates the job number, prints the slip and WhatsApps the tracking link to Rudo.
          </div>
        </div>
      </div>
    </div>
  );
}
