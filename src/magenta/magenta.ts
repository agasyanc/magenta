import DocumentNode from "./document/document";
import Viewport from "./viewport/viewport";

export default class Magenta {
  root: DocumentNode;
  viewport: Viewport;
  constructor() {
    console.log('im magenta');
    this.root = new DocumentNode();
    this.viewport = new Viewport(this.root);
    
    this.viewport.render()
  }

  appendTo(elt: HTMLElement) {
    this.viewport.appendTo(elt);
  }
}