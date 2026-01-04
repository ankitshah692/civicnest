import { AlertTriangle, Mail, HandHeart, Vote, Users } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import BigButton from "../components/common/BigButton.jsx";

const sections = [
  {
    title: "Report an Issue",
    description: "Tell the city about a problem in four simple steps.",
    icon: AlertTriangle,
    action: "Start a Report",
    link: "report",
  },
  {
    title: "Volunteer Opportunities",
    description: "Join friendly volunteer shifts near you.",
    icon: HandHeart,
    action: "See Opportunities",
    link: null,
  },
  {
    title: "Contact Your Representative",
    description: "Send a simple message to your local leaders.",
    icon: Mail,
    action: "Send a Message",
    link: null,
  },
  {
    title: "Register to Vote",
    description: "Check registration, update your address, or request help.",
    icon: Vote,
    action: "Start Registration",
    link: null,
  },
  {
    title: "Community Groups",
    description: "Find local groups that share your interests.",
    icon: Users,
    action: "Find Groups",
    link: null,
  },
];

const GetInvolved = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const basePath = location.pathname.startsWith("/kiosk") ? "/kiosk" : "/app";

  return (
    <section className="space-y-6">
      <header className="rounded-xl bg-white/90 p-6 shadow-sm surface-panel">
        <h1 className="font-display text-senior-2xl text-civic-navy">Get Involved</h1>
        <p className="mt-2 text-senior-base text-slate-600">
          Simple ways to participate in civic life and stay connected.
        </p>
      </header>

      <div className="grid gap-6 md:grid-cols-2">
        {sections.map((section) => {
          const Icon = section.icon;
          return (
            <div key={section.title} className="rounded-xl bg-white p-6 shadow-sm surface-panel">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-civic-light text-civic-navy">
                <Icon className="h-6 w-6" />
              </div>
              <h2 className="mt-4 font-display text-senior-xl text-civic-navy">{section.title}</h2>
              <p className="mt-2 text-senior-base text-slate-600">{section.description}</p>
              <div className="mt-4">
                <BigButton
                  label={section.action}
                  variant="secondary"
                  onClick={() => {
                    if (section.link) {
                      navigate(`${basePath}/${section.link}`);
                    }
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default GetInvolved;
