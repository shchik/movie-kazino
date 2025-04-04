import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
	await prisma.genre.createMany({
		data: [
			{ name: 'Drama', count: 6 },
			{ name: 'Crime', count: 1 },
			{ name: 'Fantasy', count: 3 },
			{ name: 'Action', count: 1 },
			{ name: 'Thriller', count: 3 },
			{ name: 'Romance', count: 1 },
			{ name: 'Adventure', count: 1 },
		],
	})

	await prisma.slot.createMany({
		data: [
			{
				title: 'Криминальное чтиво',
				image: '/intro-slot-images/girl.webp',
				categories: ['Drama', 'Crime'],
			},
			{
				title: 'Бегущий по лезвию 2049',
				image: '/intro-slot-images/runner.jpeg',
				categories: ['Fantasy', 'Thriller', 'Drama'],
			},
			{
				title: 'Мост в террабитию',
				image: '/intro-slot-images/terrabitia.webp',
				categories: ['Romance', 'Fantasy', 'Drama'],
			},
			{
				title: 'Реквием по мечте',
				image: '/intro-slot-images/recviem500x500.jpg',
				categories: ['Thriller', 'Drama'],
			},
			{
				title: 'Гарри Поттер и кубок огня',
				image: '/intro-slot-images/harry-potter.webp',
				categories: ['Fantasy', 'Adventure', 'Drama'],
			},
			{
				title: 'Бойцовский клуб',
				image: '/intro-slot-images/fight-club.jpeg',
				categories: ['Thriller', 'Action', 'Drama'],
			},
		],
	})

	await prisma.images.createMany({
		data: [
			{ image: '/line-images/1.png', value: 1, slotId: 1 },
			{ image: '/line-images/2.png', value: 2, slotId: 1 },
			{ image: '/line-images/10.png', value: 10, slotId: 1 },
			{ image: '/line-images/1.png', value: 1, slotId: 2 },
			{ image: '/line-images/2.png', value: 2, slotId: 2 },
			{ image: '/line-images/10.png', value: 10, slotId: 2 },
			{ image: '/line-images/1.png', value: 1, slotId: 3 },
			{ image: '/line-images/2.png', value: 2, slotId: 3 },
			{ image: '/line-images/10.png', value: 10, slotId: 3 },
			{ image: '/line-images/1.png', value: 1, slotId: 4 },
			{ image: '/line-images/2.png', value: 2, slotId: 4 },
			{ image: '/line-images/10.png', value: 10, slotId: 4 },
			{ image: '/line-images/1.png', value: 1, slotId: 5 },
			{ image: '/line-images/2.png', value: 2, slotId: 5 },
			{ image: '/line-images/10.png', value: 10, slotId: 5 },
			{ image: '/line-images/1.png', value: 1, slotId: 6 },
			{ image: '/line-images/2.png', value: 2, slotId: 6 },
			{ image: '/line-images/10.png', value: 10, slotId: 6 },

			{ image: '/slot-images/crime/devka.jpg', value: 2, slotId: 1 },
			{ image: '/slot-images/crime/john.jfif', value: 4, slotId: 1 },
			{ image: '/slot-images/crime/negr.jpg', value: 8, slotId: 1 },

			{ image: '/slot-images/runner/ana.jpg', value: 2, slotId: 2 },
			{ image: '/slot-images/runner/father.jpg', value: 4, slotId: 2 },
			{ image: '/slot-images/runner/rayan.jpeg', value: 8, slotId: 2 },

			{ image: '/slot-images/terrabitia/jess.jpeg', value: 2, slotId: 3 },
			{
				image: '/slot-images/terrabitia/lesli.jpeg',
				value: 4,
				slotId: 3,
			},
			{ image: '/slot-images/terrabitia/may.jpeg', value: 8, slotId: 3 },
		],
	})
}

main().then(async () => await prisma.$disconnect())
