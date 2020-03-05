<script>
  import Slider from "./components/Slider.svelte";
	import Intro from './slides/Intro.svelte';
	import Medium from './slides/Medium.svelte';
	import Phonetics from './slides/Phonetics.svelte'
	import WebAudio from './slides/WebAudio.svelte'
	import WebAudioLing from './slides/WebAudioLing.svelte'
	import Canvas from './slides/Canvas.svelte'
	import Canvas2 from './slides/Canvas2.svelte'
	import Spectrogram1 from './slides/Spectrogram1.svelte'
	import Spectrogram2 from './slides/Spectrogram2.svelte'
	import Replicator from './slides/Replicator.svelte'

  let slides = [
		{ component: Intro, shouldStep: true },
		// { component: Medium, shouldStep: true }, // I don't think this is relevant.
		{ component: Phonetics },
		{ component: WebAudio, steps: 2 },
		{ component: WebAudioLing },
		{ component: Spectrogram1 },
		{ component: Spectrogram2 },
		{ component: Canvas },
		{ component: Canvas2 },
		{ component: Replicator },
	];
</script>

<style>
  :global(body) {
    padding: 0;
    height: 100vh;
  }
</style>


<Slider {slides} />
