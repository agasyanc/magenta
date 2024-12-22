import DocumentNode from "../document/document_node";
import Renderers from "./renderers";

export default class Viewport {
  zoom:number = 1;
  pan: {x:number,y:number} = {x:0,y:0};
  canvas: HTMLCanvasElement;
  renderers = new Renderers();
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
    ctx.translate(this.pan.x + this.canvas.width/2, this.pan.y + this.canvas.height/2);
    ctx.scale(this.zoom, this.zoom);
    this.renderers.render(this._document, ctx);
  }
  appendTo(elt: HTMLElement) {
    elt.appendChild(this.canvas);
  }
}