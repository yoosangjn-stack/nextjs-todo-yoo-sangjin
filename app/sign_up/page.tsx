import Link from 'next/link';import AuthForm from '@/domains/auth/AuthForm';
export default function Page(){return <><h1>회원가입</h1><AuthForm signup/><Link href="/sign_in">로그인으로 이동</Link></>;}