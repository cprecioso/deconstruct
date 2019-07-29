import { Deconstructor } from "../types"

/** Repeats a deconstructor a number of times, or as much as possible if not given */
export function list<T>(
  deconstructor: Deconstructor<T>,
  times?: number
): ListDeconstructor<T> {
  return new _ListDeconstructor(deconstructor, times)
}

export type ListDeconstructor<T> = _ListDeconstructor<T>

class _ListDeconstructor<T> implements Deconstructor<ReadonlyArray<T>> {
  constructor(
    public readonly inner: Deconstructor<T>,
    public readonly times?: number
  ) {}

  readonly bytes =
    this.inner.bytes && this.times != null
      ? this.inner.bytes * this.times
      : undefined
  readonly minBytes =
    this.bytes != null
      ? this.bytes
      : this.inner.minBytes && this.times != null
      ? this.inner.minBytes * this.times
      : 0

  _fromBuffer(buffer: Buffer, offset: number) {
    const values: T[] = []
    let accumulatedOffset = offset
    const times = this.times != null ? this.times : Infinity

    try {
      for (let i = 0; i < times; i++) {
        const deconstruction = this.inner._fromBuffer(buffer, accumulatedOffset)
        values.push(deconstruction.value)
        accumulatedOffset += deconstruction.bytesUsed
      }
    } catch (err) {
      if (this.times != null) throw err
    }

    return { value: values, bytesUsed: accumulatedOffset - offset }
  }

  offsetForElement(nth: number): number | undefined {
    if (this.inner.bytes != null) {
      return this.inner.bytes && this.inner.bytes * nth
    } else {
      return undefined
    }
  }
}
