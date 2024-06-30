interface TestDetailPageProps {
  params: {
    id: string;
  };
}

function TestDetailPage({ params }: TestDetailPageProps) {
  return <div>Detail Page: {params.id}</div>;
}

export default TestDetailPage;
