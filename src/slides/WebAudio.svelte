<script>
  import { onDestroy } from 'svelte';

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
</style>

<div>
  <h1>Web Audio API</h1>
  
  <p>"The Web Audio API provides a powerful and versatile system for controlling audio on the Web, allowing developers to choose audio sources, add effects to audio, create audio visualizations, apply spatial effects (such as panning) and much more."</p>
  <p>-MDN <a href="https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API">Web Audio API</a></p>

  <br />
  <button on:click={createContext}>Start Audio Context</button>


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