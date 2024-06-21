// data/mock-data.ts


export const mockArticles = [
  {
    id: 1,
    slug: 'article-1',
    thumbnail:
      'https://healthy-cambodia.com/uploads/blog/News/10ddbda4810233b56dab7ada360bd9f5.jpg',
    title:
      'លោក​ ផាប្លូ កាង ភារធារីប្រចាំស្ថានទូតអូស្ត្រាលី បានអញ្ជើញមកធ្វើទស្សនកិច្ចនៅគ្លីនិកអង្គការម៉ារីស្តូបអន្តរជាតិនៅខេត្តបាត់ដំបង',
    category: {
      slug: 'category-1',
      name: 'Category 1',
    },
    user_created: {
      avatar:
        'https://tech-cambodia.com/cms/assets/474132f3-2497-418b-9ca4-567390ee221e',
      first_name: 'John',
      last_name: 'Doe',
    },
    date_created: '2024-06-20T00:00:00Z',
    views: 12345,
  },
  {
    id: 2,
    slug: 'article-2',
    thumbnail:
      'https://healthy-cambodia.com/uploads/blog/News/099571f5b48000073338a6a7adad51a5.jpg',
    title:
      'កម្រមានណាស់ ១ភាគរយទេលើពិភពលោក ដំរី១ក្បាល នៅថៃសម្រាលបានកូនភ្លោះញីឈ្មោល',
    category: {
      slug: 'category-2',
      name: 'Category 2',
    },
    user_created: {
      avatar:
        'https://tech-cambodia.com/cms/assets/d0e0109a-636f-430c-b0a3-2cc3367386c2',
      first_name: 'Jane',
      last_name: 'Smith',
    },
    date_created: '2024-06-19T00:00:00Z',
    views: 54321,
  },
  {
    id: 3,
    slug: 'article-2',
    thumbnail:
      'https://healthy-cambodia.com/uploads/blog/News/aef9bf4e2af25cec567a865bba31cf25.jpg',
    title:
      'ធនាគារ ជេ ត្រាស់ រ៉ូយ៉ាល់ និង មន្ទីរពេទ្យ រ៉ូយ៉ាល់ភ្នំពេញ ប្រកាសពីកិច្ចសហការដៃ',
    category: {
      slug: 'category-2',
      name: 'Category 2',
    },
    user_created: {
      avatar:
        'https://tech-cambodia.com/cms/assets/e6de4620-34b0-491c-ae3d-9235685b27ac',
      first_name: 'Jane',
      last_name: 'Smith',
    },
    date_created: '2024-06-19T00:00:00Z',
    views: 54321,
  },
  {
    id: 4,
    slug: 'article-2',
    thumbnail:
      'https://healthy-cambodia.com/uploads/blog/News/4b329ca52b52189d2123ba142c16d9e8.jpg',
    title: 'កូនៗនឹងកើតទឹកនោមផ្អែម ខូចតម្រងនោមទាំងវ័យក្មេងបើឪពុក',
    category: {
      slug: 'category-2',
      name: 'Category 2',
    },
    user_created: {
      avatar:
        'https://tech-cambodia.com/cms/assets/e6de4620-34b0-491c-ae3d-9235685b27ac',
      first_name: 'Jane',
      last_name: 'Smith',
    },
    date_created: '2024-06-19T00:00:00Z',
    views: 54321,
  },
  {
    id: 5,
    slug: 'article-2',
    thumbnail:
      'https://healthy-cambodia.com/uploads/blog/News/4b329ca52b52189d2123ba142c16d9e8.jpg',
    title: 'កូនៗនឹងកើតទឹកនោមផ្អែម ខូចតម្រងនោមទាំងវ័យក្មេងបើឪពុក',
    category: {
      slug: 'category-2',
      name: 'Category 2',
    },
    user_created: {
      avatar:
        'https://tech-cambodia.com/cms/assets/e6de4620-34b0-491c-ae3d-9235685b27ac',
      first_name: 'Jane',
      last_name: 'Smith',
    },
    date_created: '2024-06-19T00:00:00Z',
    views: 54321,
  },
  // Add more articles as needed
];

export const mockCarouselItems = [
  {
    id: 1,
    image: 'https://via.placeholder.com/800x400',
    title: 'Carousel Item 1',
    description: 'Description for Carousel Item 1',
  },
  {
    id: 2,
    image: 'https://via.placeholder.com/800x400',
    title: 'Carousel Item 2',
    description: 'Description for Carousel Item 2',
  },
  // Add more carousel items as needed
];
export const popularArticlesMonthly = mockArticles.slice(0, 5);
