import type { Metadata } from 'next';
import Link from 'next/link';
import './globals.css';
export const metadata: Metadata = {title:'Todo · 유상진',description:'Next.js와 Supabase로 만드는 개인 할 일 관리'};
export default function RootLayout({children}:{children:React.ReactNode}) {
 return <html lang="ko"><body><header><Link href="/">TODO / 유상진</Link></header><main>{children}</main></body></html>;
}
export const dynamic='force-dynamic';
