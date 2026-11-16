# Next.js Todo | 유상진

CH2 프론트엔드 응용 과제. 로그인한 사용자가 자신의 할 일을 등록·조회·수정·삭제합니다.

## 제출 상태
- 구현: 인증 화면, 개인 Todo CRUD, 상태 변경, 상세/수정 동적 경로, 로딩·오류·빈 목록 UI.
- 실제 Supabase Auth·CRUD·RLS 13개 통합 검증과 로컬 화면 흐름 검증을 완료했습니다. Vercel 배포 환경 검증 및 일반 가입 이메일 수신 흐름은 별도로 확인해야 합니다.
- 저장소 주소와 배포 주소는 업로드·배포 완료 후 이 문서와 LMS에 기입합니다. 현재 제출 완료 상태가 아닙니다.

## 시작
Node.js 20.9 이상 사용.
```bash
npm ci
cp .env.example .env.local
npm run dev
```
Windows PowerShell에서는 `Copy-Item .env.example .env.local`을 사용합니다.
1. 새 과제용 Supabase 프로젝트를 준비합니다.
2. SQL Editor에서 `supabase/schema.sql`을 검토한 뒤 직접 실행합니다. 기존 프로젝트에 덮어쓰는 용도가 아닙니다.
3. 프로젝트 URL과 publishable key를 `.env.local`에 입력합니다. service_role 키는 사용하지 않습니다.
4. Authentication의 Site URL을 로컬 테스트 주소로 설정합니다. 이메일 인증을 사용하는 경우 수신 이메일 인증 후 로그인합니다.
5. `http://localhost:3000`에 접속합니다.

## 사용자 흐름
회원가입 → 이메일 인증 → 로그인 → 빈 목록 → 등록 → 상세 조회 → 제목/내용/상태 수정 → 삭제 확인 → 목록 → 로그아웃.
