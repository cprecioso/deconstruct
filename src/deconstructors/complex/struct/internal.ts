import { Deconstruction, Deconstructor } from "../../../types"
import { OutputBuffer } from "../../../util"

export interface InternalStructDeconstructor<T extends {}>
  extends Deconstructor<T> {
  _offsetForField(fieldName: string): number | undefined
}

export type LateDeconstructor<T extends {}, U> = (
  deconstruction: Deconstruction<T>
) => Deconstructor<U>

export class FieldAddDeconstructor<
  P extends {},
  F extends string | undefined | null,
  I,
  T extends P = F extends string ? P & { [K in F]: I } : P
> implements InternalStructDeconstructor<T> {
  constructor(
    protected readonly _previous: InternalStructDeconstructor<P>,
    protected readonly _fieldName: string | undefined | null,
    protected readonly _isLate: boolean,
    protected readonly _inner: Deconstructor<I> | LateDeconstructor<P, I>
  ) {}

  readonly bytes = this._isLate
    ? undefined
    : this._previous.bytes != null &&
      (this._inner as Deconstructor<I>).bytes != null
    ? this._previous.bytes + (this._inner as Deconstructor<I>).bytes!
    : undefined

  readonly minBytes = this.bytes || this._previous.minBytes

  _fromBuffer(buffer: OutputBuffer, offset: number): Deconstruction<T> {
    const previousData = this._previous._fromBuffer(buffer, offset)
    const innerDeconstructor = this._isLate
      ? (this._inner as LateDeconstructor<P, I>)({ ...previousData })
      : (this._inner as Deconstructor<I>)

    const innerData = innerDeconstructor._fromBuffer(
      buffer,
      offset + previousData.bytesUsed
    )

    const value: any =
      this._fieldName != null
        ? {
            ...previousData.value,
            [this._fieldName!]: innerData.value
          }
        : { ...previousData.value }

    return {
      value,
      bytesUsed: previousData.bytesUsed + innerData.bytesUsed
    }
  }

  _offsetForField(fieldName: string): number | undefined {
    if (this._fieldName != null && fieldName === this._fieldName) {
      return this._previous.bytes
    } else {
      return this._previous._offsetForField(fieldName)
    }
  }
}
