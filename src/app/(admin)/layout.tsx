import { PropsWithChildren } from "react";

function AdminLayout({ children }: PropsWithChildren) {
  return (
    <div>
      <p>어드민과 관련된 페이지</p>
      {children}
    </div>
  );
}

export default AdminLayout;
