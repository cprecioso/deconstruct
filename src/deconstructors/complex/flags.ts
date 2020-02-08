import { ComplexDeconstructor } from "../../types"
import { boolean } from "../simple"
import { struct } from "./struct"

export function flags<T extends string>(
  flagNames: readonly T[]
): ComplexDeconstructor<Record<T, boolean>, T> {
  return flagNames.reduce(
    (struct, flagName) => struct.field(flagName, boolean()),
    struct()
  )
}
