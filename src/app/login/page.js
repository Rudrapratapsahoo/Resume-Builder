'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, AtSign, KeyRound, UserCircle2 } from 'lucide-react';
import Navbar from '@/components/Navbar';
import QuantumBackdrop from '@/components/QuantumBackdrop';
import { loginUser } from '@/lib/auth';
import { useAuth } from '@/hooks/useAuth';

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth();
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const onChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const result = await loginUser(form.email, form.password);

    if (!result.ok) {
      setError(result.message);
      setLoading(false);
      return;
    }

    login(result.user);
    router.push('/dashboard');
  };

  return (
    <main className="min-h-screen">
      <Navbar />
      <section className="relative mx-auto grid min-h-[calc(100vh-80px)] max-w-7xl items-center gap-8 px-4 py-10 sm:px-6 lg:grid-cols-[0.95fr_1.05fr] lg:px-8">
        <div className="absolute inset-0 -z-10 opacity-60">
          <QuantumBackdrop />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-xl"
        >
          <div className="mb-4 terminal-badge">login sequence</div>
          <h1 className="terminal-heading">Access the build console.</h1>
          <p className="mt-5 text-sm leading-7 text-emerald-100/75">
            Re-enter your workspace and continue editing resumes, switching templates, and exporting
            polished output.
          </p>

          <div className="mt-8 rounded-[24px] border border-emerald-400/10 bg-black/50 p-5">
            <div className="flex items-center gap-3 text-sm text-emerald-200/80">
              <UserCircle2 className="h-5 w-5 text-emerald-300" />
              Demo auth flow is UI-first and localStorage based.
            </div>
          </div>
        </motion.div>

        <motion.form
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          onSubmit={onSubmit}
          className="terminal-shell scanlines mx-auto w-full max-w-xl p-6 sm:p-8"
        >
          <h2 className="mb-2 font-['VT323'] text-4xl text-emerald-300">[ authenticate ]</h2>
          <p className="mb-8 text-sm text-emerald-100/65">
            Use your workspace credentials to continue.
          </p>

          <div className="space-y-5">
            <div>
              <label className="terminal-label">email</label>
              <div className="relative">
                <AtSign className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-emerald-400/60" />
                <input
                  className="terminal-input pl-11"
                  type="email"
                  name="email"
                  placeholder="name@domain.com"
                  value={form.email}
                  onChange={onChange}
                  required
                />
              </div>
            </div>

            <div>
              <label className="terminal-label">password</label>
              <div className="relative">
                <KeyRound className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-emerald-400/60" />
                <input
                  className="terminal-input pl-11"
                  type="password"
                  name="password"
                  placeholder="••••••••"
                  value={form.password}
                  onChange={onChange}
                  required
                />
              </div>
            </div>

            {error ? (
              <div className="rounded-2xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-200">
                {error}
              </div>
            ) : null}

            <button type="submit" disabled={loading} className="terminal-button-primary w-full">
              {loading ? 'authorizing...' : 'enter workspace'}
              <ArrowRight className="h-4 w-4" />
            </button>

            <p className="text-center text-sm text-emerald-100/65">
              New here?{' '}
              <Link href="/signup" className="text-emerald-300 underline underline-offset-4">
                create an account
              </Link>
            </p>
          </div>
        </motion.form>
      </section>
    </main>
  );
}