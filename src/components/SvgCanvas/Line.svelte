<script>
  export let nodes;
  export let hue = 0;

  import Node from "./Node.svelte";
  import { activeNodeStore } from "./utils.js";

  $: lines = getLines(nodes);
  function getLines() {
    const lines = [];
    for (let i = 0; i < nodes.length - 1; i++) {
      const node = nodes[i];
      const nextNode = nodes[i + 1];
      lines.push({
        x1: `${node.x * 100}%`,
        y1: `${node.y * 100}%`,
        x2: `${nextNode.x * 100}%`,
        y2: `${nextNode.y * 100}%`
      });
    }
    return lines;
  }

  function onClick(nodeId) {
    activeNodeStore.set(nodeId);
  }
</script>

<style>
  line {
    stroke: hsl(var(--line-hue, 0), 50%, 65%);
    stroke-width: 3;
  }
</style>

<g style="--line-hue: {hue}">
  {#each lines as line}
    <line {...line} />
  {/each}
  {#each nodes as { x, y, id }}
    <Node
      x="{x * 100}%"
      y="{y * 100}%"
      on:mousedown={() => onClick(id)}
      isActive={$activeNodeStore === id} />
  {/each}
</g>
