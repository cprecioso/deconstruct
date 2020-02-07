import { Deconstructor, StaticDeconstructor } from "../types"
import pure from "./pure.macro"

const _makeDynamic = <T>(
  dec: Deconstructor<T>
): StaticDeconstructor<T, () => Deconstructor<T>> =>
  Object.assign(() => dec, {
    bytes: dec.bytes,
    minBytes: dec.minBytes,
    _fromBuffer: dec._fromBuffer.bind(dec)
  })

export const makeDynamic = <T extends Deconstructor<any>>(deconstructor: T) =>
  pure(_makeDynamic(deconstructor))
