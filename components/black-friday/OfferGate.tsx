"use client";

/**
 * OfferGate keeps /black-friday honest after it has loaded.
 *
 * The server decides the state when it renders the page (server time). This
 * component then carries on counting from that server timestamp, so a
 * visitor whose computer clock is wrong still sees the right countdown, and
 * when the deadline passes with the page open it swaps everything for the
 * ended state: no price, no countdown, no spots and no form.
 */
import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

type Offer = { remaining: number; ended: boolean };

const OfferContext = createContext<Offer>({ remaining: 0, ended: false });

export const useOffer = () => useContext(OfferContext);

export function OfferGate({
  serverNow,
  deadline,
  ended,
  children,
}: {
  /** Date.now() on the server when the page was rendered. */
  serverNow: number;
  deadline: number;
  /** What to show once the offer has ended. */
  ended: ReactNode;
  children: ReactNode;
}) {
  // First render matches the server exactly, so hydration never mismatches.
  const [remaining, setRemaining] = useState(deadline - serverNow);

  useEffect(() => {
    // How far this device's clock is from the server's.
    const skew = serverNow - Date.now();
    const tick = () => setRemaining(deadline - (Date.now() + skew));
    tick();
    const id = window.setInterval(tick, 1000);
    // Background tabs throttle timers, so check again when the tab returns.
    document.addEventListener("visibilitychange", tick);
    return () => {
      window.clearInterval(id);
      document.removeEventListener("visibilitychange", tick);
    };
  }, [serverNow, deadline]);

  const isEnded = remaining <= 0;

  return (
    <OfferContext.Provider value={{ remaining, ended: isEnded }}>
      {isEnded ? ended : children}
    </OfferContext.Provider>
  );
}
