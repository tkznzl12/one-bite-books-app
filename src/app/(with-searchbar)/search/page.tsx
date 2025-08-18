import BookItem from "@/components/book-item";
import BookListSkeleton from "@/components/skeleton/book-list-skeleton";
import { BookData } from "@/types";
import { delay } from "@/util/delay";
import { Suspense } from "react";

//쿼리스트링의 값에 의존하는 현재페이지에서 static을 강제로 설정하게되면 검색기능이 제대로 동작하지 않을 수 있음
// export const dynamic = "force-static";

async function SearchResult({
  searchParams,
}: {
  searchParams: { q?: string };
}) {
  await delay(1500);

  //한번 검색이 되었던 데이터는 빨리 불러올 수 있도록 설정
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_SERVER_URL}/book/search?q=${searchParams.q}`,
    { cache: "force-cache" }
  );
  if (!response.ok) {
    return <div>오류가 발생했습니다 ...</div>;
  }

  const books: BookData[] = await response.json();

  return (
    <div>
      {books.map((book) => (
        <BookItem key={book.id} {...book} />
      ))}
    </div>
  );
}

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const param = await searchParams;
  return (
    <Suspense key={param.q || ""} fallback={<BookListSkeleton count={3} />}>
      <SearchResult searchParams={param || ""} />
    </Suspense>
  );
}
