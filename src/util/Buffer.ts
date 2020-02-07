export type InputBuffer =
  | Buffer
  | ArrayBufferLike
  | ArrayBufferView
  | number[]
  | string

export type OutputBuffer = Buffer

function isArrayBufferLike(v: any): v is ArrayBuffer | SharedArrayBuffer {
  return v instanceof ArrayBuffer || v instanceof SharedArrayBuffer
}

function isArrayBufferView(v: any): v is ArrayBufferView {
  return (
    v &&
    v.buffer &&
    v.byteLength &&
    v.byteOffset &&
    isArrayBufferLike(v.buffer) &&
    typeof v.byteLength === "number" &&
    typeof v.byteOffset === "number"
  )
}

export function normalizeBuffer(input: InputBuffer): OutputBuffer {
  if (input instanceof Buffer) {
    return input
  } else if (isArrayBufferView(input)) {
    const buf = Buffer.from(input.buffer)
    if (input.byteLength !== input.buffer.byteLength) {
      const start = input.byteOffset
      const end = input.byteOffset + input.byteLength
      return buf.slice(start, end)
    } else {
      return buf
    }

    // FIXME The differente branches are needed so TypeScript won't complain
  } else if (typeof input === "string") {
    return Buffer.from(input)
  } else if (Array.isArray(input)) {
    return Buffer.from(input)
  } else {
    return Buffer.from(input)
  }
}

export function makeReadable(buffer: OutputBuffer) {
  return `<${Array.prototype.slice
    .call(buffer)
    .map(n => {
      let s = n.toString(16)
      if (s.length < 2) s = "0" + s
      return "0x" + s
    })
    .join(" ")}>`
}
