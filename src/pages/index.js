import * as React from "react";

const IndexPage = () => {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-indigo-950 text-white flex flex-col items-center justify-center p-6">
      <div className="max-w-xl w-full bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20 shadow-2xl text-center space-y-6">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-tr from-indigo-500 to-cyan-400 shadow-lg">
          <span className="text-2xl font-black">AC</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
          Ajaye-C
        </h1>
        <p className="text-slate-300 text-base sm:text-lg">
          Gatsby React project configured with Tailwind CSS. Ready to replicate your Figma design.
        </p>
        <div className="pt-4 flex flex-wrap gap-3 justify-center">
          <span className="px-3.5 py-1.5 rounded-full text-xs font-semibold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
            Gatsby v5
          </span>
          <span className="px-3.5 py-1.5 rounded-full text-xs font-semibold bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
            Tailwind CSS
          </span>
          <span className="px-3.5 py-1.5 rounded-full text-xs font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
            Netlify Ready
          </span>
        </div>
      </div>
    </main>
  );
};

export default IndexPage;

export const Head = () => <title>Ajaye-C | Home</title>;
