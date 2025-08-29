import { defineStore } from 'pinia';
import { ref, computed } from 'vue';

export interface Page {
  id: number;
  title: string;
  description: string;
  price?: number;
  imageUrl?: string;
}

export interface NewPageData {
  title: string;
  description: string;
  price?: number;
  imageUrl?: string;
}

export const usePagesStore = defineStore('pages', () => {
  const pages = ref<Page[]>([
    {
      id: 1,
      title: 'Looking for a new job',
      description: 'I am looking for a new job in the field of software development. I have 5 years of experience in the field and I am looking for a new challenge. I am open to any offers and I am willing to relocate.',
    },
    {
      id: 2,
      title: 'Banshee',
      description: 'Selling my 2020 model Bravado Banshee, low mileage and in perfect condition. Price is negotiable.',
      price: 74999,
      imageUrl: 'https://img-wrapper.vercel.app/image?url=https://i.imgur.com/sC5B7h1.jpeg',
    },
    {
      id: 3,
      title: '2018+ Sanchez',
      description: 'Looking for a 2018 or newer model Sanchez. I am willing to pay up to 20k for a good condition bike.',
    },
  ]);

  const searchQuery = ref('');

  const filteredPages = computed(() => {
    if (!searchQuery.value) {
      return pages.value;
    }
    const query = searchQuery.value.toLowerCase();
    return pages.value.filter(
      page =>
        page.title.toLowerCase().includes(query) ||
        page.description.toLowerCase().includes(query)
    );
  });

  const formatPrice = (price: number) => {
    const formatted = new Intl.NumberFormat('de-DE').format(price);
    return `$${formatted}`;
  };

  const addPage = (data: NewPageData) => {
    const newPage: Page = {
      id: Date.now(),
      title: data.title,
      description: data.description,
      price: data.price,
      imageUrl: data.imageUrl,
    };
    pages.value.unshift(newPage);
  };

  return {
    pages,
    searchQuery,
    filteredPages,
    formatPrice,
    addPage,
  };
});
