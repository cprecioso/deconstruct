import { Deconstructor } from "../types"

export function list<T>(
  times: number,
  deconstructor: Deconstructor<T>
): Deconstructor<ReadonlyArray<T>> {
  return new ListDeconstructor(times, deconstructor)
}

class ListDeconstructor<T> implements Deconstructor<ReadonlyArray<T>> {
  bytes = this._inner.bytes ? this._inner.bytes * this._times : undefined

  constructor(
    public readonly _times: number,
    public readonly _inner: Deconstructor<T>
  ) {}

  _fromBuffer(buffer: Buffer, offset: number) {
    const values: T[] = []
    let accumulatedOffset = offset

    for (let i = 0; i < this._times; i++) {
      const deconstruction = this._inner._fromBuffer(buffer, accumulatedOffset)
      values.push(deconstruction.value)
      accumulatedOffset += deconstruction.bytesUsed
    }

    return { value: values, bytesUsed: accumulatedOffset - offset }
  }
}
