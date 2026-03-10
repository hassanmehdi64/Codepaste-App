import React, { useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { removeFromPastes, resetToPastes } from "../redux/PasteSlice";

const Pastes = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const pastes = useSelector((state) => state.paste);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const filteredPastes = useMemo(() => {
    const value = searchTerm.trim().toLowerCase();

    if (!value) {
      return pastes;
    }

    return pastes.filter((paste) => {
      return (
        paste.title.toLowerCase().includes(value) ||
        paste.content.toLowerCase().includes(value)
      );
    });
  }, [pastes, searchTerm]);

  const handleDelete = (pasteId) => {
    dispatch(removeFromPastes(pasteId));
  };

  const handleCopy = async (content) => {
    try {
      await navigator.clipboard.writeText(content);
      toast.success("Paste copied");
    } catch {
      toast.error("Copy failed");
    }
  };

  return (
    <section className="mx-auto mt-8 w-full max-w-5xl rounded-[2rem] border border-white/10 bg-slate-900/70 p-6 text-left shadow-2xl shadow-slate-950/30 backdrop-blur sm:p-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <span className="w-fit rounded-full border border-emerald-400/30 bg-emerald-400/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-emerald-300">
            Library
          </span>
          <h1 className="mt-4 text-3xl font-semibold tracking-tight text-white">
            Saved pastes
          </h1>
          <p className="mt-2 text-sm text-slate-400 sm:text-base">
            Search, open, edit, copy, or delete your saved snippets.
          </p>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row">
          <input
            type="text"
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
            placeholder="Search pastes"
            className="w-full rounded-2xl border border-white/10 bg-slate-950/80 px-4 py-3 text-sm text-white outline-none placeholder:text-slate-500 focus:border-emerald-400/70 sm:w-64"
          />
          {pastes.length > 0 && (
            <button
              onClick={() => dispatch(resetToPastes())}
              className="rounded-2xl border border-red-400/30 px-4 py-3 text-sm font-medium text-red-300 transition hover:bg-red-400/10"
            >
              Clear All
            </button>
          )}
        </div>
      </div>

      {filteredPastes.length === 0 ? (
        <div className="mt-8 rounded-[1.5rem] border border-dashed border-white/15 bg-slate-950/60 p-10 text-center">
          <p className="text-lg font-medium text-slate-200">
            {pastes.length === 0 ? "No pastes yet" : "No matching pastes"}
          </p>
          <p className="mt-2 text-sm text-slate-500">
            {pastes.length === 0
              ? "Create a paste from the home page to populate this section."
              : "Try a different title or content keyword."}
          </p>
        </div>
      ) : (
        <div className="mt-8 grid gap-4">
          {filteredPastes
            .slice()
            .reverse()
            .map((paste) => (
              <article
                key={paste._id}
                className="rounded-[1.5rem] border border-white/10 bg-slate-950/70 p-5"
              >
                <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                  <div className="min-w-0">
                    <h2 className="truncate text-xl font-semibold text-white">
                      {paste.title}
                    </h2>
                    <p className="mt-2 line-clamp-3 whitespace-pre-wrap text-sm text-slate-400">
                      {paste.content}
                    </p>
                    <p className="mt-4 text-xs text-slate-500">
                      {new Date(paste.createdAt).toLocaleString()}
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-2 lg:justify-end">
                    <Link
                      to={`/pastes/${paste._id}`}
                      className="rounded-xl bg-sky-400 px-4 py-2 text-sm font-medium text-slate-950 transition hover:bg-sky-300"
                    >
                      View
                    </Link>
                    <button
                      onClick={() => navigate(`/?pasteId=${paste._id}`)}
                      className="rounded-xl border border-amber-400/30 px-4 py-2 text-sm font-medium text-amber-300 transition hover:bg-amber-400/10"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleCopy(paste.content)}
                      className="rounded-xl border border-white/10 px-4 py-2 text-sm font-medium text-slate-200 transition hover:bg-white/10"
                    >
                      Copy
                    </button>
                    <button
                      onClick={() => handleDelete(paste._id)}
                      className="rounded-xl border border-red-400/30 px-4 py-2 text-sm font-medium text-red-300 transition hover:bg-red-400/10"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </article>
            ))}
        </div>
      )}
    </section>
  );
};

export default Pastes;
