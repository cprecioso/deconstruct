import { Deconstruction, Deconstructor } from "../../types"
import { OutputBuffer } from "../../util"

/**
 * Creates a new Deconstructor that transforms the value returned by the previous one
 *
 * If you're employing this with the same function a lot, it might be worth it for you (performance-wise) to implement it as a true Deconstructor
 */
export function transform<T, U>(
  inner: Deconstructor<T>,
  transformFn: (deconstruction: Deconstruction<T>) => U
): Deconstructor<U> {
  return new TransformDeconstrutor(inner, transformFn)
}

class TransformDeconstrutor<T, U> implements Deconstructor<U> {
  constructor(
    public readonly inner: Deconstructor<T>,
    protected readonly _transformFn: (deconstruction: Deconstruction<T>) => U
  ) {}

  readonly bytes = this.inner.bytes
  readonly minBytes = this.inner.minBytes

  _fromBuffer(buffer: OutputBuffer, offset: number): Deconstruction<U> {
    const prev = this.inner._fromBuffer(buffer, offset)
    const newValue = this._transformFn({ ...prev })
    return { value: newValue, bytesUsed: prev.bytesUsed }
  }
}
