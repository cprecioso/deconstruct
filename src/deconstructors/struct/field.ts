import { Deconstruction, Deconstructor } from "../../types"
import { BaseStructDeconstructor, StructDeconstructor } from "./base"

export function field<T extends {}, F extends string, U>(
  previous: BaseStructDeconstructor<T>,
  fieldName: F,
  inner: Deconstructor<U>
): StructDeconstructor<T & { [K in F]: U }> {
  return new StructDeconstructor(
    new FieldStructDeconstructor(previous, fieldName, inner)
  )
}

class FieldStructDeconstructor<
  T extends {},
  F extends string,
  U,
  R = T & { [K in F]: U }
> implements BaseStructDeconstructor<R> {
  constructor(
    protected readonly _previous: BaseStructDeconstructor<T>,
    protected readonly _fieldName: F,
    protected readonly _inner: Deconstructor<U>
  ) {}

  readonly bytes: number | undefined =
    this._previous.bytes &&
    this._inner.bytes &&
    this._previous.bytes + this._inner.bytes

  _fromBuffer(buffer: Buffer, offset: number): Deconstruction<R> {
    const previousData = this._previous._fromBuffer(buffer, offset)
    const innerData = this._inner._fromBuffer(
      buffer,
      offset + previousData.bytesUsed
    )
    return {
      value: {
        ...previousData.value,
        [this._fieldName]: innerData.value
      } as any,
      bytesUsed: previousData.bytesUsed + innerData.bytesUsed
    }
  }

  _offsetForField(fieldName: string): number | undefined {
    if (fieldName === this._fieldName) {
      return this._previous.bytes
    } else {
      return this._previous._offsetForField(fieldName)
    }
  }
}
