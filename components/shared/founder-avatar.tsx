import Image from "next/image";
import Link from "next/link";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { founder } from "@/data/founder";
import { cn } from "@/lib/utils";

/** Founder avatar (photo or initials placeholder). */
export function FounderAvatar({ className }: { className?: string }) {
  return (
    <Avatar className={cn("size-14 border-2 border-primary", className)}>
      {founder.photo ? (
        <Image
          src={founder.photo}
          alt=""
          width={112}
          height={112}
          className="aspect-square size-full object-cover"
        />
      ) : (
        <AvatarFallback className="bg-muted font-mono">{founder.initials}</AvatarFallback>
      )}
    </Avatar>
  );
}

/** Founder name with a HoverCard preview (keyboard: opens on focus). Links to /about. */
export function FounderPreview() {
  return (
    <HoverCard openDelay={150}>
      <HoverCardTrigger asChild>
        <Link
          href="/about/"
          className="font-semibold underline decoration-signal decoration-2 underline-offset-4"
        >
          {founder.name}
        </Link>
      </HoverCardTrigger>
      <HoverCardContent className="w-80" align="start">
        <div className="flex gap-4">
          <FounderAvatar className="size-12" />
          <div className="flex flex-col gap-1">
            <p className="font-semibold">{founder.name}</p>
            <p className="text-small text-muted-foreground">
              {founder.role} · {founder.location}
            </p>
            <p className="mt-2 text-small">{founder.shortBio}</p>
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
  );
}
