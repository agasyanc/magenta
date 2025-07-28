import { HarfBuzzFont } from "../harfbuzz";
import BaseNode from "./base_node";

interface Glyph {
  codepoint: number;
  xAdvance: number;
  xOffset: number;
  yOffset: number;
  cluster: number; // Maps back to the original text
}

export default class TextNode extends BaseNode {
  name: string = "text_node";
  font_size: number = 16;
  interlineage: number = 24;
  lines: string[] = [""];
  width: number = 150;
  features: string = "kern=1,liga=1";

  private cursor: [number, number] = [0, 0];

  constructor(public font: HarfBuzzFont) {
    super();
  }

  insert(text: string) {
    this.lines[this.cursor[0]] += text;
    return;

    for (const line of this.lines) {
      const words = line.split(" ");

      let line_w = 0;

      for (const word of words) {
        const g_infos = this.font.shape(word, this.features);

        let word_w = 0;

        for (const info of g_infos) {
          word_w = word_w + info.XAdvance;
        }
        word_w = (word_w / this.font.unitsPerEM) * this.font_size;

        line_w += word_w;
      }
      console.log(line, line_w);
    }
  }
}
