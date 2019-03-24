import { Deconstructor } from "../types"

export function list<T>(
  times: number,
  deconstructor: Deconstructor<T>
): Deconstructor<ReadonlyArray<T>> {
  return new ListDeconstructor(times, deconstructor)
}

class ListDeconstructor<T> implements Deconstructor<ReadonlyArray<T>> {
  bytes = this._inner.bytes * this._times

  constructor(
    public readonly _times: number,
    public readonly _inner: Deconstructor<T>
  ) {}

  _fromBuffer(buffer: Buffer, listStartOffset: number) {
    const itemLength = this._inner.bytes
    const listEndOffset = listStartOffset + this._times * itemLength

    const res: T[] = []
    for (
      let itemOffset = listStartOffset;
      itemOffset < listEndOffset;
      itemOffset += itemLength
    ) {
      res.push(this._inner._fromBuffer(buffer, itemOffset))
    }

    return res
  }
}
