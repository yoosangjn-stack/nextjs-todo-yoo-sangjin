'use client';
import {useActionState,useEffect} from 'react';
import {useRouter} from 'next/navigation';
import {deleteTodo} from './actions';
import type {Result} from './types';
export default function DeleteForm({id}:{id:string}){
 const [state,action,pending]=useActionState(deleteTodo,{} as Result);const router=useRouter();
 useEffect(()=>{if(state.redirectTo){router.replace(state.redirectTo);router.refresh();}},[state,router]);
 return <form action={action} onSubmit={event=>{if(!confirm('이 할 일을 삭제할까요? 복구할 수 없습니다.'))event.preventDefault();}}>
 <input type="hidden" name="id" value={id}/><button className="danger" disabled={pending}>{pending?'삭제 중…':'삭제'}</button><p role="alert">{state.error}</p></form>;
}