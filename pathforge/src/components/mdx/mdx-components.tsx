import { Term } from "./Term";
import { Callout } from "./Callout";
import { CompareTable } from "./CompareTable";
import { PqlExample } from "./PqlExample";
import type { MDXComponents } from "mdx/types";

export const mdxComponents: MDXComponents = {
  Term,
  Callout,
  CompareTable,
  PqlExample,
  h2: (props) => <h2 className="font-display text-[1.75rem] mt-8 mb-3 font-medium tracking-tight text-pf-navy" {...props} />,
  h3: (props) => <h3 className="font-display text-xl mt-6 mb-2 font-semibold text-pf-navy" {...props} />,
  p:  (props) => <p className="mb-4 leading-relaxed" {...props} />,
  ul: (props) => <ul className="mb-4" {...props} />,
  li: (props) => <li {...props} />,
  strong: (props) => <strong className="font-bold text-pf-navy" {...props} />,
  blockquote: (props) => <blockquote {...props} />,
};
