import { Deconstructor, StaticDeconstructor } from "../../types"
import { makeStatic } from "../../util"

class EmptyDeconstructor implements Deconstructor<undefined> {
  readonly bytes = 0
  readonly minBytes = 0

  _fromBuffer() {
    return { value: undefined, bytesUsed: 0 }
  }
}

/** Returns a Deconstructor that doesn't do anything - a noop. Useful for testing and internals. */
export const empty: StaticDeconstructor<undefined> = makeStatic(
  new EmptyDeconstructor()
)
