import { Deconstructor } from "../types"

/** Extract a specific sequence of bytes. Errors if they don't match */
export function magicNumber(buf: Buffer): Deconstructor<Buffer>
export function magicNumber(
  str: string,
  encoding?: BufferEncoding
): Deconstructor<Buffer>

export function magicNumber(
  strOrBuffer: Buffer | string,
  encoding?: BufferEncoding
): Deconstructor<Buffer> {
  const buf = Buffer.isBuffer(strOrBuffer)
    ? strOrBuffer
    : Buffer.from(strOrBuffer, encoding)

  return new MagicNumberDeconstructor(buf)
}

class MagicNumberDeconstructor implements Deconstructor<Buffer> {
  constructor(public readonly expectedValue: Buffer) {}

  readonly bytes = this.expectedValue.length
  readonly minBytes = this.bytes

  _fromBuffer(buffer: Buffer, offset: number) {
    const magicNumber = buffer.slice(offset, offset + this.bytes)
    if (magicNumber.equals(this.expectedValue)) {
      return { value: magicNumber, bytesUsed: this.bytes }
    } else {
      throw new Error(
        `Magic number doesn't match
  Expected: ${this.expectedValue}
       Got: ${magicNumber}`
      )
    }
  }
}
