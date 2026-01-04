import { useMemo, useState } from "react";
import { CalendarDays, MapPin, ArrowUpRight } from "lucide-react";
import { mockEvents } from "../data/mockEvents.js";

const filters = ["This Week", "This Month", "Near Me"];

const Events = () => {
  const [activeFilter, setActiveFilter] = useState(filters[0]);

  const events = useMemo(() => {
    return mockEvents;
  }, [activeFilter]);

  return (
    <section className="space-y-6">
      <header className="rounded-xl bg-white/90 p-6 shadow-sm surface-panel">
        <h1 className="font-display text-senior-2xl text-civic-navy">Community Events</h1>
        <p className="mt-2 text-senior-base text-slate-600">
          Find gatherings, workshops, and civic activities.
        </p>
        <div className="mt-4 flex flex-wrap gap-3">
          {filters.map((filter) => (
            <button
              key={filter}
              type="button"
              onClick={() => setActiveFilter(filter)}
              className={`rounded-full border-2 px-4 py-2 text-senior-sm font-semibold ${
                filter === activeFilter
                  ? "border-civic-teal bg-teal-50 text-civic-teal"
                  : "border-slate-200 text-slate-600"
              }`}
            >
              {filter}
            </button>
          ))}
        </div>
      </header>

      <div className="grid gap-6">
        {events.map((event) => (
          <article
            key={event.id}
            className="rounded-xl border-2 border-slate-100 bg-white p-6 shadow-sm surface-panel"
          >
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <h2 className="font-display text-senior-xl text-civic-navy">{event.title}</h2>
                <div className="mt-2 flex flex-wrap items-center gap-3 text-senior-sm text-slate-500">
                  <span className="flex items-center gap-2">
                    <CalendarDays className="h-5 w-5" /> {event.date} • {event.time}
                  </span>
                  <span className="flex items-center gap-2">
                    <MapPin className="h-5 w-5" /> {event.location}
                  </span>
                </div>
              </div>
              <button
                type="button"
                className="flex items-center gap-2 rounded-full border-2 border-civic-navy px-4 py-2 text-senior-sm font-semibold text-civic-navy"
              >
                Add to Calendar <ArrowUpRight className="h-5 w-5" />
              </button>
            </div>
            <p className="mt-4 text-senior-base text-slate-600">{event.description}</p>
            <div className="mt-4 flex flex-wrap gap-3">
              <button
                type="button"
                className="rounded-full border-2 border-civic-teal px-4 py-2 text-senior-sm font-semibold text-civic-teal"
              >
                Get Directions
              </button>
              <button
                type="button"
                className="rounded-full border-2 border-slate-200 px-4 py-2 text-senior-sm font-semibold text-slate-600"
              >
                Learn More
              </button>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};

export default Events;
