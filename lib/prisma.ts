import { PrismaClient } from "@prisma/client";
import { withAccelerate } from "@prisma/extension-accelerate";

declare global {
  var prisma: ReturnType<typeof createPrismaClient> | undefined;
}

function createPrismaClient() {
  return new PrismaClient({
    accelerateUrl: process.env.DATABASE_URL!,
    log:
      process.env.NODE_ENV === "development"
        ? ["query", "warn", "error"]
        : ["error"],
  }).$extends(withAccelerate());
}

const prisma = global.prisma ?? createPrismaClient();

if (process.env.NODE_ENV !== "production") {
  global.prisma = prisma;
}

export default prisma;