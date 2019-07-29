import { Deconstruction, Deconstructor } from "../types"

/** Applies a deconstructor, returns the default value if it fails*/
export function maybe<T>(
  inner: Deconstructor<T>,
  defaultValue: T
): Deconstructor<T> {
  return new MaybeDeconstructor(inner, defaultValue)
}

class MaybeDeconstructor<T> implements Deconstructor<T> {
  constructor(
    public readonly inner: Deconstructor<T>,
    public readonly defaultValue: T
  ) {}

  readonly bytes = undefined
  readonly minBytes = 0

  _fromBuffer(buffer: Buffer, offset: number): Deconstruction<T> {
    try {
      return this.inner._fromBuffer(buffer, offset)
    } catch (_) {
      return { value: this.defaultValue, bytesUsed: 0 }
    }
  }
}
