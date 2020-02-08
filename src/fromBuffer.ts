import { Deconstruction, Deconstructor } from "./types"
import { InputBuffer, normalizeBuffer } from "./util"

/**
 * Executes a Deconstructor on a Buffer, and returns its result
 *
 * @public
 */
export function fromBuffer<T>(
  deconstructor: Deconstructor<T>,
  input: InputBuffer,
  offset = 0
): Deconstruction<T> {
  const buf = normalizeBuffer(input)

  if (buf.length < (deconstructor.bytes || deconstructor.minBytes)) {
    throw new Error(
      `Buffer (${
        buf.length
      } bytes) is too short for the created Deconstructor (${deconstructor.bytes ||
        deconstructor.minBytes} bytes)`
    )
  }

  return deconstructor._fromBuffer(buf, offset)
}
