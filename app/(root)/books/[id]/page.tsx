import BookOverview from "@/components/BookOverview";
import { db } from "@/database/drizzle";
import { books } from "@/database/schema";
import { desc, eq } from "drizzle-orm";
import React from "react";
import { redirect } from "next/navigation";
import { auth } from "@/auth";
import BookVideo from "@/components/BookVideo";
import BookList from "@/components/BookList";

const page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const id = (await params).id;
  const session = await auth();

  const [bookDetails] = await db
    .select()
    .from(books)
    .where(eq(books.id, id))
    .limit(1);

  const bookSimilar = (await db
      .select()
      .from(books)
      .limit(6)
      .orderBy(desc(books.createdAt))) as Book[];

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
