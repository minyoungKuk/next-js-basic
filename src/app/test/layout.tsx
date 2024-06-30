"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

function TestLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  useEffect(() => {
    console.log("최초 렌더링시 한번 호출");
  }, []);

  return (
    <div>
      <h1>test page</h1>
      <p>테스트 경로 하위에서의 이동 확인</p>

      <nav>
        <ul>
          <li
            onClick={() => {
              router.push("/");
            }}
          >
            {/* <Link href="/test">태스트</Link> */}
            테스트 페이지
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
