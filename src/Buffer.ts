import typedarrayToBuffer from "typedarray-to-buffer"

export type InputBuffer = typedarrayToBuffer.AcceptedInputValue
export type OutputBuffer = Buffer

export function normalizeBuffer(input: InputBuffer): OutputBuffer {
  return typedarrayToBuffer(input)
}
