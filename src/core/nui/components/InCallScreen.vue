<script setup lang="ts">
import { markRaw } from 'vue';
import { useCallStore } from '../store/callStore';
import CallActionButton from './call/CallActionButton.vue';
import EndCallButton from './call/EndCallButton.vue';
import { Volume2, Mic, MicOff, Video, VideoOff, Plus, AppWindow, User } from 'lucide-vue-next';

const callStore = useCallStore();

const callActions = [
  { id: 'mute', icon: Mic, iconOff: MicOff, label: 'Mute', action: () => callStore.toggleAction('mute'), stateKey: 'isMuted' },
  { id: 'keypad', icon: AppWindow, label: 'Keypad', action: () => alert('Keypad clicked') },
  { id: 'speaker', icon: Volume2, label: 'Speaker', action: () => callStore.toggleAction('speaker'), stateKey: 'isSpeakerOn' },
  { id: 'add', icon: Plus, label: 'Add call', action: () => alert('Add call clicked') },
  { id: 'video', icon: Video, iconOff: VideoOff, label: 'Video', action: () => callStore.toggleAction('video'), stateKey: 'isVideoOn' },
  { id: 'contacts', icon: User, label: 'Contacts', action: () => alert('Contacts clicked') },
];
</script>

<template>
  <transition name="fade">
    <div v-if="callStore.isActive" class="absolute inset-0 z-[150] flex flex-col justify-between text-white font-sans">
      <!-- Background is now transparent to show wallpaper -->
      <div class="absolute inset-0"></div>

      <!-- Main Content -->
      <div class="relative z-10 flex flex-col flex-1 items-center p-8 pt-24">
        <!-- Contact Info -->
        <div class="text-center mb-auto">
          <h1 class="text-4xl font-semibold [text-shadow:0_2px_4px_rgba(0,0,0,0.5)]">{{ callStore.contactName }}</h1>
          <p v-if="!callStore.isOngoing" class="text-lg opacity-80 mt-1 [text-shadow:0_1px_2px_rgba(0,0,0,0.5)]">{{ callStore.contactLabel }}</p>
          <p v-else class="text-lg opacity-80 mt-1 [text-shadow:0_1px_2px_rgba(0,0,0,0.5)]">{{ callStore.formattedElapsedTime }}</p>
        </div>

        <!-- Action Buttons in a Glass Box -->
        <div class="w-full max-w-xs bg-white/15 dark:bg-black/20 backdrop-blur-xl rounded-2xl p-4">
            <div class="grid grid-cols-3 gap-x-6 gap-y-6">
                <CallActionButton
                    v-for="item in callActions"
                    :key="item.id"
                    :icon="markRaw(item.stateKey && callStore[item.stateKey] ? (item.iconOff || item.icon) : item.icon)"
                    :label="item.label"
                    :is-active="item.stateKey ? callStore[item.stateKey] : false"
                    @click="item.action"
                />
            </div>
        </div>

        <!-- End Call Button -->
        <div class="mt-auto mb-8">
          <EndCallButton @click="callStore.endCall()" />
        </div>
      </div>
    </div>
  </transition>
</template>

<style scoped>
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
</style>
