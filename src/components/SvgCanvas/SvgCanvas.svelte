<script>
  import Line from "./Line.svelte";
  import {
    lineStore, 
    canvasStore,
    moveNode,
    addNode,
    deleteNode,
    isNearNode,
    getMouseCanvasPos,
    getNearNode
  } from "./utils.js";

  let canvasEl;
  $: canvasStore.set(canvasEl);

  let isDragging = false;

  const randStr = Math.random()
    .toString(16)
    .slice(2, 8);
  const activeId = `active-line-${randStr}`;

  let infoPos = { x: 0, y: 0 };
  let showMenu = false;

  function handleClick(e) {
    isDragging = true;

    const mouse = getMouseCanvasPos(e);

    if (isNearNode(mouse)) return;

    addNode(e);
  }

  function closeMenu() {
    showMenu = false;
  }

  function handleMouseUp() {
    isDragging = false;
  }

  function handleHover(e) {
    if (!isDragging) return;

    moveNode(e);
  }

  function handleKeyDown(e) {
    if (showMenu) return;

    if (!["Delete", "Backspace"].includes(e.key)) return;

    deleteNode();
  }
</script>

<style>
  svg {
    background: #eeea;
    width: 100%;
    height: 100%;
    min-height: 400px;
  }

  div {
    position: relative;
    overflow: hidden;
  }
</style>

<svelte:window on:mouseup={handleMouseUp} on:keydown={handleKeyDown} />

<div class="canvas">
  <svg
    bind:this={canvasEl}
    on:contextmenu|preventDefault
    on:mousedown={handleClick}
    on:mousemove={handleHover}>

    <Line {...$lineStore} />

  </svg>
</div>
