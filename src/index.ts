import { Context, Schema } from 'koishi';
import { handleMessage } from './modules/chat';

export const name = 'gpt-character';

export interface Config {
  openai_api_key: string;
  openai_model: string;
  character_name: string;
  character_desc?: string;
  members_desc?: string;
  session_example?: string;
  proxy_server?: string;
  completion_throttle?: number;
  min_random_throttle?: number;
  max_random_throttle?: number;
  random_drop?: number;
  max_history_count?: number;
  enable_debug?: boolean;
  temperature?: number;
  presence_penalty?: number;
  frequency_penalty?: number;
  completion_timeout?: number;
  long_message_protection?: boolean;
  long_message_token_limit?: number;
  enable_prompt_safety_check?: boolean;
  min_shield_check_token?: number;
  basic_prompt_version?: string;
  enable_extra_jail_prompt?: boolean;
  enable_skip?: boolean;
  cannot_skip_at_me?: boolean;
}

export const Config: Schema<Config> = Schema.object({
  openai_api_key: Schema.string().required().description('OpenAPI API 密钥'),
  openai_model: Schema.string().required().default('gpt-3.5-turbo-1106').description('OpenAI 模型'),
  character_name: Schema.string().required().description('角色名称'),
  character_desc: Schema.string().description('角色描述'),
  members_desc: Schema.string().description('群员描述'),
  session_example: Schema.string().description('对话示例（需要携带角色名作为前缀）'),
  proxy_server: Schema.string().description('代理服务器地址（不填则不使用）'),
  completion_throttle: Schema.number()
    .default(10 * 1000)
    .description('对话间隔（毫秒）'),
  min_random_throttle: Schema.number()
    .default(3 * 1000)
    .description('最小随机额外间隔'),
  max_random_throttle: Schema.number()
    .default(5 * 1000)
    .description('最大随机额外间隔'),
  random_drop: Schema.number().default(0.9).description('随机丢弃概率（0-1）'),
  max_history_count: Schema.number().default(10).description('最大对话历史记录条数'),
  temperature: Schema.number().default(0.6),
  presence_penalty: Schema.number().default(0.4),
  frequency_penalty: Schema.number().default(0.25),
  completion_timeout: Schema.number().default(5000).description('对话补全请求的超时时间（毫秒）'),
  long_message_protection: Schema.boolean().default(true).description('超长Prompt注入保护'),
  long_message_token_limit: Schema.number().default(512).description('超长Prompt最大Token数量'),
  enable_prompt_safety_check: Schema.boolean()
    .default(true)
    .description('是否启用过长Prompt安全检查'),
  min_shield_check_token: Schema.number()
    .default(100)
    .description('最小触发Prompt安全检查的Token数量'),
  enable_extra_jail_prompt: Schema.boolean()
    .default(false)
    .description('是否启用额外的强化Prompt（仅在有必要的时候使用，可以避免Prompt注入）'),
  basic_prompt_version: Schema.string().default('1.2').description('开发：切换基础Prompt版本'),
  enable_debug: Schema.boolean().default(false).description('开发：启用调试模式（更多日志）'),
  enable_skip: Schema.boolean().default(false).description('是否允许跳过对话'),
  cannot_skip_at_me: Schema.boolean().default(true).description('是否允许跳过at角色的对话'),
});

export function apply(ctx: Context, config: Config) {
  ctx.on('message', async (session) => {
    await handleMessage(ctx, config, session);
  });
}
