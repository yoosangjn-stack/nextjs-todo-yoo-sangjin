'use client';
import {useActionState,useEffect} from 'react';
import {useRouter} from 'next/navigation';
import {authenticate} from './actions';
import type {Result} from '@/domains/todo/types';
export default function AuthForm({signup=false}:{signup?:boolean}){
 const [state,action,pending]=useActionState(authenticate,{} as Result);
 const router=useRouter();
 useEffect(()=>{if(state.redirectTo){router.replace(state.redirectTo);router.refresh();}},[state,router]);
 return <form action={action}><input type="hidden" name="mode" value={signup?'signup':'login'}/>
 {signup&&<><label htmlFor="name">이름</label><input id="name" name="name" required maxLength={50} autoComplete="name"/></>}
 <label htmlFor="email">이메일</label><input id="email" name="email" type="email" required autoComplete="email"/>
 <label htmlFor="password">비밀번호</label><input id="password" name="password" type="password" required minLength={8} autoComplete={signup?'new-password':'current-password'}/>
 {signup&&<><label htmlFor="confirm">비밀번호 확인</label><input id="confirm" name="passwordConfirm" type="password" required minLength={8} autoComplete="new-password"/></>}
 <p role="status" className={state.error?'error':'success'}>{state.error??state.success}</p>
 <button disabled={pending}>{pending?'처리 중…':signup?'회원가입':'로그인'}</button></form>;
}