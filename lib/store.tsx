"use client";

import { createContext, useContext, useState, useCallback, useRef, useEffect, ReactNode } from "react";
import {
  Booking,
  Invoice,
  BizFilter,
  SEED_BOOKINGS,
  SEED_INVOICES,
} from "./data";
import { Lang } from "./i18n";

interface Store {
  biz: BizFilter;
  setBiz: (b: BizFilter) => void;
  lang: Lang;
  setLang: (l: Lang) => void;
  bookings: Booking[];
  addBooking: (b: Booking) => void;
  invoices: Invoice[];
  syncAllXero: () => void;
  toastMsg: string | null;
  toast: (msg: string) => void;
}

const Ctx = createContext<Store | null>(null);

export function StoreProvider({ children }: { children: ReactNode }) {
  const [biz, setBiz] = useState<BizFilter>("ALL");
  // default to English (primary audience); hydrate saved choice after mount
  const [lang, setLangState] = useState<Lang>("en");
  const [bookings, setBookings] = useState<Booking[]>(SEED_BOOKINGS);
  const [invoices, setInvoices] = useState<Invoice[]>(SEED_INVOICES);
  const [toastMsg, setToastMsg] = useState<string | null>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // restore persisted language without causing a hydration mismatch
  useEffect(() => {
    const saved = typeof window !== "undefined" ? window.localStorage.getItem("reef-lang") : null;
    if (saved === "en" || saved === "ja") setLangState(saved);
  }, []);

  const setLang = useCallback((l: Lang) => {
    setLangState(l);
    if (typeof window !== "undefined") window.localStorage.setItem("reef-lang", l);
  }, []);

  const toast = useCallback((msg: string) => {
    setToastMsg(msg);
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => setToastMsg(null), 2600);
  }, []);

  const addBooking = useCallback((b: Booking) => {
    setBookings((prev) => [b, ...prev]);
  }, []);

  const syncAllXero = useCallback(() => {
    setInvoices((prev) => prev.map((i) => ({ ...i, xero: "synced" as const })));
  }, []);

  return (
    <Ctx.Provider
      value={{ biz, setBiz, lang, setLang, bookings, addBooking, invoices, syncAllXero, toastMsg, toast }}
    >
      {children}
    </Ctx.Provider>
  );
}

export function useStore() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useStore must be used within StoreProvider");
  return ctx;
}
