<script>
  import { onDestroy } from 'svelte';

  export let step = 0;

  let audioContext, gainNode, volume;
  let oscillators = [];

  onDestroy(() => {
    if (audioContext) audioContext.close();
  })


  $: {
    if (gainNode) gainNode.gain.value = volume || 0;
  }

  function createContext() {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    audioContext = new AudioContext();
  }

  function createGain() {
    gainNode = audioContext.createGain();
    gainNode.connect(audioContext.destination);
    volume = .2;
  }

  function createOscillator() {
    const oscillator = audioContext.createOscillator();

    oscillator.type = 'sine';
    oscillator.frequency.value = Math.random() * 1000;

    oscillator.connect(gainNode);
    oscillator.start(0);

    oscillators = [...oscillators, oscillator];
  }

  function stopOsc(index) {
    for (const [i, oscillator] of oscillators.entries()) {
      if (i !== index) continue;
      oscillator.stop(audioContext.currentTime);
      break;
    }

    oscillators = oscillators.filter((_, i) => i !== index);
  }

  new Image().src = '/images/audio-context_mdn.png';
  new Image().src = '/images/audio-context_html5rocks.png';
</script>

<style>
  div {
    text-align: center;
  }

  
  p {
    max-width: 500px;
    margin: 0 auto;
  }

  .arrow {
    font-size: 2em;
    padding: 5px;
  }

  .oscs {
    max-width: 400px;
    margin: 0 auto;
  }
  .osc {
    box-shadow: 1px 1px 3px 0 grey;
    padding: 10px;
    display: grid;
    grid-template-columns: 1fr auto;
    grid-gap: 10px;
  }
  .close {
    cursor: pointer;
    padding: 5px;
    border-radius: 50%;
    width: 20px;
    height: 20px;
  }
  .close:hover {
    background: #ddd;
  }

  .mdn {
    display: flex;
    flex-direction: column;
    max-width: 400px;
    text-align: left;
    margin: 0 auto;
    padding: 20px;
  }
  .mdn img {
    width: 400px;
  }
</style>

<div>
  <h1>Web Audio API</h1>
  
  {#if step < 2 }
    <p>"The Web Audio API provides a powerful and versatile system for controlling audio on the Web, allowing developers to choose audio sources, add effects to audio, create audio visualizations, apply spatial effects (such as panning) and much more."</p>
    <p>-MDN <a href="https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API">Web Audio API</a></p>

    {#if step > 0}
      <div class="mdn">
        <img src="/images/audio-context_mdn.png" alt="audio context diagram">
        <small>Image Credit: <a href="https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API">MDN</a></small>
      </div>
      <div class="mdn">
        <img src="/images/audio-context_html5rocks.png" alt="audio context diagram 2">
        <small>Image Credit: <a href="https://www.html5rocks.com/en/tutorials/webaudio/intro/">html5rocks</a></small>
      </div>
    {/if}
  {/if}

  {#if step > 1}
    <br />
    <button on:click={createContext}>Start Audio Context</button>
  {/if}


  {#if audioContext}
    <div class="arrow">↓</div>
    <button on:click={createGain}>Create Gain Node</button>
  {/if}


  {#if gainNode}
    <div>
      <span>Volume: {volume}</span>
      <br />
      <input type="range" min={0} max={.4} step={.01} bind:value={volume} />
    </div>

    <br />
    <div class="arrow">↓</div>

    <button on:click={createOscillator}>Create Random Oscillator</button>
  {/if}

  <div class="oscs">
    {#each oscillators as osc, i}
      <div class="osc">
        <span>freq: {Math.round(osc.frequency.value)}</span>
        <span class=close on:click={() => stopOsc(i)}>X</span>
      </div>
    {/each}
  </div>
</div>