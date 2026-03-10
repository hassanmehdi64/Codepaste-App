import React from "react";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  const linkClass = ({ isActive }) =>
    [
      "rounded-full px-4 py-2 text-sm font-medium transition",
      isActive
        ? "bg-sky-400 text-slate-950 shadow-lg shadow-sky-500/20"
        : "text-slate-300 hover:bg-white/10 hover:text-white",
    ].join(" ");

  return (
    <nav className="mx-auto flex w-full max-w-5xl items-center justify-between rounded-3xl border border-white/10 bg-slate-900/70 px-6 py-4 shadow-2xl shadow-slate-950/30 backdrop-blur">
      <div>
        <p className="text-lg font-semibold tracking-tight text-white">
          CodePaste
        </p>
        <p className="text-xs text-slate-400">Write, preview, and organize snippets</p>
      </div>

      <div className="flex items-center gap-3">
        <NavLink to="/" className={linkClass}>
          Home
        </NavLink>
        <NavLink to="/pastes" className={linkClass}>
          Pastes
        </NavLink>
      </div>
    </nav>
  );
};

export default Navbar;
