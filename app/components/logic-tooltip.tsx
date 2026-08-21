"use client";

import { createContext, useContext, useEffect, useId, useState } from "react";

type LogicContent = { title: string; what: string; why: string; logic: string };
const LogicContext = createContext({ enabled: true, toggle: () => {} });

export function LogicProvider({ children }: { children: React.ReactNode }) {
  const [enabled, setEnabled] = useState(true);
  useEffect(() => {
    const saved = sessionStorage.getItem("bundle-prototype-logic");
    if (saved !== null) setEnabled(saved === "true");
  }, []);
  const toggle = () => setEnabled((current) => {
    const next = !current;
    sessionStorage.setItem("bundle-prototype-logic", String(next));
    return next;
  });
  return <LogicContext.Provider value={{ enabled, toggle }}>{children}</LogicContext.Provider>;
}

export function LogicToggle() {
  const { enabled, toggle } = useContext(LogicContext);
  return <button className={`logic-toggle ${enabled ? "active" : ""}`} onClick={toggle} aria-pressed={enabled}><span aria-hidden="true">ⓘ</span> Show Logic</button>;
}

export function LogicTooltip({ title, what, why, logic }: LogicContent) {
  const { enabled } = useContext(LogicContext);
  const [open, setOpen] = useState(false);
  const tooltipId = useId();
  if (!enabled) return null;
  return <span className="logic-tooltip" onPointerEnter={() => setOpen(true)} onPointerLeave={() => setOpen(false)}>
    <button className="logic-icon" type="button" aria-label={`Explain ${title}`} aria-describedby={open ? tooltipId : undefined} aria-expanded={open} onFocus={() => setOpen(true)} onBlur={() => setOpen(false)} onClick={() => setOpen(true)}>ⓘ</button>
    {open && <span className="logic-popover" id={tooltipId} role="tooltip"><b>{title}</b><span><strong>What it means</strong>{what}</span><span><strong>Why Bundle needs it</strong>{why}</span><span><strong>Logic</strong>{logic}</span></span>}
  </span>;
}

export function LogicLabel({ children, ...content }: LogicContent & { children: React.ReactNode }) {
  return <span className="logic-label">{children}<LogicTooltip {...content} /></span>;
}
