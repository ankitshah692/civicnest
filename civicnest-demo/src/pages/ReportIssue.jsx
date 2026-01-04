import { useMemo, useState } from "react";
import {
  Camera,
  CheckCircle2,
  MapPin,
  Mic,
  Construction,
  Lightbulb,
  Trash2,
  Car,
  Trees,
  HelpCircle,
} from "lucide-react";
import ProgressIndicator from "../components/common/ProgressIndicator.jsx";
import BigButton from "../components/common/BigButton.jsx";
import { useLocation, useNavigate } from "react-router-dom";

const issueTypes = [
  { label: "Road/Sidewalk Problem", icon: Construction },
  { label: "Street Light Out", icon: Lightbulb },
  { label: "Garbage/Litter", icon: Trash2 },
  { label: "Parking Issue", icon: Car },
  { label: "Tree/Park Concern", icon: Trees },
  { label: "Something Else", icon: HelpCircle },
];

const steps = ["Select Type", "Location", "Details", "Confirm", "Success"];

const ReportIssue = () => {
  const [stepIndex, setStepIndex] = useState(0);
  const navigate = useNavigate();
  const location = useLocation();
  const basePath = location.pathname.startsWith("/kiosk") ? "/kiosk" : "/app";
  const [formData, setFormData] = useState({
    type: null,
    location: "",
    details: "",
    photo: null,
  });

  const reference = useMemo(() => Math.floor(Math.random() * 90000 + 10000), []);

  const nextStep = () => setStepIndex((prev) => Math.min(prev + 1, steps.length - 1));
  const prevStep = () => setStepIndex((prev) => Math.max(prev - 1, 0));

  const handleSelectType = (type) => {
    setFormData((prev) => ({ ...prev, type }));
    nextStep();
  };

  const handleSubmit = () => {
    nextStep();
  };

  return (
    <section className="space-y-6">
      <header className="rounded-xl bg-white/90 p-6 shadow-sm surface-panel">
        <h1 className="font-display text-senior-2xl text-civic-navy">Report an Issue</h1>
        <p className="mt-2 text-senior-base text-slate-600">
          We&apos;ll guide you through a simple report in a few steps.
        </p>
        <div className="mt-4">
          <ProgressIndicator steps={steps} currentStep={stepIndex} />
        </div>
      </header>

      {stepIndex === 0 && (
        <div className="grid gap-4 md:grid-cols-2">
          {issueTypes.map((type) => {
            const Icon = type.icon;
            return (
              <BigButton
                key={type.label}
                icon={<Icon />}
                label={type.label}
                onClick={() => handleSelectType(type.label)}
                audioLabel={`Report ${type.label}`}
              />
            );
          })}
        </div>
      )}

      {stepIndex === 1 && (
        <div className="rounded-xl bg-white p-6 shadow-sm surface-panel space-y-4">
          <label className="block text-senior-base font-semibold text-civic-navy">
            Where is it located?
          </label>
          <input
            type="text"
            value={formData.location}
            onChange={(event) =>
              setFormData((prev) => ({ ...prev, location: event.target.value }))
            }
            placeholder="Enter an address or landmark"
            className="w-full rounded-xl border-2 border-slate-200 p-4 text-senior-base"
          />
          <button
            type="button"
            className="flex items-center gap-2 rounded-full border-2 border-civic-navy px-4 py-2 text-senior-sm font-semibold text-civic-navy"
          >
            <MapPin className="h-5 w-5" /> Use my location
          </button>
          <div className="rounded-xl border-2 border-dashed border-slate-200 p-6 text-center text-senior-sm text-slate-500">
            Simple map preview will appear here.
          </div>
          <div className="flex flex-wrap gap-4">
            <BigButton label="Back" variant="outline" onClick={prevStep} />
            <BigButton label="Continue" onClick={nextStep} />
          </div>
        </div>
      )}

      {stepIndex === 2 && (
        <div className="rounded-xl bg-white p-6 shadow-sm surface-panel space-y-4">
          <label className="block text-senior-base font-semibold text-civic-navy">
            Tell us more (optional)
          </label>
          <textarea
            value={formData.details}
            onChange={(event) =>
              setFormData((prev) => ({ ...prev, details: event.target.value }))
            }
            rows="4"
            placeholder="Add any helpful details"
            className="w-full rounded-xl border-2 border-slate-200 p-4 text-senior-base"
          />
          <div className="flex flex-wrap gap-3">
            <button
              type="button"
              className="flex items-center gap-2 rounded-full border-2 border-civic-teal px-4 py-2 text-senior-sm font-semibold text-civic-teal"
            >
              <Mic className="h-5 w-5" /> Voice input
            </button>
            <button
              type="button"
              className="flex items-center gap-2 rounded-full border-2 border-civic-navy px-4 py-2 text-senior-sm font-semibold text-civic-navy"
            >
              <Camera className="h-5 w-5" /> Add photo
            </button>
          </div>
          <div className="flex flex-wrap gap-4">
            <BigButton label="Back" variant="outline" onClick={prevStep} />
            <BigButton label="Continue" onClick={nextStep} />
          </div>
        </div>
      )}

      {stepIndex === 3 && (
        <div className="rounded-xl bg-white p-6 shadow-sm surface-panel space-y-4">
          <h2 className="font-display text-senior-xl text-civic-navy">Confirm your report</h2>
          <div className="space-y-2 text-senior-base text-slate-600">
            <p>
              <strong>Issue:</strong> {formData.type || "Not selected"}
            </p>
            <p>
              <strong>Location:</strong> {formData.location || "Not provided"}
            </p>
            <p>
              <strong>Details:</strong> {formData.details || "No extra details"}
            </p>
          </div>
          <div className="flex flex-wrap gap-4">
            <BigButton label="Back" variant="outline" onClick={prevStep} />
            <BigButton label="Submit Report" onClick={handleSubmit} />
          </div>
        </div>
      )}

      {stepIndex === 4 && (
        <div className="rounded-xl bg-white p-8 text-center shadow-sm surface-panel space-y-4">
          <CheckCircle2 className="mx-auto h-16 w-16 text-green-500" />
          <h2 className="font-display text-senior-2xl text-civic-navy">Your report was sent!</h2>
          <p className="text-senior-base text-slate-600">Reference number: #{reference}</p>
          <div className="flex flex-wrap justify-center gap-4">
            <BigButton label="Report Another Issue" onClick={() => setStepIndex(0)} />
            <BigButton label="Go Home" variant="outline" onClick={() => navigate(`${basePath}/home`)} />
          </div>
        </div>
      )}
    </section>
  );
};

export default ReportIssue;
