import { Deconstructor } from "../../types"
import { struct, StructDeconstructor } from "./struct"
import { boolean } from "../simple"

export function flags<T extends string>(
  flagNames: readonly T[]
): Deconstructor<Record<T, boolean>> {
  return flagNames.reduce(
    (struct, flagName) => struct.field(flagName, boolean()),
    struct() as StructDeconstructor<Record<T, boolean>>
  )
}
