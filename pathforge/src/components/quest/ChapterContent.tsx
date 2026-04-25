import { MDXRemote } from "next-mdx-remote/rsc";
import { mdxComponents } from "@/components/mdx/mdx-components";

// blockJS: false lets us pass arrays/objects as JSX expression attributes
//   (e.g. <CompareTable headers={['a','b']} rows={[['c','d']]} />). The
//   default in next-mdx-remote v6 strips these, which makes our component
//   props arrive as undefined.
// blockDangerousJS: true keeps the safety guard against eval / Function etc.
export function ChapterContent({ contentMdx }: { contentMdx: string }) {
  return (
    <article className="prose-pf max-w-none">
      <MDXRemote
        source={contentMdx}
        components={mdxComponents}
        options={{ blockJS: false, blockDangerousJS: true }}
      />
    </article>
  );
}
