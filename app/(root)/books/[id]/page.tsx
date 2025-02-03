import BookOverview from "@/components/BookOverview";
import React from "react";
import { redirect } from "next/navigation";
import { auth } from "@/auth";
import BookVideo from "@/components/BookVideo";
import BookList from "@/components/BookList";
import { getBookDetails, getBookSimilar } from "@/lib/actions/book";

const page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const id = (await params).id;
  const session = await auth();

  const { success: bookSuccess, data: bookData } = await getBookDetails(id);

  if (!bookSuccess || !bookData.length) {
    console.error("Error fetching book details");
    return;
  }

  const [bookDetails] = bookData;

  const { success: similarSuccess, data: similarData } = await getBookSimilar(
    bookDetails.genre,
    bookDetails.id
  );

  const bookSimilar = similarSuccess ? similarData : [];

  if (!bookDetails) redirect("/404");
  return (
    <>
      <BookOverview {...bookDetails} userId={session?.user?.id as string} />
      <div className="book-details">
        <div className="flex flex-1 flex-col gap-5">
          <section className="flex flex-col gap-7">
            <h3>Video</h3>
            <BookVideo videoUrl={bookDetails.videoUrl} />
          </section>
          <section className="flex flex-col gap-7">
            <h3>Summary</h3>
            <div className="space-y-5 text-xl text-light-100">
              {bookDetails.summary.split("\n").map((line, i) => (
                <p key={i}> {line}</p>
              ))}
            </div>
          </section>
        </div>
        <div className="relative flex flex-1 justify-center">
          <section className="flex flex-col gap-7">
            <BookList
              title="More similar books"
              books={bookSimilar}
              hideDetails={true}
            />
          </section>
        </div>
      </div>
    </>
  );
};

export default page;
