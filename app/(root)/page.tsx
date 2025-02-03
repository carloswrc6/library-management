import BookList from "@/components/BookList";
import BookOverview from "@/components/BookOverview";
import { auth } from "@/auth";
import { listLatestBooks } from "@/lib/actions/book";

const Home = async () => {
  const session = await auth();
  const { success, data } = await listLatestBooks();
  const latestBooks = success ? data : [];
  return (
    <>
      <BookOverview {...latestBooks[0]} userId={session?.user?.id as string} />
      <BookList
        title="Latest Books"
        books={latestBooks.slice(1)}
        containerClassName="mt-28"
      />
    </>
  );
};

export default Home;
