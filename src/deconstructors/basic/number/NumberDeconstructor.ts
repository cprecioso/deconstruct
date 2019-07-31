import { Deconstruction, Deconstructor } from "../../../types"
import { OutputBuffer } from "../../../util"

export class NumberDeconstructor<T> implements Deconstructor<T> {
  constructor(
    public readonly bytes: number,
    protected _fn: (this: Buffer, offset: number) => T
  ) {}

  readonly minBytes = this.bytes

  _fromBuffer(buffer: OutputBuffer, offset: number): Deconstruction<T> {
    return {
      value: this._fn.call(buffer, offset),
      bytesUsed: this.bytes
    }
  }
}
