export function CompareTable({
  headers,
  rows,
}: {
  headers: string[];
  rows: (string | number)[][];
}) {
  return (
    <div className="my-5 overflow-x-auto rounded-md border border-border">
      <table className="w-full text-sm">
        <thead className="bg-pf-ivory-warm">
          <tr>
            {headers.map((h, i) => (
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
          {rows.map((r, i) => (
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
