import { defineStore } from 'pinia';
import { ref, computed, onUnmounted } from 'vue';
import { useIntervalFn } from '@vueuse/core';
import { useModalStore } from '@core/nui/store/modal';

// Interfaces
export type ClockTab = 'World Clock' | 'Alarm' | 'Stopwatch' | 'Timer';

export interface WorldClock {
  id: number;
  city: string;
  timezone: string;
}

export interface Alarm {
  id: number;
  time: string;
  label: string;
  isEnabled: boolean;
  sound: boolean;
  snooze: boolean;
}

export interface Lap {
    lapTime: number;
    totalTime: number;
}

export const useClockStore = defineStore('clock', () => {
  // --- STATE ---
  const activeTab = ref<ClockTab>('Alarm');
  const modalStore = useModalStore();

  // Timer State
  const selectedHours = ref(0);
  const selectedMinutes = ref(0);
  const selectedSeconds = ref(0);
  const remainingTime = ref(0);
  const initialDuration = ref(0);
  const isTimerActive = ref(false);
  const isTimerFinished = ref(false);
  const recentTimers = ref<number[]>([]);
  let timerInterval: ReturnType<typeof useIntervalFn> | null = null;

  // World Clock State
  const currentTime = ref(new Date());
  const worldClocks = ref<WorldClock[]>([
    { id: 1, city: 'Cupertino', timezone: 'America/Los_Angeles' },
    { id: 2, city: 'New York', timezone: 'America/New_York' },
    { id: 3, city: 'London', timezone: 'Europe/London' },
    { id: 4, city: 'Tokyo', timezone: 'Asia/Tokyo' },
  ]);
  useIntervalFn(() => {
    currentTime.value = new Date();
  }, 60000);

  // Alarm State
  const alarms = ref<Alarm[]>([
    { id: 1, time: '07:00', label: 'Wake Up', isEnabled: true, sound: true, snooze: true },
    { id: 2, time: '08:00', label: 'Work', isEnabled: false, sound: true, snooze: false },
  ]);
  const isAlarmEditing = ref(false);
  const editingAlarm = ref<Alarm | null>(null);
  const ringingAlarm = ref<Alarm | null>(null);
  const snoozedAlarm = ref<{ id: number; ringAt: Date } | null>(null);
  const lastRungTimestamps = ref<Record<number, number>>({});
  let alarmCheckInterval: ReturnType<typeof useIntervalFn> | null = null;

  // Stopwatch State
  const stopwatchTime = ref(0);
  const isStopwatchRunning = ref(false);
  const laps = ref<Lap[]>([]);
  let stopwatchInterval: ReturnType<typeof useIntervalFn> | null = null;
  const lastLapTime = ref(0);


  // --- COMPUTED ---
  const timerDuration = computed(() => {
    return selectedHours.value * 3600 + selectedMinutes.value * 60 + selectedSeconds.value;
  });

  const formatTime = (timeMs: number) => {
    const minutes = Math.floor(timeMs / 60000);
    const seconds = Math.floor((timeMs % 60000) / 1000);
    const centiseconds = Math.floor((timeMs % 1000) / 10);
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}.${centiseconds.toString().padStart(2, '0')}`;
  };

  const formattedStopwatchTime = computed(() => formatTime(stopwatchTime.value));

  const formattedLaps = computed(() => {
    if (laps.value.length < 2) {
      return laps.value.map((lap, index) => ({
        lapNumber: laps.value.length - index,
        formattedLapTime: formatTime(lap.lapTime),
        formattedTotalTime: formatTime(lap.totalTime),
        status: 'normal',
      }));
    }

    const lapTimes = laps.value.map(l => l.lapTime);
    const minLapTime = Math.min(...lapTimes);
    const maxLapTime = Math.max(...lapTimes);

    return laps.value.map((lap, index) => {
      let status: 'fastest' | 'slowest' | 'normal' = 'normal';
      if (laps.value.length > 1) {
        if (lap.lapTime === minLapTime) status = 'fastest';
        if (lap.lapTime === maxLapTime) status = 'slowest';
      }

      return {
        lapNumber: laps.value.length - index,
        formattedLapTime: formatTime(lap.lapTime),
        formattedTotalTime: formatTime(lap.totalTime),
        status,
      };
    });
  });

  // --- ACTIONS ---

  // Timer Actions
  const setHours = (h: number) => selectedHours.value = h;
  const setMinutes = (m: number) => selectedMinutes.value = m;
  const setSeconds = (s: number) => selectedSeconds.value = s;

  const startTimer = () => {
    if (timerDuration.value <= 0) return;
    isTimerFinished.value = false;
    initialDuration.value = timerDuration.value;
    remainingTime.value = timerDuration.value;
    isTimerActive.value = true;
    timerInterval = useIntervalFn(() => {
      if (remainingTime.value > 0) {
        remainingTime.value--;
      } else {
        finishTimer();
      }
    }, 1000);
  };

  const finishTimer = () => {
    timerInterval?.pause();
    isTimerActive.value = false;
    isTimerFinished.value = true;
    addRecentTimer(initialDuration.value);
  };

  const stopTimer = (saveToRecents = true) => {
    timerInterval?.pause();
    isTimerActive.value = false;
    isTimerFinished.value = false;
    if (saveToRecents) {
        addRecentTimer(initialDuration.value);
    }
    selectedHours.value = 0;
    selectedMinutes.value = 0;
    selectedSeconds.value = 0;
  };

  const cancelTimer = () => {
    timerInterval?.pause();
    isTimerActive.value = false;
    isTimerFinished.value = false;
    selectedHours.value = 0;
    selectedMinutes.value = 0;
    selectedSeconds.value = 0;
  };

  const handleStopFinishedTimer = () => {
    isTimerFinished.value = false;
    initialDuration.value = 0;
    selectedHours.value = 0;
    selectedMinutes.value = 0;
    selectedSeconds.value = 0;
  };

  const handleRestartFinishedTimer = () => {
    isTimerFinished.value = false;
    const h = Math.floor(initialDuration.value / 3600);
    const m = Math.floor((initialDuration.value % 3600) / 60);
    const s = initialDuration.value % 60;
    selectedHours.value = h;
    selectedMinutes.value = m;
    selectedSeconds.value = s;
    startTimer();
  };

  const addRecentTimer = (duration: number) => {
    if (duration > 0 && !recentTimers.value.includes(duration)) {
      recentTimers.value.unshift(duration);
      if (recentTimers.value.length > 5) {
        recentTimers.value.pop();
      }
    }
  };

  const removeRecentTimer = (index: number) => {
    recentTimers.value.splice(index, 1);
  };

  const startRecentTimer = (duration: number) => {
    const h = Math.floor(duration / 3600);
    const m = Math.floor((duration % 3600) / 60);
    const s = duration % 60;
    selectedHours.value = h;
    selectedMinutes.value = m;
    selectedSeconds.value = s;
    startTimer();
  };

  // Alarm Actions
  const toggleAlarm = (alarmId: number) => {
    const alarm = alarms.value.find(a => a.id === alarmId);
    if (alarm) alarm.isEnabled = !alarm.isEnabled;
  };

  const deleteAlarm = async (alarmId: number) => {
    const result = await modalStore.showModal({
      title: 'Delete Alarm',
      message: 'Are you sure you want to delete this alarm?',
      buttons: [
        { id: 'cancel', text: 'Cancel', style: 'cancel' },
        { id: 'delete', text: 'Delete', style: 'destructive' },
      ]
    });
    if (result === 'delete') {
      alarms.value = alarms.value.filter(a => a.id !== alarmId);
    }
    return result;
  };

  const toggleAlarmEditMode = () => {
    isAlarmEditing.value = !isAlarmEditing.value;
  };

  const addAlarm = (newAlarmData: Omit<Alarm, 'id' | 'isEnabled'>) => {
    const newId = alarms.value.length > 0 ? Math.max(...alarms.value.map(a => a.id)) + 1 : 1;
    alarms.value.unshift({ id: newId, ...newAlarmData, isEnabled: true });
  };

  const loadAlarmForEditing = (alarmId: number) => {
    const alarm = alarms.value.find(a => a.id === alarmId);
    editingAlarm.value = alarm ? { ...alarm } : null;
  };

  const updateAlarm = () => {
    if (!editingAlarm.value) return;
    const index = alarms.value.findIndex(a => a.id === editingAlarm.value!.id);
    if (index !== -1) alarms.value[index] = { ...editingAlarm.value };
    editingAlarm.value = null;
  };

  const clearEditingAlarm = () => {
    editingAlarm.value = null;
  };

  const checkAlarms = () => {
    if (ringingAlarm.value) return;

    const now = new Date();
    const nowMs = now.getTime();

    // 1. Check for snoozed alarm
    if (snoozedAlarm.value && now >= snoozedAlarm.value.ringAt) {
      const alarmToRing = alarms.value.find(a => a.id === snoozedAlarm.value!.id);
      if (alarmToRing) {
        ringingAlarm.value = alarmToRing;
        lastRungTimestamps.value[alarmToRing.id] = nowMs;
      }
      snoozedAlarm.value = null;
      return;
    }

    // 2. Check for regular alarms
    const currentTime = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;
    const alarmToRing = alarms.value.find(alarm => alarm.isEnabled && alarm.time === currentTime);

    if (alarmToRing) {
      const lastRung = lastRungTimestamps.value[alarmToRing.id];
      if (!lastRung || (nowMs - lastRung > 60000)) {
        ringingAlarm.value = alarmToRing;
        lastRungTimestamps.value[alarmToRing.id] = nowMs;
      }
    }
  };

  const stopRingingAlarm = () => {
    if (ringingAlarm.value) {
      if (snoozedAlarm.value?.id === ringingAlarm.value.id) {
        snoozedAlarm.value = null;
      }
      ringingAlarm.value = null;
    }
  };

  const snoozeAlarm = () => {
    if (ringingAlarm.value) {
      snoozedAlarm.value = {
        id: ringingAlarm.value.id,
        ringAt: new Date(Date.now() + 10 * 60 * 1000)
      };
      ringingAlarm.value = null;
    }
  };

  alarmCheckInterval = useIntervalFn(checkAlarms, 5000);

  // Stopwatch Actions
  const startStopwatch = () => {
    if (isStopwatchRunning.value) return;
    isStopwatchRunning.value = true;
    const startTime = Date.now() - stopwatchTime.value;
    stopwatchInterval = useIntervalFn(() => {
      stopwatchTime.value = Date.now() - startTime;
    }, 10);
  };

  const stopStopwatch = () => {
    isStopwatchRunning.value = false;
    stopwatchInterval?.pause();
  };

  const resetStopwatch = () => {
    stopStopwatch();
    stopwatchTime.value = 0;
    laps.value = [];
    lastLapTime.value = 0;
  };

  const recordLap = () => {
    if (!isStopwatchRunning.value) return;
    const currentTotalTime = stopwatchTime.value;
    const currentLapTime = currentTotalTime - lastLapTime.value;
    laps.value.unshift({ lapTime: currentLapTime, totalTime: currentTotalTime });
    lastLapTime.value = currentTotalTime;
  };

  // Cleanup
  onUnmounted(() => {
    timerInterval?.pause();
    stopwatchInterval?.pause();
    alarmCheckInterval?.pause();
  });

  return {
    activeTab,
    // Timer
    selectedHours, selectedMinutes, selectedSeconds, remainingTime, initialDuration, isTimerActive, recentTimers, timerDuration, isTimerFinished,
    setHours, setMinutes, setSeconds, startTimer, stopTimer, cancelTimer, removeRecentTimer, startRecentTimer, handleStopFinishedTimer, handleRestartFinishedTimer,
    // World Clock
    currentTime, worldClocks,
    // Alarm
    alarms, isAlarmEditing, editingAlarm, ringingAlarm,
    toggleAlarm, deleteAlarm, toggleAlarmEditMode, addAlarm, loadAlarmForEditing, updateAlarm, clearEditingAlarm, stopRingingAlarm, snoozeAlarm,
    // Stopwatch
    stopwatchTime, isStopwatchRunning, laps, formattedStopwatchTime, formattedLaps,
    startStopwatch, stopStopwatch, resetStopwatch, recordLap,
  };
});
