import { HarfBuzzFont } from "../harfbuzz";
import BaseNode from "./base_node";
import TextNode from "./text_node";

export default class Page extends BaseNode {
  name:string = 'Page';
  width:number = 595.28;
  height:number = 841.89;
  constructor() {
    super();
    console.log('im page in magenta ');
  }
  add_text_node(font:HarfBuzzFont):TextNode{
    const text_node = new TextNode(font)
    this.add(text_node)
    return text_node
  }
}