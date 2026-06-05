"use client";

import { useState } from "react";
import { Sidebar } from "./Sidebar";
import { Wordmark } from "@/components/Wordmark";

interface DashboardShellProps {
  userName?: string;
  userImage?: string;
  userEmail?: string;
  children: React.ReactNode;
}

export function DashboardShell({ userName, userImage, userEmail, children }: DashboardShellProps) {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex h-screen bg-[#0f0f0f] overflow-hidden">
      {/* Desktop sidebar */}
      <div className="hidden md:flex">
        <Sidebar userName={userName} userImage={userImage} userEmail={userEmail} />
      </div>

      {/* Mobile overlay */}
      {open && (
        <div
          className="fixed inset-0 z-40 bg-black/50 md:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Mobile drawer */}
      <div
        className={`fixed inset-y-0 left-0 z-50 md:hidden transition-transform duration-300 ease-out ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <Sidebar
          userName={userName}
          userImage={userImage}
          userEmail={userEmail}
          onNavigate={() => setOpen(false)}
        />
      </div>

      {/* Main */}
      <main className="flex-1 min-w-0 bg-[#0f0f0f] flex flex-col">
        {/* Mobile top bar */}
        <div className="md:hidden flex items-center justify-between px-4 h-14 flex-shrink-0">
          <button
            onClick={() => setOpen(true)}
            aria-label="Open menu"
            className="text-white/80 hover:text-white p-2 -ml-2"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          <Wordmark size={24} fontSize={14} variant="light" showGlyph={false} />
          <span className="w-8" />
        </div>

        {/* Floating panel */}
        <div className="flex-1 min-h-0 p-2.5 md:pl-0">
          <div className="h-full bg-[#fafafa] rounded-2xl border border-black/5 shadow-[0_1px_3px_rgba(0,0,0,0.06)] overflow-y-auto">
            {children}
          </div>
        </div>
      </main>
    </div>
  );
}
