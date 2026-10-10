import { Check, Minus, X } from "lucide-react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { comparison } from "@/data/home";
import type { ComparisonRow } from "@/types/content";
import { cn } from "@/lib/utils";

const scoreIcon = { good: Check, mid: Minus, bad: X } as const;
const scoreText = { good: "Strong", mid: "Mixed", bad: "Weak" } as const;

function Score({ cell, highlight }: { cell: ComparisonRow["us"]; highlight?: boolean }) {
  const IconComponent = scoreIcon[cell.score];
  return (
    <span className="flex items-start gap-2">
      <IconComponent
        aria-hidden="true"
        className={cn(
          "mt-0.5 size-4 shrink-0",
          cell.score === "good" && (highlight ? "text-signal" : "text-success"),
          cell.score === "mid" && "text-muted-foreground",
          cell.score === "bad" && "text-destructive",
        )}
      />
      <span>
        <span className="sr-only">{scoreText[cell.score]}: </span>
        {cell.label}
      </span>
    </span>
  );
}

/**
 * Us vs Freelancer vs Big agency (shadcn Table). Scores use an icon AND text, never colour alone.
 * On small screens the table scrolls horizontally with the criterion column pinned.
 */
export function ComparisonTable() {
  return (
    <div className="overflow-hidden rounded-2xl border border-border bg-card">
      <Table className="min-w-[44rem] text-small">
        <TableCaption className="sr-only">{comparison.caption}</TableCaption>
        <TableHeader>
          <TableRow className="hover:bg-transparent">
            <TableHead scope="col" className="sticky left-0 z-10 w-44 bg-card py-4 pl-6">
              <span className="sr-only">Criterion</span>
            </TableHead>
            <TableHead
              scope="col"
              className="bg-primary/8 py-4 font-display text-body font-semibold text-foreground"
            >
              {comparison.columns.us}
            </TableHead>
            <TableHead scope="col" className="py-4 text-muted-foreground">
              {comparison.columns.freelancer}
            </TableHead>
            <TableHead scope="col" className="py-4 text-muted-foreground">
              {comparison.columns.agency}
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {comparison.rows.map((row) => (
            <TableRow key={row.criterion}>
              <TableHead
                scope="row"
                className="sticky left-0 z-10 bg-card py-4 pl-6 font-medium text-foreground"
              >
                {row.criterion}
              </TableHead>
              <TableCell className="bg-primary/8 py-4 font-medium whitespace-normal">
                <Score cell={row.us} highlight />
              </TableCell>
              <TableCell className="py-4 whitespace-normal text-muted-foreground">
                <Score cell={row.freelancer} />
              </TableCell>
              <TableCell className="py-4 whitespace-normal text-muted-foreground">
                <Score cell={row.agency} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
