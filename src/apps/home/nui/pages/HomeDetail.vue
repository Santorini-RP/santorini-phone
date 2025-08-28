<script setup lang="ts">
import { computed, onMounted, onUnmounted, watch, markRaw } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useHomeStore, type KeyAccessPerson } from '../store/app-store';
import { useWidgetManagerStore } from '@core/nui/store/widgetManager';
import { useModalStore } from '@core/nui/store/modal';
import WidgetGrid from '@core/nui/components/WidgetGrid.vue';
import { Lock, Unlock, Users, X, Send, Key, ChevronRight } from 'lucide-vue-next';

const props = defineProps<{
  homeId: string;
}>();

const router = useRouter();
const homeStore = useHomeStore();
const widgetManager = useWidgetManagerStore();
const modalStore = useModalStore();

const home = computed(() => {
  return homeStore.getHomeById(Number(props.homeId));
});

const goBack = () => {
  router.back();
};

const confirmRemoveKeyholder = async (person: KeyAccessPerson) => {
  if (!home.value) return;

  const result = await modalStore.showModal({
    title: 'Remove Keyholder',
    message: `Are you sure you want to remove\naccess from ${person.name}?`,
    buttons: [
      { id: 'cancel', text: 'Cancel', style: 'cancel' },
      { id: 'proceed', text: 'Proceed', style: 'default' },
    ]
  });

  if (result.buttonId === 'proceed') {
    homeStore.removeKeyAccess(home.value.id, person.id);
  }
};

const handleGiveKey = async () => {
  if (!home.value) return;

  const result = await modalStore.showModal({
    title: 'Give Key',
    message: 'Insert the ID of the person you want to give a key to.',
    inputs: [
      {
        id: 'citizenId',
        value: '',
        placeholder: 'Citizen ID',
        type: 'number',
        required: true,
      }
    ],
    buttons: [
      { id: 'cancel', text: 'Cancel', style: 'cancel' },
      { id: 'proceed', text: 'Proceed', style: 'default' },
    ]
  });

  if (result.buttonId === 'proceed' && result.inputValues?.citizenId) {
    const success = homeStore.giveKeyAccess(home.value.id, result.inputValues.citizenId);
    if (success) {
      alert(`Key given to Citizen ${result.inputValues.citizenId}`);
    } else {
      alert('Invalid ID or home not found.');
    }
  }
};

const registerWidgets = () => {
  if (!home.value) return;

  widgetManager.unregisterAllByAppId('home-detail');

  widgetManager.register({
    id: `home-location-${home.value.id}`,
    appId: 'home-detail',
    size: 'small',
    icon: markRaw(Send),
    iconBgColor: 'bg-gray-500/80',
    title: 'Location',
    subtitle: 'Set Waypoint',
    action: () => alert('Set Waypoint clicked'),
  });

  widgetManager.register({
    id: `home-door-${home.value.id}`,
    appId: 'home-detail',
    size: 'small',
    icon: markRaw(home.value.isDoorLocked ? Lock : Unlock),
    iconBgColor: 'bg-cyan-400/80',
    title: 'Front Door',
    subtitle: home.value.isDoorLocked ? 'Locked' : 'Unlocked',
    action: () => homeStore.toggleDoorLock(home.value!.id),
  });

  widgetManager.register({
    id: `home-give-key-${home.value.id}`,
    appId: 'home-detail',
    size: 'small',
    icon: markRaw(Key),
    iconBgColor: 'bg-yellow-500/80',
    title: 'Give Key',
    subtitle: 'Manage',
    action: handleGiveKey,
  });
};

onMounted(() => {
  registerWidgets();
});

watch(home, () => {
  registerWidgets();
}, { deep: true });

onUnmounted(() => {
  widgetManager.unregisterAllByAppId('home-detail');
});
</script>

<template>
  <div v-if="home" class="h-full w-full text-white overflow-y-auto no-scrollbar relative font-sans">
    <!-- Background -->
    <div 
      class="absolute inset-0 bg-cover bg-center"
      style="background-image: url('/src/core/nui/assets/images/backgrounds/w8.png');"
    ></div>
    <div class="absolute inset-0 bg-black/50 backdrop-blur-sm"></div>

    <!-- Content -->
    <div class="relative z-10 flex flex-col pt-20 pb-8 px-6 space-y-6">
      <!-- Header -->
      <div class="flex items-center justify-between">
        <h1 class="text-3xl font-bold">My Home</h1>
        <button @click="goBack" class="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors">
          <X class="w-5 h-5" />
        </button>
      </div>

      <!-- Actions -->
      <div class="space-y-3">
        <h2 class="text-lg font-semibold text-gray-300 flex items-center space-x-1 cursor-pointer">
          <span>Actions</span>
          <ChevronRight class="w-5 h-5" />
        </h2>
        <WidgetGrid appId="home-detail" />
      </div>

      <!-- Key Access -->
      <div class="space-y-3">
        <h2 class="text-lg font-semibold text-gray-300 flex items-center space-x-1 cursor-pointer">
          <span>Key Access</span>
          <ChevronRight class="w-5 h-5" />
        </h2>
        <div class="flex flex-wrap gap-4">
          <div 
            v-for="person in home.keyAccess" 
            :key="person.id" 
            @click="confirmRemoveKeyholder(person)"
            class="bg-black/20 backdrop-blur-lg rounded-xl p-3 flex items-center space-x-3 border border-white/10 shadow-lg min-w-[120px] cursor-pointer hover:bg-black/30 transition-colors"
          >
            <div class="w-8 h-8 rounded-full bg-gray-500/80 flex items-center justify-center">
              <Users class="w-4 h-4 text-white" />
            </div>
            <div>
              <p class="font-medium text-sm">{{ person.name }}</p>
              <p class="text-xs text-gray-400">Manage</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div v-else class="h-full w-full flex items-center justify-center text-white bg-black">
    Home not found.
  </div>
</template>
