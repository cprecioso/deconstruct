import { Deconstruction, Deconstructor } from "../../types"
import { BaseStructDeconstructor, StructDeconstructor } from "./base"

export function check<T extends {}, U>(
  previous: BaseStructDeconstructor<T>,
  inner: Deconstructor<U>
): StructDeconstructor<T> {
  return new StructDeconstructor(new CheckStructDeconstructor(previous, inner))
}

class CheckStructDeconstructor<T extends {}, U>
  implements BaseStructDeconstructor<T> {
  constructor(
    protected readonly _previous: BaseStructDeconstructor<T>,
    protected readonly _inner: Deconstructor<U>
  ) {}

  readonly bytes: number | undefined =
    this._previous.bytes &&
    this._inner.bytes &&
    this._previous.bytes + this._inner.bytes

  _fromBuffer(buffer: Buffer, offset: number): Deconstruction<T> {
    const previousData = this._previous._fromBuffer(buffer, offset)
    const innerData = this._inner._fromBuffer(
      buffer,
      offset + previousData.bytesUsed
    )
    return {
      value: previousData.value,
      bytesUsed: previousData.bytesUsed + innerData.bytesUsed
    }
  }

  _offsetForField(fieldName: string): number | undefined {
    return this._previous._offsetForField(fieldName)
  }
}
