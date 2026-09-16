import { env } from 'cloudflare:workers';
export function researchConfig(){const e=env as unknown as Record<string,string|undefined>;return {key:e.OPENAI_API_KEY||'',model:e.OPENAI_MODEL||'gpt-5.4'};}
