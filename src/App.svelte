<script>
  import Slider from "./components/Slider.svelte";
	import Intro from './slides/Intro.svelte';
	import Medium from './slides/Medium.svelte';
	import Phonetics from './slides/Phonetics.svelte'
	import WebAudio from './slides/WebAudio.svelte'
	import WebAudioLing from './slides/WebAudioLing.svelte'
	import Canvas from './slides/Canvas.svelte'
	import Canvas2 from './slides/Canvas2.svelte'

  let slides = [
		{ component: Intro, shouldStep: true },
		{ component: Medium, shouldStep: true },
		{ component: Phonetics },
		{ component: WebAudio, steps: 2 },
		{ component: WebAudioLing },
		{ component: Canvas },
		{ component: Canvas2 },
	];
</script>

<style>
  :global(body) {
    padding: 0;
    height: 100vh;
  }
</style>


<Slider {slides} />
