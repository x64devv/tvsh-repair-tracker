'use client';

import { Check } from 'lucide-react';
import type { CSSProperties } from 'react';
import { DAYS_LEFT, LAST_STAGE, RETURN_BLURB, STAGES, type ReturnMethod } from '../../lib/repair';

const tile: CSSProperties = {
  flex: 1,
  background: 'var(--color-bg)',
  borderRadius: 'var(--radius-md)',
  padding: '12px 14px',
};

const tileLabel: CSSProperties = {
  fontSize: 11,
  textTransform: 'uppercase',
  letterSpacing: '.1em',
  color: 'var(--color-neutral-600)',
};

const tileValue: CSSProperties = {
  fontFamily: 'var(--font-heading)',
  fontSize: 17,
  marginTop: 3,
};

function ReturnOption({
  label,
  selected,
  onClick,
}: {
  label: string;
  selected: boolean;
  onClick: () => void;
}) {
  return (
    <div
      onClick={onClick}
      style={{
        flex: 1,
        borderRadius: 999,
        padding: 12,
        textAlign: 'center',
        fontSize: 14,
        cursor: 'pointer',
        ...(selected
          ? { fontWeight: 600, background: 'var(--color-accent)', color: 'var(--color-bg)' }
          : { background: 'var(--color-bg)', border: '1px solid var(--color-divider)' }),
      }}
    >
      {label}
    </div>
  );
}

/** Customer · repair status — the core screen. */
export default function StatusScreen({
  stage,
  ret,
  noteOpen,
  rating,
  rated,
  onToggleNote,
  onPick,
  onSetRating,
  onSendRating,
  onOpenChat,
  onOpenRepair,
  onReset,
}: {
  stage: number;
  ret: ReturnMethod;
  noteOpen: boolean;
  rating: number;
  rated: boolean;
  onToggleNote: () => void;
  onPick: (r: ReturnMethod) => void;
  onSetRating: (n: number) => void;
  onSendRating: () => void;
  onOpenChat: () => void;
  onOpenRepair: () => void;
  onReset: () => void;
}) {
  const isReady = stage === LAST_STAGE;
  const stepNo = stage + 1;
  const pct = Math.round(((stage + 1) / STAGES.length) * 100) + '%';

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', background: 'var(--color-bg)' }}>
      {/* header */}
      <div
        style={{
          padding: '58px 22px 12px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          background: 'var(--color-bg)',
        }}
      >
        <div
          style={{
            fontSize: 12,
            letterSpacing: '.14em',
            textTransform: 'uppercase',
            color: 'var(--color-neutral-600)',
          }}
        >
          Job TVSH-49281
        </div>
        <div className="tag tag-outline" style={{ fontSize: 11, whiteSpace: 'nowrap', flex: 'none' }}>
          Under warranty
        </div>
      </div>

      {/* scrollable body */}
      <div
        style={{
          flex: 1,
          overflow: 'auto',
          padding: '8px 22px 20px',
          display: 'flex',
          flexDirection: 'column',
          gap: 18,
        }}
      >
        {isReady ? (
          <div
            style={{
              background: 'var(--color-accent-2-500)',
              borderRadius: 'var(--radius-lg)',
              padding: 24,
              color: 'var(--color-neutral-100)',
              display: 'flex',
              flexDirection: 'column',
              gap: 12,
            }}
          >
            <div
              style={{
                width: 44,
                height: 44,
                borderRadius: 999,
                background: 'rgba(249,244,237,.2)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Check size={22} color="#f9f4ed" strokeWidth={2.75} />
            </div>
            <div style={{ fontFamily: 'var(--font-heading)', fontSize: 28, lineHeight: 1.1 }}>
              It&apos;s back at your branch
            </div>
            <div style={{ fontSize: 15, lineHeight: 1.5 }}>
              Waiting for you at Africa Unity Square. Bring your ID and job number. Total turnaround: 10
              days.
            </div>
          </div>
        ) : (
          <div
            style={{
              background: 'var(--color-accent-100)',
              borderRadius: 'var(--radius-lg)',
              padding: 22,
              display: 'flex',
              flexDirection: 'column',
              gap: 18,
              boxShadow: 'var(--shadow-sm)',
            }}
          >
            <div style={{ display: 'flex', gap: 18, alignItems: 'center' }}>
              <div style={{ position: 'relative', width: 100, height: 100, flex: 'none' }}>
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    borderRadius: 999,
                    background: `conic-gradient(var(--color-accent) 0 ${pct}, var(--color-accent-200) ${pct} 100%)`,
                  }}
                />
                <div
                  style={{
                    position: 'absolute',
                    inset: 11,
                    borderRadius: 999,
                    background: 'var(--color-accent-100)',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <div style={{ fontFamily: 'var(--font-heading)', fontSize: 25, lineHeight: 1 }}>
                    {stepNo}
                  </div>
                  <div
                    style={{
                      fontSize: 10,
                      letterSpacing: '.1em',
                      textTransform: 'uppercase',
                      color: 'var(--color-neutral-700)',
                    }}
                  >
                    of 8 steps
                  </div>
                </div>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                <div style={{ fontFamily: 'var(--font-heading)', fontSize: 24, lineHeight: 1.1 }}>
                  {STAGES[stage].name}
                </div>
                <div style={{ fontSize: 14, lineHeight: 1.45, color: 'var(--color-neutral-800)' }}>
                  {STAGES[stage].blurb}
                </div>
              </div>
            </div>
            <div style={{ display: 'flex', gap: 10 }}>
              <div style={tile}>
                <div style={tileLabel}>Ready around</div>
                <div style={tileValue}>Fri, 21 Aug</div>
              </div>
              <div style={tile}>
                <div style={tileLabel}>That&apos;s about</div>
                <div style={tileValue}>{DAYS_LEFT[stage]}</div>
              </div>
            </div>
          </div>
        )}

        {/* product row */}
        <div
          style={{
            display: 'flex',
            gap: 14,
            alignItems: 'center',
            background: 'var(--color-neutral-100)',
            borderRadius: 'var(--radius-lg)',
            padding: '14px 16px',
          }}
        >
          <div
            style={{
              width: 54,
              height: 54,
              borderRadius: 'var(--radius-md)',
              background: 'var(--color-neutral-300)',
              flex: 'none',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 10,
              color: 'var(--color-neutral-700)',
              textAlign: 'center',
            }}
          >
            product
            <br />
            photo
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            <div style={{ fontWeight: 600, fontSize: 15 }}>Samsung 55&quot; QLED TV</div>
            <div style={{ fontSize: 13, color: 'var(--color-neutral-700)' }}>
              Logged 11 Aug · Africa Unity Square
            </div>
            <div style={{ fontSize: 13, color: 'var(--color-neutral-700)' }}>
              Fault: no picture, sound only
            </div>
          </div>
        </div>

        {/* timeline */}
        <div>
          <div style={{ fontFamily: 'var(--font-heading)', fontSize: 19, marginBottom: 14 }}>
            The journey so far
          </div>
          {STAGES.map((s, i) => {
            const done = i < stage;
            const current = i === stage;
            const hasLine = i < STAGES.length - 1;
            return (
              <div key={s.name} style={{ display: 'grid', gridTemplateColumns: '24px 1fr', gap: 14 }}>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  {done && (
                    <div
                      style={{
                        width: 22,
                        height: 22,
                        borderRadius: 999,
                        background: 'var(--color-accent-2-500)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <Check size={12} color="#f9f4ed" strokeWidth={3.5} />
                    </div>
                  )}
                  {current && (
                    <div
                      style={{
                        width: 22,
                        height: 22,
                        borderRadius: 999,
                        background: 'var(--color-accent)',
                        boxShadow: '0 0 0 5px var(--color-accent-200)',
                      }}
                    />
                  )}
                  {!done && !current && (
                    <div
                      style={{
                        width: 22,
                        height: 22,
                        borderRadius: 999,
                        background: 'var(--color-neutral-200)',
                        border: '2px solid var(--color-neutral-300)',
                        boxSizing: 'border-box',
                      }}
                    />
                  )}
                  {hasLine && (
                    <div
                      style={{
                        width: 2,
                        flex: 1,
                        minHeight: 30,
                        background: 'var(--color-neutral-300)',
                      }}
                    />
                  )}
                </div>
                <div style={{ paddingBottom: 18 }}>
                  {current ? (
                    <div
                      style={{
                        fontFamily: 'var(--font-heading)',
                        fontSize: 17,
                        color: 'var(--color-accent-700)',
                      }}
                    >
                      {s.name}
                    </div>
                  ) : (
                    <div style={{ fontWeight: 600, fontSize: 15 }}>{s.name}</div>
                  )}
                  <div
                    style={{
                      fontSize: 13,
                      lineHeight: 1.5,
                      color: 'var(--color-neutral-700)',
                      marginTop: 3,
                    }}
                  >
                    {s.meta}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* technician note */}
        <div
          onClick={onToggleNote}
          style={{
            background: 'var(--color-accent-2-100)',
            border: '1px solid var(--color-accent-2-300)',
            borderRadius: 'var(--radius-lg)',
            padding: '18px 20px',
            display: 'flex',
            flexDirection: 'column',
            gap: 8,
            cursor: 'pointer',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 10 }}>
            <div
              style={{
                fontSize: 11,
                textTransform: 'uppercase',
                letterSpacing: '.1em',
                color: 'var(--color-accent-2-700)',
              }}
            >
              Note from the technician
            </div>
            <div style={{ fontSize: 12, color: 'var(--color-accent-2-700)' }}>
              {noteOpen ? 'Hide' : 'Show'}
            </div>
          </div>
          {noteOpen && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              <div style={{ fontSize: 14, lineHeight: 1.55 }}>&quot;{STAGES[stage].note}&quot;</div>
              <div style={{ fontSize: 12, color: 'var(--color-neutral-700)' }}>
                Tafara M · PSU Kelvin Road, Graniteside
              </div>
            </div>
          )}
        </div>

        {/* return method */}
        <div
          style={{
            background: 'var(--color-neutral-100)',
            borderRadius: 'var(--radius-lg)',
            padding: '18px 20px',
            display: 'flex',
            flexDirection: 'column',
            gap: 12,
          }}
        >
          <div style={{ fontFamily: 'var(--font-heading)', fontSize: 18 }}>
            How would you like it back?
          </div>
          <div style={{ display: 'flex', gap: 10 }}>
            <ReturnOption
              label="Collect at branch"
              selected={ret === 'collect'}
              onClick={() => onPick('collect')}
            />
            <ReturnOption
              label="Deliver to me"
              selected={ret === 'deliver'}
              onClick={() => onPick('deliver')}
            />
          </div>
          <div style={{ fontSize: 13, color: 'var(--color-neutral-700)', lineHeight: 1.5 }}>
            {RETURN_BLURB[ret]}
          </div>
        </div>

        {/* rating */}
        {isReady && (
          <div
            style={{
              background: 'var(--color-accent-100)',
              borderRadius: 'var(--radius-lg)',
              padding: 20,
              display: 'flex',
              flexDirection: 'column',
              gap: 14,
            }}
          >
            <div style={{ fontFamily: 'var(--font-heading)', fontSize: 19 }}>How did we do?</div>
            {rated ? (
              <div style={{ fontSize: 14, lineHeight: 1.55 }}>
                Thank you — {rating} out of 5 sent to Africa Unity Square. The branch manager sees this on
                their weekly service report.
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                <div style={{ display: 'flex', gap: 9 }}>
                  {[1, 2, 3, 4, 5].map((n) => (
                    <div
                      key={n}
                      onClick={() => onSetRating(n)}
                      style={{
                        width: 46,
                        height: 46,
                        borderRadius: 999,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontWeight: 600,
                        cursor: 'pointer',
                        ...(n <= rating
                          ? { background: 'var(--color-accent)', color: 'var(--color-bg)' }
                          : { background: 'var(--color-bg)' }),
                      }}
                    >
                      {n}
                    </div>
                  ))}
                </div>
                <div style={{ fontSize: 12, color: 'var(--color-neutral-700)' }}>1 = poor · 5 = excellent</div>
                <textarea
                  className="input"
                  style={{ borderRadius: 'var(--radius-md)', fontSize: 14 }}
                  placeholder="Anything you'd like the branch to know?"
                />
                <button
                  className="btn btn-primary"
                  style={{ borderRadius: 999, minHeight: 46 }}
                  onClick={onSendRating}
                >
                  Send feedback
                </button>
              </div>
            )}
          </div>
        )}

        <button
          className="btn btn-secondary btn-block"
          style={{ borderRadius: 999, minHeight: 48, marginTop: 0 }}
          onClick={onOpenChat}
        >
          Ask a question on WhatsApp
        </button>
        <div
          style={{
            fontSize: 12,
            color: 'var(--color-neutral-600)',
            textAlign: 'center',
            paddingBottom: 8,
          }}
        >
          We&apos;ll message you the moment anything changes.
        </div>
      </div>

      {/* tab bar */}
      <div
        style={{
          display: 'flex',
          borderTop: '1px solid var(--color-divider)',
          background: 'var(--color-neutral-100)',
          padding: '10px 0 34px',
        }}
      >
        <div
          onClick={onOpenRepair}
          style={{
            flex: 1,
            textAlign: 'center',
            fontSize: 12,
            fontWeight: 600,
            color: 'var(--color-accent-700)',
            cursor: 'pointer',
          }}
        >
          My repair
        </div>
        <div
          onClick={onOpenChat}
          style={{
            flex: 1,
            textAlign: 'center',
            fontSize: 12,
            color: 'var(--color-neutral-700)',
            cursor: 'pointer',
          }}
        >
          Ask us
        </div>
        <div
          onClick={onReset}
          style={{
            flex: 1,
            textAlign: 'center',
            fontSize: 12,
            color: 'var(--color-neutral-700)',
            cursor: 'pointer',
          }}
        >
          Branch portal
        </div>
      </div>
    </div>
  );
}
