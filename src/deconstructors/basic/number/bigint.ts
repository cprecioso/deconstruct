import { OutputBuffer } from "../../../Buffer"
import { makeDynamic } from "../../../hybrid-deconstructor"
import { NumberDeconstructor } from "./NumberDeconstructor"

// Adapted from nodejs core

function readBigUInt64LE(this: OutputBuffer, offset = 0) {
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

  return BigInt(lo) + (BigInt(hi) << 32n)
}

function readBigUInt64BE(this: OutputBuffer, offset = 0) {
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

  return (BigInt(hi) << 32n) + BigInt(lo)
}

function readBigInt64LE(this: OutputBuffer, offset = 0) {
  const first = this[offset]
  const last = this[offset + 7]

  const val =
    this[offset + 4] +
    this[offset + 5] * 2 ** 8 +
    this[offset + 6] * 2 ** 16 +
    (last << 24) // Overflow
  return (
    (BigInt(val) << 32n) +
    BigInt(
      first +
        this[++offset] * 2 ** 8 +
        this[++offset] * 2 ** 16 +
        this[++offset] * 2 ** 24
    )
  )
}

function readBigInt64BE(this: OutputBuffer, offset = 0) {
  const first = this[offset]
  const last = this[offset + 7]

  const val =
    (first << 24) + // Overflow
    this[++offset] * 2 ** 16 +
    this[++offset] * 2 ** 8 +
    this[++offset]
  return (
    (BigInt(val) << 32n) +
    BigInt(
      this[++offset] * 2 ** 24 +
        this[++offset] * 2 ** 16 +
        this[++offset] * 2 ** 8 +
        last
    )
  )
}

/** Extracts an little-endian signed 64-bit BigInt */
export const i64LE = makeDynamic(new NumberDeconstructor(8, readBigInt64LE))

/** Extracts an big-endian signed 64-bit BigInt */
export const i64BE = makeDynamic(new NumberDeconstructor(8, readBigInt64BE))

/** Extracts an little-endian unsigned 64-bit BigInt */
export const u64LE = makeDynamic(new NumberDeconstructor(8, readBigUInt64LE))

/** Extracts an big-endian unsigned 64-bit BigInt */
export const u64BE = makeDynamic(new NumberDeconstructor(8, readBigUInt64BE))
