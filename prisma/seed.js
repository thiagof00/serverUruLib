import { PrismaClient, StatusEmprestimo } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Iniciando seeds do sistema de biblioteca...');

  // ------------------------
  // Usuários
  // ------------------------
  const usuarios = await prisma.usuario.createMany({
    data: [
      {
        nome: 'Ana Souza',
        cpf: '123.456.789-00',
        email: 'ana@biblioteca.com',
        telefone: '(11) 98765-1234',
        endereco: 'Rua das Flores, 123',
      },
      {
        nome: 'Carlos Oliveira',
        cpf: '987.654.321-00',
        email: 'carlos@biblioteca.com',
        telefone: '(11) 91234-5678',
        endereco: 'Av. Brasil, 789',
      },
      {
        nome: 'Marina Santos',
        cpf: '111.222.333-44',
        email: 'marina@biblioteca.com',
        telefone: '(11) 90000-1111',
        endereco: 'Rua Central, 500',
      },
    ],
  });

  console.log('👤 Usuários criados:', usuarios.count);

  // ------------------------
  // Livros
  // ------------------------
  const livros = await prisma.livro.createMany({
    data: [
      {
        titulo: 'O Senhor dos Anéis',
        autor: 'J.R.R. Tolkien',
        editora: 'HarperCollins',
        anoPublicacao: 1954,
        isbn: '978-0007525546',
        categoria: 'Fantasia',
        quantidadeTotal: 5,
        quantidadeDisponivel: 4,
      },
      {
        titulo: '1984',
        autor: 'George Orwell',
        editora: 'Companhia das Letras',
        anoPublicacao: 1949,
        isbn: '978-8535914849',
        categoria: 'Distopia',
        quantidadeTotal: 3,
        quantidadeDisponivel: 3,
      },
      {
        titulo: 'Dom Casmurro',
        autor: 'Machado de Assis',
        editora: 'Editora Ática',
        anoPublicacao: 1899,
        isbn: '978-8503012923',
        categoria: 'Romance',
        quantidadeTotal: 4,
        quantidadeDisponivel: 4,
      },
    ],
  });

  console.log('📚 Livros criados:', livros.count);

  // ------------------------
  // Empréstimos
  // ------------------------
  const ana = await prisma.usuario.findUnique({ where: { email: 'ana@biblioteca.com' } });
  const senhorAneis = await prisma.livro.findUnique({ where: { isbn: '978-0007525546' } });

  const emprestimo = await prisma.emprestimo.create({
    data: {
      usuarioId: ana.id,
      dataDevolucaoPrevista: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // +7 dias
      status: StatusEmprestimo.ATIVO,
      itensEmprestimo: {
        create: [
          {
            livroId: senhorAneis.id,
            quantidade: 1,
          },
        ],
      },
    },
    include: { itensEmprestimo: true },
  });

  console.log('📦 Empréstimo criado:', emprestimo.id);

  console.log('✅ Seed concluída com sucesso!');
}

// Executa o seed
main()
  .catch((e) => {
    console.error('❌ Erro ao executar seed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
