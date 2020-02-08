import { Deconstructor } from "../../types"
import { InputBuffer } from "../../util"
import { transform } from "../complex"
import { rawUntil } from "./rawUntil"

/** Read a string until it hits a specific value */
export function stringUntil(
  value: InputBuffer,
  encoding?: BufferEncoding
): Deconstructor<string> {
  return transform(rawUntil(value), deconstruction =>
    deconstruction.value.toString(encoding)
  )
}
