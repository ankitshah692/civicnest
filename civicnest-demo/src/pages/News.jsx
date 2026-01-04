import { useMemo, useState } from "react";
import { Calendar, Tag } from "lucide-react";
import { mockNews } from "../data/mockNews.js";
import AudioPlayer from "../components/common/AudioPlayer.jsx";

const filters = ["All Updates", "City News", "Community Events", "Public Safety"];

const categoryMap = {
  traffic: "City News",
  "local government": "City News",
  "community events": "Community Events",
  "public safety": "Public Safety",
};

const News = () => {
  const [activeFilter, setActiveFilter] = useState(filters[0]);
  const [expanded, setExpanded] = useState(null);

  const articles = useMemo(() => {
    if (activeFilter === "All Updates") {
      return mockNews;
    }
    return mockNews.filter((item) => categoryMap[item.category] === activeFilter);
  }, [activeFilter]);

  return (
    <section className="space-y-6">
      <header className="rounded-xl bg-white/90 p-6 shadow-sm surface-panel">
        <h1 className="font-display text-senior-2xl text-civic-navy">Today&apos;s Updates</h1>
        <p className="mt-2 text-senior-base text-slate-600">January 4, 2026</p>
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
        {articles.map((article) => (
          <article
            key={article.id}
            className="rounded-xl border-2 border-slate-100 bg-white p-6 shadow-sm surface-panel"
          >
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <h2 className="font-display text-senior-xl text-civic-navy">{article.title}</h2>
                <div className="mt-2 flex flex-wrap items-center gap-3 text-senior-sm text-slate-500">
                  <span className="flex items-center gap-2">
                    <Calendar className="h-5 w-5" /> {article.date}
                  </span>
                  <span className="flex items-center gap-2">
                    <Tag className="h-5 w-5" /> {article.category}
                  </span>
                </div>
              </div>
              <AudioPlayer text={article.summary} label="Read aloud" />
            </div>
            <p className="mt-4 text-senior-base text-slate-600">{article.summary}</p>
            {expanded === article.id && (
              <p className="mt-3 text-senior-base text-slate-600">{article.fullText}</p>
            )}
            <button
              type="button"
              onClick={() => setExpanded(expanded === article.id ? null : article.id)}
              className="mt-4 text-senior-sm font-semibold text-civic-blue"
            >
              {expanded === article.id ? "Show less" : "Read more"}
            </button>
          </article>
        ))}
      </div>
    </section>
  );
};

export default News;
