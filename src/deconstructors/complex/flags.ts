import { ComplexDeconstructor } from "../../types"
import { boolean } from "../simple"
import { structPairs } from "./struct-pairs"

/** Lets you decode a series of `0`s and `1`s into a Record of `boolean`s */
export function flags<T extends string>(
  flagNames: readonly T[]
): ComplexDeconstructor<Record<T, boolean>, T> {
  return structPairs(flagNames.map(flagName => [flagName, boolean] as const))
}
