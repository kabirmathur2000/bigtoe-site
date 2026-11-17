/**
 * Grey placeholder sized for the final photo. `shot` is the alt text: it
 * describes the photo the shot list calls for, so it can be swapped by name.
 */
export function Placeholder({
  ratio = "3 / 2",
  shot,
  className = "",
}: {
  ratio?: string;
  shot: string;
  className?: string;
}) {
  return (
    <div
      role="img"
      aria-label={shot}
      style={ratio ? { aspectRatio: ratio } : undefined}
      className={`relative flex w-full items-end bg-current/15 p-4 ${className}`}
    >
      <span className="text-caption opacity-75">{shot}</span>
    </div>
  );
}
