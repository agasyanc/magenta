export default abstract class BaseNode {
  abstract name:string;
  children: BaseNode[] = [];
  uid:string = BaseNode.generateUIDV4();
  x:number = 0;
  y:number = 0;

  add(node:BaseNode){
    if (this.children.includes(node)){
      return
    }
    this.children.push(node);
  }

  static generateUIDV4():string{
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }
}
