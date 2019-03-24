import { Deconstructor } from "../types"

export function string(
  bytes: number,
  encoding = "utf8"
): Deconstructor<string> {
  return new StringDeconstructor(bytes, encoding)
}

class StringDeconstructor implements Deconstructor<string> {
  constructor(
    public readonly bytes: number,
    public readonly _encoding: string
  ) {}

  _fromBuffer(buffer: Buffer, offset: number) {
    return {
      value: buffer.toString(this._encoding, offset, offset + this.bytes),
      bytesUsed: this.bytes
    }
  }
}
