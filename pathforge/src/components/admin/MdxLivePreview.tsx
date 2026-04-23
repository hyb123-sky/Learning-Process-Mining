import { ChapterContent } from "@/components/quest/ChapterContent";

// RSC: re-renders when `source` prop changes (parent is client; this wraps a server component via dynamic child)
// Because ChapterContent uses MDXRemote RSC, we render via a thin wrapper. Acceptable in dev for live preview.
export function MdxLivePreview({ source }: { source: string }) {
  return (
    <div className="prose-pf">
      <ChapterContent contentMdx={source} />
    </div>
  );
}
