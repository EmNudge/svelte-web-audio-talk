import { writable, get } from 'svelte/store';

export const line = writable({ hue: 0, nodes: [] });
export const activeNode = writable(null);

const NODE_SIZE = 8;
const LINE_WIDTH = 4;

export class Canvas {
	constructor(canvas) {
		this.canvas = canvas;
		this.ctx = canvas.getContext('2d');

		const { width, height } = window.getComputedStyle(canvas);
		this.width = parseInt(width);
		this.height = parseInt(height);

		// initialized, regardless of params
		this.draggedId = null;
		this.mousePos = { x: 0, y: 0 };
	}

	draw() {
		this.ctx.clearRect(0, 0, this.width, this.width);

    this.drawLine();
	}

	handleHover(mousePos) {
		this.mousePos = mousePos;
		if (this.draggedId === null) return;
		if (this.isColliding({ ...mousePos, id: this.draggedId })) return;

		const newNodes = get(line).nodes.map((keyframe) => {
			if (this.draggedId !== keyframe.id) return keyframe;

			// if dragging, change the dragged keyframe's position to mouse pos
			return { ...mousePos, id: keyframe.id };
    });
    
    this.sortNodes(newNodes)
	}

	onClick(mousePos) {
		for (const node of get(line).nodes) {
			if (this.getDist(mousePos, node) >= NODE_SIZE) continue;

      this.draggedId = node.id
      activeNode.set(node.id)
			return;
		}

		this.addNode(mousePos);
	}

	addNode(pos) {
		const node = { ...pos, id: Symbol() };

		this.sortNodes([...get(line).nodes, node]);

    this.draggedId = node.id
    activeNode.set(node.id)
	}

	onRelease() {
		this.draggedId = null;
	}

	// sort nodes by ascending x position
	sortNodes(oldNodes) {
    const nodes = oldNodes.sort((pos1, pos2) => pos1.x - pos2.x);
    
    line.set({ hue: get(line).hue, nodes });
	}

	isColliding(node) {
		return get(line).nodes.some((nd) => {
			return Math.abs(node.x - nd.x) < 2 && node.id !== nd.id;
		});
  }

  getDist({ x, y }, other) {
    const distX = x - other.x;
    const distY = y - other.y;
    return Math.sqrt(distX**2 + distY**2);
  }
  
  drawLine() {
    const { hue, nodes } = get(line);
    const activeId = get(activeNode);

    const nodeColor = `hsl(${hue}, 50%, 50%)`;
    const HoverNodeColor = `hsl(${hue}, 50%, 60%)`;
    const lineColor = `hsl(${hue}, 50%, 70%)`;
  
    // draw lines
    this.ctx.strokeStyle = lineColor;
    this.ctx.lineWidth = LINE_WIDTH;
  
    for (let i = 1; i < nodes.length; i++) {
      const pos = nodes[i];
      const prevPos = nodes[i - 1];
  
      this.ctx.beginPath();
      this.ctx.moveTo(prevPos.x, prevPos.y);
      this.ctx.lineWidth = LINE_WIDTH;
  
      this.ctx.lineTo(pos.x, pos.y);
      this.ctx.stroke();
    }
  
    // draw nodes
    for (const node of nodes) {
      const isHovering = this.getDist(this.mousePos, node) < NODE_SIZE;
      const isSelected = node.id === activeId;
    
      this.ctx.beginPath();
      this.ctx.fillStyle = isHovering ? HoverNodeColor : nodeColor;
      this.ctx.arc(node.x, node.y, NODE_SIZE, 0, 2 * Math.PI);
      this.ctx.fill();
    
      this.ctx.beginPath();
      this.ctx.fillStyle = isSelected ? "black" : "white";
      this.ctx.arc(node.x, node.y, NODE_SIZE/2, 0, 2 * Math.PI);
      this.ctx.fill();
    }
  }
}