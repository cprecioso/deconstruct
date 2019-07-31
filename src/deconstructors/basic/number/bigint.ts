import { Deconstructor } from "../../../types"
import { NumberDeconstructor } from "./NumberDeconstructor"

const b = Buffer.prototype

const _i64LE: Deconstructor<bigint> = new NumberDeconstructor(
  8,
  b.readBigInt64LE
)
/** Extracts an little-endian signed 64-bit BigInt */
export const i64LE = () => _i64LE

const _i64BE: Deconstructor<bigint> = new NumberDeconstructor(
  8,
  b.readBigInt64BE
)
/** Extracts an big-endian signed 64-bit BigInt */
export const i64BE = () => _i64BE

const _u64LE: Deconstructor<bigint> = new NumberDeconstructor(
  8,
  b.readBigUInt64LE
)
/** Extracts an little-endian unsigned 64-bit BigInt */
export const u64LE = () => _u64LE

const _u64BE: Deconstructor<bigint> = new NumberDeconstructor(
  8,
  b.readBigUInt64BE
)
/** Extracts an big-endian unsigned 64-bit BigInt */
export const u64BE = () => _u64BE
