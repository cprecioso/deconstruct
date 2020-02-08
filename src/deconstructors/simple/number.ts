import { Deconstruction, Deconstructor, StaticDeconstructor } from "../../types"
import { makeStatic, OutputBuffer } from "../../util"
import pure from "../../util/pure.macro"

class NumberDeconstructor<T> implements Deconstructor<T> {
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

const b = pure(Buffer.prototype)

/** Extracts an unsigned 8-bit integer */
export const u8: StaticDeconstructor<number> = makeStatic(
  new NumberDeconstructor(1, b.readUInt8)
)

/** Extracts an signed 8-bit integer */
export const i8: StaticDeconstructor<number> = makeStatic(
  new NumberDeconstructor(1, b.readInt8)
)

/** Extracts an little-endian signed 16-bit integer */
export const i16LE: StaticDeconstructor<number> = makeStatic(
  new NumberDeconstructor(2, b.readInt16LE)
)

/** Extracts an big-endian signed 16-bit integer */
export const i16BE: StaticDeconstructor<number> = makeStatic(
  new NumberDeconstructor(2, b.readInt16BE)
)

/** Extracts an little-endian unsigned 16-bit integer */
export const u16LE: StaticDeconstructor<number> = makeStatic(
  new NumberDeconstructor(2, b.readUInt16LE)
)

/** Extracts an big-endian unsigned 16-bit integer */
export const u16BE: StaticDeconstructor<number> = makeStatic(
  new NumberDeconstructor(2, b.readUInt16BE)
)

/** Extracts an little-endian signed 32-bit integer */
export const i32LE: StaticDeconstructor<number> = makeStatic(
  new NumberDeconstructor(4, b.readInt32LE)
)

/** Extracts an big-endian signed 32-bit integer */
export const i32BE: StaticDeconstructor<number> = makeStatic(
  new NumberDeconstructor(4, b.readInt32BE)
)

/** Extracts an little-endian unsigned 32-bit integer */
export const u32LE: StaticDeconstructor<number> = makeStatic(
  new NumberDeconstructor(4, b.readUInt32LE)
)

/** Extracts an big-endian unsigned 32-bit integer */
export const u32BE: StaticDeconstructor<number> = makeStatic(
  new NumberDeconstructor(4, b.readUInt32BE)
)

/** Extracts an little-endian 32-bit float */
export const f32LE: StaticDeconstructor<number> = makeStatic(
  new NumberDeconstructor(4, b.readFloatLE)
)

/** Extracts an big-endian 32-bit float */
export const f32BE: StaticDeconstructor<number> = makeStatic(
  new NumberDeconstructor(4, b.readFloatBE)
)

/** Extracts an little-endian 64-bit float (double) */
export const f64LE: StaticDeconstructor<number> = makeStatic(
  new NumberDeconstructor(8, b.readDoubleLE)
)

/** Extracts an big-endian 64-bit float (double) */
export const f64BE: StaticDeconstructor<number> = makeStatic(
  new NumberDeconstructor(8, b.readDoubleBE)
)

/** Extracts an little-endian signed 64-bit BigInt */
export const i64LE: StaticDeconstructor<bigint> = makeStatic(
  new NumberDeconstructor(8, b.readBigInt64LE)
)

/** Extracts an big-endian signed 64-bit BigInt */
export const i64BE: StaticDeconstructor<bigint> = makeStatic(
  new NumberDeconstructor(8, b.readBigInt64BE)
)

/** Extracts an little-endian unsigned 64-bit BigInt */
export const u64LE: StaticDeconstructor<bigint> = makeStatic(
  new NumberDeconstructor(8, b.readBigUInt64LE)
)

/** Extracts an big-endian unsigned 64-bit BigInt */
export const u64BE: StaticDeconstructor<bigint> = makeStatic(
  new NumberDeconstructor(8, b.readBigUInt64BE)
)
