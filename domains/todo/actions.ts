'use server';
import {requireUser} from './data';
import {revalidatePath} from 'next/cache';
import {validateTodo,validId} from './validation';
import type {Result} from './types';
export async function saveTodo(_previous:Result,form:FormData):Promise<Result>{
 const {client,user}=await requireUser();
 const id=String(form.get('id')??''),title=String(form.get('title')??'').trim(),content=String(form.get('content')??''),status=String(form.get('status')??'READY');
 const error=validateTodo(title,content,status);
 if(error)return {error};
 if(id&&!validId(id))return {error:'잘못된 항목입니다.'};
 const values={title,content,status,updated_at:new Date().toISOString()};
 const query=id
 ?client.from('todos').update(values).eq('id',id).eq('user_id',user.id).is('deleted_at',null)
 :client.from('todos').insert({...values,user_id:user.id,user_name:String(user.user_metadata.name??'회원')});
 const {data,error:dbError}=await query.select('id').single();
 if(dbError||!data)return {error:'저장하지 못했습니다. 접근 권한과 연결 상태를 확인하세요.'};
 revalidatePath('/'); revalidatePath('/todo/'+data.id+'/view');
 return {success:'저장했습니다.',redirectTo:'/todo/'+data.id+'/view'};
}
export async function deleteTodo(_previous:Result,form:FormData):Promise<Result>{
 const {client,user}=await requireUser();
 const id=String(form.get('id')??'');
 if(!validId(id))return {error:'잘못된 항목입니다.'};
 const {data,error}=await client.from('todos').delete().eq('id',id).eq('user_id',user.id).select('id').single();
 if(error||!data)return {error:'삭제하지 못했습니다. 접근 권한과 연결 상태를 확인하세요.'};
 revalidatePath('/');
 return {success:'삭제했습니다.',redirectTo:'/?deleted=1'};
}