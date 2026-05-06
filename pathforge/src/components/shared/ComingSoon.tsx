import Link from 'next/link';
import { Construction, ArrowLeft } from 'lucide-react';

type Props = {
  feature: string;
  phase?: string;
  description: string;
  backHref?: string;
  backLabel?: string;
};

export function ComingSoon({
  feature,
  phase = 'Phase 3',
  description,
  backHref = '/catalog',
  backLabel = 'Browse the catalog',
}: Props) {
  return (
    <div className="max-w-2xl mx-auto py-16 px-6">
      <div className="text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-muted mb-6">
          <Construction className="h-7 w-7 text-muted-foreground" />
        </div>

        <p className="text-xs font-medium uppercase tracking-wider text-primary mb-2">
          {phase} · 準備中
        </p>

        <h1 className="text-3xl font-semibold mb-4">{feature}</h1>

        <p className="text-muted-foreground mb-8 leading-relaxed">
          {description}
        </p>

        <Link
          href={backHref}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-md border bg-background hover:bg-muted transition-colors text-sm"
        >
          <ArrowLeft className="h-4 w-4" />
          {backLabel}
        </Link>
      </div>
    </div>
  );
}
