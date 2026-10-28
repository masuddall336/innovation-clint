
const Loading = () => {
  return (
    <div
      className="fixed inset-0 z-99999 flex min-h-screen items-center justify-center overflow-hidden bg-[#07111f] px-6 py-16"
      role="status"
      aria-live="polite"
      aria-label="Preparing introduction"
    >
      <div className="flex flex-col items-center gap-5 text-center">
        <div className="relative flex h-[76px] w-[76px] items-center justify-center">
          <span className="absolute inset-0 animate-spin rounded-full border-2 border-white/15 border-t-[#00AEEF] shadow-[0_0_24px_rgba(0,174,239,0.2)] motion-reduce:animate-none" />
          <span className="absolute inset-2 animate-[spin_2.4s_linear_infinite_reverse] rounded-full border border-white/10 motion-reduce:animate-none">
            <span className="absolute -top-1 left-1/2 h-2 w-2 -translate-x-1/2 rounded-full bg-[#00AEEF] shadow-[0_0_12px_3px_rgba(0,174,239,0.8)]" />
          </span>
          <img
            src="/logo/IPCL_logo.png"
            alt=""
            width="40"
            height="40"
            decoding="async"
            className="h-10 w-10 object-contain"
          />
        </div>
        <div>
          <p className="text-sm font-semibold text-white">Preparing introduction</p>
          <p className="mt-1 text-xs text-slate-400">Innovation Plastic Cans Ltd.</p>
        </div>
        <div className="flex gap-2" aria-hidden="true">
          {[0, 1, 2].map((dot) => (
            <span key={dot} className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#00AEEF] shadow-[0_0_9px_rgba(0,174,239,0.7)]" style={{ animationDelay: `${dot * 160}ms` }} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Loading;
