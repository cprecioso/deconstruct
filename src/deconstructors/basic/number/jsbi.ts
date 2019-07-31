import JSBI from "jsbi"
import { Deconstructor } from "../../../types"
import { NumberDeconstructor } from "./NumberDeconstructor"

const big32 = JSBI.BigInt(32)

function readBigUInt64LE(this: Buffer, offset = 0) {
  const first = this[offset]
  const last = this[offset + 7]

  const lo =
    first +
    this[++offset] * 2 ** 8 +
    this[++offset] * 2 ** 16 +
    this[++offset] * 2 ** 24

  const hi =
    this[++offset] +
    this[++offset] * 2 ** 8 +
    this[++offset] * 2 ** 16 +
    last * 2 ** 24

  return JSBI.add(JSBI.BigInt(lo), JSBI.leftShift(JSBI.BigInt(hi), big32))
}

function readBigUInt64BE(this: Buffer, offset = 0) {
  const first = this[offset]
  const last = this[offset + 7]

  const hi =
    first * 2 ** 24 +
    this[++offset] * 2 ** 16 +
    this[++offset] * 2 ** 8 +
    this[++offset]

  const lo =
    this[++offset] * 2 ** 24 +
    this[++offset] * 2 ** 16 +
    this[++offset] * 2 ** 8 +
    last

  return JSBI.add(JSBI.leftShift(JSBI.BigInt(hi), big32), JSBI.BigInt(lo))
}

function readBigInt64LE(this: Buffer, offset = 0) {
  const first = this[offset]
  const last = this[offset + 7]

  const val =
    this[offset + 4] +
    this[offset + 5] * 2 ** 8 +
    this[offset + 6] * 2 ** 16 +
    (last << 24) // Overflow

  return JSBI.add(
    JSBI.leftShift(JSBI.BigInt(val), big32),
    JSBI.BigInt(
      first +
        this[++offset] * 2 ** 8 +
        this[++offset] * 2 ** 16 +
        this[++offset] * 2 ** 24
    )
  )
}

function readBigInt64BE(this: Buffer, offset = 0) {
  const first = this[offset]
  const last = this[offset + 7]

  const val =
    (first << 24) + // Overflow
    this[++offset] * 2 ** 16 +
    this[++offset] * 2 ** 8 +
    this[++offset]

  return JSBI.add(
    JSBI.leftShift(JSBI.BigInt(val), big32),
    JSBI.BigInt(
      this[++offset] * 2 ** 24 +
        this[++offset] * 2 ** 16 +
        this[++offset] * 2 ** 8 +
        last
    )
  )
}

const _i64LE_JSBI: Deconstructor<JSBI> = new NumberDeconstructor(
  8,
  readBigInt64LE
)
/** Extracts an little-endian signed 64-bit JSBI BigInt */
export const i64LE_JSBI = () => _i64LE_JSBI

const _i64BE_JSBI: Deconstructor<JSBI> = new NumberDeconstructor(
  8,
  readBigInt64BE
)
/** Extracts an big-endian signed 64-bit JSBI BigInt */
export const i64BE_JSBI = () => _i64BE_JSBI

const _u64LE_JSBI: Deconstructor<JSBI> = new NumberDeconstructor(
  8,
  readBigUInt64LE
)
/** Extracts an little-endian unsigned 64-bit JSBI BigInt */
export const u64LE_JSBI = () => _u64LE_JSBI

const _u64BE_JSBI: Deconstructor<JSBI> = new NumberDeconstructor(
  8,
  readBigUInt64BE
)
/** Extracts an big-endian unsigned 64-bit JSBI BigInt */
export const u64BE_JSBI = () => _u64BE_JSBI
