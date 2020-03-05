<script>
  import { tick } from "svelte";

  let audio;

  let isPlaying = false;
  let xPos = 0;

  function toggle() {
    isPlaying = !isPlaying;

    if (isPlaying) {
      audio.play();
      updateXPos();
      return;
    }
    audio.pause();
  }

  function handleEnd() {
    isPlaying = false;
  }

  function updateXPos() {
    const dist = audio.currentTime / audio.duration;
    xPos = Math.round(100 * dist);

    if (!isPlaying) {
      if (audio.currentTime === audio.duration) xPos = 0;
      return;
    }

    requestAnimationFrame(updateXPos);
  }
</script>

<style>
  section {
    max-width: 500px;
    margin: 0 auto;
  }

  button {
    margin: 0 auto;
    display: block;
  }

  .images {
    max-width: 300px;
    margin: 0 auto;
    margin-top: 40px;
  }
  .image {
    position: relative;
  }
  img {
    width: 100%;
    height: 200px;
  }

  .line {
    position: absolute;
    top: 0;
    left: 0;
    width: 2px;
    height: 100%;
    background: rgb(115, 115, 204);
  }
</style>

<audio src="/audio/where-natural.wav" bind:this={audio} on:ended={handleEnd} />

<section>
  <h1>Spectrogram</h1>
  <p>
    A spectrogram is a frequency representation of an audio signal rather than
    strictly an amplitude one.
  </p>

  <small>
    source:
    <a
      href="https://haskinslabs.org/about-us/features-and-demos/sinewave-synthesis/s1spectro">
      Haskins Labs
    </a>
  </small>

  <button on:click={toggle}>{!isPlaying ? 'Play' : 'Pause'} Audio</button>

  <div class="images">
    <small>Waveform</small>
    <div class="image">
      <img src="/images/waveform.png" alt="waveform" />
      <div class="line" style="left: {xPos}%" />
    </div>
    <small>Spectrogram</small>
    <div class="image">
      <img src="/images/spectrogram.jpg" alt="waveform" />
      <div class="line" style="left: {xPos}%" />
    </div>
  </div>
</section>
