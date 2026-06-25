"use client";

import { useStore } from "@/lib/store";

export default function Toast() {
  const { toastMsg } = useStore();
  return (
    <div id="toast" className={toastMsg ? "show" : ""}>
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="20 6 9 17 4 12" />
      </svg>
      <span>{toastMsg}</span>
    </div>
  );
}
