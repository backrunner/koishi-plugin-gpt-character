export const countTokens = (text: string): number => {
  const chineseCharCount = (text.match(/[\p{Script=Han}]/gu) || []).length;
  const nonChineseText = text.replace(/[\p{Script=Han}]/gu, '');
  const nonChineseTokenCount = nonChineseText.split(/\s+/).length;

  const totalTokenCount = chineseCharCount + nonChineseTokenCount;

  return totalTokenCount;
};
