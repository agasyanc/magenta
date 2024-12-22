import BaseNode from "../document/base_node";
import DocumentNode from "../document/document_node"
import PageNode from "../document/page_node";

export default class Renderers {
  renderers: Map<string, {type:Function, instance:Renderer<any>}> = new Map();
  default_renderer:Renderer<BaseNode> = new DefaultRenderer();
  constructor() {
    this.register(DocumentNode, new DocumentNodeRenderer());
    this.register(PageNode, new PageNodeRenderer());
    
  }
  register(type:Function, renderer:Renderer<any>){
    this.renderers.set(type.name, {type, instance:renderer});
  }
  get(type:Function):Renderer<any>{
    const renderer = this.renderers.get(type.name);
    if (renderer) return renderer.instance;
    return this.default_renderer;
  }
  
  render(node:BaseNode, ctx:CanvasRenderingContext2D){
    const renderer = this.get(node.constructor);
    renderer.render(node, ctx, this);
  }
}

class DefaultRenderer implements Renderer<BaseNode> {
  render(node: BaseNode, ctx: CanvasRenderingContext2D, renderers:Renderers): void {
      console.log('default renderer');
  }
}

class DocumentNodeRenderer implements Renderer<DocumentNode>{
  render(node: DocumentNode, ctx: CanvasRenderingContext2D, renderers:Renderers): void {
    console.log('doc render');
    for (const child of node.children) {
      renderers.render(child, ctx)
    }
  }
}
class PageNodeRenderer implements Renderer<PageNode>{
  render(node: PageNode, ctx: CanvasRenderingContext2D, renderers:Renderers): void {
    console.log('page render');
    ctx.fillStyle = 'red';
    ctx.strokeRect(node.x, node.y, node.width, node.height);
    // for (const child of node.children) {
    //   renderers.render(child, ctx)
    // }
  }
}

interface Renderer<T>{
  render(node:T, ctx:CanvasRenderingContext2D, renderers:Renderers):void;
}