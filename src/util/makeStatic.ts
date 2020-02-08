import { Deconstructor, StaticDeconstructor } from "../types"
import pure from "./pure.macro"

const _makeStatic = <T>(
  dec: Deconstructor<T>
): StaticDeconstructor<T, () => Deconstructor<T>> =>
  Object.assign(() => dec, {
    bytes: dec.bytes,
    minBytes: dec.minBytes,
    _fromBuffer: dec._fromBuffer.bind(dec)
  })

export const makeStatic: typeof _makeStatic = deconstructor =>
  pure(_makeStatic(deconstructor))
