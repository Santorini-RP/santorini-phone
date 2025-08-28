import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export interface KeyAccessPerson {
  id: number;
  name: string;
}

export interface Home {
  id: number;
  name: string;
  number: string;
  isDoorLocked: boolean;
  keyAccess: KeyAccessPerson[];
}

export const useHomeStore = defineStore('homeApp', () => {
  const homes = ref<Home[]>([
    { id: 1, name: 'Ocean Drive 23', number: '#1', isDoorLocked: false, keyAccess: [{id: 1, name: 'Alice'}, {id: 2, name: 'Bob'}] },
    { id: 2, name: 'Sunset Boulevard 12', number: '#2', isDoorLocked: true, keyAccess: [] },
    { id: 3, name: 'Sunset Boulevard 13', number: '#3', isDoorLocked: true, keyAccess: [{id: 3, name: 'Charlie'}] },
  ])

  const getHomeById = computed(() => {
    return (homeId: number) => homes.value.find(home => home.id === homeId);
  });

  const toggleDoorLock = (homeId: number) => {
    const home = homes.value.find(h => h.id === homeId);
    if (home) {
      home.isDoorLocked = !home.isDoorLocked;
    }
  };

  function removeKeyAccess(homeId: number, personId: number) {
    const home = homes.value.find(h => h.id === homeId);
    if (home) {
      home.keyAccess = home.keyAccess.filter(p => p.id !== personId);
    }
  }

  const giveKeyAccess = (homeId: number, personId: string) => {
    const home = homes.value.find(h => h.id === homeId);
    const personIdNum = parseInt(personId, 10);
    if (home && !isNaN(personIdNum)) {
      // In a real app, you'd fetch the person's name from their ID
      const newPerson: KeyAccessPerson = {
        id: personIdNum,
        name: `Citizen ${personIdNum}` // Placeholder name
      };
      home.keyAccess.push(newPerson);
      return true;
    }
    return false;
  }

  return {
    homes,
    getHomeById,
    toggleDoorLock,
    removeKeyAccess,
    giveKeyAccess,
  }
})
