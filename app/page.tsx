import Link from 'next/link';
import {getTodos} from '@/domains/todo/data';
import {labels} from '@/domains/todo/types';
import {logout} from '@/domains/auth/actions';
export const dynamic='force-dynamic';
export default async function Page({searchParams}:{searchParams:Promise<{deleted?:string}>}){
 const todos=await getTodos();const {deleted}=await searchParams;
 return <><h1>내 할 일</h1><nav><Link className="button" href="/todo/new">새 할 일</Link><form action={logout}><button>로그아웃</button></form></nav>
 {deleted==='1'&&<p role="status">삭제했습니다.</p>}
 {todos.length===0?<section>아직 할 일이 없습니다. 첫 할 일을 등록하세요.</section>:todos.map(todo=><article key={todo.id}><small>{labels[todo.status]}</small><h2><Link href={'/todo/'+todo.id+'/view'}>{todo.title}</Link></h2></article>)}</>;
}