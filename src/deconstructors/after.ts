import { Deconstruction, Deconstructor } from "../types"

export function after<T, U>(
  previous: Deconstructor<T>,
  innerFn: (data: T) => Deconstructor<U>
): Deconstructor<U> {
  return new AfterDeconstructor(previous, innerFn)
}

class AfterDeconstructor<T, U> implements Deconstructor<U> {
  constructor(
    protected readonly _previous: Deconstructor<T>,
    protected readonly _innerFn: (data: T) => Deconstructor<U>
  ) {}

  readonly bytes = undefined
  readonly minBytes = this._previous.minBytes

  _fromBuffer(buffer: Buffer, offset: number): Deconstruction<U> {
    const previousData = this._previous._fromBuffer(buffer, offset)
    const innerDeconstructor = this._innerFn(previousData.value)
    const innerData = innerDeconstructor._fromBuffer(
      buffer,
      offset + previousData.bytesUsed
    )

    return {
      value: innerData.value,
      bytesUsed: previousData.bytesUsed + innerData.bytesUsed
    }
  }
}
