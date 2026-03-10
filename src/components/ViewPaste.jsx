import React from "react";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";

const ViewPaste = () => {
  const { id } = useParams();
  const pastes = useSelector((state) => state.paste);
  const paste = pastes.find((item) => item._id === id);

  if (!paste) {
    return (
      <section className="mx-auto mt-8 w-full max-w-5xl rounded-[2rem] border border-white/10 bg-slate-900/70 p-6 text-left shadow-2xl shadow-slate-950/30 backdrop-blur sm:p-8">
        <span className="w-fit rounded-full border border-amber-400/30 bg-amber-400/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-amber-300">
          Preview
        </span>
        <h1 className="mt-4 text-3xl font-semibold tracking-tight text-white">
          Paste not found
        </h1>
        <p className="mt-2 text-sm text-slate-400 sm:text-base">
          The requested paste does not exist or has already been removed.
        </p>
        <Link
          to="/pastes"
          className="mt-6 inline-flex rounded-2xl bg-sky-400 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-sky-300"
        >
          Back to pastes
        </Link>
      </section>
    );
  }

  return (
    <section className="mx-auto mt-8 w-full max-w-5xl rounded-[2rem] border border-white/10 bg-slate-900/70 p-6 text-left shadow-2xl shadow-slate-950/30 backdrop-blur sm:p-8">
      <span className="w-fit rounded-full border border-amber-400/30 bg-amber-400/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-amber-300">
        Preview
      </span>
      <h1 className="mt-4 text-3xl font-semibold tracking-tight text-white">
        {paste.title}
      </h1>
      <p className="mt-2 text-sm text-slate-400 sm:text-base">
        Created on {new Date(paste.createdAt).toLocaleString()}
      </p>

      <div className="mt-8 rounded-[1.5rem] border border-white/10 bg-slate-950/70 p-6">
        <div className="mb-4 flex items-center justify-between">
          <p className="text-sm font-medium text-slate-300">{paste.title}</p>
          <span className="rounded-full bg-white/5 px-3 py-1 text-xs text-slate-400">
            Read only
          </span>
        </div>
        <pre className="overflow-x-auto whitespace-pre-wrap break-words rounded-2xl bg-slate-900 p-5 text-sm leading-7 text-slate-300">
          {paste.content}
        </pre>
      </div>
    </section>
  );
};

export default ViewPaste;
