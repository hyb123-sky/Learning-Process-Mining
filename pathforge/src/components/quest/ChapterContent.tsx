import { MDXRemote } from "next-mdx-remote/rsc";
import { mdxComponents } from "@/components/mdx/mdx-components";

export function ChapterContent({ contentMdx }: { contentMdx: string }) {
  return (
    <article className="prose-pf max-w-none">
      <MDXRemote source={contentMdx} components={mdxComponents} />
    </article>
  );
}
