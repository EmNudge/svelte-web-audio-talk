<script>
  import { onMount } from "svelte";
  import { Canvas, line, activeNode, canvasStore } from "../utils/canvas.js";

  let canvasContainer;
  let canvas;

  onMount(() => {
    const { width, height } = window.getComputedStyle(canvasContainer);
    $canvasStore.width = parseInt(width);
    $canvasStore.height = parseInt(height);
    canvas = new Canvas($canvasStore);
    canvas.draw();
  });

  const getPos = e => ({ x: e.offsetX, y: e.offsetY });

  function handleClick(e) {
    canvas.onClick(getPos(e));
    canvas.draw();
  }
  function handleHover(e) {
    canvas.handleHover(getPos(e));
    canvas.draw();
  }

  function handleMouseUp(e) {
    canvas.onRelease();
  }

  function handleKeyDown(e) {
    const isDelete = ['Delete', 'Backspace'].includes(e.key)
    if (!isDelete || !$activeNode) return;

    let index = 0;
    for (const [i, node] of $line.nodes.entries()) {
      if (node.id !== $activeNode) continue;
      index = i;
    }

    // either the one after or before
    const nextNode = $line.nodes[index + 1] || $line.nodes[index - 1];

    // if this is the last node, set the new active to null
    $activeNode = nextNode ? nextNode.id : null;

    // remove active node
    $line.nodes.splice(index, 1);
    $line = $line;
    
    canvas.draw();
  }
</script>

<style>
  canvas {
    box-shadow: inset 1px 1px 4px 0px #00000012;
    background: #eeea;
    min-height: 400px;
  }
</style>

<svelte:window on:keydown={handleKeyDown} on:mouseup={handleMouseUp} />

<div bind:this={canvasContainer}>
  <canvas
    bind:this={$canvasStore}
    on:mousedown={handleClick}
    on:mousemove={handleHover} />
</div>
