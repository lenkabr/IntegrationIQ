import { build } from 'esbuild';
import { mkdtemp, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { spawnSync } from 'node:child_process';
const dir=await mkdtemp(join(tmpdir(),'integrationiq-tests-'));
try {await build({entryPoints:['tests/research.test.ts'],bundle:true,platform:'node',format:'esm',outfile:join(dir,'test.mjs')});const r=spawnSync(process.execPath,['--test',join(dir,'test.mjs')],{stdio:'inherit'});process.exitCode=r.status||0;}finally{await rm(dir,{recursive:true,force:true})}
