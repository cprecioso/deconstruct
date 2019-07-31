import { Deconstructor } from "../../types"
import { NumberDeconstructor } from "./NumberDeconstructor"

const b = Buffer.prototype

const _u8: Deconstructor<number> = new NumberDeconstructor(1, b.readUInt8)
/** Extracts an unsigned 8-bit integer */
export const u8 = () => _u8

const _i8: Deconstructor<number> = new NumberDeconstructor(1, b.readInt8)
/** Extracts an signed 8-bit integer */
export const i8 = () => _i8

const _i16LE: Deconstructor<number> = new NumberDeconstructor(2, b.readInt16LE)
/** Extracts an little-endian signed 16-bit integer */
export const i16LE = () => _i16LE

const _i16BE: Deconstructor<number> = new NumberDeconstructor(2, b.readInt16BE)
/** Extracts an big-endian signed 16-bit integer */
export const i16BE = () => _i16BE

const _u16LE: Deconstructor<number> = new NumberDeconstructor(2, b.readUInt16LE)
/** Extracts an little-endian unsigned 16-bit integer */
export const u16LE = () => _u16LE

const _u16BE: Deconstructor<number> = new NumberDeconstructor(2, b.readUInt16BE)
/** Extracts an big-endian unsigned 16-bit integer */
export const u16BE = () => _u16BE

const _i32LE: Deconstructor<number> = new NumberDeconstructor(4, b.readInt32LE)
/** Extracts an little-endian signed 32-bit integer */
export const i32LE = () => _i32LE

const _i32BE: Deconstructor<number> = new NumberDeconstructor(4, b.readInt32BE)
/** Extracts an big-endian signed 32-bit integer */
export const i32BE = () => _i32BE

const _u32LE: Deconstructor<number> = new NumberDeconstructor(4, b.readUInt32LE)
/** Extracts an little-endian unsigned 32-bit integer */
export const u32LE = () => _u32LE

const _u32BE: Deconstructor<number> = new NumberDeconstructor(4, b.readUInt32BE)
/** Extracts an big-endian unsigned 32-bit integer */
export const u32BE = () => _u32BE

const _f32LE: Deconstructor<number> = new NumberDeconstructor(4, b.readFloatLE)
/** Extracts an little-endian 32-bit float */
export const f32LE = () => _f32LE

const _f32BE: Deconstructor<number> = new NumberDeconstructor(4, b.readFloatBE)
/** Extracts an big-endian 32-bit float */
export const f32BE = () => _f32BE

const _f64LE: Deconstructor<number> = new NumberDeconstructor(8, b.readDoubleLE)
/** Extracts an little-endian 64-bit float (double) */
export const f64LE = () => _f64LE

const _f64BE: Deconstructor<number> = new NumberDeconstructor(8, b.readDoubleBE)
/** Extracts an big-endian 64-bit float (double) */
export const f64BE = () => _f64BE
