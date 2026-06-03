import { getPayload } from "payload";
import config from "../payload.config";
import { quizData } from "./quiz";

async function seed() {
  const payload = await getPayload({ config });

  const existing = await payload.find({
    collection: "quizzes",
  });

  if (existing.docs.length === 0) {
    await payload.create({
      collection: "quizzes",
      data: quizData,
    });

    console.log("Quiz seeded");
  }

  process.exit(0);
}

seed().catch((err) => {
  console.error(err);
  process.exit(1);
});