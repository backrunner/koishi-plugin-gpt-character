import { Configuration, OpenAIApi } from 'openai';

const instances: Record<string, OpenAIApi> = {};

export const useOpenAI = ({ apiKey = '' } = {}) => {
  if (instances[apiKey]) {
    return instances[apiKey];
  }
  instances[apiKey] = new OpenAIApi(new Configuration({
    apiKey,
  }))
  return instances[apiKey];
};
