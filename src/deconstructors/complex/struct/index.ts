import { EmptyStructDeconstructor } from "./empty"
import { StructDeconstructor as _StructDeconstructor } from "./wrapper"

/**
 * Dynamic deconstructor that represents a struct
 *
 * @public
 */
export type StructDeconstructor<
  T extends Record<string, any>
> = _StructDeconstructor<T>

/**
 * Provides facilities to extract an object of different, named values.
 *
 * @public
 */
export function struct(): StructDeconstructor<{}> {
  return new _StructDeconstructor(new EmptyStructDeconstructor())
}
