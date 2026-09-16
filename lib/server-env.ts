import 'server-only';
export function researchConfig(){return {key:process.env.OPENAI_API_KEY||'',model:process.env.OPENAI_MODEL||'gpt-5.4'};}
