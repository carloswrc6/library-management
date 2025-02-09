import dummyBooks from "../dummybooks.json";
import dummyUsers from "../dummyUsers.json";
import ImageKit from "imagekit";
import { books, users } from "@/database/schema";
import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import { config } from "dotenv";
import { hash } from "bcryptjs";

config({ path: ".env.local" });

const sql = neon(process.env.DATABASE_URL!);
export const db = drizzle({ client: sql });

const imagekit = new ImageKit({
  publicKey: process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY!,
  urlEndpoint: process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT!,
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY!,
});

const uploadToImageKit = async (
  url: string,
  fileName: string,
  folder: string
) => {
  try {
    const response = await imagekit.upload({
      file: url,
      fileName,
      folder,
    });

    return response.filePath;
  } catch (error) {
    console.error("Error uploading image to ImageKit:", error);
  }
};

const seed = async () => {
  console.log("Seeding data...");

  try {
    for (const [index, user] of dummyUsers.entries()) {
      console.log("index ", index);

      if (!["PENDING", "APPROVED", "REJECTED"].includes(user.status)) {
        throw new Error(
          `Status inválido para el usuario ${user.email}: ${user.status}`
        );
      }

      const hashedPassword = await hash(user.password, 10);

      await db.insert(users).values({
        ...user,
        password: hashedPassword,
      });
    }

    console.log("Users seeded successfully!");

    for (const [index, book] of dummyBooks.entries()) {
      console.log("index ", index);

      const coverUrl = (await uploadToImageKit(
        book.coverUrl,
        `${book.title}.jpg`,
        "/books/covers"
      )) as string;

      // const videoUrl = (await uploadToImageKit(
      //   book.videoUrl,
      //   `${book.title}.mp4`,
      //   "/books/videos"
      // )) as string;

      await db.insert(books).values({
        ...book,
        coverUrl,
        // videoUrl,
      });
    }

    console.log("Data seeded successfully!");
  } catch (error) {
    console.error("Error seeding data:", error);
  }
};

seed();
