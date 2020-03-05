<script>
  import { fly, fade } from 'svelte/transition';
  import { createEventDispatcher } from 'svelte';
  import WordIntro from '../components/WordIntro.svelte'

  const dispatch = createEventDispatcher()
  
  export let step = 0;

  const points = [
    { title: 'Phonetics', desc: 'To do with transcribing speech sounds' },
    { title: 'Phonology', desc: 'To do with a language\'s word/sound rules' },
    { title: 'Spectrogram Analysis', desc: 'Frequency-based waveforms' }
  ];
  $: activePoints = points.slice(0, step - 2);

  // this lets us move to the next slide
  $: if (step > 5) dispatch('done');

  new Image().src = '/images/calvin.png';
  new Image().src = '/images/temp.png';
</script>

<style>
  div {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  img {
    width: 150px;
  }

  .content {
    text-align: left;
  }

  .distinction {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 80px;
    max-width: 800px;
    margin: 0 auto;
  }

  h2 {
    font-weight: 500;
  }

  .content > ul {
    font-size: 1.5em;
    min-width: 500px;
  }
  .content > ul > li {
    padding: 10px;
  }
</style>

<div>
  <h1>
    <WordIntro text='Hello! My name is Calvin' />
  </h1>

  {#if step > 0}
    <div class=distinction>
      <div in:fly="{{ y: 100, duration: 300 }}">
        <h2>Spelled like the character</h2>
        <img alt="Calvin" src="/images/calvin.png" in:fade />
      </div>

      <div in:fly="{{ y: 100, duration: 300, delay: 50 }}">
        <h2 style="color: red">Not the temperature</h2>
        <img alt="Calvin" src="/images/temp.png" in:fade />
      </div>
    </div>
  {/if}

  <br />
  <br />
  
  {#if step > 1}
    <div class=content>
      <h2>I work on educational Linguistics web applications</h2>
      <ul>
        {#each activePoints as point}
          <li>{point.title}</li>
          <ul in:fly|local="{{ x: -50, duration: 200 }}">
            <li>{point.desc}</li>
          </ul>
        {/each}
      </ul>
    </div>
  {/if}

</div>
