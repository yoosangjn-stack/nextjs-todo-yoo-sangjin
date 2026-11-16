# Next.js Todo | 유상진

CH2 프론트엔드 응용 과제. 로그인한 사용자가 자신의 할 일을 등록·조회·수정·삭제합니다.

## 제출 상태
- 구현: 인증 화면, 개인 Todo CRUD, 상태 변경, 상세/수정 동적 경로, 로딩·오류·빈 목록 UI.
- 실제 Supabase Auth·CRUD·RLS 13개 통합 검증과 로컬 화면 흐름 검증을 완료했습니다. Vercel 배포 화면에서도 같은 흐름을 재검증했습니다. 일반 가입 이메일 수신 흐름은 별도로 확인해야 합니다.
- 저장소: https://github.com/yoosangjn-stack/nextjs-todo-yoo-sangjin
- 서비스: https://nextjs-todo-yoo-sangjin.vercel.app
- LMS 최종 제출 여부는 별도 확인합니다.

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

| 경로 | 기능 |
|---|---|
| /sign_up | 회원가입 |
| /sign_in | 로그인 |
| / | 내 할 일 목록 |
| /todo/new | 새 항목 |
| /todo/[id]/view | 상세 |
| /todo/[id]/edit | 수정 |

## 구조와 역할
- `app/`: URL에 대응하는 화면. Server Component가 DB 조회를 담당합니다.
- `domains/auth/`: 회원가입, 로그인, 로그아웃. Supabase Auth를 사용합니다.
- `domains/todo/data.ts`: 세션 확인과 본인 항목 조회.
- `domains/todo/actions.ts`: 서버에서 입력값·소유권 확인 후 저장·삭제.
- `TodoForm.tsx`: 입력 상태(useState), 비동기 결과(useActionState), 저장 후 이동(useEffect).
- `proxy.ts`: 세션 쿠키 갱신. 최종 권한 검사는 서버 함수와 DB RLS에서 별도 수행합니다.
- `supabase/schema.sql`: 테이블과 사용자별 RLS(Row Level Security, 행 단위 접근 통제).

## 보안
서버 조회·수정·삭제는 로그인 사용자 ID를 조건에 포함합니다. DB에도 RLS를 적용해 다른 사용자의 자료를 차단합니다. 브라우저가 보낸 user_id는 신뢰하지 않습니다. 공개키는 RLS와 함께 사용하며 비밀 관리키를 저장소에 넣지 않습니다. 본문은 HTML 삽입이 아닌 일반 텍스트로 출력합니다. 삭제는 확인 후 영구 삭제됩니다.

## 기존 실습에서 보완한 부분
원본 `nextjs_assignment-day02`의 인증·Todo 도메인 분리, 상태 값(READY/PROGRESS/DONE), 사용자별 조회 구조를 이어받았습니다. 빈 상세 화면과 누락된 수정·삭제를 구현했습니다. 깨진 한글 문구와 불필요한 편집기 UI를 단순한 폼으로 교체했습니다. 기존 원본·DB는 변경하지 않았습니다. 이름은 Auth 메타데이터로 관리하므로 별도 profiles 테이블이 필요하지 않습니다.

## 검사
```bash
npm test
npm run lint
npm run build
```
기본 검사는 입력 검증·정적 검사·빌드입니다. 승인된 격리 테스트 계정이 준비되면 npm run test:integration으로 실제 Auth·DB CRUD·RLS를 검사합니다. 계정 정보는 .env.test.local에만 두며 저장소에 올리지 않습니다. 검증 결과는 docs/TEST_RESULTS.md에 기록했습니다.
실서비스 확인 항목은 `docs/SUBMISSION_CHECKLIST.md`에 있습니다.

## 배포 준비
Vercel에서 본인 저장소를 Import하고 Framework를 Next.js로 설정합니다. 환경변수 두 개를 등록하고 배포합니다. Supabase Site URL을 배포 주소로 바꾸고 실제 계정 두 개로 체크리스트를 수행합니다. 배포 주소를 로그아웃 상태와 다른 브라우저에서도 확인한 뒤 제출합니다.

## 참고
- [Next.js App Router](https://nextjs.org/docs/app)
- [Supabase 서버 인증](https://supabase.com/docs/guides/auth/server-side/nextjs)
- [Supabase RLS](https://supabase.com/docs/guides/database/postgres/row-level-security)
