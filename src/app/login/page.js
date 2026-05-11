"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";

const fade = {
  hidden: { opacity: 0, y: 20 },
  show: (i = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.5, delay: i * 0.1 } }),
};

export default function LoginPage() {
  const router = useRouter();
  const { signIn } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const { error } = await signIn({ email, password });
      if (error) {
        setError(error.message);
      } else {
        router.push("/dashboard");
      }
    } catch (err) {
      setError("Something went wrong");
    }
    setLoading(false);
  };

  return (
    <div className="flex h-screen items-center justify-center bg-black px-6">
      <div className="pointer-events-none absolute left-1/2 top-[-150px] h-[300px] w-[300px] -translate-x-1/2 rounded-full bg-white/[0.03] blur-[150px]" />

      <div className="w-full max-w-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="terminal-shell scanlines overflow-hidden"
        >
          {/* Header */}
          <div className="flex items-center justify-between border-b border-white/[0.05] px-8 py-3">
            <div className="flex gap-2">
              <div className="h-2.5 w-2.5 rounded-full bg-white/15" />
              <div className="h-2.5 w-2.5 rounded-full bg-white/10" />
              <div className="h-2.5 w-2.5 rounded-full bg-white/[0.06]" />
            </div>
            <span className="text-[10px] uppercase tracking-[0.35em] text-white/20" style={{ fontFamily: "'VT323', monospace" }}>
              auth://login
            </span>
            <div className="w-6" />
          </div>

          {/* Body */}
          <form onSubmit={handleLogin} className="px-8 py-10 sm:px-10">
            <motion.div variants={fade} initial="hidden" animate="show" custom={0}>
              <h1 className="mb-2 text-4xl font-extralight tracking-tight text-white">Welcome back</h1>
              <p className="mb-8 text-sm text-white/30 font-light">Sign in to access your dashboard.</p>
            </motion.div>

            {error && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mb-5 rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white/60">
                {error}
              </motion.div>
            )}

            <motion.div variants={fade} initial="hidden" animate="show" custom={1} className="space-y-5">
              <div>
                <label className="terminal-label">email</label>
                <input type="email" className="terminal-input" placeholder="you@example.com" value={email} onChange={(e) => setEmail(e.target.value)} required />
              </div>
              <div>
                <label className="terminal-label">password</label>
                <input type="password" className="terminal-input" placeholder="enter password" value={password} onChange={(e) => setPassword(e.target.value)} required />
              </div>
            </motion.div>

            <motion.div variants={fade} initial="hidden" animate="show" custom={2} className="mt-8">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={loading}
                className="terminal-button-primary w-full justify-center py-4 text-base"
              >
                {loading ? "signing in..." : "sign in"}
              </motion.button>
            </motion.div>

            <motion.p variants={fade} initial="hidden" animate="show" custom={3} className="mt-6 text-center text-sm text-white/25">
              Don't have an account?{" "}
              <Link href="/signup" className="text-white/50 hover:text-white/80 transition-colors underline underline-offset-4">
                create one
              </Link>
            </motion.p>
          </form>
        </motion.div>
      </div>
    </div>
  );
}
