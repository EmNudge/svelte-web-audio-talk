<script>
  export let slides = [];
  import { onMount } from "svelte";

  let slideStep = 0;
  let activeSlideNum = 0;
  $: component = slides[activeSlideNum].component;
  $: shouldStep = slides[activeSlideNum].shouldStep;
  $: slideSteps = slides[activeSlideNum].steps;

  function handleKeyDown(e) {
    if (!e.key.includes("Arrow")) return;

    if (e.key.includes("Right")) {
      if (shouldStep || slideStep < slideSteps) {
        slideStep++;
        return;
      }

      if (activeSlideNum + 1 >= slides.length) return;
      
      moveSlide()
    }

    if (e.key.includes("Left")) {
      if (slideStep > 0) {
        slideStep--;
        return;
      }

      if (activeSlideNum - 1 < 0) return;
      
      reverseSlide()
    }
  }

  function moveSlide() {
    activeSlideNum++;
    slideStep = 0;
  }
  function reverseSlide() {
    activeSlideNum--;
    const { steps } = slides[activeSlideNum];
    slideStep = steps ? steps - 1 : 0;
  }

  function stopStep() {
    shouldStep = false;
  }
</script>

<style>
  main {
    height: 100%;
    overflow: hidden;
    padding: 15px;
    box-sizing: border-box;
  }
</style>

<svelte:window on:keydown={handleKeyDown} />

<main>
  <svelte:component this={component} step={slideStep} on:done={stopStep} />
</main>
