import { Deconstruction, Deconstructor } from "../types"

class NumberDeconstructor<T extends bigint | number>
  implements Deconstructor<T> {
  constructor(
    public readonly bytes: number,
    protected _fn: (this: Buffer, offset: number) => T
  ) {}

  readonly minBytes = this.bytes

  _fromBuffer(buffer: Buffer, offset: number): Deconstruction<T> {
    return {
      value: this._fn.call(buffer, offset),
      bytesUsed: this.bytes
    }
  }
}

const b = Buffer.prototype

const _u8: Deconstructor<number> = new NumberDeconstructor(1, b.readUInt8)
/** Extracts an unsigned 8-byte integer */
export const u8 = () => _u8

const _i8: Deconstructor<number> = new NumberDeconstructor(1, b.readInt8)
/** Extracts an signed 8-byte integer */
export const i8 = () => _i8

const _i16LE: Deconstructor<number> = new NumberDeconstructor(2, b.readInt16LE)
/** Extracts an little-endian signed 16-byte integer */
export const i16LE = () => _i16LE

const _i16BE: Deconstructor<number> = new NumberDeconstructor(2, b.readInt16BE)
/** Extracts an big-endian signed 16-byte integer */
export const i16BE = () => _i16BE

const _u16LE: Deconstructor<number> = new NumberDeconstructor(2, b.readUInt16LE)
/** Extracts an little-endian unsigned 16-byte integer */
export const u16LE = () => _u16LE

const _u16BE: Deconstructor<number> = new NumberDeconstructor(2, b.readUInt16BE)
/** Extracts an big-endian unsigned 16-byte integer */
export const u16BE = () => _u16BE

const _i32LE: Deconstructor<number> = new NumberDeconstructor(4, b.readInt32LE)
/** Extracts an little-endian signed 32-byte integer */
export const i32LE = () => _i32LE

const _i32BE: Deconstructor<number> = new NumberDeconstructor(4, b.readInt32BE)
/** Extracts an big-endian signed 32-byte integer */
export const i32BE = () => _i32BE

const _u32LE: Deconstructor<number> = new NumberDeconstructor(4, b.readUInt32LE)
/** Extracts an little-endian unsigned 32-byte integer */
export const u32LE = () => _u32LE

const _u32BE: Deconstructor<number> = new NumberDeconstructor(4, b.readUInt32BE)
/** Extracts an big-endian unsigned 32-byte integer */
export const u32BE = () => _u32BE

const _i64LE: Deconstructor<bigint> = new NumberDeconstructor(
  8,
  b.readBigInt64LE
)
/** Extracts an little-endian signed 32-byte integer */
export const i64LE = () => _i64LE

const _i64BE: Deconstructor<bigint> = new NumberDeconstructor(
  8,
  b.readBigInt64BE
)
/** Extracts an big-endian signed 32-byte integer */
export const i64BE = () => _i64BE

const _u64LE: Deconstructor<bigint> = new NumberDeconstructor(
  8,
  b.readBigUInt64LE
)
/** Extracts an little-endian unsigned 32-byte integer */
export const u64LE = () => _u64LE

const _u64BE: Deconstructor<bigint> = new NumberDeconstructor(
  8,
  b.readBigUInt64BE
)
/** Extracts an big-endian unsigned 32-byte integer */
export const u64BE = () => _u64BE

const _floatLE: Deconstructor<number> = new NumberDeconstructor(
  4,
  b.readFloatLE
)
/** Extracts an little-endian float */
export const floatLE = () => _floatLE

const _floatBE: Deconstructor<number> = new NumberDeconstructor(
  4,
  b.readFloatBE
)
/** Extracts an big-endian float */
export const floatBE = () => _floatBE

const _doubleLE: Deconstructor<number> = new NumberDeconstructor(
  8,
  b.readDoubleLE
)
/** Extracts an little-endian double */
export const doubleLE = () => _doubleLE

const _doubleBE: Deconstructor<number> = new NumberDeconstructor(
  8,
  b.readDoubleBE
)
/** Extracts an big-endian double */
export const doubleBE = () => _doubleBE
