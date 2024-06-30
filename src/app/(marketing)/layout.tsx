import { PropsWithChildren } from "react";

function MarketingLayout({ children }: PropsWithChildren) {
  return (
    <div>
      <p>여기는 마켓팅과 관련된것이 놓이는 곳</p>
      {children}
    </div>
  );
}

export default MarketingLayout;
