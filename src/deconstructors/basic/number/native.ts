import { StaticDeconstructor } from "../../../types"
import { makeDynamic } from "../../../util"
import { NumberDeconstructor } from "./NumberDeconstructor"

const b = Buffer.prototype

/** Extracts an unsigned 8-bit integer */
export const u8: StaticDeconstructor<number> = makeDynamic(
  new NumberDeconstructor(1, b.readUInt8)
)

/** Extracts an signed 8-bit integer */
export const i8: StaticDeconstructor<number> = makeDynamic(
  new NumberDeconstructor(1, b.readInt8)
)

/** Extracts an little-endian signed 16-bit integer */
export const i16LE: StaticDeconstructor<number> = makeDynamic(
  new NumberDeconstructor(2, b.readInt16LE)
)

/** Extracts an big-endian signed 16-bit integer */
export const i16BE: StaticDeconstructor<number> = makeDynamic(
  new NumberDeconstructor(2, b.readInt16BE)
)

/** Extracts an little-endian unsigned 16-bit integer */
export const u16LE: StaticDeconstructor<number> = makeDynamic(
  new NumberDeconstructor(2, b.readUInt16LE)
)

/** Extracts an big-endian unsigned 16-bit integer */
export const u16BE: StaticDeconstructor<number> = makeDynamic(
  new NumberDeconstructor(2, b.readUInt16BE)
)

/** Extracts an little-endian signed 32-bit integer */
export const i32LE: StaticDeconstructor<number> = makeDynamic(
  new NumberDeconstructor(4, b.readInt32LE)
)

/** Extracts an big-endian signed 32-bit integer */
export const i32BE: StaticDeconstructor<number> = makeDynamic(
  new NumberDeconstructor(4, b.readInt32BE)
)

/** Extracts an little-endian unsigned 32-bit integer */
export const u32LE: StaticDeconstructor<number> = makeDynamic(
  new NumberDeconstructor(4, b.readUInt32LE)
)

/** Extracts an big-endian unsigned 32-bit integer */
export const u32BE: StaticDeconstructor<number> = makeDynamic(
  new NumberDeconstructor(4, b.readUInt32BE)
)

/** Extracts an little-endian 32-bit float */
export const f32LE: StaticDeconstructor<number> = makeDynamic(
  new NumberDeconstructor(4, b.readFloatLE)
)

/** Extracts an big-endian 32-bit float */
export const f32BE: StaticDeconstructor<number> = makeDynamic(
  new NumberDeconstructor(4, b.readFloatBE)
)

/** Extracts an little-endian 64-bit float (double) */
export const f64LE: StaticDeconstructor<number> = makeDynamic(
  new NumberDeconstructor(8, b.readDoubleLE)
)

/** Extracts an big-endian 64-bit float (double) */
export const f64BE: StaticDeconstructor<number> = makeDynamic(
  new NumberDeconstructor(8, b.readDoubleBE)
)
