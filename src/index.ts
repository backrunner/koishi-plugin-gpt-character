import { Context, Schema } from 'koishi';
import { handleMessage } from './modules/chat';

export const name = 'gpt-character';

export interface Config {
  openai_api_key: string;
  character_name?: string;
  character_desc?: string;
  session_example?: string;
  proxy_server?: string;
  completion_throttle?: number;
  min_random_throttle?: number;
  max_random_throttle?: number;
  random_drop?: number;
  max_history_count?: number;
  enable_debug?: boolean;
}

export const Config: Schema<Config> = Schema.object({
  openai_api_key: Schema.string().required().description('OpenAPI API 密钥'),
  character_name: Schema.string().description('角色名称'),
  character_desc: Schema.string().description('角色描述'),
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
  enable_debug: Schema.boolean().default(false).description('启用调试模式（更多日志）'),
});

export function apply(ctx: Context, config: Config) {
  ctx.on('message', async (session) => {
    await handleMessage(ctx, config, session);
  });
}
