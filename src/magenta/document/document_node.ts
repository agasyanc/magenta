import BaseNode from "./base_node";
import PageNode from "./page_node";

export default class DocumentNode extends BaseNode {
  name: string = 'Document';
  constructor() {

    super();
    console.log('im documtent in magenta ');

    const page = new PageNode()
    this.add(page);

  }
  
}