import { Deconstructor } from "./types"

/** Executes a Deconstructor on a Buffer, and returns its result */
export function fromBuffer<T>(
  deconstructor: Deconstructor<T>,
  buf: Buffer,
  offset = 0
): T {
  if (buf.length < (deconstructor.bytes || deconstructor.minBytes))
    throw new Error(
      `Buffer (${
        buf.length
      } bytes) is too short for the created Deconstructor (${deconstructor.bytes ||
        deconstructor.minBytes} bytes)`
    )
  return deconstructor._fromBuffer(buf, offset).value
}
