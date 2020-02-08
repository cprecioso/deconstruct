import {
  ComplexDeconstructor,
  Deconstruction,
  Deconstructor
} from "../../types"
import { OutputBuffer } from "../../util"

type DeconstructorPair<K extends string = string, V = any> = readonly [
  K,
  Deconstructor<V>
]
type ValueRecordFromDeconstructorPair<T extends DeconstructorPair> = {
  [P in T[0]]: T extends DeconstructorPair<P, infer V> ? V : never
}

/**
 * Returns an object with the given key-value pairs
 *
 * If you use TypeScript, add `as const` after the pairs array so you get type-checking for the resulting object.
 */
export function structPairs<T extends DeconstructorPair>(
  pairs: readonly T[]
): ComplexDeconstructor<ValueRecordFromDeconstructorPair<T>> {
  return new StructPairsDeconstructor(pairs)
}

class StructPairsDeconstructor<
  T extends DeconstructorPair,
  VR extends ValueRecordFromDeconstructorPair<
    T
  > = ValueRecordFromDeconstructorPair<T>
> implements ComplexDeconstructor<VR> {
  constructor(protected readonly _pairs: readonly T[]) {}

  readonly bytes = this._pairs.reduce((sum, cur) => {
    const bytes = cur[1].bytes
    return sum == null || bytes == null ? undefined : sum + bytes
  }, 0 as number | undefined)

  readonly minBytes = this._pairs.reduce((sum, cur) => sum + cur[1].minBytes, 0)

  _fromBuffer(buffer: OutputBuffer, offset: number): Deconstruction<VR> {
    let currentOffset = offset
    const result: Partial<VR> = {}

    for (const [key, deconstructor] of this._pairs) {
      const { bytesUsed, value } = deconstructor._fromBuffer(
        buffer,
        currentOffset
      )
      currentOffset += bytesUsed
      result[key as keyof VR] = value
    }

    return { bytesUsed: currentOffset, value: result as VR }
  }

  offsetForElement(key: keyof VR): number | undefined {
    let offset = 0
    for (const pair of this._pairs) {
      if (pair[0] === key) return offset
      if (pair[1].bytes == null) return undefined
      offset += pair[1].bytes
    }
    return undefined
  }
}
