import { Deconstructor } from "../types"

export function raw(bytes?: number | undefined): Deconstructor<Buffer> {
  return new RawDeconstructor(bytes)
}

class RawDeconstructor implements Deconstructor<Buffer> {
  constructor(public readonly bytes: number | undefined) {}

  readonly minBytes = this.bytes || 0

  _fromBuffer(buffer: Buffer, offset: number) {
    const value = buffer.slice(
      offset,
      this.bytes ? offset + this.bytes : undefined
    )
    return { value, bytesUsed: value.byteLength }
  }
}
