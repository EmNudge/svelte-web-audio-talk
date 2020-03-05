<!-- This has super bad performance. I would do something else, but I'm coding this the day of the talk, so there's no time -->

<script>
  export let text = '';

  import { fly } from 'svelte/transition'
</script>

<style>
  span {
    display: inline-block;
  }
  .spacer {
    width: 10px;
  }
</style>

{#each text.split('') as char, i}
  {#if char === ' '}
    <span class="spacer"></span>
  {:else}
    <span in:fly={{ y: 100, duration: 100 + i * 50 }}>{char}</span>
  {/if}
{/each}