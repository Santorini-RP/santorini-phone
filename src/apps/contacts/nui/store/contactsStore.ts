import { defineStore } from 'pinia';
import { ref, computed } from 'vue';

export interface Contact {
  id: number;
  name: string;
  phone: string;
}

export const useContactsStore = defineStore('contacts', () => {
  const contacts = ref<Contact[]>([
    { id: 1, name: 'Breze', phone: '(205) 144-0416' },
    { id: 2, name: 'Curtis Jackson', phone: '(141) 555-1' },
    { id: 3, name: 'LB Office', phone: '(033) 134-4313' },
    { id: 4, name: 'Loaf Scripts', phone: '(480) 294-0940' },
    { id: 5, name: 'Peter', phone: '(156) 644-4151' },
    { id: 6, name: 'Sally', phone: '(205) 144-0412' },
    { id: 7, name: 'Tom', phone: '(155) 613-5534' },
  ]);

  const searchQuery = ref('');

  const getInitials = (name: string) => {
    const parts = name.split(' ');
    if (parts.length > 1) {
      return (parts[0][0] + parts[1][0]).toUpperCase();
    }
    return name.substring(0, 2).toUpperCase();
  };

  const filteredContacts = computed(() => {
    if (!searchQuery.value) {
      return contacts.value;
    }
    const query = searchQuery.value.toLowerCase();
    return contacts.value.filter(
      (contact) =>
        contact.name.toLowerCase().includes(query) ||
        contact.phone.replace(/\D/g, '').includes(query.replace(/\D/g, ''))
    );
  });

  const groupedContacts = computed(() => {
    const groups: Record<string, Contact[]> = {};

    const sorted = [...filteredContacts.value].sort((a, b) => a.name.localeCompare(b.name));

    for (const contact of sorted) {
      const firstLetter = contact.name[0].toUpperCase();
      if (!groups[firstLetter]) {
        groups[firstLetter] = [];
      }
      groups[firstLetter].push(contact);
    }

    return Object.entries(groups).map(([letter, contacts]) => ({
      letter,
      contacts,
    }));
  });

  const totalContacts = computed(() => contacts.value.length);

  return {
    contacts,
    searchQuery,
    groupedContacts,
    totalContacts,
    getInitials,
  };
});
