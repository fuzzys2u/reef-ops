"use client";

import { useRouter } from "next/navigation";
import { useStore } from "@/lib/store";
import { BizFilter } from "@/lib/data";
import { dict, Lang } from "@/lib/i18n";

export default function Topbar({ onMenu }: { onMenu?: () => void }) {
  const { biz, setBiz, lang, setLang } = useStore();
  const router = useRouter();
  const t = dict[lang];

  const segs: { key: BizFilter; label: string; swatch?: string }[] = [
    { key: "ALL", label: t.sw_all },
    { key: "BIZ_A", label: t.sw_pdc, swatch: "var(--ocean-500)" },
    { key: "BIZ_B", label: t.sw_jqc, swatch: "var(--coral)" },
  ];
  const langs: { key: Lang; label: string }[] = [
    { key: "en", label: "EN" },
    { key: "ja", label: "日本語" },
  ];

  return (
    <header className="topbar">
      <button className="menu-btn" onClick={onMenu} aria-label="Open menu">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 12h18M3 6h18M3 18h18" />
        </svg>
      </button>
      <div className="switcher">
        {segs.map((s) => (
          <div
            key={s.key}
            className={`seg${biz === s.key ? " active" : ""}`}
            onClick={() => setBiz(s.key)}
          >
            {s.swatch && <span className="swatch" style={{ background: s.swatch }} />}
            {s.label}
          </div>
        ))}
      </div>

      <div className="search">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="11" cy="11" r="8" />
          <path d="m21 21-4.3-4.3" />
        </svg>
        <input placeholder={t.search_ph} />
      </div>

      <div className="topbar-right">
        <div className="lang-switch">
          {langs.map((l) => (
            <div
              key={l.key}
              className={`lang-seg${lang === l.key ? " active" : ""}`}
              onClick={() => setLang(l.key)}
            >
              {l.label}
            </div>
          ))}
        </div>
        <div className="icon-btn">
          <span className="badge" />
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9M13.7 21a2 2 0 0 1-3.4 0" />
          </svg>
        </div>
        <button className="btn btn-primary" onClick={() => router.push("/bookings")}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 5v14M5 12h14" />
          </svg>
          <span className="lbl">{t.new_booking}</span>
        </button>
      </div>
    </header>
  );
}
