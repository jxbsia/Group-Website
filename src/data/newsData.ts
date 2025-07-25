export interface NewsItem {
  id: string;
  title: string;
  description: string;
  date: string;
  category: string;
  link?: string;
  thumbnail?: string;
}

export const newsData: NewsItem[] = [
  {
    id: '1',
    title: 'Breakthrough in High-Performance Integrated Laser Technology',
    description: 'Our research group has achieved a significant milestone in developing next-generation integrated lasers with unprecedented efficiency and performance metrics.',
    date: '2024-07-20',
    category: 'Research',
    link: '#'
  },
  {
    id: '2',
    title: 'New Publication in Nature Photonics',
    description: 'Our latest work on large-scale photonic integration has been published in Nature Photonics, showcasing novel approaches to scalable photonic circuits.',
    date: '2024-07-15',
    category: 'Publication',
    link: '#'
  },
  {
    id: '3',
    title: 'PhD Student Wins Best Paper Award at CLEO 2024',
    description: 'Congratulations to our PhD student for receiving the Best Paper Award at the Conference on Lasers and Electro-Optics (CLEO) 2024.',
    date: '2024-07-10',
    category: 'Award',
    link: '#'
  },
  {
    id: '4',
    title: 'New Collaboration with Industry Partner',
    description: 'We are excited to announce a new research collaboration focused on advancing commercial applications of integrated photonic technologies.',
    date: '2024-07-05',
    category: 'Collaboration',
    link: '#'
  },
  {
    id: '5',
    title: 'Research Group Receives Major Funding Grant',
    description: 'Our proposal for advanced photonic integration research has been awarded a substantial grant to support next-phase developments.',
    date: '2024-06-28',
    category: 'Funding',
    link: '#'
  },
  {
    id: '6',
    title: 'Invited Talk at International Photonics Conference',
    description: 'Prof. Brian Sia Jia Xu will deliver an invited keynote presentation on the future of integrated laser technologies.',
    date: '2024-06-25',
    category: 'Conference',
    link: '#'
  }
];