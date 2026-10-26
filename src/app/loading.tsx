export default function Loading() {
  return (
    <div
      role="status"
      aria-label="Chargement"
      className="fixed inset-0 z-50 flex items-center justify-center bg-bg/80 backdrop-blur"
    >
      <div className="h-10 w-10 animate-pulse-glow rounded-full bg-accent shadow-glow" />
    </div>
  );
}
