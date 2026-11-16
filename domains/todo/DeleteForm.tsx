'use client';
import {useActionState,useEffect,useState} from 'react';
import {useRouter} from 'next/navigation';
import {deleteTodo} from './actions';
import type {Result} from './types';
export default function DeleteForm({id}:{id:string}){
 const [confirming,setConfirming]=useState(false);
 const [state,action,pending]=useActionState(deleteTodo,{} as Result);
 const router=useRouter();
 useEffect(()=>{if(state.redirectTo){router.replace(state.redirectTo);router.refresh();}},[state,router]);
 return <form action={action}>
 <input type="hidden" name="id" value={id}/>
 {confirming?<><p>이 할 일을 삭제할까요? 복구할 수 없습니다.</p><div className="row"><button className="danger" disabled={pending}>{pending?'삭제 중…':'삭제 확인'}</button><button type="button" disabled={pending} onClick={()=>setConfirming(false)}>취소</button></div></>:<button type="button" className="danger" onClick={()=>setConfirming(true)}>삭제</button>}
 <p role="alert">{state.error}</p></form>;
}
