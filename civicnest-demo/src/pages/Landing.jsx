import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Monitor, Smartphone } from "lucide-react";

const Landing = () => {
  return (
    <div className="min-h-screen px-6 py-12">
      <div className="mx-auto flex max-w-5xl flex-col items-center gap-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="flex flex-col items-center gap-4"
        >
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-civic-navy text-2xl font-bold text-white">
            CN
          </div>
          <h1 className="font-display text-senior-2xl text-civic-navy md:text-senior-2xl">
            Welcome to CivicNest
          </h1>
          <p className="max-w-2xl text-senior-base text-slate-600">
            Securing the future with the past. Choose how you want to explore the demo today.
          </p>
        </motion.div>

        <div className="grid w-full gap-6 md:grid-cols-2">
          {[
            {
              title: "Try the Mobile App",
              description: "Explore the senior-friendly mobile experience with guided navigation.",
              to: "/app/home",
              icon: Smartphone,
            },
            {
              title: "Try the Kiosk",
              description: "Simulate the public kiosk with session timers and privacy cues.",
              to: "/kiosk/home",
              icon: Monitor,
            },
          ].map((card, index) => {
            const Icon = card.icon;
            return (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.1 * index }}
              >
                <Link
                  to={card.to}
                  className="flex h-full flex-col gap-4 rounded-2xl border-2 border-slate-200 bg-white p-6 text-left shadow-lg transition hover:-translate-y-1"
                >
                  <div className="flex h-14 w-14 items-center justify-center rounded-full bg-civic-light text-civic-navy">
                    <Icon className="h-7 w-7" />
                  </div>
                  <h2 className="font-display text-senior-xl text-civic-navy">{card.title}</h2>
                  <p className="text-senior-base text-slate-600">{card.description}</p>
                </Link>
              </motion.div>
            );
          })}
        </div>

        <div className="mt-8 rounded-2xl bg-white/90 p-6 text-left shadow-sm surface-panel">
          <p className="text-senior-base text-slate-600">
            CivicNest is designed for seniors with cognitive impairment. Expect large buttons, calm layouts, and
            voice-first guidance to make civic tasks simple.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Landing;
