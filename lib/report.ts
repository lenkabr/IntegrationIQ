import { z } from 'zod';
export const claimSchema = z.object({ text: z.string().max(650), status: z.enum(['confirmed','unknown','unsupported']), sources: z.array(z.number().int().positive()).max(6) });
export const reportSchema = z.object({
  feasibility: z.enum(['High','Medium','Low','Unknown']), verdict: z.enum(['Likely feasible','Partially feasible','Unlikely feasible','Insufficient information']),
  summary: claimSchema, availability: z.object({ category: z.enum(['Public API','Partner API','Customer-authorized API','Private/Internal','No API found','Unable to determine']), evidence: claimSchema }),
  authentication: claimSchema, access: claimSchema,
  direction: z.enum(['Product → Your application','Your application → Product','Both','Unknown']),
  capabilities: z.array(z.object({name:z.string().max(100), ...claimSchema.shape})).min(1).max(12),
  endpoints: z.array(z.object({name:z.string().max(180), ...claimSchema.shape})).max(5),
  resources: z.array(z.object({name:z.string().max(100),kind:z.enum(['developer_account','community','integration_example']),...claimSchema.shape})).max(6),
  webhooks: z.array(z.object({name:z.string().max(100), ...claimSchema.shape})).max(4),
  risks: z.array(claimSchema).max(5), confidence: z.enum(['High','Medium','Low']), confidenceExplanation: z.string().max(450), nextStep:z.string().max(250),
  sources: z.array(z.object({id:z.number().int().positive(),title:z.string().max(180),url:z.string().url(),officialReason:z.string().max(200)})).max(15)
});
export type Report = z.infer<typeof reportSchema>;
export type Claim = z.infer<typeof claimSchema>;
export type Assessment = {product:string;useCase:string;report:Report; researchedAt:string;sample?:boolean};
