export const playSound = (url: string) => {
  const audio: HTMLAudioElement = new Audio(url);
  audio.play();
};
