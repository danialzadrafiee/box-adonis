import { BaseSeeder } from '@adonisjs/lucid/seeders'
import Task from '#models/task'

export default class extends BaseSeeder {
  async run() {
    await Task.createMany([
      {
        image: 'https://logo.clearbit.com/facebook.com',
        link: 'https://www.facebook.com/sharer/sharer.php?u=https://yourgame.com',
        description: 'Share our game on Facebook',
        reward: 100,
      },
      {
        image: 'https://logo.clearbit.com/whatsapp.com',
        link: 'https://api.whatsapp.com/send?text=Check%20out%20this%20awesome%20game:%20https://yourgame.com',
        description: 'Share our game on WhatsApp',
        reward: 100,
      },
      {
        image: 'https://logo.clearbit.com/telegram.org',
        link: 'https://t.me/share/url?url=https://yourgame.com&text=Check%20out%20this%20awesome%20game!',
        description: 'Share our game on Telegram',
        reward: 100,
      },
      {
        image: 'https://logo.clearbit.com/instagram.com',
        link: 'https://www.instagram.com/',
        description: 'Share our game on your Instagram story',
        reward: 150,
      },
      {
        image: 'https://logo.clearbit.com/twitter.com',
        link: 'https://twitter.com/intent/tweet?text=I%27m%20playing%20this%20awesome%20game!%20Check%20it%20out:%20https://yourgame.com',
        description: 'Share our game on Twitter',
        reward: 100,
      },
      {
        image: 'https://logo.clearbit.com/linkedin.com',
        link: 'https://www.linkedin.com/sharing/share-offsite/?url=https://yourgame.com',
        description: 'Share our game on LinkedIn',
        reward: 150,
      },
      {
        image: 'https://logo.clearbit.com/reddit.com',
        link: 'https://www.reddit.com/submit?url=https://yourgame.com&title=Check%20out%20this%20awesome%20game!',
        description: 'Share our game on Reddit',
        reward: 200,
      },
      {
        image: 'https://logo.clearbit.com/tiktok.com',
        link: 'https://www.tiktok.com/',
        description: 'Create a TikTok video about our game',
        reward: 250,
      },
      {
        image: 'https://logo.clearbit.com/youtube.com',
        link: 'https://www.youtube.com/',
        description: 'Create a YouTube video review of our game',
        reward: 500,
      },
    ])
  }
}
