import { Deconstruction, Deconstructor } from "../../types"
import { check } from "./check"
import { field } from "./field"
import { skip } from "./skip"

export interface BaseStructDeconstructor<T extends {}>
  extends Deconstructor<T> {
  _offsetForField(fieldName: string): number | undefined
}

export function struct(): StructDeconstructor<{}> {
  return new StructDeconstructor()
}

export class StructDeconstructor<T extends {}>
  implements BaseStructDeconstructor<T> {
  constructor(protected readonly _previous?: BaseStructDeconstructor<T>) {}

  readonly bytes: number | undefined = this._previous
    ? this._previous.bytes
    : undefined

  _fromBuffer(buffer: Buffer, offset: number): Deconstruction<T> {
    return this._previous
      ? this._previous._fromBuffer(buffer, offset)
      : { value: {} as any, bytesUsed: 0 }
  }

  field<F extends string, U>(
    fieldName: F,
    inner: Deconstructor<U>
  ): StructDeconstructor<T & { [K in F]: U }> {
    return field(this, fieldName, inner)
  }

  check<U>(inner: Deconstructor<U>): StructDeconstructor<T> {
    return check(this, inner)
  }

  skip(bytes: number): StructDeconstructor<T> {
    return this.check(skip(bytes))
  }

  offsetForField(fieldName: keyof T): number | undefined {
    return this._offsetForField(fieldName as string)
  }

  _offsetForField(fieldName: string): number | undefined {
    return this._previous && this._previous._offsetForField(fieldName)
  }
}
