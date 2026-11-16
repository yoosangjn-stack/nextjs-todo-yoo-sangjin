import {serverClient} from '@/shared/lib/supabase';
import {redirect,notFound} from 'next/navigation';
import type {Todo} from './types';
import {validId} from './validation';
export async function requireUser(){
 const client=await serverClient();
 const {data:{user},error}=await client.auth.getUser();
 if(error||!user)redirect('/sign_in');
 return {client,user};
}
export async function getTodos(){
 const {client,user}=await requireUser();
 const {data,error}=await client.from('todos').select('*').eq('user_id',user.id).is('deleted_at',null).order('created_at',{ascending:false});
 if(error)throw new Error('할 일을 불러오지 못했습니다. 연결 및 테이블 설정을 확인하세요.');
 return (data??[]) as Todo[];
}
export async function getTodo(id:string){
 if(!validId(id))notFound();
 const {client,user}=await requireUser();
 const {data,error}=await client.from('todos').select('*').eq('id',id).eq('user_id',user.id).is('deleted_at',null).maybeSingle();
 if(error)throw new Error('할 일을 불러오지 못했습니다.');
 if(!data)notFound();
 return data as Todo;
}