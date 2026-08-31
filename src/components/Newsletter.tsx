import { useState } from 'react';
import type { FormEvent } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Newsletter() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubmitted(true);
  };

  return (
    <section className="bg-maroon text-paper py-14 sm:py-16">
      <div className="max-w-[1200px] mx-auto px-5 sm:px-8 flex flex-wrap items-center justify-between gap-8">
        <div>
          <h3 className="font-serif font-medium text-2xl sm:text-[26px] max-w-[20ch] mb-2">
            Sign up to our newsletter
          </h3>
          <p className="text-paper/75 text-[15px] m-0">
            News from our campaigns and community programmes, straight to your inbox.
          </p>
        </div>

        <div className="flex-1 max-w-[420px] min-w-[260px]">
          <AnimatePresence mode="wait">
            {submitted ? (
              <motion.p
                key="success"
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="text-gold-bright text-[15px] font-medium"
              >
                Thanks — you're on the list.
              </motion.p>
            ) : (
              <motion.form
                key="form"
                onSubmit={handleSubmit}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="flex"
              >
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email address"
                  aria-label="Email address"
                  className="flex-1 px-4 py-3.5 border border-paper/35 bg-transparent text-paper placeholder:text-paper/55 text-[14.5px] focus:outline-none focus:border-gold-bright transition-colors"
                />
                <button
                  type="submit"
                  className="px-5 py-3.5 bg-gold text-ink border border-gold font-semibold cursor-pointer hover:bg-gold-bright transition-colors"
                >
                  Subscribe
                </button>
              </motion.form>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
