import { Deconstructor } from "../types"

/** Extracts a specific number of bytes and tries to decode them with the given encoding */
export function string(
  bytes: number,
  encoding = "utf8"
): Deconstructor<string> {
  return new StringDeconstructor(bytes, encoding)
}

class StringDeconstructor implements Deconstructor<string> {
  constructor(
    public readonly bytes: number,
    public readonly encoding: string
  ) {}

  readonly minBytes = this.bytes

  _fromBuffer(buffer: Buffer, offset: number) {
    return {
      value: buffer.toString(this.encoding, offset, offset + this.bytes),
      bytesUsed: this.bytes
    }
  }
}
