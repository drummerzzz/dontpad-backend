import { PrismaClient } from '@prisma/client'

export const prisma = new PrismaClient()
export default prisma

async function main() {
  // const articles = await prisma.article.findMany()
  // console.log(articles)
}

main()
  .catch((e) => {
    throw e
  })
  .finally(async () => {
    await prisma.$disconnect()
  })