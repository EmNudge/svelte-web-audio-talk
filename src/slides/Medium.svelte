<script>
  import { slide, fly, fade } from "svelte/transition";
  import { createEventDispatcher } from "svelte";

  const dispatch = createEventDispatcher();

  export let step = 0;

  const points = [
    "Mature UI Toolkit",
    "Small Bundle Size",
    "No Active Download",
    "(non-blocking) Available APIs",
    "Write Once, Run Anywhere™",
    "<b>Java</b>Script"
  ];
  $: activePoints = points.slice(0, step);

  // this lets us move to the next slide
  $: if (step > 6) dispatch("done");
</script>

<style>
  div {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  section {
    width: 400px;
  }

  ul {
    font-size: 1.4em;
    width: 100%;
  }
  li {
    padding: 5px;
  }
</style>

<div>
  <h1>The Web As A Medium</h1>
  <br />
  <br />

  <h3>Why build for the web and not native?</h3>

  <section>
    <ul>
      {#each activePoints as point}
        <li in:fade|local={{ duration: 200 }}>{@html point}</li>
      {/each}
    </ul>
  </section>
</div>
