"use client";

import Link from "next/link";
import { useStore } from "@/lib/store";
import { REVENUE, fmt, inBiz, PALETTE, STAFF_BY_ID } from "@/lib/data";
import { dict, tService, tMonth } from "@/lib/i18n";
import { StatusPill, BizTag, StaffName } from "@/components/ui";

const ICONS: Record<string, JSX.Element> = {
  cal: <><rect x="3" y="4" width="18" height="18" rx="2" /><path d="M16 2v4M8 2v4M3 10h18" /></>,
  usr: <><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /></>,
  doc: <><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><path d="M14 2v6h6" /></>,
  cash: <><line x1="12" y1="1" x2="12" y2="23" /><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" /></>,
};

function Arrow({ up }: { up: boolean }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
      {up ? <path d="M7 17 17 7M17 7H8M17 7v9" /> : <path d="M7 7l10 10M17 17H8M17 17V8" />}
    </svg>
  );
}

export default function Dashboard() {
  const { biz, bookings, invoices, lang } = useStore();
  const t = dict[lang];

  const bk = bookings.filter((b) => inBiz(b, biz));
  const jobsToday = bk.filter((b) => b.date === "2026-06-01").length || 7;
  const onDuty = new Set(bk.filter((b) => b.date <= "2026-06-02" && b.status !== "cancelled").map((b) => b.staff)).size;
  const outstanding = invoices
    .filter((i) => inBiz(i, biz))
    .filter((i) => i.status === "sent" || i.status === "overdue")
    .reduce((a, i) => a + i.amt, 0);
  const monthRev = (biz === "BIZ_B" ? 41 : biz === "BIZ_A" ? 58 : 99) * 1000;

  const subtitle =
    lang === "ja"
      ? `${t.date_line} — 本日 ${jobsToday} 件の業務${biz === "ALL" ? "（2事業合計）" : ""}`
      : `${t.date_line} — ${jobsToday} jobs scheduled today${biz === "ALL" ? " across both businesses" : ""}`;

  const kpis = [
    { label: t.kpi_jobs_today, val: String(jobsToday), ic: "cal", bg: "var(--teal-50)", c: "var(--ocean-500)", up: true, tv: "+3", since: t.since_yesterday },
    { label: t.kpi_staff_on_duty, val: String(onDuty), ic: "usr", bg: "var(--blue-soft)", c: "var(--blue)", up: true, tv: "7 / 7", since: t.since_covered },
    { label: t.kpi_outstanding, val: fmt(outstanding), ic: "doc", bg: "var(--coral-soft)", c: "var(--coral)", up: false, tv: t.tv_overdue, since: t.since_chase },
    { label: t.kpi_revenue_month, val: fmt(monthRev), ic: "cash", bg: "var(--green-soft)", c: "var(--green)", up: true, tv: "+9%", since: t.since_apr },
  ];

  const max = Math.max(...REVENUE.map((r) => r.BIZ_A + r.BIZ_B));
  const today = bk.filter((b) => b.date === "2026-06-01").sort((a, b) => a.time.localeCompare(b.time));
  const sched = today.length ? today : bk.slice(0, 5);
  const recent = bk.slice().sort((a, b) => (b.date + b.time).localeCompare(a.date + a.time)).slice(0, 6);

  return (
    <div className="page-enter">
      <div className="page-head">
        <div>
          <div className="page-title font-display">
            {t.greeting} <span className="demo-flag">{t.demo_flag}</span>
          </div>
          <div className="page-sub">{subtitle}</div>
        </div>
        <button className="btn btn-ghost">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3" />
          </svg>
          {t.export}
        </button>
      </div>

      <div className="kpi-grid stagger">
        {kpis.map((k) => (
          <div className="card kpi" key={k.label}>
            <div className="ic" style={{ background: k.bg, color: k.c }}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                {ICONS[k.ic]}
              </svg>
            </div>
            <div className="label">{k.label}</div>
            <div className="val">{k.val}</div>
            <span className={`trend ${k.up ? "up" : "down"}`}>
              <Arrow up={k.up} />
              {k.tv}
              <span className="since">{k.since}</span>
            </span>
          </div>
        ))}
      </div>

      <div className="grid-2">
        <div className="card">
          <div className="card-head">
            <h3 className="font-display">{t.rev_title}</h3>
            <span className="hint">{t.rev_hint}</span>
          </div>
          <div className="chart">
            {REVENUE.map((r) => {
              const showP = biz !== "BIZ_B";
              const showJ = biz !== "BIZ_A";
              const ph = showP ? (r.BIZ_A / max) * 180 : 0;
              const jh = showJ ? (r.BIZ_B / max) * 180 : 0;
              return (
                <div className="bar-col" key={r.m}>
                  <div className="bar-stack">
                    {showP && <div className="bar pdc" style={{ height: ph }} title={`BIZ_A ${fmt(r.BIZ_A * 1000)}`} />}
                    {showJ && <div className="bar jqc" style={{ height: jh }} title={`BIZ_B ${fmt(r.BIZ_B * 1000)}`} />}
                  </div>
                  <div className="bar-x">{tMonth(lang, r.m)}</div>
                </div>
              );
            })}
          </div>
          <div className="legend">
            <span><i style={{ background: "var(--ocean-500)" }} />{t.legend_pdc}</span>
            <span><i style={{ background: "var(--coral)" }} />{t.legend_jqc}</span>
          </div>
        </div>

        <div className="card">
          <div className="card-head">
            <h3 className="font-display">{t.today_schedule}</h3>
            <Link className="link" href="/roster">{t.full_roster}</Link>
          </div>
          <div className="sched">
            {sched.map((b) => (
              <div className="sched-item" key={b.ref}>
                <div className="sched-time">{b.time}</div>
                <div className="sched-bar" style={{ background: PALETTE[b.biz][0] }} />
                <div className="sched-main">
                  <div className="t">{tService(lang, b.service)}</div>
                  <div className="m">
                    {b.client} · {STAFF_BY_ID[b.staff] ? STAFF_BY_ID[b.staff].name : t.unassigned}
                  </div>
                </div>
                <div className="sched-tag"><BizTag biz={b.biz} /></div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="card">
        <div className="card-head">
          <h3 className="font-display">{t.recent_bookings}</h3>
          <Link className="link" href="/bookings">{t.view_all}</Link>
        </div>
        <div style={{ overflow: "auto" }}>
          <table>
            <thead>
              <tr>
                <th>{t.th_ref}</th><th>{t.th_client}</th><th>{t.th_service}</th><th>{t.th_date}</th><th>{t.th_staff}</th><th>{t.th_amount}</th><th>{t.th_status}</th>
              </tr>
            </thead>
            <tbody>
              {recent.map((b) => (
                <tr key={b.ref}>
                  <td><span className="ref">{b.ref}</span></td>
                  <td><div className="ttl">{b.client}</div><div className="sub"><BizTag biz={b.biz} /></div></td>
                  <td><div className="ttl">{tService(lang, b.service)}</div><div className="sub">{b.pax} {b.biz === "BIZ_A" ? t.pax : t.units}</div></td>
                  <td>{b.date.slice(5).replace("-", "/")}<div className="sub">{b.time}</div></td>
                  <td><StaffName id={b.staff} /></td>
                  <td><span className="amt">{fmt(b.amt)}</span></td>
                  <td><StatusPill status={b.status} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
