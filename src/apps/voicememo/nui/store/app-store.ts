import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { useIntervalFn } from '@vueuse/core';
import { useModalStore } from '@core/nui/store/modal';

export interface VoiceMemo {
  id: number;
  title: string;
  time: string;
  duration: string;
}

export const useVoicememoStore = defineStore('voicememo', () => {
  const modalStore = useModalStore();
  const memos = ref<VoiceMemo[]>([
    { id: 1, title: 'Voice Memo 1', time: '07:19', duration: '0:01' },
    { id: 2, title: 'Birds Chirping', time: '04:19', duration: '0:22' },
  ]);

  const searchQuery = ref('');
  const isRecording = ref(false);
  const elapsedTime = ref(0); // in seconds
  let timer: ReturnType<typeof useIntervalFn> | null = null;
  
  // Playback State
  const selectedMemoId = ref<number | null>(null);
  const isPlaying = ref(false);
  const playbackProgress = ref(0); // 0 to 100

  const filteredMemos = computed(() => {
    if (!searchQuery.value) {
      return memos.value;
    }
    const query = searchQuery.value.toLowerCase();
    return memos.value.filter(memo =>
      memo.title.toLowerCase().includes(query)
    );
  });

  const formattedElapsedTime = computed(() => {
    const minutes = Math.floor(elapsedTime.value / 60);
    const seconds = elapsedTime.value % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  });

  const startRecording = () => {
    isRecording.value = true;
    elapsedTime.value = 0;
    timer = useIntervalFn(() => {
      elapsedTime.value++;
    }, 1000);
  };

  const stopRecording = () => {
    isRecording.value = false;
    timer?.pause();

    if (elapsedTime.value > 0) {
      const newMemo: VoiceMemo = {
        id: Date.now(),
        title: `New Recording ${memos.value.length + 1}`,
        time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
        duration: formattedElapsedTime.value,
      };
      memos.value.unshift(newMemo);
    } else {
      modalStore.showModal({
        title: 'Empty Recording',
        message: "You can't store a recording without any audio",
        buttons: [
          { id: 'ok', text: 'OK', style: 'default' }
        ]
      });
    }
    elapsedTime.value = 0;
  };

  const toggleRecording = () => {
    if (isRecording.value) {
      stopRecording();
    } else {
      startRecording();
    }
  };

  function selectMemo(memoId: number) {
    if (selectedMemoId.value === memoId) {
      selectedMemoId.value = null; // Deselect if clicking the same memo
    } else {
      selectedMemoId.value = memoId;
    }
    isPlaying.value = false;
    playbackProgress.value = 0;
  }

  const togglePlayback = () => {
    if (selectedMemoId.value === null) return;
    isPlaying.value = !isPlaying.value;
  };

  const updateMemoTitle = (memoId: number, newTitle: string) => {
    const memo = memos.value.find(m => m.id === memoId);
    if (memo && newTitle.trim()) {
      memo.title = newTitle.trim();
    }
  };

  const deleteMemo = async (memoId: number) => {
    const result = await modalStore.showModal({
        title: 'Delete voice memo',
        message: 'Are you sure you want to delete this\nvoice memo?',
        buttons: [
            { id: 'cancel', text: 'Cancel', style: 'cancel' },
            { id: 'proceed', text: 'Proceed', style: 'destructive' },
        ]
    });

    if (result.buttonId === 'proceed') {
        memos.value = memos.value.filter(memo => memo.id !== memoId);
        if (selectedMemoId.value === memoId) {
            selectedMemoId.value = null;
            isPlaying.value = false;
            playbackProgress.value = 0;
        }
    }
  };

  return {
    memos,
    searchQuery,
    filteredMemos,
    isRecording,
    formattedElapsedTime,
    toggleRecording,
    selectedMemoId,
    isPlaying,
    playbackProgress,
    selectMemo,
    togglePlayback,
    updateMemoTitle,
    deleteMemo,
  };
});
