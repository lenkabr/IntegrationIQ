import { z } from 'zod';
import { ResearchError, runResearch } from '@/lib/research';
import { researchConfig } from '@/lib/server-env';
export const runtime='nodejs';
export const maxDuration=300;
const inputSchema=z.object({product:z.string().trim().min(1).max(120),useCase:z.string().trim().min(15).max(2500)}).strict();
// A small per-isolate concurrency/cooldown guard. Hosted access stays owner-private.
const active=new Set<string>(); const recent=new Map<string,number>();
export async function POST(request:Request){
 const headers={'Cache-Control':'no-store','X-Content-Type-Options':'nosniff'};
 const fail=(error:string,status:number)=>Response.json({error},{status,headers});
 const origin=request.headers.get('origin');if(origin&&origin!==new URL(request.url).origin)return fail('Please submit research from this app.',403);
 if(!request.headers.get('content-type')?.includes('application/json'))return fail('A JSON integration brief is required.',415);
 let data:z.infer<typeof inputSchema>;try{const raw=await request.text();if(raw.length>8000)return fail('The integration brief is too long.',413);data=inputSchema.parse(JSON.parse(raw));}catch{return fail('Enter a product and an integration brief between 15 and 2,500 characters.',400);}
 const config=researchConfig(); const apiKey=config.key;if(!apiKey)return fail('Research is not available yet. Please try again later.',503);
 if(!apiKey.startsWith('sk-')||/\s/.test(apiKey))return fail('Research is temporarily unavailable. Please try again later.',503);
 const hash=Array.from(new Uint8Array(await crypto.subtle.digest('SHA-256',new TextEncoder().encode(apiKey)))).map(b=>b.toString(16).padStart(2,'0')).join('');
 const now=Date.now();for(const [k,time] of recent)if(now-time>60000)recent.delete(k);
 if(active.has(hash)||(recent.get(hash)||0)>now-5000)return fail('A research request is already running or was just submitted. Wait a moment and retry.',429);
 if(active.size>=5)return fail('Research is busy. Please try again shortly.',429);
 active.add(hash);recent.set(hash,now);
 const abort=new AbortController();const timeout=setTimeout(()=>abort.abort(),240000);const onAbort=()=>abort.abort();request.signal.addEventListener('abort',onAbort);
 const encoder=new TextEncoder();let closed=false;
 const stream=new ReadableStream({async start(controller){const send=(event:unknown)=>{if(!closed)controller.enqueue(encoder.encode(JSON.stringify(event)+'\n'))};const keepAlive=setInterval(()=>{try{send({type:'heartbeat'})}catch{abort.abort()}},12000);
 try{send({type:'status',message:'Locating official documentation'});const report=await runResearch({product:data.product,useCase:data.useCase},apiKey,abort.signal,message=>send({type:'status',message}),fetch,config.model);send({type:'result',data:{product:data.product,useCase:data.useCase,report,researchedAt:new Date().toISOString(),sample:false}})}
 catch(err){if(!closed)send({type:'error',message:abort.signal.aborted?'Research timed out or was canceled. Try a narrower integration brief.':err instanceof ResearchError?err.message:'The report could not be safely verified. Please try again.'})}
 finally{clearInterval(keepAlive);clearTimeout(timeout);request.signal.removeEventListener('abort',onAbort);active.delete(hash);if(!closed){closed=true;controller.close()}}},cancel(){closed=true;abort.abort()}});
 return new Response(stream,{headers:{...headers,'Content-Type':'application/x-ndjson; charset=utf-8'}});
}
