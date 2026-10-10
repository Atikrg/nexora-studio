import type { ReactNode } from "react";

/** Route group for the legal pages. The shell lives in each page via <LegalPage>. */
export default function LegalLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
