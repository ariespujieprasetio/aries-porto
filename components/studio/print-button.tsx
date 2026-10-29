"use client";
export function PrintButton({ label }: { label: string }) {
  return (
    <button className="button print-button" onClick={() => window.print()}>
      {label} ↓
    </button>
  );
}
