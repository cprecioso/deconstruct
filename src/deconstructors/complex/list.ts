import { ComplexDeconstructor, Deconstructor } from "../../types"
import { OutputBuffer } from "../../util"

/** Repeats a deconstructor a number of times, or as much as possible if not given */
export function list<T>(
  deconstructor: Deconstructor<T>,
  times?: number
): ComplexDeconstructor<T[], number> {
  return new ListDeconstructor(deconstructor, times)
}

class ListDeconstructor<T> implements ComplexDeconstructor<T[], number> {
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

  _fromBuffer(buffer: OutputBuffer, offset: number) {
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
