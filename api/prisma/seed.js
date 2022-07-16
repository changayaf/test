const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const userData = [
  {
    name:   'Leanne Graham',
    surname: 'Bret'
  },
  {
    name:   'Ervin Howell',
    surname: 'Antonette'
  },
  {
    name:   'Clementine Bauch',
    surname: 'Samantha'
  },
  {
    name:   'Patricia Lebsack',
    surname: 'Karianne'
  },
  {
    name:   'Chelsey Dietrich',
    surname: 'Kamren'
  }
]

const proyectData = [
  {
    name:        'Test project 1',
    description: 'This is a test project to associate bug'
  },
  {
    name:        'Test project 2',
    description: 'This is a test project to associate bug'
  },
  {
    name:        'Test project 3',
    description: 'This is a test project to associate bug'
  },
  {
    name:        'Test project 4',
    description: 'This is a test project to associate bug'
  },
  {
    name:        'Test project 5',
    description: 'This is a test project to associate bug'
  }
]

async function main() {
  console.log(`Start seeding ...`);

  console.log(`Checking if the user already exists ...`);
  const users = await prisma.user.findMany();
  if (users.length === 0) {
    console.log(`Inserting data Users ...`);
    for (const user of userData) {
      const u = await prisma.user.create({
        data: user,
      })
      console.log(`Created user with id: ${u.id}`);
    }
  } else {
    console.log(`The data user has already been updated ...`);
  }

  console.log(`Checking if the proyect already exists ...`);
  const proyects = await prisma.project.findMany();
  if (proyects.length === 0) {
    console.log(`Inserting data Proyects ...`);
    for (const proyect of proyectData) {
      const p = await prisma.project.create({
        data: proyect,
      })
      console.log(`Created proyect with id: ${p.id}`);
    }
  } else {
    console.log(`The data proyect has already been updated ...`);
  }

  console.log(`Seeding finished.`);
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
