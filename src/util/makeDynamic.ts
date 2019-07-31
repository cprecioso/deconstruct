import { Deconstructor, StaticDeconstructor } from "../types"

export function makeDynamic<T>(
  dec: Deconstructor<T>
): StaticDeconstructor<T, () => Deconstructor<T>> {
  return Object.assign(() => dec, {
    bytes: dec.bytes,
    minBytes: dec.minBytes,
    _fromBuffer: dec._fromBuffer.bind(dec)
  })
}
