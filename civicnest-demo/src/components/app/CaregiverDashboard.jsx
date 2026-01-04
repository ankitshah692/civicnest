const CaregiverDashboard = () => {
  return (
    <section className="space-y-6">
      <header className="rounded-xl bg-white/90 p-6 shadow-sm surface-panel">
        <h1 className="font-display text-senior-2xl text-civic-navy">Caregiver Dashboard</h1>
        <p className="mt-2 text-senior-base text-slate-600">
          A quick look at recent activity and gentle reminders for your loved one.
        </p>
      </header>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="rounded-xl bg-white p-6 shadow-sm surface-panel">
          <h2 className="font-display text-senior-lg text-civic-navy">Engagement Summary</h2>
          <ul className="mt-4 space-y-2 text-senior-base text-slate-600">
            <li>News read this week: 3 articles</li>
            <li>Surveys completed: 1 survey</li>
            <li>Events bookmarked: 2 events</li>
          </ul>
        </div>
        <div className="rounded-xl bg-white p-6 shadow-sm surface-panel">
          <h2 className="font-display text-senior-lg text-civic-navy">Gentle Reminders</h2>
          <ul className="mt-4 space-y-2 text-senior-base text-slate-600">
            <li>Schedule reminder: Town Hall on Jan 15</li>
            <li>Follow up: Streetlight report submitted</li>
            <li>Weekly check-in call</li>
          </ul>
        </div>
      </div>

      <div className="rounded-xl bg-white p-6 shadow-sm surface-panel">
        <h2 className="font-display text-senior-lg text-civic-navy">Care Notes</h2>
        <p className="mt-2 text-senior-base text-slate-600">
          Add notes about preferred times, helpful prompts, or memory recaps to show next time.
        </p>
        <textarea
          className="mt-4 w-full rounded-xl border-2 border-slate-200 p-4 text-senior-base"
          rows="4"
          placeholder="Example: Loves hearing about library events on Tuesdays."
        />
      </div>
    </section>
  );
};

export default CaregiverDashboard;
