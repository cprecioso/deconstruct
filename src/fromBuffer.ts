import { InputBuffer, normalizeBuffer } from "./Buffer"
import { Deconstructor } from "./types"

/** Executes a Deconstructor on a Buffer, and returns its result */
export function fromBuffer<T>(
  deconstructor: Deconstructor<T>,
  input: InputBuffer,
  offset = 0,
  length?: number
): T {
  const buf = normalizeBuffer(input)
  if (buf.length < (deconstructor.bytes || deconstructor.minBytes))
    throw new Error(
      `Buffer (${
        buf.length
      } bytes) is too short for the created Deconstructor (${deconstructor.bytes ||
        deconstructor.minBytes} bytes)`
    )
  return deconstructor._fromBuffer(
    buf.slice(offset, length != null ? offset + length : undefined),
    0
  ).value
}
