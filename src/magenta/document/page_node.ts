import BaseNode from "./base_node";

export default class Page extends BaseNode {
  name:string = 'Page'
  constructor() {
    super();
    console.log('im page in magenta ');
  }
}