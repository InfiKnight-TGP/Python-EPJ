function escapeRegExp(str: string): string {
  return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

export function hideWord(sentence: string, answer: string): string {
  const regex = new RegExp(`\\b${escapeRegExp(answer)}\\b`, "i");
  return sentence.replace(regex, "____");
}

export function checkAnswerInSentence(sentence: string, answer: string): boolean {
  const regex = new RegExp(`\\b${escapeRegExp(answer)}\\b`, "i");
  return regex.test(sentence);
}
