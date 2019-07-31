import { Deconstructor } from "../../types"

/** Returns a Deconstructor that doesn't do anything - a noop. Useful for testing and internals. */
export function empty<T>(defaultValue: T): Deconstructor<T> {
  return new EmptyDeconstructor(defaultValue)
}

class EmptyDeconstructor<T> implements Deconstructor<T> {
  constructor(protected readonly _defaultValue: T) {}

  readonly bytes = 0
  readonly minBytes = 0

  _fromBuffer() {
    return { value: this._defaultValue, bytesUsed: 0 }
  }
}
