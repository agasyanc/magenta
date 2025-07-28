import BaseNode from "./base_node";
import PageNode from "./page_node";
import TextNode from "./text_node";

export default class DocumentNode extends BaseNode {
  name: string = "Document";
  constructor() {
    super();
    console.log("im documtent in magenta ");
  }
  add_page(): PageNode {
    const page = new PageNode();
    this.add(page);
    return page;
  }
}
