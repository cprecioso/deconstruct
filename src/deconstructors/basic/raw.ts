import { OutputBuffer } from "../../Buffer"
import { Deconstructor } from "../../types"

/** Extracts a sub-range of bytes */
export function raw(bytes?: number | undefined): Deconstructor<OutputBuffer> {
  return new RawDeconstructor(bytes)
}

class RawDeconstructor implements Deconstructor<OutputBuffer> {
  constructor(public readonly bytes: number | undefined) {}

  readonly minBytes = this.bytes || 0

  _fromBuffer(buffer: OutputBuffer, offset: number) {
    const value = buffer.slice(
      offset,
      this.bytes != null ? offset + this.bytes : undefined
    )
    return { value, bytesUsed: value.byteLength }
  }
}
