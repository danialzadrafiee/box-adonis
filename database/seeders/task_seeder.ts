import { BaseSeeder } from '@adonisjs/lucid/seeders'
import Task from '#models/task'

export default class extends BaseSeeder {
  async run() {
    await Task.createMany([
      {
        image: '/images/task1.webp',
        link: 'https://example.com/task1',
        description: 'Complete your first tap',
        reward: 100,
      },
      {
        image: '/images/task2.webp',
        link: 'https://example.com/task2',
        description: 'Upgrade miner to level 5',
        reward: 250,
      },
      {
        image: '/images/task3.webp',
        link: 'https://example.com/task3',
        description: 'Invite 3 friends',
        reward: 500,
      },
      {
        image: '/images/task4.webp',
        link: 'https://example.com/task4',
        description: 'Complete 10 taps',
        reward: 200,
      },
      {
        image: '/images/task5.webp',
        link: 'https://example.com/task5',
        description: 'Join our Discord server',
        reward: 150,
      },
      {
        image: '/images/task6.webp',
        link: 'https://example.com/task6',
        description: 'Follow us on Twitter',
        reward: 150,
      },
      {
        image: '/images/task7.webp',
        link: 'https://example.com/task7',
        description: 'Reach level 10',
        reward: 300,
      },
      {
        image: '/images/task8.webp',
        link: 'https://example.com/task8',
        description: 'Complete all daily missions for a week',
        reward: 700,
      },
      {
        image: '/images/task9.webp',
        link: 'https://example.com/task9',
        description: 'Win a PvP match',
        reward: 400,
      },
      {
        image: '/images/task10.webp',
        link: 'https://example.com/task10',
        description: 'Craft your first legendary item',
        reward: 1000,
      },
    ])
  }
}
