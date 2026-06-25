"use client";

import { useStore } from "@/lib/store";
import { PAYROLL, STAFF_BY_ID, fmt, inBiz } from "@/lib/data";
import { dict } from "@/lib/i18n";
import { StatusPill, BizTag, StaffName } from "@/components/ui";

export default function PayrollPage() {
  const { biz, lang } = useStore();
  const t = dict[lang];
  const rows = PAYROLL
    .map((p) => ({ ...p, staff: STAFF_BY_ID[p.id] }))
    .filter((r) => inBiz(r.staff, biz));
  const totalGross = rows.reduce((a, r) => a + r.hours * r.staff.rate, 0);

  return (
    <div className="page-enter">
      <div className="page-head">
        <div>
          <div className="page-title font-display">{t.pa_title}</div>
          <div className="page-sub">{t.pa_sub}</div>
        </div>
        <button className="btn btn-ghost">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3" />
          </svg>
          {t.export_timesheet}
        </button>
      </div>

      <div className="note">
        <div className="ni">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10" /><path d="M12 16v-4M12 8h.01" />
          </svg>
        </div>
        <div>
          <div className="nt">{t.note_title}</div>
          <div className="nm">{t.note_body}</div>
        </div>
      </div>

      <div className="card">
        <div className="card-head">
          <h3 className="font-display">{t.payrun_title}</h3>
          <span className="hint">{t.gross_aud}</span>
        </div>
        <div style={{ overflow: "auto" }}>
          <table>
            <thead>
              <tr><th>{t.th_staff}</th><th>{t.th_business}</th><th>{t.th_jobs_done}</th><th>{t.th_hours}</th><th>{t.th_rate}</th><th>{t.th_gross}</th><th>{t.th_status}</th></tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <tr key={r.id}>
                  <td><StaffName id={r.id} /></td>
                  <td><BizTag biz={r.staff.biz} /></td>
                  <td>{r.jobs}</td>
                  <td style={{ fontVariantNumeric: "tabular-nums" }}>{r.hours.toFixed(1)}h</td>
                  <td>{fmt(r.staff.rate)}/h</td>
                  <td><span className="amt">{fmt(r.hours * r.staff.rate)}</span></td>
                  <td><StatusPill status="pending" /></td>
                </tr>
              ))}
              <tr style={{ background: "var(--sand-50)" }}>
                <td colSpan={5} style={{ fontWeight: 800, textAlign: "right" }}>{t.total_gross}</td>
                <td><span className="amt" style={{ color: "var(--coral-dark)" }}>{fmt(totalGross)}</span></td>
                <td />
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
