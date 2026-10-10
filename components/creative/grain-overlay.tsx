/** Film grain: one fixed CSS layer (no canvas, no JS). Hidden for reduced motion via CSS. */
export function GrainOverlay() {
  return <div aria-hidden="true" className="grain-overlay" />;
}
