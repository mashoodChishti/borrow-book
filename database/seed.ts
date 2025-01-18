import dummyBooks from "@/dummybooks.json";
import { books } from "./schema";
import ImageKit from "imagekit";
import { config } from "dotenv";
import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";

config({ path: ".env.local" });

const sql = neon(process.env.DATABASE_URL!);
export const db = drizzle({ client: sql });

const imageKit = new ImageKit({
  publicKey: process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY!,
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY!,
  urlEndpoint: process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT!,
});

const uploadToImageKit = async (
  fileUrl: string,
  fileName: string,
  folder: string,
) => {
  try {
    const response = await imageKit.upload({
      file: fileUrl,
      fileName,
      folder,
    });
    return response.filePath;
  } catch (error) {
    console.log("Error uploading to ImageKit", error);
  }
};

const seed = async () => {
  console.log("Seeding database...");
  try {
    for (const book of dummyBooks) {
      const cover_url = (await uploadToImageKit(
        book.coverUrl,
        `${book.title}.jpg`,
        "books/covers",
      )) as string;
      const video_url = (await uploadToImageKit(
        book.videoUrl,
        `${book.title}.mp4`,
        "books/videos",
      )) as string;
      await db.insert(books).values({
        ...book,
        coverUrl: cover_url,
        videoUrl: video_url,
      });
    }
    console.log("Seed completed");
  } catch (error) {
    console.log("Error seeding database", error);
  }
};

seed();
