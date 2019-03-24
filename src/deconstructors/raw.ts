import { Deconstructor } from "../types"

export function raw(bytes: number): Deconstructor<Buffer> {
  return new RawDeconstructor(bytes)
}

class RawDeconstructor implements Deconstructor<Buffer> {
  constructor(public readonly bytes: number) {}

  _fromBuffer(buffer: Buffer, offset: number) {
    return buffer.slice(offset, offset + this.bytes)
  }
}
