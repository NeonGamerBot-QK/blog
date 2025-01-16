export function estimateReadTime(text, wpm = 180) {
  // Count words in the text
  const wordCount = text.split(/\s+/).filter((word) => word).length;

  // Calculate read time in minutes
  const readTimeMinutes = wordCount / wpm;

  // Convert to minutes and seconds
  const minutes = Math.floor(readTimeMinutes);
  return `${minutes} min${minutes > 1 ? "s" : ""}`;
}
