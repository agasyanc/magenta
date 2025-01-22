import DocumentNode from "./document/document_node";
import Viewport from "./viewport/viewport";
import * as hb from "./harfbuzz"
import wasm_url from "/hb.wasm?url"
import font_url from "/NotoSans-Regular.otf?url"

export default class Magenta {
  root: DocumentNode;
  viewport: Viewport;
  constructor() {
    console.log('im magenta');
    this.root = new DocumentNode();
    this.viewport = new Viewport(this.root);

    hb.loadHarfbuzz(wasm_url).then(
      ()=>{
        hb.loadAndCacheFont('NotoSans', font_url).then(
          () =>{
            const font = hb.harfbuzzFonts.get('NotoSans');
            if (!font) {
              return
            }
            const page = this.root.add_page()
            const text = page.add_text_node(font)

            window.onkeydown = (e:KeyboardEvent) => {
              text.insert(e.key)
              this.viewport.render();
            }
            // text.insert('Hello World! cdas ca\n cjidosa jicados cjsido\n jciod cjadios\n cjiosa jciados\n cjiados jcisoad\n')

            this.viewport.render();
          }
        ).catch(
          (reason)=>{
            console.log(reason);
          }
        )
      }
    ).catch(
      (reason)=>{
        console.log(reason);
      }
    )
  }

  appendTo(elt: HTMLElement) {
    this.viewport.appendTo(elt);
  }
}