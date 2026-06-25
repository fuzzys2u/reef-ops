"use client";

import { useStore } from "@/lib/store";
import { STAFF, WEEK, inBiz } from "@/lib/data";
import { dict, tService, tRole, tDow } from "@/lib/i18n";
import { Avatar, BizTag } from "@/components/ui";

export default function RosterPage() {
  const { biz, bookings, lang } = useStore();
  const t = dict[lang];
  const staff = STAFF.filter((s) => inBiz(s, biz));

  const byStaffDate: Record<string, typeof bookings> = {};
  bookings.forEach((b) => {
    const k = `${b.staff}|${b.date}`;
    (byStaffDate[k] = byStaffDate[k] || []).push(b);
  });

  return (
    <div className="page-enter">
      <div className="page-head">
        <div>
          <div className="page-title font-display">{t.ro_title}</div>
          <div className="page-sub">{t.ro_sub}</div>
        </div>
        <div style={{ display: "flex", gap: 10 }}>
          <button className="btn btn-ghost">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6" /></svg>
            {t.prev_week}
          </button>
          <button className="btn btn-ghost">
            {t.next_week}
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6" /></svg>
          </button>
        </div>
      </div>

      <div className="card roster-wrap">
        <table className="roster">
          <thead>
            <tr>
              <th className="staff-col">{t.th_staff}</th>
              {WEEK.map((w) => (
                <th key={w.d}>
                  <div className={`day-h${w.d === 1 ? " today" : ""}`}>
                    <span className="dow">{tDow(lang, w.dow)}</span>
                    <span className="dnum">{lang === "ja" ? `6/${w.d}` : `${w.d} Jun`}</span>
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {staff.map((s) => (
              <tr key={s.id}>
                <td className="staff-col">
                  <div className="staff-cell">
                    <Avatar name={s.name} biz={s.biz} size={32} />
                    <div>
                      <div className="ttl" style={{ fontSize: "13.5px" }}>{s.name}</div>
                      <div className="role-tag">{tRole(lang, s.role)} <BizTag biz={s.biz} /></div>
                    </div>
                  </div>
                </td>
                {WEEK.map((w) => {
                  const date = `2026-06-0${w.d}`;
                  const jobs = byStaffDate[`${s.id}|${date}`] || [];
                  return (
                    <td key={w.d}>
                      {jobs.length === 0 ? (
                        <div className="cell-add">{t.assign}</div>
                      ) : (
                        jobs.map((j) => (
                          <div key={j.ref} className={`shift sh-${j.biz.toLowerCase()}`}>
                            {j.time} {tService(lang, j.service)}
                            <div className="st">{j.client}</div>
                          </div>
                        ))
                      )}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
