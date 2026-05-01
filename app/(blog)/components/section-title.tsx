export function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2
      className="flex items-center gap-3 text-base text-taxi-dark font-bold mb-6"
      style={{ fontFamily: "var(--font-mono)" }}
    >
      <span className="checkered-sm w-6 h-2 shrink-0" />
      {children}
    </h2>
  );
}
