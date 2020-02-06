import { Deconstructor } from "../../types"
import { boolean } from "../basic"
import { struct, StructDeconstructor } from "./struct"

export function flags<T extends string>(
  flagNames: readonly T[]
): Deconstructor<Record<T, boolean>> {
  return flagNames.reduce(
    (struct, flagName) => struct.field(flagName, boolean()),
    struct() as StructDeconstructor<Record<T, boolean>>
  )
}
