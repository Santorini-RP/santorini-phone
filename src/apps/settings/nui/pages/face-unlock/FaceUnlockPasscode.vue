<script setup lang="ts">
import { useRouter } from 'vue-router';
import { useSystemStore } from '@core/nui/store/system';
import PageLayout from '@core/nui/components/PageLayout.vue';

const systemStore = useSystemStore();
const router = useRouter();

const handleTogglePasscode = () => {
  if (systemStore.passcodeEnabled) {
    // If ON, navigate to verification screen to turn it OFF
    router.push({ name: 'settings-face-unlock-enter-passcode', query: { action: 'turn-off' } });
  } else {
    // If OFF, navigate to a screen to set a NEW passcode
    // This flow is more complex (enter new, confirm new)
    alert('Setting a new passcode is not yet implemented.');
  }
};

const handleChangePasscode = () => {
  if (systemStore.passcodeEnabled) {
    // Navigate to verification screen to begin the change process
    router.push({ name: 'settings-face-unlock-enter-passcode', query: { action: 'change' } });
  }
};
</script>

<template>
  <PageLayout page-title="Face Unlock & Passcode" previous-title="Settings">
    <div class="p-4 space-y-6">
      <!-- Face Unlock Section -->
      <div>
        <h3 class="text-xs uppercase text-gray-500 dark:text-gray-400 font-semibold px-4 mb-2">Face Unlock</h3>
        <div class="bg-white dark:bg-ios-dark-card rounded-lg mx-2">
          <div class="p-3 flex justify-between items-center">
            <span class="font-medium text-black dark:text-white">Enable Face Unlock</span>
            <button
              @click="systemStore.toggleFaceUnlock()"
              class="w-12 h-7 rounded-full transition-colors duration-200 flex items-center p-0.5"
              :class="systemStore.faceUnlockEnabled ? 'bg-green-500' : 'bg-gray-300 dark:bg-gray-600'"
            >
              <span
                class="w-6 h-6 bg-white rounded-full shadow-md transform transition-transform duration-200"
                :class="{ 'translate-x-5': systemStore.faceUnlockEnabled }"
              ></span>
            </button>
          </div>
        </div>
      </div>

      <!-- PIN Code Section -->
      <div>
        <h3 class="text-xs uppercase text-gray-500 dark:text-gray-400 font-semibold px-4 mb-2">PIN Code</h3>
        <div class="bg-white dark:bg-ios-dark-card rounded-lg mx-2">
          <!-- Turn Passcode On/Off -->
          <div
            @click="handleTogglePasscode"
            class="p-3 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors border-b border-gray-200 dark:border-gray-700/60"
          >
            <p class="text-blue-500">
              {{ systemStore.passcodeEnabled ? 'Turn Passcode Off' : 'Turn Passcode On' }}
            </p>
          </div>
          <!-- Change Passcode -->
          <div
            @click="handleChangePasscode"
            class="p-3"
            :class="{
              'cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors': systemStore.passcodeEnabled,
              'opacity-50 cursor-not-allowed': !systemStore.passcodeEnabled
            }"
          >
            <p :class="systemStore.passcodeEnabled ? 'text-blue-500' : 'text-gray-400 dark:text-gray-600'">
              Change Passcode
            </p>
          </div>
        </div>
      </div>
    </div>
  </PageLayout>
</template>
