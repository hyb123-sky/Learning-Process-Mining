"use server";
import { serialize } from "next-mdx-remote/serialize";
import type { MDXRemoteSerializeResult } from "next-mdx-remote";

export async function serializeMdxPreview(
  source: string
): Promise<MDXRemoteSerializeResult> {
  return serialize(source, { blockJS: false, blockDangerousJS: true });
}
