'use client';
import {useActionState,useEffect,useState} from 'react';
import {useRouter} from 'next/navigation';
import {saveTodo} from './actions';
import {labels,statuses,type Todo,type Result} from './types';
export default function TodoForm({todo}:{todo?:Todo}){
 const [title,setTitle]=useState(todo?.title??'');
 const [state,action,pending]=useActionState(saveTodo,{} as Result);
 const router=useRouter();
 useEffect(()=>{if(state.redirectTo){router.replace(state.redirectTo);router.refresh();}},[state,router]);
 return <form action={action}><input type="hidden" name="id" value={todo?.id??''}/>
 <label htmlFor="title">제목</label><input id="title" name="title" value={title} onChange={e=>setTitle(e.target.value)} required maxLength={100}/><small>{title.length}/100</small>
 <label htmlFor="content">내용</label><textarea id="content" name="content" defaultValue={todo?.content??''} maxLength={5000}/>
 <label htmlFor="status">상태</label><select id="status" name="status" defaultValue={todo?.status??'READY'}>{statuses.map(s=><option key={s} value={s}>{labels[s]}</option>)}</select>
 <p role="status" className={state.error?'error':'success'}>{state.error??state.success}</p>
 <button disabled={pending}>{pending?'저장 중…':'저장'}</button></form>;
}