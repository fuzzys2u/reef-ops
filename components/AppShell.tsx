"use client";

import { ReactNode, useState } from "react";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import Toast from "./Toast";

export default function AppShell({ children }: { children: ReactNode }) {
  const [navOpen, setNavOpen] = useState(false);

  return (
    <>
      <Sidebar open={navOpen} onClose={() => setNavOpen(false)} />
      <div
        className={`nav-backdrop${navOpen ? " show" : ""}`}
        onClick={() => setNavOpen(false)}
        aria-hidden="true"
      />
      <div className="main">
        <Topbar onMenu={() => setNavOpen(true)} />
        <main className="content">{children}</main>
      </div>
      <Toast />
    </>
  );
}
