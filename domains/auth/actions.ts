'use server';
import {serverClient} from '@/shared/lib/supabase';
import {redirect} from 'next/navigation';
import type {Result} from '@/domains/todo/types';
export async function authenticate(_previous:Result,form:FormData):Promise<Result>{
 const mode=String(form.get('mode')),email=String(form.get('email')??'').trim(),password=String(form.get('password')??'');
 if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))return {error:'이메일 형식을 확인하세요.'};
 if(password.length<8)return {error:'비밀번호는 8자 이상 입력하세요.'};
 const client=await serverClient();
 if(mode==='signup'){
  const name=String(form.get('name')??'').trim();
  if(!name||name.length>50)return {error:'이름은 1~50자로 입력하세요.'};
  if(password!==String(form.get('passwordConfirm')??''))return {error:'비밀번호 확인이 일치하지 않습니다.'};
  const {data,error}=await client.auth.signUp({email,password,options:{data:{name}}});
  if(error)return {error:'가입할 수 없습니다. 입력값 및 잠시 후 재시도를 확인하세요.'};
  return data.session?{success:'가입했습니다.',redirectTo:'/'}:{success:'가입 요청을 받았습니다. 이메일 인증 후 로그인하세요.'};
 }
 const {error}=await client.auth.signInWithPassword({email,password});
 if(error)return {error:'로그인하지 못했습니다. 이메일·비밀번호·이메일 인증 여부를 확인하세요.'};
 return {success:'로그인했습니다.',redirectTo:'/'};
}
export async function logout(){const client=await serverClient();const {error}=await client.auth.signOut();if(error)throw new Error('로그아웃하지 못했습니다.');redirect('/sign_in');}