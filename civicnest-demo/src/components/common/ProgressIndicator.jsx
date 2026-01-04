const ProgressIndicator = ({ steps = [], currentStep = 0 }) => {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center gap-2">
        {steps.map((step, index) => (
          <span
            key={step}
            className={`h-3 flex-1 rounded-full ${
              index <= currentStep ? "bg-civic-teal" : "bg-slate-200"
            }`}
          />
        ))}
      </div>
      <p className="text-senior-sm text-slate-600">
        Step {currentStep + 1} of {steps.length}: {steps[currentStep]}
      </p>
    </div>
  );
};

export default ProgressIndicator;
