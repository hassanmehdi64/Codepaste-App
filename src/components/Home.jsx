import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { useNavigate, useSearchParams } from "react-router-dom";
import { addToPastes, updateToPastes } from "../redux/PasteSlice";

export const Home = () => {
  const [title, setTitle] = useState("");
  const [value, setValue] = useState("");
  const [searchParams, setSearchParam] = useSearchParams();
  const pasteId = searchParams.get("pasteId");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const pastes = useSelector((state) => state.paste);

  useEffect(() => {
    if (!pasteId) {
      return;
    }

    const currentPaste = pastes.find((item) => item._id === pasteId);

    if (currentPaste) {
      setTitle(currentPaste.title);
      setValue(currentPaste.content);
    }
  }, [pasteId, pastes]);

  const createPaste = () => {
    if (!title.trim() || !value.trim()) {
      toast.error("Title and content are required");
      return;
    }

    const paste = {
      title: title.trim(),
      content: value,
      _id: pasteId || Date.now().toString(),
      createdAt: new Date().toISOString(),
    };


    if (pasteId) {
      dispatch(updateToPastes(paste));
    } else {
      dispatch(addToPastes(paste));
    }

    setTitle("");
    setValue("");
    setSearchParam({});
    navigate("/pastes");
  };


  return (
    <section className="mx-auto mt-8 w-full max-w-5xl rounded-[2rem] border border-white/10 bg-slate-900/70 p-6 shadow-2xl shadow-slate-950/30 backdrop-blur sm:p-8">
      <div className="mb-8 flex flex-col gap-3 text-left">
        <span className="w-fit rounded-full border border-sky-400/30 bg-sky-400/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-sky-300">
          Paste Editor
        </span>
        <h1 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
          {pasteId ? "Update your paste" : "Create a new paste"}
        </h1>
        <p className="max-w-2xl text-sm text-slate-400 sm:text-base">
          Use the title field for quick identification and keep your code or
          notes in the editor below.
        </p>
      </div>

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
        <input
          className="w-full rounded-2xl border border-white/10 bg-slate-950/80 px-4 py-3 text-sm text-white outline-none ring-0 placeholder:text-slate-500 focus:border-sky-400/70"
          type="text"
          placeholder="Enter Title Here.."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <button
          onClick={createPaste}
          className="rounded-2xl bg-sky-400 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-sky-300">
          {pasteId ? "Update paste" : "Create Paste"}
        </button>
      </div>

      <textarea
        className="mt-5 min-h-[420px] w-full rounded-[1.5rem] border border-white/10 bg-slate-950/80 px-4 py-4 font-mono text-sm text-slate-100 outline-none placeholder:text-slate-500 focus:border-sky-400/70"
        value={value}
        placeholder="Enter content here..."
        onChange={(e) => setValue(e.target.value)}
        rows={20}
      />
    </section>
  );
};
