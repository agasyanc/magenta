import BaseNode from "./base_node";

export default class Page extends BaseNode {
  name:string = 'Page';
  width:number = 595.28;
  height:number = 841.89;
  constructor() {
    super();
    console.log('im page in magenta ');
  }
}