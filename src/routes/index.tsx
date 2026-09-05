import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Age Verification — 18+" },
      {
        name: "description",
        content: "You must be 18 years or older to enter.",
      },
      { property: "og:title", content: "Age Verification — 18+" },
      {
        property: "og:description",
        content: "You must be 18 years or older to enter.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: AgeGate,
});

const REDIRECT_URL =
  "https://track.revoffers.com/aff_c?offer_id=1409&aff_id=10776";

function AgeGate() {
  const [denied, setDenied] = useState(false);

  useEffect(() => {
    if (denied) {
      const t = setTimeout(() => setDenied(false), 4000);
      return () => clearTimeout(t);
    }
  }, [denied]);

  return (
    <div className="relative min-h-screen overflow-hidden bg-emerald-950">
      {/* Blurred glowing background */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-32 -top-32 h-[34rem] w-[34rem] rounded-full bg-emerald-500/30 blur-3xl" />
        <div className="absolute -bottom-40 -right-24 h-[40rem] w-[40rem] rounded-full bg-green-400/25 blur-3xl" />
        <div className="absolute left-1/2 top-1/3 h-72 w-72 -translate-x-1/2 rounded-full bg-teal-300/20 blur-3xl" />
      </div>

      {/* Soft grain / dim layer */}
      <div className="pointer-events-none absolute inset-0 bg-emerald-950/40 backdrop-blur-2xl" />

      {/* Card */}
      <div className="relative z-10 flex min-h-screen items-center justify-center px-4">
        <div className="w-full max-w-md rounded-3xl border border-emerald-400/20 bg-emerald-900/40 p-8 text-center shadow-2xl shadow-emerald-950/60 backdrop-blur-xl sm:p-10">
          {/* 18+ badge */}
          <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full border border-emerald-300/30 bg-emerald-500/15">
            <span className="text-3xl font-black tracking-tight text-emerald-200">
              18+
            </span>
          </div>

          <h1 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
            Age Verification
          </h1>
          <p className="mt-3 text-sm leading-relaxed text-emerald-100/80">
            This website contains age-restricted content. Please confirm that
            you are at least{" "}
            <span className="font-semibold text-emerald-200">18 years old</span>{" "}
            to continue.
          </p>

          {/* Buttons */}
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
            <button
              type="button"
              onClick={() => {
                window.location.href = REDIRECT_URL;
              }}
              className="inline-flex items-center justify-center rounded-xl bg-emerald-400 px-6 py-3 text-sm font-semibold text-emerald-950 shadow-lg shadow-emerald-500/30 transition hover:bg-emerald-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-200 focus-visible:ring-offset-2 focus-visible:ring-offset-emerald-950"
            >
              Yes, I am 18+
            </button>
            <button
              type="button"
              onClick={() => setDenied(true)}
              className="inline-flex items-center justify-center rounded-xl border border-emerald-300/30 bg-emerald-900/30 px-6 py-3 text-sm font-medium text-emerald-100 transition hover:bg-emerald-800/40 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300/50"
            >
              No, I am not
            </button>
          </div>

          {/* Denied message */}
          <div
            className={`mt-6 overflow-hidden transition-all duration-300 ${
              denied ? "max-h-24 opacity-100" : "max-h-0 opacity-0"
            }`}
          >
            <p className="rounded-xl border border-red-400/20 bg-red-500/10 px-4 py-3 text-sm text-red-200">
              Sorry — you must be at least 18 years old to access this content.
            </p>
          </div>

          <p className="mt-8 text-xs text-emerald-200/50">
            By entering, you confirm that you are of legal age in your
            jurisdiction.
          </p>
        </div>
      </div>
    </div>
  );
}
