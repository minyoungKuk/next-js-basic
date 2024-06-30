# 내배캠 Next.js 강의

**Next.js란?** <br />
리액트를 베이스로 만들어진 프레임워크

## 개요

### 라이브러리 / 프레임워크

#### 프레임워크: 개발자가 기능 구현에만 집중 / 그 외에 것들을 모두 지원하는 **기술의 조합**

#### 라이브러리 : 공통 기능의 *모듈화*가 이루어진 프로그램의 집합

`제어역전(Ioc)`

### 기능

1. 다양한 렌더링 기법: CSR, SSR, SSG, ISR
2. 라우팅
3. route handler: _백엔드_ 기능 [한계가 존재: WebSocket, WebRTC등 구현에 한계 / 백,프론트가 함께 배포되어야만 함]
4. 스타일링: CSS, Sass, CSS-in-JS
5. 최적화, 번들링: 코드 스플리팅, 이미지 최적화, 췝팩 설정 등..
6. Data Fetching
7. Easy 배포

> TTV(Time To View): 사용자가 최초로 View를 볼 수 있을 때 까지의 시간
> TTI(Time To Interaction): 사용자가 최조로 사이트와 소통할 수 있는 시간

## 앱 라우터 vs 페이지 라우터

_왜? router 기반으로 주요 속성을 분류할까?_

사이트 기획/설계시 어떤페이지가 존재할지, 라우팅은 어떻게 할지를 우선순위로 고려 -> 그만큼 중요하니끼

## routing

폴더를 기반으로 만들어준다!

### 주요 용어

1. Tree: 계층 구조를 시작적으로 잘 보기 위한 규칙(위 -> 아래) / DOM tree와 비슷

2. Subtree: tree의 한 부분 / root(최상단)부터 시작해서 leaf들에 이르기까지의 범위

3. Root: tree 또는 Subtree의 첫번째 노드 / root layout같은거 ~

4. Leaf: children이 더이상 없는 node

5. URL Segment: 슬래스(/)로 분류된 URL path의 한 부분

6. URL Path: 도메인(www.sample-web.com) 이후 따라오는 전체 URL 부분

#### 디테일페이지~! 만들기~!

```jsx
interface TestDetailPageProps {
  params: {
    id: string,
  };
}

function TestDetailPage({ params }: TestDetailPageProps) {
  return <div>Detail Page: {params.id}</div>;
}

export default TestDetailPage;
```

### meta data

```jsx
export const metadata: Metadata = {
  title: "sparta",
  description: "next-js",
};

// 해당 페이지에서만 사용하게도 할 수 있고, 레이아웃을 통해 영역을 지정하여 같은 메타 데이터를 사용할 수 도 있음
```

### layout vs template

```jsx
"use client";

import Link from "next/link";
import React, { useEffect } from "react";

function TestLayout({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    console.log("최초 렌더링시 한번 호출");
  }, []);

  return (
    <div>
      <h1>test page</h1>
      <p>테스트 경로 하위에서의 이동 확인</p>

      <nav>
        <ul>
          <li>
            <Link href="/test">태스트</Link>
          </li>
          <li>
            <Link href="/test/1">테스트 1</Link>
          </li>
          <li>
            <Link href="/test/2">테스트 2</Link>
          </li>
        </ul>
      </nav>
      {children}
    </div>
  );
}

export default TestLayout;
```

이렇게 작성 되어있을때 파일이름이 layout이면 테스트 디테일 페이지로 이동시 레이아웃 리랜더링이 일어나지않지만, template파일이면 레이아웃 리렌더링이 일어남

- template은 상태가 유지되지 않기에 사용할 일이 왠만하면 잘 없어야한담 . . . . 그럼 언제써야하나? -> 페이지 간 전환시 애니메이션을 계속해서 주고 싶을때 등 .. ?

### 페이지 이동

1. a태그: 우리가 아는 그 HTML a태그! 왠만하면 쓸일 없다! / 클릭시 완전히 새로고침, 그러니 빈화면이 보일수 있고 UX좋지 못함
2. Link태그: next의 Link태그는 a태그를 만들어내기에 seo에 유리, 클릭 즉시 페이지 이동
3. Router(useRouter): 'use client'쓰고 써야함 / a태그로 인식되지 않기에 seo 불리 / onClick같은 이벤트 핸들러에서 사용 / 클릭 후 로직의 순서에 따라 실행하므로 즉시 이동이 아님 / 이렇게 사용할땐 `import { useRouter } from "next/navigation";` next/navigation 으로 임포트 되어야함

- router.push(url): 지정된 URL로 이동하며, 이전 페이지를 히스토리 스택에 남김
- router.replace(url): 지정된 URL로 이동하며, 이전 페이지를 히스토리 스택에 남기지 않고 대체 / 주로 로그인 후에 리다이렉트할 때 사용되며, 사용자가 이전 페이지로 되돌아갈 수 없도록 할 때 유용

## rendering

**기본적으로 app폴더 하위의 모든 컴포넌트는 서버 컴포넌트이다!**

유저와의 상호 작용이 필요: Client Component
그 외: Server Component

## Route Handlers

> **공식문서 정의** <br />
> allow you to create custom request handlers for a given route using the Web Request and Response APIs.

- 여기서 말하는 Web요청 및 응답 API를 다루는 것은 이전에 배웠던 REST API(GET/POST/PUT/DELETE)로 설명 가능

- app directory 내부에 route.ts 파일을 만나면 Next.js는 router handler로 인식

```jsx
export async function GET(request: Request) {
  console.log("GET /api/test");
}

export async function POST(request: Request) {
  console.log("POST /api/test");
}

export async function PUT(request: Request) {
  console.log("PUT /api/test");
}

export async function DELETE(request: Request) {
  console.log("DELETE /api/test");
}

export async function PATCH(request: Request) {
  console.log("PATCH /api/test");
}
```
