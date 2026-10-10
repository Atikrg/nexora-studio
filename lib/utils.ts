import { createCn } from "cn/config";

/**
 * Class merger that knows the design system's custom utilities.
 * Without this, `text-h4` is mistaken for a text *colour* and can silently drop
 * `text-muted-foreground` (or lose to `text-sm`) when classes are merged.
 * All components, including components/ui, must import cn from here.
 */
export const cn = createCn({
  extend: {
    classGroups: {
      "font-size": [
        {
          text: [
            "display-xl",
            "display",
            "h1",
            "h2",
            "h3",
            "h4",
            "body-lg",
            "body",
            "small",
            "caption",
          ],
        },
      ],
      shadow: [{ shadow: ["soft", "lift", "glow"] }],
    },
  },
});
