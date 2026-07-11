"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useStore } from "@/lib/store";
import { inBiz } from "@/lib/data";
import { dict } from "@/lib/i18n";

export default function Sidebar({ open = false, onClose }: { open?: boolean; onClose?: () => void }) {
  const pathname = usePathname();
  const { bookings, biz, lang } = useStore();
  const t = dict[lang];
  const bookingCount = bookings.filter((b) => inBiz(b, biz)).length;

  const NAV = [
    { href: "/", label: t.nav_dashboard, icon: <><rect x="3" y="3" width="7" height="9" /><rect x="14" y="3" width="7" height="5" /><rect x="14" y="12" width="7" height="9" /><rect x="3" y="16" width="7" height="5" /></> },
    { href: "/bookings", label: t.nav_bookings, icon: <><rect x="3" y="4" width="18" height="18" rx="2" /><path d="M16 2v4M8 2v4M3 10h18" /></>, badge: true },
    { href: "/roster", label: t.nav_roster, icon: <><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" /></> },
    { href: "/billing", label: t.nav_billing, icon: <><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><path d="M14 2v6h6M9 13h6M9 17h4" /></> },
    { href: "/payroll", label: t.nav_payroll, icon: <><rect x="2" y="5" width="20" height="14" rx="2" /><circle cx="12" cy="12" r="3" /><path d="M6 12h.01M18 12h.01" /></> },
  ];

  return (
    <aside className={`sidebar${open ? " open" : ""}`}>
      <div className="brand">
        <div className="brand-mark">
          <svg viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M3 12c3-4 6-4 9 0s6 4 9 0" />
            <path d="M3 17c3-4 6-4 9 0s6 4 9 0" />
          </svg>
        </div>
        <div>
          <div className="brand-name">Reef</div>
          <div className="brand-sub">Operations</div>
        </div>
        <button className="nav-close" onClick={onClose} aria-label="Close menu">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M18 6 6 18M6 6l12 12" />
          </svg>
        </button>
      </div>

      <div className="nav-label">{t.workspace}</div>
      {NAV.map((n) => {
        const active = pathname === n.href;
        return (
          <Link key={n.href} href={n.href} className={`nav-item${active ? " active" : ""}`} onClick={onClose}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              {n.icon}
            </svg>
            {n.label}
            {n.badge && <span className="pill">{bookingCount}</span>}
          </Link>
        );
      })}

      <div className="nav-spacer" />

      <div className="xero-card">
        <div className="xero-row">
          <span className="dot on" />
          <span className="name">XERO</span>
          <span className="xero-mini synced" style={{ marginLeft: "auto" }}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12" />
            </svg>
            {t.xero_connected}
          </span>
        </div>
        <div className="meta">{t.xero_meta}</div>
      </div>

      <div className="user-row">
        <div className="avatar">TT</div>
        <div>
          <div className="nm">テスト太郎</div>
          <div className="rl">{t.role_admin}</div>
        </div>
      </div>
    </aside>
  );
}
