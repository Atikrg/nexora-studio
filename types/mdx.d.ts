// Blog posts export `metadata` alongside the default MDX component
declare module "*.mdx" {
  import type { MDXProps } from "mdx/types";
  import type { PostMeta } from "@/lib/blog";
  export const metadata: PostMeta;
  export default function MDXContent(props: MDXProps): React.JSX.Element;
}
