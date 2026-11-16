import {createServerClient} from '@supabase/ssr';
import {cookies} from 'next/headers';
export async function serverClient() {
 const url=process.env.NEXT_PUBLIC_SUPABASE_URL;
 const key=process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;
 if(!url||!key) throw new Error('Supabase 환경변수를 설정한 후 서버를 다시 시작하세요.');
 const jar=await cookies();
 return createServerClient(url,key,{cookies:{
  getAll:()=>jar.getAll(),
  setAll(items){try{items.forEach(({name,value,options})=>jar.set(name,value,options));}catch{/* Server Component에서는 Proxy가 쿠키 갱신을 담당합니다. */}}
 }});
}