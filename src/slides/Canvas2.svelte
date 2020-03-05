<script>
  import SvgCanvas from '../components/SvgCanvas/SvgCanvas.svelte';
  import { onMount } from 'svelte';

  import Highlight from 'svelte-highlight';
  import { javascript } from 'svelte-highlight/languages';
  import 'svelte-highlight/styles/dracula.css';

  let code;
  onMount(async () => {
    const res = await fetch('/code/svgCanvas.txt');
    code = await res.text();
  });
  
</script>

<style>
  .code {
    overflow: scroll;
    height: 45%;
  }
</style>

<h1>Canvas using 2D Canvas API</h1>

<SvgCanvas />

<div class="code">
  <Highlight language={javascript} {code} />
</div>