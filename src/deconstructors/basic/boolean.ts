import { Deconstructor } from "../../types"

export function boolean(): Deconstructor<boolean> {
  return BooleanDeconstructor
}

const BooleanDeconstructor: Deconstructor<boolean> = Object.freeze({
  bytes: 1,
  minBytes: 1,
  _fromBuffer: (buf, offset) => ({
    value: buf[offset] === 0x01,
    bytesUsed: 1
  })
})
