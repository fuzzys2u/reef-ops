"use client";

import { Biz, PALETTE, STAFF_BY_ID, initials } from "@/lib/data";
import { tStatus } from "@/lib/i18n";
import { useStore } from "@/lib/store";

export function StatusPill({ status }: { status: string }) {
  const { lang } = useStore();
  return (
    <span className={`status s-${status}`}>
      <i />
      {tStatus(lang, status)}
    </span>
  );
}

export function BizTag({ biz }: { biz: Biz }) {
  return (
    <span className={`biz-tag biz-${biz}`}>
      <i />
      {biz}
    </span>
  );
}

export function Avatar({ name, biz, size = 28 }: { name: string; biz: Biz; size?: number }) {
  return (
    <span
      className="av-sm"
      style={{
        width: size,
        height: size,
        flex: `0 0 ${size}px`,
        fontSize: size < 30 ? 11 : 13,
        background: `linear-gradient(145deg,${PALETTE[biz][0]},${PALETTE[biz][1]})`,
      }}
    >
      {initials(name)}
    </span>
  );
}

export function StaffName({ id, full = false }: { id: string; full?: boolean }) {
  const s = STAFF_BY_ID[id];
  if (!s) return <>—</>;
  return (
    <span className="who">
      <Avatar name={s.name} biz={s.biz} />
      {full ? s.name : s.name.split(" ")[0]}
    </span>
  );
}
