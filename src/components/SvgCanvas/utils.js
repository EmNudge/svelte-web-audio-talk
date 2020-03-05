import { get, writable } from "svelte/store";

export const lineStore = writable({
  hue: 0,
  nodes: []
});
export const activeNodeStore = writable(null);
export const canvasStore = writable(null);

const getIndexForId = (nodes, id) => {
  for (let i = 0; i < nodes.length; i++) {
    if (nodes[i].id === id) return i;
  }
  return -1;
};

const getPos = e => {
  const canvasEl = get(canvasStore);
  const { width, height, x: cx, y: cy } = canvasEl.getBoundingClientRect();

  const x = (e.clientX - cx) / width;
  const y = (e.clientY - cy) / height;

  return { x, y };
};

export function addNode(e) {
  lineStore.update(line => {
    const nodeId = Symbol();

    line.nodes.push({ ...getPos(e), id: nodeId });
    line.nodes.sort((a, b) => a.x - b.x);
    activeNodeStore.set(nodeId);

    return line;
  });
}

export function getNearNode({ x, y, dist = 5 }) {
  const line = get(lineStore);

  const canvasEl = get(canvasStore);
  const { width, height } = canvasEl.getBoundingClientRect();

  for (const node of line.nodes) {
    const nx = node.x * width;
    const ny = node.y * height;

    const xDist = Math.abs(nx - x);
    const yDist = Math.abs(ny - y);
    if (xDist > dist || yDist > dist) continue;

    return node;
  }
  

  return null;
}

export function isNearNode({ x, y, dist = 5 }) {
  return Boolean(getNearNode({ x, y, dist }));
}

export function moveNode(e) {
  lineStore.update(line => {
    const activeNode = get(activeNodeStore);

    const index = getIndexForId(line.nodes, activeNode);
    line.nodes[index] = { ...getPos(e), id: activeNode };
    line.nodes.sort((a, b) => a.x - b.x);

    return line;
  });
}

export function deleteNode() {
  lineStore.update(line => {
    const activeNode = get(activeNodeStore);

    const index = getIndexForId(line.nodes, activeNode);

    line.nodes.splice(index, 1);


    const currNode = line.nodes[index] || line.nodes[index - 1];
    if (currNode) {
      activeNodeStore.set(currNode.id);
    } else {
      activeNodeStore.set(null);
    }

    return line;
  });
}

export function getNodeInActiveLine(nodeId) {
  const line = get(linesStore);

  for (let i = 0; i < line.nodes.length; i++) {
    const { id } = line.nodes[i];
    if (id !== nodeId) continue;

    return line.nodes[i];
  }
  return null;
}

export function updateNodeInActiveLine(node) {
  lineStore.update(line => {

    for (let i = 0; i < line.nodes.length; i++) {
      const { id } = line.nodes[i];
      if (id !== node.id) continue;

      line.nodes[i] = node;
      break;
    }

    line.nodes.sort((a, b) => a.x - b.x);

    return line;
  });
}

// get mouse pos relative to svg pos
export function getMouseCanvasPos(e) {
  const canvasEl = get(canvasStore);
  const { x: offsetX, y: offsetY } = canvasEl.getBoundingClientRect();

  const mouse = { x: e.clientX - offsetX, y: e.clientY - offsetY };

  return mouse;
}
