import BaseNode from "./base_node";

export default class ImageNode extends BaseNode {
  src:HTMLImageElement;
  name: string = 'Image Node';
  constructor(src:string) {
    super();
    this.src = new Image();
    this.src.src = src;
    console.log('im image in magenta ');
  }
}