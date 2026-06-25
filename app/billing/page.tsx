"use client";

import { useStore } from "@/lib/store";
import { fmt, inBiz } from "@/lib/data";
import { dict } from "@/lib/i18n";
import { StatusPill, BizTag } from "@/components/ui";

export default function BillingPage() {
  const { biz, invoices, syncAllXero, toast, lang } = useStore();
  const t = dict[lang];
  const inv = invoices.filter((i) => inBiz(i, biz));

  const total = inv.reduce((a, i) => a + i.amt, 0);
  const paid = inv.filter((i) => i.status === "paid").reduce((a, i) => a + i.amt, 0);
  const outstanding = inv.filter((i) => i.status === "sent" || i.status === "overdue").reduce((a, i) => a + i.amt, 0);
  const overdue = inv.filter((i) => i.status === "overdue").reduce((a, i) => a + i.amt, 0);

  const summary = [
    { lb: t.sum_total, v: fmt(total) },
    { lb: t.sum_paid, v: fmt(paid) },
    { lb: t.sum_outstanding, v: fmt(outstanding) },
    { lb: t.sum_overdue, v: fmt(overdue), alert: true },
  ];

  function sync() {
    syncAllXero();
    toast(lang === "ja" ? "すべての請求書を XERO に同期しました · QLD" : "All invoices synced to XERO · QLD org");
  }

  return (
    <div className="page-enter">
      <div className="page-head">
        <div>
          <div className="page-title font-display">{t.bi_title}</div>
          <div className="page-sub">{t.bi_sub}</div>
        </div>
        <button className="btn btn-primary" onClick={sync}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 2v6h-6M3 12a9 9 0 0 1 15-6.7L21 8M3 22v-6h6M21 12a9 9 0 0 1-15 6.7L3 16" />
          </svg>
          {t.sync_all}
        </button>
      </div>

      <div className="bill-sum stagger">
        {summary.map((c) => (
          <div className={`card bill-card${c.alert ? " alert" : ""}`} key={c.lb}>
            <div className="lb">{c.lb}</div>
            <div className="v">{c.v}</div>
          </div>
        ))}
      </div>

      <div className="card">
        <div className="card-head">
          <h3 className="font-display">{t.invoices}</h3>
          <span className="hint">{t.grouped_by}</span>
        </div>
        <div style={{ overflow: "auto" }}>
          <table>
            <thead>
              <tr><th>{t.th_invoice}</th><th>{t.th_client}</th><th>{t.th_issued}</th><th>{t.th_due}</th><th>{t.th_amount}</th><th>{t.th_xero}</th><th>{t.th_status}</th></tr>
            </thead>
            <tbody>
              {inv.map((i) => (
                <tr key={i.no}>
                  <td><span className="ref">{i.no}</span></td>
                  <td><div className="ttl">{i.client}</div><div className="sub"><BizTag biz={i.biz} /></div></td>
                  <td>{i.issue.slice(5).replace("-", "/")}</td>
                  <td>{i.due.slice(5).replace("-", "/")}</td>
                  <td><span className="amt">{fmt(i.amt)}</span></td>
                  <td>
                    {i.xero === "synced" ? (
                      <span className="xero-mini synced">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
                        XERO
                      </span>
                    ) : (
                      <span className="xero-mini queued">{t.queued}</span>
                    )}
                  </td>
                  <td><StatusPill status={i.status} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
