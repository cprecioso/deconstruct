import { Deconstructor } from "./types"

export function fromBuffer<T>(
  deconstructor: Deconstructor<T>,
  buf: Buffer,
  offset = 0
): T {
  return deconstructor._fromBuffer(buf, offset).value
}
