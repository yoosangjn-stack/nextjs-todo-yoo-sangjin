-- 새 과제용 Supabase 프로젝트에서 실행할 초기 스키마입니다.
-- 기존 운영 DB에는 적용하지 마세요. 삭제/초기화 명령은 포함하지 않습니다.
create table public.todos (
 id uuid primary key default gen_random_uuid(),
 user_id uuid not null references auth.users(id) on delete cascade,
 user_name text not null default '회원',
 title text not null check (char_length(btrim(title)) between 1 and 100),
 content text not null default '' check (char_length(content)<=5000),
 status text not null default 'READY' check(status in ('READY','PROGRESS','DONE')),
 created_at timestamptz not null default now(),
 updated_at timestamptz,
 deleted_at timestamptz
);
create index todos_user_created_idx on public.todos(user_id,created_at desc);
alter table public.todos enable row level security;
revoke all on public.todos from anon;
grant select,insert,update,delete on public.todos to authenticated;
create policy "read own" on public.todos for select to authenticated using((select auth.uid())=user_id);
create policy "insert own" on public.todos for insert to authenticated with check((select auth.uid())=user_id);
create policy "update own" on public.todos for update to authenticated using((select auth.uid())=user_id) with check((select auth.uid())=user_id);
create policy "delete own" on public.todos for delete to authenticated using((select auth.uid())=user_id);
