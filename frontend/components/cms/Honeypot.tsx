"use client";

/** Invisible anti-spam field. Real visitors never see or fill it; bots usually do. */
export default function Honeypot({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  return (
    <div aria-hidden="true" style={{ position: "absolute", left: "-10000px", top: "auto", width: 1, height: 1, overflow: "hidden" }}>
      <label>
        Leave this field empty
        <input type="text" name="pm_trap_field" tabIndex={-1} autoComplete="new-password" value={value} onChange={(e) => onChange(e.target.value)} />
      </label>
    </div>
  );
}
