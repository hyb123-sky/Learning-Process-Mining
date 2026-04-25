export function CompareTable({
  headers,
  rows,
}: {
  headers?: string[];
  rows?: (string | number)[][];
}) {
  const safeHeaders = Array.isArray(headers) ? headers : [];
  const safeRows = Array.isArray(rows) ? rows : [];
  if (safeHeaders.length === 0 || safeRows.length === 0) {
    return (
      <div className="my-5 rounded-md border border-pf-warning/40 bg-pf-warning/10 p-3 font-mono text-xs text-pf-text-secondary">
        ⚠ CompareTable: no headers/rows received from MDX (likely a parser issue with this block).
      </div>
    );
  }
  return (
    <div className="my-5 overflow-x-auto rounded-md border border-border">
      <table className="w-full text-sm">
        <thead className="bg-pf-ivory-warm">
          <tr>
            {safeHeaders.map((h, i) => (
              <th
                key={i}
                className="px-3 py-2.5 text-left text-[10.5px] font-semibold uppercase tracking-widest text-pf-gold-muted"
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {safeRows.map((r, i) => (
            <tr key={i} className="border-t border-border">
              {r.map((c, j) => (
                <td key={j} className="px-3 py-2.5 align-top text-pf-text-primary">
                  {c}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
