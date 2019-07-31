import { InputBuffer, normalizeBuffer, OutputBuffer } from "../../Buffer"
import { Deconstructor } from "../../types"

/** Extracts a sub-range of bytes */
export function rawUntil(value: InputBuffer): Deconstructor<OutputBuffer> {
  const buf = normalizeBuffer(value)
  return new RawUntilDeconstructor(buf)
}

class RawUntilDeconstructor implements Deconstructor<OutputBuffer> {
  constructor(public readonly referenceBuf: OutputBuffer) {}

  readonly bytes = undefined
  readonly minBytes = 0

  _fromBuffer(buffer: OutputBuffer, offset: number) {
    const end = buffer.indexOf(this.referenceBuf, offset)
    const value = buffer.slice(offset, end)
    return { value, bytesUsed: value.byteLength }
  }
}
