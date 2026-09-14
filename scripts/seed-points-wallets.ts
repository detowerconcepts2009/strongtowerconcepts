import "dotenv/config";
import prisma from "../lib/prisma";

async function main() {
  const users = await prisma.user.findMany({
    select: {
      id: true,
      stcUserNumber: true,
      email: true,
      pointsWallet: {
        select: {
          id: true,
          balance: true,
        },
      },
    },
    orderBy: {
      createdAt: "asc",
    },
  });

  console.log(`Found ${users.length} users.`);

  let created = 0;
  let existing = 0;

  for (const user of users) {
    if (user.pointsWallet) {
      existing++;
      console.log(
        `EXISTS: ${user.stcUserNumber ?? user.id} → ${user.pointsWallet.balance} points`
      );
      continue;
    }

    const wallet = await prisma.pointsWallet.create({
      data: {
        userId: user.id,
        balance: 0,
      },
    });

    created++;

    console.log(
      `CREATED: ${user.stcUserNumber ?? user.id} → ${wallet.balance} points`
    );
  }

  console.log("");
  console.log("Points wallet initialization completed.");
  console.log(`Users found: ${users.length}`);
  console.log(`Wallets created: ${created}`);
  console.log(`Wallets already existed: ${existing}`);
}

main()
  .catch((error) => {
    console.error("Seed failed:", error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });