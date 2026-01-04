const Modal = ({ title, description, onConfirm, onCancel, confirmLabel = "Okay" }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-6">
      <div className="w-full max-w-lg rounded-xl bg-white p-6 shadow-xl">
        <h2 className="font-display text-senior-xl text-civic-navy">{title}</h2>
        <p className="mt-2 text-senior-base text-slate-600">{description}</p>
        <div className="mt-6 flex flex-wrap gap-4">
          <button
            type="button"
            onClick={onConfirm}
            className="big-button flex-1 rounded-xl bg-civic-teal px-6 py-3 text-senior-base font-semibold text-white"
          >
            {confirmLabel}
          </button>
          {onCancel && (
            <button
              type="button"
              onClick={onCancel}
              className="big-button flex-1 rounded-xl border-2 border-civic-navy px-6 py-3 text-senior-base font-semibold text-civic-navy"
            >
              Cancel
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Modal;
