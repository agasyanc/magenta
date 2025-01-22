type Pointer = number;

const HB_MEMORY_MODE_WRITABLE: number = 2;
const HB_SET_VALUE_INVALID: Pointer = -1;

class HarfBuzzExports {
  readonly heapu8: Uint8Array;
  readonly heapu32: Uint32Array;
  readonly heapi32: Int32Array;
  readonly heapf32: Float32Array;
  readonly utf8Encoder: TextEncoder;

  //exported HarfBuzz methods
  readonly malloc: (length: number) => Pointer
  readonly free: (ptr: Pointer) => void
  readonly free_ptr: () => Pointer
  readonly hb_blob_create: (data: Pointer, length: number, memoryMode: number, useData: Pointer, destroyFunction: Function) => Pointer
  readonly hb_blob_destroy: (ptr: Pointer) => void
  readonly hb_face_create: (blobPtr: Pointer, index: number) => Pointer
  readonly hb_face_get_upem: (facePtr: Pointer) => number
  readonly hb_face_destroy: (ptr: Pointer) => void
  readonly hb_font_create: (facePtr: Pointer) => Pointer
  readonly hb_font_set_scale: (fontPtr: Pointer, xScale: number, yScale: number) => void
  readonly hb_font_destroy: (ptr: Pointer) => void
  readonly hb_face_collect_unicodes: (facePtr: Pointer, setPtr: Pointer) => void
  readonly hb_set_create: () => Pointer
  readonly hb_set_destroy: (setPtr: Pointer) => void
  readonly hb_set_get_population: (setPtr: Pointer) => number
  readonly hb_set_next_many: (
    setPtr: Pointer,
    greaterThanUnicodePtr: Pointer,
    outputU32ArrayPtr: Pointer,
    size: number,
  ) => number
  readonly hb_buffer_create: () => Pointer
  readonly hb_buffer_add_utf8: (bufferPtr: Pointer, stringPtr: Pointer, stringLength: number, itemOffset: number, itemLength: number) => void
  readonly hb_buffer_guess_segment_properties: (bufferPtr: Pointer) => void
  readonly hb_buffer_set_direction: (bufferPtr: Pointer, direction: number) => void
  readonly hb_shape: (fontPtr: Pointer, bufferPtr: Pointer, features: any, numFeatures: number) => void
  readonly hb_buffer_get_length: (bufferPtr: Pointer) => number
  readonly hb_buffer_get_glyph_infos: (bufferPtr: Pointer, length: number) => any
  readonly hb_buffer_get_glyph_positions: (bufferPtr: Pointer, length: number) => any
  readonly hb_buffer_destroy: (bufferPtr: Pointer) => void

  readonly hb_feature_from_string: (string: Pointer, length:number, feature:Pointer) => boolean
  readonly hb_ot_var_get_axis_infos: (face: Pointer, start_offset:number, axis_count: Pointer, axisInfos: Pointer) => number

  readonly hb_draw_funcs_create: () => Pointer;
  readonly hb_draw_funcs_set_move_to_func: (drawFuncsPtr:Pointer, moveToPtr:Pointer, user_data:Pointer, destroy:Pointer) => void;
  readonly hb_draw_funcs_set_line_to_func: (drawFuncsPtr:Pointer, lineToPtr: Pointer, user_data:Pointer, destroy:Pointer) => void;
  readonly hb_draw_funcs_set_cubic_to_func: (drawFuncsPtr:Pointer, cubicToPtr:Pointer, user_data:Pointer, destroy:Pointer) => void;
  readonly hb_draw_funcs_set_quadratic_to_func: (drawFuncsPtr:Pointer, quadToPtr:Pointer, user_data:Pointer, destroy:Pointer) => void;
  readonly hb_draw_funcs_set_close_path_func: (drawFuncsPtr:Pointer, closePathPtr:Pointer, user_data:Pointer, destroy:Pointer) => void;

  readonly hb_font_draw_glyph: (fontPointer: Pointer, glyphId:number, dfuncs:Pointer, userData:Pointer) => void;

  readonly wasmTable: WebAssembly.Table;

  constructor(exports: any) {
    this.heapu8 = new Uint8Array(exports.memory.buffer);
    this.heapu32 = new Uint32Array(exports.memory.buffer);
    this.heapi32 = new Int32Array(exports.memory.buffer);
    this.heapf32 = new Float32Array(exports.memory.buffer);
    this.utf8Encoder = new TextEncoder();

    this.malloc = exports.malloc;
    this.free = exports.free;
    this.free_ptr = exports.free_ptr;
    this.hb_blob_destroy = exports.hb_blob_destroy;
    this.hb_blob_create = exports.hb_blob_create;
    this.hb_face_create = exports.hb_face_create;
    this.hb_face_get_upem = exports.hb_face_get_upem;
    this.hb_face_destroy = exports.hb_face_destroy;
    this.hb_face_collect_unicodes = exports.hb_face_collect_unicodes;
    this.hb_set_create = exports.hb_set_create;
    this.hb_set_destroy = exports.hb_set_destroy;
    this.hb_set_get_population = exports.hb_set_get_population;
    this.hb_set_next_many = exports.hb_set_next_many;
    this.hb_font_create = exports.hb_font_create;
    this.hb_font_set_scale = exports.hb_font_set_scale;
    this.hb_font_destroy = exports.hb_font_destroy;
    this.hb_buffer_create = exports.hb_buffer_create;
    this.hb_buffer_add_utf8 = exports.hb_buffer_add_utf8;
    this.hb_buffer_guess_segment_properties = exports.hb_buffer_guess_segment_properties;
    this.hb_buffer_set_direction = exports.hb_buffer_set_direction;
    this.hb_shape = exports.hb_shape;
    this.hb_buffer_get_length = exports.hb_buffer_get_length;
    this.hb_buffer_get_glyph_infos = exports.hb_buffer_get_glyph_infos;
    this.hb_buffer_get_glyph_positions = exports.hb_buffer_get_glyph_positions;
    this.hb_buffer_destroy = exports.hb_buffer_destroy;
    this.hb_feature_from_string = exports.hb_feature_from_string;
    this.hb_ot_var_get_axis_infos = exports.hb_ot_var_get_axis_infos;
    this.hb_draw_funcs_create = exports.hb_draw_funcs_create;
    this.hb_draw_funcs_set_move_to_func = exports.hb_draw_funcs_set_move_to_func;
    this.hb_draw_funcs_set_line_to_func = exports.hb_draw_funcs_set_line_to_func
    this.hb_draw_funcs_set_cubic_to_func = exports.hb_draw_funcs_set_cubic_to_func
    this.hb_draw_funcs_set_quadratic_to_func = exports.hb_draw_funcs_set_quadratic_to_func
    this.hb_draw_funcs_set_close_path_func = exports.hb_draw_funcs_set_close_path_func
    this.hb_font_draw_glyph = exports.hb_font_draw_glyph

    this.wasmTable = exports.__indirect_function_table as WebAssembly.Table;
    
  }

}

let hb: HarfBuzzExports;

let functionsInTableMap:WeakMap<Function, number>|undefined = undefined;

function addFunction(func:Function, sig:string) {
  var rtn = getFunctionAddress(func);
  if (rtn) {
      return rtn
  }
  var ret = getEmptyTableSlot();
  if (ret === undefined) {
      throw new Error("no empty slots");   
  }
  try {
      setWasmTableEntry(ret, func)
  } catch (err) {
      if (!(err instanceof TypeError)) {
          throw err
      }
      var wrapped = convertJsFunctionToWasm(func, sig);
      setWasmTableEntry(ret, wrapped)
  }
  functionsInTableMap && functionsInTableMap.set(func, ret);
  return ret
}
function convertJsFunctionToWasm(func:Function, sig:string) {
  //@ts-ignore
  if (typeof WebAssembly.Function == "function") {
    //@ts-ignore
      return new WebAssembly.Function(sigToWasmTypes(sig), func)
  }
  var typeSectionBody = [1];
  generateFuncType(sig, typeSectionBody);
  var bytes = [0, 97, 115, 109, 1, 0, 0, 0, 1];
  uleb128Encode(typeSectionBody.length, bytes);
  bytes.push.apply(bytes, typeSectionBody);
  bytes.push(2, 7, 1, 1, 101, 1, 102, 0, 0, 7, 5, 1, 1, 102, 0, 0);
  var module = new WebAssembly.Module(new Uint8Array(bytes));
  var instance = new WebAssembly.Instance(module, {
      "e": {
          "f": func
      }
  });
  var wrappedFunc = instance.exports["f"];
  return wrappedFunc
}

function uleb128Encode(n:number, target:number[]) {
  if (n < 128) {
      target.push(n)
  } else {
      target.push(n % 128 | 128, n >> 7)
  }
}

function sigToWasmTypes(sig:string):Record<string, string[]> {
  var typeNames:Record<string, string> = {
      "i": "i32",
      "j": "i64",
      "f": "f32",
      "d": "f64",
      "p": "i32"
  };
  var type:Record<string, string[]> = {
      parameters: [],
      results: sig[0] == "v" ? [] : [typeNames[sig[0]]]
  };
  for (var i = 1; i < sig.length; ++i) {
      type.parameters.push(typeNames[sig[i]])
  }
  return type
}

function generateFuncType(sig:string, target: number[]) {
  var sigRet = sig.slice(0, 1);
  var sigParam = sig.slice(1);
  var typeCodes:Record<string, number> = {
      "i": 127,
      "p": 127,
      "j": 126,
      "f": 125,
      "d": 124
  };
  target.push(96);
  uleb128Encode(sigParam.length, target);
  for (var i = 0; i < sigParam.length; ++i) {
      target.push(typeCodes[sigParam[i]])
  }
  if (sigRet == "v") {
      target.push(0)
  } else {
      target.push(1, typeCodes[sigRet])
  }
}

function getFunctionAddress(func:Function) {
  if (!functionsInTableMap) {
      functionsInTableMap = new WeakMap;
      updateTableMap(0, hb.wasmTable.length)
  }
  return functionsInTableMap.get(func) || 0
}

function updateTableMap(offset:number, count:number) {
  if (functionsInTableMap) {
      for (var i = offset; i < offset + count; i++) {
          var item = getWasmTableEntry(i);
          if (item) {
              functionsInTableMap.set(item, i)
          }
      }
  }
}

var freeTableIndexes:number[] = [];

function getEmptyTableSlot():number|undefined {
  if (freeTableIndexes.length) {
      return freeTableIndexes.pop()
  }
  try {
      hb.wasmTable.grow(1)
  } catch (err) {
      if (!(err instanceof RangeError)) {
          throw err
      }
      throw "Unable to grow wasm table. Set ALLOW_TABLE_GROWTH."
  }
  console.log("hb.wasmTable.length ", hb.wasmTable.length);
  
  return hb.wasmTable.length - 1
}
var getWasmTableEntry = (funcPtr:number) => hb.wasmTable.get(funcPtr);
const setWasmTableEntry = (idx:number, func:Function) => hb.wasmTable.set(idx, func);


class AsciiString {
  readonly ptr: Pointer;
  readonly length: number;

  constructor(text:string) {
    this.ptr = hb.malloc(text.length + 1);

    for (let i = 0; i < text.length; ++i) {
      const char = text.charCodeAt(i);
      if (char > 127) throw new Error('Expected ASCII text');
      hb.heapu8[this.ptr + i] = char;
    }
    
    hb.heapu8[this.ptr + text.length] = 0;
    this.length = text.length;
  }
  destroy() {
    hb.free(this.ptr);
  }
  
}

class CString {
  readonly ptr: Pointer;
  readonly length: number;

  constructor(text: string) {
    var bytes = hb.utf8Encoder.encode(text);
    this.ptr = hb.malloc(bytes.byteLength);
    hb.heapu8.set(bytes, this.ptr);
    this.length = bytes.byteLength;
  }

  destroy() {
    hb.free(this.ptr);
  }
}

export class HarfBuzzBlob {
  readonly ptr: Pointer;

  constructor(data: Uint8Array) {
    let blobPtr = hb.malloc(data.length);
    hb.heapu8.set(data, blobPtr);
    this.ptr = hb.hb_blob_create(blobPtr, data.byteLength, HB_MEMORY_MODE_WRITABLE, blobPtr, hb.free_ptr);
  }

  destroy() {
    hb.hb_blob_destroy(this.ptr);
  }
}

function typedArrayFromSet<T extends 'u8' | 'u32' | 'i32'>(setPtr: Pointer, arrayType: T) {
  const heap = hb[`heap${arrayType}`];
  const bytesPerElment = heap.BYTES_PER_ELEMENT;
  const setCount = hb.hb_set_get_population(setPtr);
  const arrayPtr = hb.malloc(
    setCount * bytesPerElment,
  );
  const arrayOffset = arrayPtr / bytesPerElment;
  const array = heap.subarray(
    arrayOffset,
    arrayOffset + setCount,
  ) as typeof hb[`heap${T}`];
  heap.set(array, arrayOffset);
  hb.hb_set_next_many(
    setPtr,
    HB_SET_VALUE_INVALID,
    arrayPtr,
    setCount,
  );
  return array;
}

export class HarfBuzzFace {
  readonly ptr: Pointer;

  constructor(blob: HarfBuzzBlob, index: number) {
    this.ptr = hb.hb_face_create(blob.ptr, index);
  }

  getUnitsPerEM() {
    return hb.hb_face_get_upem(this.ptr);
  }

  collectUnicodes() {
    const unicodeSetPtr = hb.hb_set_create();
    hb.hb_face_collect_unicodes(this.ptr, unicodeSetPtr);
    const result = typedArrayFromSet(unicodeSetPtr, 'u32');
    hb.hb_set_destroy(unicodeSetPtr);
    return result;
  }
  getAxisInfos():AxisInfo[] {
    var axis = hb.malloc(64 * 32);
    var c = hb.malloc(4);
    hb.heapu32[c / 4] = 64;
    hb.hb_ot_var_get_axis_infos(this.ptr, 0, c, axis);
    const result:AxisInfo[] = [];

    Array.from({ length: hb.heapu32[c / 4] }).forEach(function (_, i) {
      result.push(new AxisInfo(
        hb.heapu32[axis / 4 + i * 8],
        _hb_untag(hb.heapu32[axis / 4 + i * 8 + 1]),
        hb.heapu32[axis / 4 + i * 8 + 2],
        hb.heapf32[axis / 4 + i * 8 + 3],
        hb.heapf32[axis / 4 + i * 8 + 4],
        hb.heapf32[axis / 4 + i * 8 + 5],
        hb.heapf32[axis / 4 + i * 8 + 6]
      ))
    });
    
    hb.free(c);
    hb.free(axis);
    return result;
  }

  destroy() {
    hb.hb_face_destroy(this.ptr);
  }
}

function hb_tag(s:string):number {
  return (
    (s.charCodeAt(0) & 0xFF) << 24 |
    (s.charCodeAt(1) & 0xFF) << 16 |
    (s.charCodeAt(2) & 0xFF) <<  8 |
    (s.charCodeAt(3) & 0xFF) <<  0
  );
}

function _hb_untag(tag:any):string {
  return [
    String.fromCharCode((tag >> 24) & 0xFF),
    String.fromCharCode((tag >> 16) & 0xFF),
    String.fromCharCode((tag >>  8) & 0xFF),
    String.fromCharCode((tag >>  0) & 0xFF)
  ].join('');
}

export class HarfBuzzFont {
  readonly ptr: Pointer
  readonly unitsPerEM: number
  private drawFuncsPtr: number|null = null;
  private drawContext: any = null;
  axis_infos:AxisInfo[] = [];

  constructor(face: HarfBuzzFace) {
    this.ptr = hb.hb_font_create(face.ptr);
    this.unitsPerEM = face.getUnitsPerEM();
  }

  setScale(xScale: number, yScale: number) {
    hb.hb_font_set_scale(this.ptr, xScale, yScale);
  }
  
  shape(text:string, features:string):GlyphInformation[]{
    return shape(text, this, features)
  }

  glyphToPath(glyphId:number):string {
    // let pathBuffer = ""; // Define a new pathBuffer for each glyph.

    if (!this.drawFuncsPtr) {
      const drawContext = { pathBuffer: "" }; // Shared context for the callbacks.
      var moveTo = function (dfuncs:any, draw_data:any, draw_state:any, to_x:any, to_y:any, user_data:any) {
        drawContext.pathBuffer += `M${to_x},${to_y}`;
      }
      var lineTo = function (dfuncs:any, draw_data:any, draw_state:any, to_x:any, to_y:any, user_data:any) {
        drawContext.pathBuffer += `L${to_x},${to_y}`;
      }
      var cubicTo = function (dfuncs:any, draw_data:any, draw_state:any, c1_x:any, c1_y:any, c2_x:any, c2_y:any, to_x:any, to_y:any, user_data:any) {
        drawContext.pathBuffer += `C${c1_x},${c1_y} ${c2_x},${c2_y} ${to_x},${to_y}`;
      }
      var quadTo = function (dfuncs:any, draw_data:any, draw_state:any, c_x:any, c_y:any, to_x:any, to_y:any, user_data:any) {
        drawContext.pathBuffer += `Q${c_x},${c_y} ${to_x},${to_y}`;
      }
      var closePath = function (dfuncs:any, draw_data:any, draw_state:any, user_data:any) {
        drawContext.pathBuffer += 'Z';
      }

      var moveToPtr = addFunction(moveTo, 'viiiffi');
      var lineToPtr = addFunction(lineTo, 'viiiffi');
      var cubicToPtr = addFunction(cubicTo, 'viiiffffffi');
      var quadToPtr = addFunction(quadTo, 'viiiffffi');
      var closePathPtr = addFunction(closePath, 'viiii');
      this.drawFuncsPtr = hb.hb_draw_funcs_create();
      hb.hb_draw_funcs_set_move_to_func(this.drawFuncsPtr, moveToPtr, 0, 0);
      hb.hb_draw_funcs_set_line_to_func(this.drawFuncsPtr, lineToPtr, 0, 0);
      hb.hb_draw_funcs_set_cubic_to_func(this.drawFuncsPtr, cubicToPtr, 0, 0);
      hb.hb_draw_funcs_set_quadratic_to_func(this.drawFuncsPtr, quadToPtr, 0, 0);
      hb.hb_draw_funcs_set_close_path_func(this.drawFuncsPtr, closePathPtr, 0, 0);
      // Store drawContext for later use.
      this.drawContext = drawContext;
    }

    // Update pathBuffer dynamically for each glyph.
    this.drawContext.pathBuffer = ""; // Clear the buffer.
    hb.hb_font_draw_glyph(this.ptr, glyphId, this.drawFuncsPtr, 0);
    return this.drawContext.pathBuffer;
  }

  destroy() {
    hb.hb_font_destroy(this.ptr);
  }
}

export class AxisInfo {
  constructor(readonly axisIndex: number, readonly tag: string, readonly name_id: number, readonly flags: number, readonly minValue: number, readonly defaultValue: number, readonly maxValue: number) {
  }
}

export type HarfBuzzDirection = "ltr" | "rtl" | "ttb" | "btt"

class GlyphInformation {
  readonly GlyphId: number
  readonly Cluster: number
  readonly XAdvance: number
  readonly YAdvance: number
  readonly XOffset: number
  readonly YOffset: number

  constructor(glyphId: number, cluster: number, xAdvance: number, yAdvance: number, xOffset: number, yOffset: number) {
    this.GlyphId = glyphId;
    this.Cluster = cluster;
    this.XAdvance = xAdvance;
    this.YAdvance = yAdvance;
    this.XOffset = xOffset;
    this.YOffset = yOffset;
  }
}

export class HarfBuzzBuffer {
  readonly ptr: Pointer

  constructor() {
    this.ptr = hb.hb_buffer_create();
  }

  addText(text: string) {
    let str = new CString(text);
    hb.hb_buffer_add_utf8(this.ptr, str.ptr, str.length, 0, str.length);
    str.destroy();
  }

  guessSegmentProperties() {
    hb.hb_buffer_guess_segment_properties(this.ptr);
  }

  setDirection(direction: HarfBuzzDirection) {
    let d = { "ltr": 4, "rtl": 5, "ttb": 6, "btt": 7 }[direction];
    hb.hb_buffer_set_direction(this.ptr, d);
  }

  shape(font: HarfBuzzFont, features: string|null=null) {
    let featuresPtr = 0
    let features_list = []
    let feature_len = 0
    if (features){
      features_list = features.split(',')
      featuresPtr = hb.malloc(16 * features.length);
      for (const feature of features_list) {
        var str = new AsciiString(feature);
        const result = hb.hb_feature_from_string(str.ptr, -1, featuresPtr + feature_len * 16)
        
        if (result)
          feature_len++;
        str.destroy();
      }
    }
    
    hb.hb_shape(font.ptr, this.ptr, featuresPtr, features_list.length);
    if (featuresPtr){
      hb.free(featuresPtr);
    }
    
  }

  json() {
    var length = hb.hb_buffer_get_length(this.ptr);
    var result = new Array<GlyphInformation>();
    var infosPtr32 = hb.hb_buffer_get_glyph_infos(this.ptr, 0) / 4;
    var positionsPtr32 = hb.hb_buffer_get_glyph_positions(this.ptr, 0) / 4;
    var infos = hb.heapu32.subarray(infosPtr32, infosPtr32 + 5 * length);
    var positions = hb.heapi32.subarray(positionsPtr32, positionsPtr32 + 5 * length);
    for (var i = 0; i < length; ++i) {
      result.push(new GlyphInformation(
        infos[i * 5 + 0],
        infos[i * 5 + 2],
        positions[i * 5 + 0],
        positions[i * 5 + 1],
        positions[i * 5 + 2],
        positions[i * 5 + 3]));
    }
    return result;
  }

  destroy() {
    hb.hb_buffer_destroy(this.ptr)
  }
}

export function shape(text: string, font: HarfBuzzFont, features: string|null = null): Array<GlyphInformation> {
  let buffer = new HarfBuzzBuffer();
  buffer.addText(text);
  buffer.guessSegmentProperties();
  buffer.shape(font, features);
  let result = buffer.json();
  buffer.destroy();
  return result;
}

export function getWidth(text: string, font: HarfBuzzFont, fontSizeInPixel: number, features: any): number {
  let scale = fontSizeInPixel / font.unitsPerEM;
  let shapeResult = shape(text, font, features);
  let totalWidth = shapeResult.map((glyphInformation) => {
    return glyphInformation.XAdvance;
  }).reduce((previous, current, i, arr) => {
    return previous + current;
  }, 0.0);

  return totalWidth * scale;
}

export const harfbuzzFonts = new Map<string, HarfBuzzFont>();

export async function loadHarfbuzz(webAssemblyUrl: string): Promise<void> {
  const response = await fetch(webAssemblyUrl);
  const wasm = await response.arrayBuffer();
  const result = await WebAssembly.instantiate(wasm);
  // //@ts-ignore
  // console.log(result);
  
  hb = new HarfBuzzExports(result.instance.exports);
}

export async function loadAndCacheFont(fontName: string, fontUrl: string): Promise<void> {
  const response = await fetch(fontUrl);
  const blob = await response.arrayBuffer();
  let fontBlob = new Uint8Array(blob);
  let harfbuzzBlob = new HarfBuzzBlob(fontBlob);
  let harfbuzzFace = new HarfBuzzFace(harfbuzzBlob, 0);
  let harfbuzzFont = new HarfBuzzFont(harfbuzzFace);
  harfbuzzFont.axis_infos = harfbuzzFace.getAxisInfos();
  harfbuzzFonts.set(fontName, harfbuzzFont);
  harfbuzzFace.destroy();
  harfbuzzBlob.destroy();
}