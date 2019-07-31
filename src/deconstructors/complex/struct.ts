import { OutputBuffer } from "../../Buffer"
import { Deconstruction, Deconstructor } from "../../types"
import { empty, skip } from "../basic"

type LateDeconstructor<T extends {}, U> = (
  data: T,
  bytesUsed: number
) => Deconstructor<U>

type Add<T extends {}, F extends string, U> = T & { [K in F]: U }

/** Provides facilities to extract an object of different, named values. */
export function struct(): PublicStructDeconstructor<{}> {
  return new StructDeconstructor(
    new EmptyStructDeconstructor(),
    null,
    false,
    empty(null)
  )
}

interface BasicStructDeconstructor<T extends {}> extends Deconstructor<T> {
  _offsetForField(fieldName: string): number | undefined
}

interface PublicStructDeconstructor<T> extends Deconstructor<T> {
  /** Find out where a given field starts */
  offsetForField(fieldName: keyof T): number | undefined
  /** Add a field to the struct, extracting the following bytes with the given Deconstructor */
  field<F extends string, U>(
    fieldName: F,
    inner: Deconstructor<U>
  ): PublicStructDeconstructor<Add<T, F, U>>
  /** Check that the following bytes are extractable with the given Deconstructor */
  check(inner: Deconstructor<any>): PublicStructDeconstructor<T>
  /** Ignore the following number of bytes */
  skip(bytes: number): PublicStructDeconstructor<T>
  /**
   * Add a field to the struct, whose Deconstructor depends of previous values.
   *
   * Combines `struct.field()` and `after()`
   */
  thenField<F extends string, U>(
    fieldName: F,
    innerFn: LateDeconstructor<T, U>
  ): PublicStructDeconstructor<Add<T, F, U>>
  /**
   * Check that the following bytes are extractable, with the Deconstructor depending on previous values.
   *
   * Combines `struct.check()` and `after()`
   */
  thenCheck(innerFn: LateDeconstructor<T, any>): PublicStructDeconstructor<T>
  /**
   * Ignore the following a number of bytes, depending on previous values.
   *
   * Combines `struct.skip()` and `after()`
   */
  thenSkip(innerFn: (data: T) => number): PublicStructDeconstructor<T>
}

export { PublicStructDeconstructor as StructDeconstructor }

class StructDeconstructor<
  P extends {},
  F extends string | undefined | null,
  I,
  T extends P = F extends string ? Add<P, F, I> : P
> implements BasicStructDeconstructor<T>, PublicStructDeconstructor<T> {
  constructor(
    protected readonly _previous: BasicStructDeconstructor<P>,
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

  field<F extends string, U>(
    fieldName: F,
    inner: Deconstructor<U>
  ): PublicStructDeconstructor<Add<T, F, U>> {
    return new StructDeconstructor(this, fieldName, false, inner)
  }

  check(inner: Deconstructor<any>): PublicStructDeconstructor<T> {
    return new StructDeconstructor(this, null, false, inner)
  }

  skip(bytes: number): PublicStructDeconstructor<T> {
    return this.check(skip(bytes))
  }

  thenField<F extends string, U>(
    fieldName: F,
    innerFn: LateDeconstructor<T, U>
  ): PublicStructDeconstructor<Add<T, F, U>> {
    return new StructDeconstructor(this, fieldName, true, innerFn)
  }

  thenCheck(innerFn: LateDeconstructor<T, any>): PublicStructDeconstructor<T> {
    return new StructDeconstructor(this, null, true, innerFn)
  }

  thenSkip(innerFn: (data: T) => number): PublicStructDeconstructor<T> {
    return this.thenCheck(data => skip(innerFn(data)))
  }

  offsetForField(fieldName: keyof P): number | undefined {
    return this._offsetForField(fieldName as string)
  }

  _fromBuffer(buffer: OutputBuffer, offset: number): Deconstruction<T> {
    const previousData = this._previous._fromBuffer(buffer, offset)
    const innerDeconstructor = this._isLate
      ? (this._inner as LateDeconstructor<P, I>)(
          previousData.value,
          previousData.bytesUsed
        )
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

class EmptyStructDeconstructor implements BasicStructDeconstructor<{}> {
  readonly bytes = 0
  readonly minBytes = 0
  _fromBuffer() {
    return { value: {}, bytesUsed: 0 }
  }
  _offsetForField() {
    return undefined
  }
}
