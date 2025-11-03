// --- State classes ---
class PlayingState {
  play(player) {
    console.log("Already playing.");
  }
  pause(player) {
    console.log("Pausing...");
    player.setState(new PausedState());
  }
  stop(player) {
    console.log("Stopping playback.");
    player.setState(new StoppedState());
  }
}

class PausedState {
  play(player) {
    console.log("Resuming playback.");
    player.setState(new PlayingState());
  }
  pause(player) {
    console.log("Already paused.");
  }
  stop(player) {
    console.log("Stopping from pause.");
    player.setState(new StoppedState());
  }
}

class StoppedState {
  play(player) {
    console.log("Starting playback.");
    player.setState(new PlayingState());
  }
  pause() {
    console.log("Can't pause — not playing.");
  }
  stop() {
    console.log("Already stopped.");
  }
}

class MediaPlayer {
  constructor() {
    this.state = new StoppedState();
  }
  setState(state) {
    this.state = state;
  }
  play() {
    this.state.play(this);
  }
  pause() {
    this.state.pause(this);
  }
  stop() {
    this.state.stop(this);
  }
}

const player = new MediaPlayer();
player.play();
player.pause();
player.stop();
