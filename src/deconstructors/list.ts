import { Deconstructor } from "../types"

/** Repeats a deconstructor a number of times */
export function list<T>(
  deconstructor: Deconstructor<T>,
  times: number
): ListDeconstructor<T> {
  return new _ListDeconstructor(deconstructor, times)
}

export type ListDeconstructor<T> = _ListDeconstructor<T>

class _ListDeconstructor<T> implements Deconstructor<ReadonlyArray<T>> {
  constructor(
    public readonly inner: Deconstructor<T>,
    public readonly times: number
  ) {}

  readonly bytes = this.inner.bytes ? this.inner.bytes * this.times : undefined
  readonly minBytes = this.bytes || 0

  _fromBuffer(buffer: Buffer, offset: number) {
    const values: T[] = []
    let accumulatedOffset = offset

    for (let i = 0; i < this.times; i++) {
      const deconstruction = this.inner._fromBuffer(buffer, accumulatedOffset)
      values.push(deconstruction.value)
      accumulatedOffset += deconstruction.bytesUsed
    }

    return { value: values, bytesUsed: accumulatedOffset - offset }
  }

  offsetForElement(nth: number) {
    return this.inner.bytes && this.inner.bytes * nth
  }
}
