import { OutputBuffer } from "../../Buffer"
import { Deconstruction, Deconstructor } from "../../types"

/** Lets you analyze previous bytes to declare an appropiate Deconstructor for the following ones.
 *
 * @example
 * ```js
 * const d = require("deconstruct")
 * // This Buffer consists of [length of string, ascii data] pairs, repeated three times.
 * const buf = Buffer.from([
 * // length    string data
 *   0x05,      0x68, 0x65, 0x6c, 0x6c, 0x6f,
 *   0x05,      0x77, 0x6f, 0x72, 0x6c, 0x64,
 *   0x01,      0x21
 * ])
 * const stringPair = d.after(d.u8(), len => d.string(len, "ascii"))
 * const stringList = d.list(stringPair, 3)
 * console.log(d.fromBuffer(stringList, buf)) // -> ["hello", "world", "!"]
 * ```
 */
export function after<T, U>(
  previous: Deconstructor<T>,
  innerFn: (data: T) => Deconstructor<U>
): Deconstructor<U> {
  return new AfterDeconstructor(previous, innerFn)
}

class AfterDeconstructor<T, U> implements Deconstructor<U> {
  constructor(
    protected readonly _previous: Deconstructor<T>,
    protected readonly _innerFn: (data: T) => Deconstructor<U>
  ) {}

  readonly bytes = undefined
  readonly minBytes = this._previous.minBytes

  _fromBuffer(buffer: OutputBuffer, offset: number): Deconstruction<U> {
    const previousData = this._previous._fromBuffer(buffer, offset)
    const innerDeconstructor = this._innerFn(previousData.value)
    const innerData = innerDeconstructor._fromBuffer(
      buffer,
      offset + previousData.bytesUsed
    )

    return {
      value: innerData.value,
      bytesUsed: previousData.bytesUsed + innerData.bytesUsed
    }
  }
}
