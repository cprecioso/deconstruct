import { Deconstructor } from "../../types"
import { OutputBuffer } from "../../util"

/**
 * Extracts a specific number of bytes and tries to decode them with the given encoding
 *
 * @public
 */
export function string(
  bytes: number,
  encoding: BufferEncoding = "utf8"
): Deconstructor<string> {
  return new StringDeconstructor(bytes, encoding)
}

class StringDeconstructor implements Deconstructor<string> {
  constructor(
    public readonly bytes: number,
    public readonly encoding: BufferEncoding
  ) {}

  readonly minBytes = this.bytes

  _fromBuffer(buffer: OutputBuffer, offset: number) {
    return {
      value: buffer.toString(this.encoding, offset, offset + this.bytes),
      bytesUsed: this.bytes
    }
  }
}
