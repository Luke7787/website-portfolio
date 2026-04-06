/**
 * When to allow the next mobile sequential project card: end of ScrollRevealWords + link tweens
 * (matches LinksRevealAfterDelay timing). Keep in sync with that branch in ScrollRevealCard.
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
  const linkStaggerMs = Math.max(0, linkCount - 1) * 120;
  // 0.9s tween + [0.22, 0.08, 0.28, 1]: motion reads complete a bit before 900ms.
  const lastLinkTweenMs = 655;
  const linksEndMs = linksRevealDelayMs + linkStaggerMs + lastLinkTweenMs;
  // Small trim so the following card can start on the same beat as the link row feeling “done”.
  const handoffTrimMs = 55;
  return Math.max(
    0,
    Math.ceil(linksEndMs - handoffTrimMs),
  );
}
