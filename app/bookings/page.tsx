"use client";

import { useRef, useState } from "react";
import { useStore } from "@/lib/store";
import { Biz, Booking, BookingStatus, CLIENTS, SERVICES, STAFF, fmt, hasStaffConflict, inBiz } from "@/lib/data";
import { dict, tService, tRole } from "@/lib/i18n";
import { StatusPill, BizTag, StaffName } from "@/components/ui";

export default function BookingsPage() {
  const { biz, bookings, addBooking, toast, lang } = useStore();
  const t = dict[lang];
  const [filter, setFilter] = useState<"all" | BookingStatus>("all");

  // form state
  const [fBiz, setFBiz] = useState<Biz>("BIZ_A");
  const [client, setClient] = useState(CLIENTS.BIZ_A[0]);
  const [service, setService] = useState(SERVICES.BIZ_A[0]);
  const [date, setDate] = useState("2026-06-02");
  const [time, setTime] = useState("08:30");
  const [loc, setLoc] = useState("");
  const [pax, setPax] = useState(2);
  const [amt, setAmt] = useState(180);
  const [staff, setStaff] = useState(STAFF.filter((s) => s.biz === "BIZ_A")[0].id);

  // staff double-booking confirmation
  const [conflict, setConflict] = useState<Booking | null>(null);

  // per-field validation errors + new-row success highlight
  type FieldKey = "loc" | "pax" | "amt" | "date";
  const [errors, setErrors] = useState<Partial<Record<FieldKey, string>>>({});
  const [highlightRef, setHighlightRef] = useState<string | null>(null);
  const highlightTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // clear a field's error as soon as the user edits it
  const clearError = (key: FieldKey) =>
    setErrors((prev) => (prev[key] ? { ...prev, [key]: undefined } : prev));

  const chips: { key: "all" | BookingStatus; label: string }[] = [
    { key: "all", label: t.chip_all },
    { key: "confirmed", label: t.chip_confirmed },
    { key: "pending", label: t.chip_pending },
    { key: "completed", label: t.chip_completed },
  ];

  function onBizChange(b: Biz) {
    setFBiz(b);
    setClient(CLIENTS[b][0]);
    setService(SERVICES[b][0]);
    setStaff(STAFF.filter((s) => s.biz === b)[0].id);
  }

  function commit() {
    const seq = bookings.filter((b) => b.biz === fBiz).length + (fBiz === "BIZ_A" ? 1049 : 236);
    const ref = `${fBiz}-${seq}`;
    addBooking({ ref, biz: fBiz, client, service, date, time, staff, pax, amt, status: "confirmed" });
    setHighlightRef(ref);
    if (highlightTimer.current) clearTimeout(highlightTimer.current);
    highlightTimer.current = setTimeout(() => setHighlightRef(null), 2000);
    toast(
      lang === "ja"
        ? `予約 ${ref} を作成 — ロスターと請求に反映しました`
        : `Booking ${ref} created — added to roster & billing`,
    );
  }

  function validate(): boolean {
    const next: Partial<Record<FieldKey, string>> = {};
    if (!loc.trim()) next.loc = t.err_location;
    if (!(pax >= 1)) next.pax = t.err_pax;
    if (!(amt > 0)) next.amt = t.err_amount;
    if (!date) next.date = t.err_date;
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  function create() {
    if (!validate()) return;
    const clash = hasStaffConflict(bookings, { staff, date, time, service });
    if (clash) {
      setConflict(clash);
      return;
    }
    commit();
  }

  function confirmConflict() {
    commit();
    setConflict(null);
  }

  let rows = bookings.filter((b) => inBiz(b, biz));
  if (filter !== "all") rows = rows.filter((b) => b.status === filter);
  rows = rows.slice().sort((a, b) => (a.date + a.time).localeCompare(b.date + b.time));
  const total = rows.reduce((a, b) => a + b.amt, 0);
  const countLabel =
    lang === "ja"
      ? `${rows.length}件 · 合計 ${fmt(total)}`
      : `${rows.length} booking${rows.length !== 1 ? "s" : ""} · ${fmt(total)} total`;

  return (
    <div className="page-enter">
      <div className="page-head">
        <div>
          <div className="page-title font-display">{t.bk_title}</div>
          <div className="page-sub">{t.bk_sub}</div>
        </div>
      </div>

      <div className="booking-grid">
        <div className="card form-card">
          <h3 className="font-display">{t.new_job_booking}</h3>
          <p className="desc">{t.new_job_desc}</p>

          <div className="field">
            <label>{t.f_business}</label>
            <select value={fBiz} onChange={(e) => onBizChange(e.target.value as Biz)}>
              <option value="BIZ_A">BIZ_A · Tours &amp; Transfers</option>
              <option value="BIZ_B">Cleaning Services</option>
            </select>
          </div>
          <div className="field">
            <label>{t.f_client}</label>
            <select value={client} onChange={(e) => setClient(e.target.value)}>
              {CLIENTS[fBiz].map((c) => <option key={c}>{c}</option>)}
            </select>
          </div>
          <div className="field">
            <label>{t.f_service}</label>
            <select value={service} onChange={(e) => setService(e.target.value)}>
              {SERVICES[fBiz].map((s) => <option key={s} value={s}>{tService(lang, s)}</option>)}
            </select>
          </div>
          <div className="field-row">
            <div className="field">
              <label>{t.f_date}</label>
              <input type="date" className={errors.date ? "err" : ""} value={date} onChange={(e) => { setDate(e.target.value); clearError("date"); }} />
              {errors.date && <div className="field-err">{errors.date}</div>}
            </div>
            <div className="field"><label>{t.f_time}</label><input type="time" value={time} onChange={(e) => setTime(e.target.value)} /></div>
          </div>
          <div className="field">
            <label>{t.f_location}</label>
            <input className={errors.loc ? "err" : ""} value={loc} onChange={(e) => { setLoc(e.target.value); clearError("loc"); }} placeholder={t.f_loc_ph} />
            {errors.loc && <div className="field-err">{errors.loc}</div>}
          </div>
          <div className="field-row">
            <div className="field">
              <label>{t.f_pax}</label>
              <input type="number" min={1} className={errors.pax ? "err" : ""} value={pax} onChange={(e) => { setPax(+e.target.value); clearError("pax"); }} />
              {errors.pax && <div className="field-err">{errors.pax}</div>}
            </div>
            <div className="field">
              <label>{t.f_amount}</label>
              <input type="number" min={0} className={errors.amt ? "err" : ""} value={amt} onChange={(e) => { setAmt(+e.target.value); clearError("amt"); }} />
              {errors.amt && <div className="field-err">{errors.amt}</div>}
            </div>
          </div>
          <div className="field">
            <label>{t.f_assign}</label>
            <select value={staff} onChange={(e) => setStaff(e.target.value)}>
              {STAFF.filter((s) => s.biz === fBiz).map((s) => (
                <option key={s.id} value={s.id}>{s.name} · {tRole(lang, s.role)}</option>
              ))}
            </select>
          </div>
          <div className="form-foot">
            <button className="btn btn-primary" onClick={create}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 5v14M5 12h14" />
              </svg>
              {t.create_booking}
            </button>
          </div>
        </div>

        <div className="card">
          <div className="card-head" style={{ flexWrap: "wrap", gap: 12 }}>
            <div className="chips">
              {chips.map((c) => (
                <div key={c.key} className={`chip${filter === c.key ? " active" : ""}`} onClick={() => setFilter(c.key)}>
                  {c.label}
                </div>
              ))}
            </div>
            <span className="hint">{countLabel}</span>
          </div>
          <div style={{ overflow: "auto" }}>
            <table>
              <thead>
                <tr><th>{t.th_ref}</th><th>{t.th_client}</th><th>{t.th_service}</th><th>{t.th_date}</th><th>{t.th_staff}</th><th>{t.th_amount}</th><th>{t.th_status}</th></tr>
              </thead>
              <tbody>
                {rows.length === 0 ? (
                  <tr><td colSpan={7} style={{ textAlign: "center", color: "var(--faint)", padding: 40 }}>{t.no_match}</td></tr>
                ) : rows.map((b) => (
                  <tr key={b.ref} className={b.ref === highlightRef ? "row-new" : ""}>
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

      {conflict && (
        <div className="modal-overlay" onClick={() => setConflict(null)}>
          <div className="modal" role="dialog" aria-modal="true" onClick={(e) => e.stopPropagation()}>
            <h3 className="font-display">{t.conflict_title}</h3>
            <p className="modal-body">
              {t.conflict_body
                .replace("{time}", conflict.time)
                .replace("{service}", tService(lang, conflict.service))
                .replace("{client}", conflict.client)}
            </p>
            <div className="modal-foot">
              <button className="btn btn-ghost" onClick={() => setConflict(null)}>{t.conflict_cancel}</button>
              <button className="btn btn-primary" onClick={confirmConflict}>{t.conflict_confirm}</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
