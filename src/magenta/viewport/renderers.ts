import BaseNode from "../document/base_node";
import DocumentNode from "../document/document_node"
import PageNode from "../document/page_node";
import TextNode from "../document/text_node";

export default class Renderers {
  renderers: Map<string, {type:Function, instance:Renderer<any>}> = new Map();
  default_renderer:Renderer<BaseNode> = new DefaultRenderer();
  constructor() {
    this.register(DocumentNode, new DocumentNodeRenderer());
    this.register(PageNode, new PageNodeRenderer());
    this.register(TextNode, new TextNodeRenderer());
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
    ctx.strokeStyle = 'red';
    ctx.strokeRect(node.x, node.y, node.width, node.height);
    for (const child of node.children) {
      renderers.render(child, ctx)
    }
  }
}
class TextNodeRenderer implements Renderer<TextNode>{
  render(node: TextNode, ctx: CanvasRenderingContext2D, renderers: Renderers): void {
    ctx.strokeStyle = 'green';
    ctx.strokeRect(node.x, node.y, node.width, node.interlineage*node.lines.length - node.interlineage);

    ctx.fillStyle = 'black';
    ctx.textBaseline = "top";
    ctx.font = node.font_size + "px Arial";
    ctx.translate(0, node.font_size)
    
    node.font.setScale(node.font_size, -node.font_size)
    for (let i = 0; i < node.lines.length; i++) {
      const line = node.lines[i];
      const gi = node.font.shape(line, node.features)
      ctx.save()
      for (let j = 0; j < gi.length; j++) {
        const glyph = gi[j];
        const path = node.font.glyphToPath(glyph.GlyphId)
        
        const path2d = new Path2D(path);
        
        ctx.fill(path2d);
        ctx.translate(glyph.XAdvance, 0)
      }
      ctx.restore()

      ctx.translate(0, node.interlineage)
      
    }
  }
}

interface Renderer<T>{
  render(node:T, ctx:CanvasRenderingContext2D, renderers:Renderers):void;
}