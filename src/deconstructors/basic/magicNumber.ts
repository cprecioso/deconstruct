import { InputBuffer, normalizeBuffer, OutputBuffer } from "../../Buffer"
import { Deconstructor } from "../../types"

/** Extract a specific sequence of bytes. Errors if they don't match */
export function magicNumber(value: InputBuffer): Deconstructor<OutputBuffer> {
  const buf = normalizeBuffer(value)
  return new MagicNumberDeconstructor(buf)
}

class MagicNumberDeconstructor implements Deconstructor<OutputBuffer> {
  constructor(public readonly expectedValue: Buffer) {}

  readonly bytes = this.expectedValue.length
  readonly minBytes = this.bytes

  _fromBuffer(buffer: OutputBuffer, offset: number) {
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
