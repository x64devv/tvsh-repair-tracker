'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import PresenterPanel from '../components/PresenterPanel';
import IntakeScreen from '../components/branch/IntakeScreen';
import LoggedScreen from '../components/branch/LoggedScreen';
import PortalShell from '../components/branch/PortalShell';
import ChatScreen from '../components/customer/ChatScreen';
import LookupScreen from '../components/customer/LookupScreen';
import StatusScreen from '../components/customer/StatusScreen';
import ChromeWindow from '../components/frames/ChromeWindow';
import IOSDevice from '../components/frames/IOSDevice';
import {
  LAST_STAGE,
  PHONE_H,
  PHONE_W,
  PORTAL_H,
  PORTAL_W,
  REPLIES,
  SCREEN_LABELS,
  STAGES,
  type Msg,
  type ReturnMethod,
  type Screen,
} from '../lib/repair';

const PORTAL_TABS = [{ title: 'TVSH Service Portal' }, { title: 'Stock lookup' }];

/** window.innerWidth/innerHeight with a resize listener — SSR-safe. */
function useViewport() {
  // Matches the prototype's fallback so the first paint is sensible before mount.
  const [size, setSize] = useState({ w: 1400, h: 940 });

  useEffect(() => {
    const measure = () => setSize({ w: window.innerWidth, h: window.innerHeight });
    measure();
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, []);

  return size;
}

export default function DemoPage() {
  const [screen, setScreen] = useState<Screen>('intake');
  const [stage, setStage] = useState(0);
  const [ret, setRet] = useState<ReturnMethod>('collect');
  const [noteOpen, setNoteOpen] = useState(true);
  const [rating, setRating] = useState(0);
  const [rated, setRated] = useState(false);
  const [typing, setTyping] = useState(false);
  const [msgs, setMsgs] = useState<Msg[]>([]);
  const [panel, setPanel] = useState(false);

  const timeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  const clearPending = useCallback(() => {
    if (timeout.current) clearTimeout(timeout.current);
    timeout.current = null;
  }, []);
  useEffect(() => clearPending, [clearPending]);

  const { w: vw, h: vh } = useViewport();

  // Derived values — computed in render, never stored.
  const staffMode = screen === 'intake' || screen === 'logged';
  const stepNo = stage + 1;

  const availW = vw - 72;
  const availH = vh - 130;
  const portalScale = Math.min(1, availW / PORTAL_W, availH / PORTAL_H);
  const phoneScale = Math.min(1, availH / PHONE_H);

  // Handlers
  const ask = useCallback(
    (label: string) => {
      const at = stage;
      setMsgs((m) => [...m, { mine: true, text: label }]);
      setTyping(true);
      clearPending();
      timeout.current = setTimeout(() => {
        setMsgs((m) => [...m, { mine: false, lines: REPLIES[label](at) }]);
        setTyping(false);
      }, 900);
    },
    [stage, clearPending]
  );

  const reset = useCallback(() => {
    clearPending();
    setScreen('intake');
    setStage(0);
    setRet('collect');
    setRating(0);
    setRated(false);
    setMsgs([]);
    setTyping(false);
    setNoteOpen(true);
  }, [clearPending]);

  const logJob = () => {
    setScreen('logged');
    setStage(0);
  };
  const advance = () => setStage((s) => Math.min(LAST_STAGE, s + 1));
  const markReady = () => {
    setStage(LAST_STAGE);
    setScreen('repair');
  };
  const sendRating = () => {
    if (rating > 0) setRated(true);
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        boxSizing: 'border-box',
        padding: '36px 32px 44px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 16,
        position: 'relative',
        background: 'var(--color-bg)',
      }}
    >
      <PresenterPanel
        open={panel}
        screenLabel={SCREEN_LABELS[screen]}
        stepNo={stepNo}
        stageName={STAGES[stage].name}
        onToggle={() => setPanel((p) => !p)}
        onAdvance={advance}
        onMarkReady={markReady}
        onReset={reset}
      />

      {staffMode ? (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 14,
            alignItems: 'center',
            width: '100%',
            maxWidth: '100%',
            overflow: 'hidden',
          }}
        >
          <div
            style={{
              width: '100%',
              display: 'flex',
              justifyContent: 'center',
              height: Math.round(PORTAL_H * portalScale) + 'px',
            }}
          >
            <div style={{ transform: `scale(${portalScale})`, transformOrigin: 'top center', flex: 'none' }}>
              <ChromeWindow
                width={PORTAL_W}
                height={PORTAL_H}
                url="portal.tvsh.co.zw/service/repairs"
                tabs={PORTAL_TABS}
                activeIndex={0}
              >
                <PortalShell>
                  {screen === 'intake' ? (
                    <IntakeScreen onLogJob={logJob} />
                  ) : (
                    <LoggedScreen
                      onOpenRepair={() => setScreen('repair')}
                      onOpenTrack={() => setScreen('track')}
                    />
                  )}
                </PortalShell>
              </ChromeWindow>
            </div>
          </div>
          <span className="tag tag-accent">Branch portal · Africa Unity Square</span>
        </div>
      ) : (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 14,
            alignItems: 'center',
            width: '100%',
            overflow: 'hidden',
          }}
        >
          <div
            style={{
              width: '100%',
              display: 'flex',
              justifyContent: 'center',
              height: Math.round(PHONE_H * phoneScale) + 'px',
            }}
          >
            <div style={{ transform: `scale(${phoneScale})`, transformOrigin: 'top center', flex: 'none' }}>
              <IOSDevice width={PHONE_W} height={PHONE_H}>
                <div style={{ height: '100%', overflow: 'hidden' }}>
                  {screen === 'track' && (
                    <LookupScreen
                      onOpenRepair={() => setScreen('repair')}
                      onOpenChat={() => setScreen('chat')}
                    />
                  )}
                  {screen === 'repair' && (
                    <StatusScreen
                      stage={stage}
                      ret={ret}
                      noteOpen={noteOpen}
                      rating={rating}
                      rated={rated}
                      onToggleNote={() => setNoteOpen((n) => !n)}
                      onPick={setRet}
                      onSetRating={setRating}
                      onSendRating={sendRating}
                      onOpenChat={() => setScreen('chat')}
                      onOpenRepair={() => setScreen('repair')}
                      onReset={reset}
                    />
                  )}
                  {screen === 'chat' && (
                    <ChatScreen
                      msgs={msgs}
                      typing={typing}
                      onAsk={ask}
                      onBack={() => setScreen('repair')}
                    />
                  )}
                </div>
              </IOSDevice>
            </div>
          </div>
          <span className="tag tag-accent-2">Customer · Rudo Chikwanha</span>
        </div>
      )}
    </div>
  );
}
