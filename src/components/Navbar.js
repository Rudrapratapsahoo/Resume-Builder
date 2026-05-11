'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { LogOut, TerminalSquare } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';

const navItems = [
  { href: '/', label: 'home' },
  { href: '/dashboard', label: 'dashboard' },
  { href: '/resume', label: 'resume' },
];

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    router.push('/login');
  };

  return (
    <header className="no-print sticky top-0 z-50 border-b border-emerald-400/10 bg-black/55 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-3">
          <div className="rounded-2xl border border-emerald-400/15 bg-emerald-400/10 p-2">
            <TerminalSquare className="h-5 w-5 text-emerald-300" />
          </div>
          <div>
            <div className="font-['VT323'] text-3xl leading-none text-emerald-300">
              Quantum Terminal
            </div>
            <div className="text-[11px] uppercase tracking-[0.22em] text-emerald-100/45">
              resume builder
            </div>
          </div>
        </Link>

        <nav className="hidden items-center gap-2 md:flex">
          {navItems.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`rounded-full px-4 py-2 text-sm transition ${
                  active
                    ? 'border border-emerald-400/20 bg-emerald-400/10 text-emerald-200'
                    : 'text-emerald-100/60 hover:text-emerald-100'
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-3">
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="hidden rounded-full border border-emerald-400/15 bg-emerald-400/5 px-4 py-2 text-xs uppercase tracking-[0.2em] text-emerald-200 sm:block"
          >
            {user ? user.email : 'guest session'}
          </motion.div>

          {user ? (
            <button onClick={handleLogout} className="terminal-button">
              <LogOut className="h-4 w-4" />
              logout
            </button>
          ) : (
            <Link href="/login" className="terminal-button">
              sign in
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}