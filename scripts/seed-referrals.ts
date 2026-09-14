import "dotenv/config";
import prisma from "../lib/prisma";

function generateReferralCode(length = 8) {
  const characters = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let result = "STC";

  for (let i = 0; i < length - 3; i++) {
    result += characters.charAt(
      Math.floor(Math.random() * characters.length)
    );
  }

  return result;
}

async function getUniqueReferralCode() {
  let code = generateReferralCode();

  while (
    await prisma.user.findFirst({
      where: {
        referralCode: code,
      },
      select: {
        id: true,
      },
    })
  ) {
    code = generateReferralCode();
  }

  return code;
}

async function main() {
  const users = await prisma.user.findMany({
    orderBy: {
      createdAt: "asc",
    },
    select: {
      id: true,
      stcUserNumber: true,
      referralCode: true,
    },
  });

  console.log(`Found ${users.length} users.`);

  let sequence = 1;
  let updated = 0;

  for (const user of users) {
    const stcUserNumber =
      user.stcUserNumber ??
      `STC-${String(sequence).padStart(6, "0")}`;

    const referralCode =
      user.referralCode ??
      (await getUniqueReferralCode());

    await prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        stcUserNumber,
        referralCode,
      },
    });

    console.log(
      `${user.id} → ${stcUserNumber} → ${referralCode}`
    );

    sequence++;
    updated++;
  }

  console.log(`Completed. ${updated} users processed.`);
}

main()
  .catch((error) => {
    console.error("Seed failed:", error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });