import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  // Exemplo de inserção de usuários
  await prisma.user.createMany({
    data: [
      { name: 'Thiago Ribeiro', email: 'thiago@example.com' },
      { name: 'Maria Souza', email: 'maria@example.com' },
    ],
  })

  console.log('✅ Seed executado com sucesso!')
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
