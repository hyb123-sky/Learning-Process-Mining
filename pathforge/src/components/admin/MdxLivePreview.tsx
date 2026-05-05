"use client";

import { useEffect, useState } from "react";
import { MDXRemote } from "next-mdx-remote";
import type { MDXRemoteSerializeResult } from "next-mdx-remote";
import { serializeMdxPreview } from "@/actions/mdx";
import { mdxComponents } from "@/components/mdx/mdx-components";

export function MdxLivePreview({ source }: { source: string }) {
  const [serialized, setSerialized] = useState<MDXRemoteSerializeResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!source) {
      setSerialized(null);
      return;
    }
    let stale = false;
    serializeMdxPreview(source)
      .then((result) => {
        if (!stale) {
          setSerialized(result);
          setError(null);
        }
      })
      .catch((e) => {
        if (!stale) setError(e instanceof Error ? e.message : "Preview error");
      });
    return () => {
      stale = true;
    };
  }, [source]);

  if (error) {
    return (
      <div className="font-mono text-xs text-pf-error p-2 whitespace-pre-wrap">
        {error}
      </div>
    );
  }

  if (!serialized) {
    return (
      <div className="text-pf-text-muted text-sm italic p-2">
        Loading preview…
      </div>
    );
  }

  return (
    <div className="prose-pf">
      {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
      <MDXRemote {...serialized} components={mdxComponents as any} />
    </div>
  );
}
