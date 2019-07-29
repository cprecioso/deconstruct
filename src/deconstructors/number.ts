import { Deconstruction, Deconstructor } from "../types"

class NumberDeconstructor implements Deconstructor<number> {
  constructor(
    public readonly bytes: number,
    protected _fn: (this: Buffer, offset: number, byteLength: number) => number
  ) {}

  readonly minBytes = this.bytes

  _fromBuffer(buffer: Buffer, offset: number): Deconstruction<number> {
    return {
      value: this._fn.call(buffer, offset, this.bytes),
      bytesUsed: this.bytes
    }
  }
}

const b = Buffer.prototype

const _u8 = new NumberDeconstructor(1, b.readUIntLE)
export const u8 = () => _u8

const _i8 = new NumberDeconstructor(1, b.readIntLE)
export const i8 = () => _i8

const _i16LE = new NumberDeconstructor(2, b.readIntLE)
export const i16LE = () => _i16LE

const _i16BE = new NumberDeconstructor(2, b.readIntBE)
export const i16BE = () => _i16BE

const _u16LE = new NumberDeconstructor(2, b.readUIntLE)
export const u16LE = () => _u16LE

const _u16BE = new NumberDeconstructor(2, b.readUIntBE)
export const u16BE = () => _u16BE

const _i32LE = new NumberDeconstructor(4, b.readIntLE)
export const i32LE = () => _i32LE

const _i32BE = new NumberDeconstructor(4, b.readIntBE)
export const i32BE = () => _i32BE

const _u32LE = new NumberDeconstructor(4, b.readUIntLE)
export const u32LE = () => _u32LE

const _u32BE = new NumberDeconstructor(4, b.readUIntBE)
export const u32BE = () => _u32BE

const _floatLE = new NumberDeconstructor(4, b.readFloatLE)
export const floatLE = () => _floatLE

const _floatBE = new NumberDeconstructor(4, b.readFloatBE)
export const floatBE = () => _floatBE

const _doubleLE = new NumberDeconstructor(8, b.readDoubleLE)
export const doubleLE = () => _doubleLE

const _doubleBE = new NumberDeconstructor(8, b.readDoubleBE)
export const doubleBE = () => _doubleBE
