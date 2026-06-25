"use client";

import { ReactNode } from "react";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import Toast from "./Toast";

export default function AppShell({ children }: { children: ReactNode }) {
  return (
    <>
      <Sidebar />
      <div className="main">
        <Topbar />
        <main className="content">{children}</main>
      </div>
      <Toast />
    </>
  );
}
