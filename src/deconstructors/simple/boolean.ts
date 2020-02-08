import { Deconstruction, Deconstructor, StaticDeconstructor } from "../../types"
import { makeStatic, OutputBuffer } from "../../util"

class BooleanDeconstructor implements Deconstructor<boolean> {
  readonly bytes = 1
  readonly minBytes = 1

  _fromBuffer(buf: OutputBuffer, offset: number): Deconstruction<boolean> {
    return {
      value: buf[offset] === 0x01,
      bytesUsed: 1
    }
  }
}

/**
 * Reads a `0` or a `1` and returns a `boolean`
 *
 * @public
 */
export const boolean: StaticDeconstructor<boolean> = makeStatic(
  new BooleanDeconstructor()
)
