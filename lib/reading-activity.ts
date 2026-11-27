// Only count the public resources used in the Institute's editorial exercises.
export const readingResourceHosts = new Set([
  "adiba.pk", "afifasulehri.com", "apnadomain.net", "civictel.com",
  "concreteshield.com.pk", "globnic.com", "iilma.com", "luraflow.com",
  "namepo.com", "pakish.net", "pakishnews.com", "rankzest.com", "razia.pk",
  "qaseem.pk", "sami.com.pk", "samina.pk", "tndcanada.com", "webcaa.com", "webiost.com", "whoislogic.com",
]);

export function readingActivityPing(href: string): string | undefined {
  const host = new URL(href).hostname;
  return readingResourceHosts.has(host) ? `/api/reading-activity?host=${host}` : undefined;
}
