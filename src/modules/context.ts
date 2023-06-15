const historyMessageMap: Record<string, string[]> = {};

export const useHistory = (sessionId: string) => {
  if (!sessionId) {
    throw new Error('Invalid session id for useHistory.');
  }
  if (historyMessageMap[sessionId]) {
    return historyMessageMap[sessionId];
  }
  historyMessageMap[sessionId] = [];
  return historyMessageMap[sessionId];
};

export const setHistory = (sessionId: string, historyMessages: string[]) => {
  if (Array.isArray(historyMessages)) {
    historyMessageMap[sessionId] = historyMessages;
  }
};
