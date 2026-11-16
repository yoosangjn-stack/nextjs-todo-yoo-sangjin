import {readFileSync,writeFileSync} from 'node:fs';
import {createClient} from '@supabase/supabase-js';
import assert from 'node:assert/strict';
process.loadEnvFile('.env.local');
const credentials=JSON.parse(readFileSync('.env.test.local','utf8'));
const url=process.env.NEXT_PUBLIC_SUPABASE_URL,key=process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;
assert.equal(new URL(url).hostname,'eledcmdpoihbnhsnnpom.supabase.co','Test project mismatch');
const options={auth:{persistSession:false,autoRefreshToken:false}};
const a=createClient(url,key,options),b=createClient(url,key,options),anon=createClient(url,key,options);
const results=[];let id;
function passed(name){results.push({name,passed:true});console.log('PASS '+name);}
try{
 const A=await a.auth.signInWithPassword(credentials.a);assert.equal(A.error,null);passed('A login');
 const B=await b.auth.signInWithPassword(credentials.b);assert.equal(B.error,null);passed('B login');
 const inserted=await a.from('todos').insert({user_id:A.data.user.id,user_name:'테스트 A',title:'RLS integration test',content:'Temporary test data',status:'READY'}).select('id').single();
 assert.equal(inserted.error,null);id=inserted.data.id;passed('A create own');
 const read=await a.from('todos').select('id').eq('id',id);assert.equal(read.error,null);assert.equal(read.data.length,1);passed('A read own');
 const hidden=await b.from('todos').select('id').eq('id',id);assert.equal(hidden.error,null);assert.equal(hidden.data.length,0);passed('B cannot read A');
 const blockedUpdate=await b.from('todos').update({title:'unauthorized'}).eq('id',id).select('id');assert.equal(blockedUpdate.error,null);assert.equal(blockedUpdate.data.length,0);passed('B cannot update A');
 const blockedDelete=await b.from('todos').delete().eq('id',id).select('id');assert.equal(blockedDelete.error,null);assert.equal(blockedDelete.data.length,0);passed('B cannot delete A');
 const spoof=await b.from('todos').insert({user_id:A.data.user.id,title:'spoof'});assert.ok(spoof.error);passed('B cannot create as A');
 const move=await a.from('todos').update({user_id:B.data.user.id}).eq('id',id);assert.ok(move.error);passed('A cannot transfer ownership');
 const anonymous=await anon.from('todos').select('id').eq('id',id);assert.ok(anonymous.error);passed('Anonymous denied');
 const invalid=await a.from('todos').insert({user_id:A.data.user.id,title:'',status:'READY'});assert.ok(invalid.error);passed('DB rejects blank title');
 const changed=await a.from('todos').update({title:'RLS updated',status:'DONE'}).eq('id',id).select('title,status').single();assert.equal(changed.error,null);assert.equal(changed.data.status,'DONE');passed('A update own');
 const deleted=await a.from('todos').delete().eq('id',id).select('id');assert.equal(deleted.error,null);assert.equal(deleted.data.length,1);passed('A delete own');id=undefined;
 writeFileSync('docs/integration-results.json',JSON.stringify({date:new Date().toISOString(),scope:'Supabase Auth + PostgREST + RLS, isolated assignment project',results},null,2));
}catch(error){console.error('Integration check failed:',error instanceof Error?error.message:'Unknown error');process.exitCode=1;}
finally{
 if(id){const cleanup=await a.from('todos').delete().eq('id',id);if(cleanup.error)console.error('Temporary test row cleanup failed');}
 await a.auth.signOut();await b.auth.signOut();
}
