export function PqlExample({
  code,
  caption,
}: {
  code: string;
  caption?: string;
}) {
  return (
    <figure className="my-5">
      <pre className="overflow-x-auto rounded-md border border-border bg-pf-ivory-warm p-4 font-mono text-[12.5px] leading-relaxed text-pf-navy">
        <code>{code.trim()}</code>
      </pre>
      {caption && (
        <figcaption className="mt-1.5 text-[12px] text-pf-text-muted">{caption}</figcaption>
      )}
    </figure>
  );
}
