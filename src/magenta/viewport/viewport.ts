import DocumentNode from "../document/document_node";
import Renderers from "./renderers";

export default class Viewport {
  zoom: number = 1;
  pan: { x: number; y: number } = { x: 0, y: 0 };
  canvas: HTMLCanvasElement;
  renderers = new Renderers();
  private pointer: { x: number; y: number } = { x: 0, y: 0 };

  constructor(private _document: DocumentNode) {
    const canvas = document.createElement("canvas");
    canvas.style.width = "800px";
    canvas.style.height = "500px";
    canvas.width = 800 * devicePixelRatio;
    canvas.height = 500 * devicePixelRatio;
    canvas.style.border = "1px solid black";
    this.canvas = canvas;
    this.setupEvents();
  }
  private setupEvents() {
    this.canvas.addEventListener("wheel", (e: WheelEvent) => {
      e.preventDefault();
      const oldZoom = this.zoom;
      let newZoom = this.zoom;
      if (e.metaKey) {
        const zoomFactor = 1.05;
        if (e.deltaY < 0) {
          newZoom *= zoomFactor; // Увеличиваем
        } else {
          newZoom /= zoomFactor; // Уменьшаем
        }
        newZoom = Math.max(0.1, Math.min(10, newZoom));
        if (newZoom !== oldZoom) {
          const mouseXCentered = this.pointer.x - this.canvas.width / 2;
          const mouseYCentered = this.pointer.y - this.canvas.height / 2;

          const worldXOld =
            (mouseXCentered - this.pan.x) / (oldZoom * devicePixelRatio);
          const worldYOld =
            (mouseYCentered - this.pan.y) / (oldZoom * devicePixelRatio);

          this.pan.x =
            mouseXCentered - worldXOld * (newZoom * devicePixelRatio);
          this.pan.y =
            mouseYCentered - worldYOld * (newZoom * devicePixelRatio);

          this.zoom = newZoom;
        }
      } else {
        this.pan.x -= e.deltaX;
        this.pan.y -= e.deltaY;
      }
      this.render();
    });

    this.canvas.addEventListener("pointermove", (e: PointerEvent) => {
      const rect = this.canvas.getBoundingClientRect();
      const clientX = e.clientX - rect.left;
      const clientY = e.clientY - rect.top;
      const scaleX = this.canvas.width / rect.width;
      const scaleY = this.canvas.height / rect.height;
      this.pointer.x = clientX * scaleX;
      this.pointer.y = clientY * scaleY;
      if (this.canvas.hasPointerCapture(e.pointerId)) {
        this.pan.x += e.movementX * devicePixelRatio;
        this.pan.y += e.movementY * devicePixelRatio;
        this.render();
      }
    });
    this.canvas.addEventListener("pointerdown", (e: PointerEvent) => {
      this.canvas.setPointerCapture(e.pointerId);
    });
    this.canvas.addEventListener("pointerup", (e: PointerEvent) => {
      this.canvas.releasePointerCapture(e.pointerId);
    });
  }
  render() {
    const ctx = this.canvas.getContext("2d");
    if (!ctx) return;
    ctx.resetTransform();
    ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    ctx.translate(
      this.pan.x + this.canvas.width / 2,
      this.pan.y + this.canvas.height / 2,
    );
    ctx.scale(this.zoom * devicePixelRatio, this.zoom * devicePixelRatio);
    this.renderers.render(this._document, ctx);
  }
  appendTo(elt: HTMLElement) {
    elt.appendChild(this.canvas);
  }
}
