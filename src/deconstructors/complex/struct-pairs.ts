import {
  ComplexDeconstructor,
  Deconstruction,
  Deconstructor
} from "../../types"
import { OutputBuffer } from "../../util"

type DeconstructorPair<K extends string = string, T = any> = readonly [
  K,
  Deconstructor<T>
]

type Keys<T extends DeconstructorPair> = T extends DeconstructorPair<infer U>
  ? U
  : never

type Values<T extends DeconstructorPair, K extends string = Keys<T>> = {
  [P in K]: T extends DeconstructorPair<P, infer V> ? V : never
}

/** Returns an object with the given key-value pairs */
export function structPairs<T extends DeconstructorPair>(
  pairs: readonly T[]
): ComplexDeconstructor<Values<T>, Keys<T>> {
  return new StructPairsDeconstructor(pairs)
}

class StructPairsDeconstructor<T extends DeconstructorPair>
  implements ComplexDeconstructor<Values<T>, Keys<T>> {
  constructor(protected _pairs: readonly T[]) {}

  readonly bytes = this._pairs.reduce((sum, cur) => {
    const bytes = cur[1].bytes
    return sum == null || bytes == null ? undefined : sum + bytes
  }, 0 as number | undefined)

  readonly minBytes = this._pairs.reduce((sum, cur) => sum + cur[1].minBytes, 0)

  _fromBuffer(buffer: OutputBuffer, offset: number): Deconstruction<Values<T>> {
    let currentOffset = offset
    const result: Partial<Values<T>> = {}

    for (const [key, deconstructor] of this._pairs) {
      const { bytesUsed, value } = deconstructor._fromBuffer(
        buffer,
        currentOffset
      )
      currentOffset += bytesUsed
      result[key as Keys<T>] = value
    }

    return { bytesUsed: currentOffset, value: result as Values<T> }
  }

  offsetForElement(key: Keys<T>): number | undefined {
    let offset = 0
    for (const pair of this._pairs) {
      if (pair[0] === key) return offset
      if (pair[1].bytes == null) return undefined
      offset += pair[1].bytes
    }
    return undefined
  }
}
