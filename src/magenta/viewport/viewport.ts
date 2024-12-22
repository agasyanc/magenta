import DocumentNode from "../document/document";

export default class Viewport {
  zoom:number = 1;
  pan: {x:number,y:number} = {x:0,y:0};
  canvas: HTMLCanvasElement;
  constructor(private _document:DocumentNode) {
    const canvas = document.createElement('canvas');
    canvas.width = 800;
    canvas.height = 500;
    canvas.style.border = '1px solid black';
    this.canvas = canvas;
  }
  render() {
    const ctx = this.canvas.getContext('2d');
    if (!ctx) return;
    ctx.scale(this.zoom, this.zoom);
    ctx.translate(this.pan.x + this.canvas.width/2, this.pan.y + this.canvas.height/2);
    for (const child of this._document.children) {
      ctx.fillText(child.name, child.x, child.y)
    }
  }
  appendTo(elt: HTMLElement) {
    elt.appendChild(this.canvas);
  }
}