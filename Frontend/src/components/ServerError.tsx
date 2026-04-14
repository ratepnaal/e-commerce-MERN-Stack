const ServerError = () => {
  return (
    <div className="relative min-h-[calc(100vh-5.25rem)] overflow-hidden px-4 py-12 sm:px-6 lg:px-8">
      <div className="absolute left-10 top-10 h-40 w-40 rounded-full bg-teal-400/15 blur-3xl" />
      <div className="absolute right-8 top-24 h-56 w-56 rounded-full bg-slate-900/10 blur-3xl" />

      <div className="mx-auto flex min-h-[calc(100vh-8rem)] w-full max-w-4xl items-center justify-center">
        <div className="section-shell relative w-full overflow-hidden rounded-4xl p-6 shadow-[0_24px_80px_rgba(15,23,42,0.12)] sm:p-10 lg:p-12">
          <div className="mx-auto flex max-w-2xl flex-col items-center text-center">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-teal-100 bg-teal-50 px-4 py-2 text-sm font-semibold text-teal-700 shadow-sm">
              <span className="h-2 w-2 rounded-full bg-teal-500" />
              Service temporarily unavailable
            </div>

            <div className="mb-6 flex h-28 w-28 items-center justify-center rounded-4xl border border-slate-200 bg-white text-5xl font-bold text-teal-700 shadow-lg shadow-slate-200/60">
              500
            </div>

            <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-5xl">
              We&apos;re having trouble loading this page.
            </h1>

            <p className="mt-4 max-w-xl text-base leading-8 text-slate-600 sm:text-lg">
              The server is taking a short break or there is a temporary issue on our side.
              The store team is already looking into it, so you can try again in a moment.
            </p>

            <div className="mt-8 flex w-full flex-col justify-center gap-3 sm:w-auto sm:flex-row">
              <button
                onClick={() => window.location.reload()}
                className="inline-flex items-center justify-center rounded-xl border border-teal-600 bg-teal-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-teal-600/20 transition hover:-translate-y-0.5 hover:bg-teal-700"
              >
                Try again
              </button>

              <a
                href="/"
                className="inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white px-6 py-3 text-sm font-semibold text-slate-700 shadow-sm transition hover:-translate-y-0.5 hover:border-slate-300 hover:bg-slate-50"
              >
                Back to home
              </a>
            </div>

            <div className="mt-8 rounded-2xl border border-slate-200 bg-white/80 px-4 py-3 text-xs font-medium uppercase tracking-[0.22em] text-slate-500 shadow-sm">
              Error code 500 · Temporary server issue
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServerError;