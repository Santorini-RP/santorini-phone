// src/core/nui/services/audioService.ts

/**
 * A simple service to manage audio playback for previews.
 * Ensures only one sound plays at a time and handles stopping.
 */
class AudioService {
  private currentAudio: HTMLAudioElement | null = null;
  private playbackTimeout: number | null = null;

  /**
   * Plays a short preview of a sound file.
   * If another sound is playing, it will be stopped first.
   * The sound will automatically stop after a few seconds.
   * @param path - The public path to the audio file (e.g., /sounds/ringtone.mp3)
   * @param duration - The duration in milliseconds to play the sound. Defaults to 4000ms.
   */
  public playTonePreview(path: string, duration: number = 4000): void {
    this.stopCurrentSound();

    try {
      this.currentAudio = new Audio(path);
      this.currentAudio.play().catch(err => {
        console.warn(`Could not play audio preview for "${path}". User may need to interact with the page first.`, err);
      });

      // Automatically stop the sound after the specified duration
      this.playbackTimeout = window.setTimeout(() => {
        this.stopCurrentSound();
      }, duration);

    } catch (error) {
      console.error(`Error playing audio from path: ${path}`, error);
    }
  }

  /**
   * Stops any currently playing audio preview.
   */
  public stopCurrentSound(): void {
    if (this.playbackTimeout) {
      clearTimeout(this.playbackTimeout);
      this.playbackTimeout = null;
    }

    if (this.currentAudio) {
      this.currentAudio.pause();
      this.currentAudio.currentTime = 0;
      this.currentAudio = null;
    }
  }
}

// Export a singleton instance of the service
export const audioService = new AudioService();
