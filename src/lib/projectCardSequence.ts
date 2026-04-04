/**
 * Upper bound for disableReveal project cards (image tween + ScrollRevealWords + LinksRevealAfterDelay).
 * Keep in sync with ScrollRevealCard `disableReveal` branch and LinksRevealAfterDelay.
 */
export function estimateDisableRevealProjectSequenceMs(
  title: string,
  description: string,
  linkCount: number,
): number {
  const titleWordCount = title.split(/\s+/).length;
  const descriptionWordCount = description.split(/\s+/).length;
  let linksRevealDelayMs =
    (0.08 + (titleWordCount + descriptionWordCount) * 0.058 + 0.15) * 1000;
  if (linkCount === 1) {
    linksRevealDelayMs += 120;
  }
  const linksEndMs =
    linksRevealDelayMs + Math.max(0, linkCount - 1) * 120 + 900;
  const imageMs = 1500;
  return Math.ceil(Math.max(imageMs, linksEndMs) + 280);
}
