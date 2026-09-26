import { PrismaClient, Prisma } from "../app/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import "dotenv/config";

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
});

const prisma = new PrismaClient({
  adapter,
});

const userData: Prisma.UserCreateInput[] = [
  {
    email: "admin@salonneo.lk",
    password: "$2a$12$HIck09Bf6tr88nllVKRwaOFTMBdaLW0bRzOVtOeso00U.ks/40Y4q",
    firstname: "Admin",
    lastname: "Neo",
    role: "ADMIN",
    privileges: []
  }
];

export async function main() {
  for (const u of userData) {
    await prisma.user.create({
      data: u,
    });
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });