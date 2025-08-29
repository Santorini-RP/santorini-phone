import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import { useIntervalFn } from '@vueuse/core';

export interface CallDetails {
  contactName: string;
  contactLabel: string;
  callType: 'voice' | 'video';
}

export const useCallStore = defineStore('call', () => {
  // State
  const isActive = ref(false); // Is the call UI visible?
  const isOngoing = ref(false); // Has the call been "answered" and the timer started?
  const contactName = ref('');
  const contactLabel = ref('');
  const callType = ref<'voice' | 'video'>('voice');
  const elapsedTime = ref(0); // in seconds

  // Toggled states for buttons
  const isMuted = ref(false);
  const isSpeakerOn = ref(false);
  const isVideoOn = ref(false);

  let timer: ReturnType<typeof useIntervalFn> | null = null;

  // Computed
  const formattedElapsedTime = computed(() => {
    const minutes = Math.floor(elapsedTime.value / 60);
    const seconds = elapsedTime.value % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  });

  const answerCall = () => {
    isOngoing.value = true;
    elapsedTime.value = 0;
    timer = useIntervalFn(() => {
      elapsedTime.value++;
    }, 1000);
  };

  // Actions
  const startCall = (details: CallDetails) => {
    // Reset state for a new call
    isActive.value = false;
    isOngoing.value = false;
    if (timer) timer.pause();
    timer = null;
    elapsedTime.value = 0;
    
    // Set new call details
    contactName.value = details.contactName;
    contactLabel.value = details.contactLabel;
    callType.value = details.callType;
    isMuted.value = false;
    isSpeakerOn.value = false;
    isVideoOn.value = false;
    
    // Show the UI
    isActive.value = true;

    // Simulate call connecting after a delay
    setTimeout(() => {
      if (isActive.value) { // Only answer if the call wasn't cancelled
        answerCall();
      }
    }, 2500); // 2.5 second delay to simulate ringing
  };

  const endCall = () => {
    isActive.value = false;
    isOngoing.value = false;
    if (timer) {
      timer.pause();
      timer = null;
    }
    // Reset details after the UI fades out
    setTimeout(() => {
      contactName.value = '';
      contactLabel.value = '';
      elapsedTime.value = 0;
    }, 300);
  };

  const toggleAction = (action: 'mute' | 'speaker' | 'video') => {
    switch (action) {
      case 'mute':
        isMuted.value = !isMuted.value;
        break;
      case 'speaker':
        isSpeakerOn.value = !isSpeakerOn.value;
        break;
      case 'video':
        isVideoOn.value = !isVideoOn.value;
        break;
    }
  };

  return {
    isActive,
    isOngoing,
    contactName,
    contactLabel,
    callType,
    elapsedTime,
    isMuted,
    isSpeakerOn,
    isVideoOn,
    formattedElapsedTime,
    startCall,
    answerCall,
    endCall,
    toggleAction,
  };
});
