"use client";

import Link from "next/link";
import { useAuth } from "@/hooks/useAuth";

export default function Navbar() {
  const { user, signOut } = useAuth();

  return (
    <nav className="sticky top-0 z-50 border-b border-white/[0.04] bg-black/80 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link href="/" className="text-lg font-light tracking-tight text-white">
          quantum<span className="text-white/30">.resume</span>
        </Link>

        <div className="flex items-center gap-6">
          {user ? (
            <>
              <Link href="/dashboard" className="text-xs uppercase tracking-[0.2em] text-white/30 hover:text-white/60 transition-colors">
                dashboard
              </Link>
              <Link href="/resume" className="text-xs uppercase tracking-[0.2em] text-white/30 hover:text-white/60 transition-colors">
                builder
              </Link>
              <button
                onClick={signOut}
                className="text-xs uppercase tracking-[0.2em] text-white/20 hover:text-white/50 transition-colors"
              >
                sign out
              </button>
            </>
          ) : (
            <>
              <Link href="/login" className="text-xs uppercase tracking-[0.2em] text-white/30 hover:text-white/60 transition-colors">
                sign in
              </Link>
              <Link href="/signup">
                <div className="terminal-button py-2 px-5 text-xs">
                  get started
                </div>
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
