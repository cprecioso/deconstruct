import { ComplexDeconstructor } from "../../types"
import { boolean } from "../simple"
import { structPairs } from "./struct-pairs"

export function flags<T extends string>(
  flagNames: readonly T[]
): ComplexDeconstructor<Record<T, boolean>, T> {
  return structPairs(flagNames.map(flagName => [flagName, boolean] as const))
}
