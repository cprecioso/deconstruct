import { Deconstructor, StructDeconstructor } from "../types"
import { skip } from "./skip"

export function struct(): StructDeconstructor<{}> {
  return new _StructDeconstructor([])
}

interface Inner {
  fieldName: string | null
  deconstructor: Deconstructor<unknown>
}

class _StructDeconstructor<T extends {}> implements StructDeconstructor<T> {
  constructor(protected readonly _inners: ReadonlyArray<Inner>) {}

  get bytes() {
    let sum = 0
    for (let i = 0; i < this._inners.length; i++)
      sum += this._inners[i].deconstructor.bytes
    return sum
  }

  _fromBuffer(buffer: Buffer, offset: number) {
    const res: Partial<T> = {}
    let accumulatedOffset = offset

    for (let i = 0; i < this._inners.length; i++) {
      const { fieldName, deconstructor: inner } = this._inners[i]
      const deconstructResult = inner._fromBuffer(buffer, accumulatedOffset)
      if (fieldName != null) (res as any)[fieldName] = deconstructResult
      accumulatedOffset += inner.bytes
    }

    return res as T
  }

  field<P extends string, V>(
    fieldName: P | null,
    deconstructor: Deconstructor<V>
  ): _StructDeconstructor<T & { [K in P]: V }> {
    return new _StructDeconstructor([
      ...this._inners,
      { fieldName, deconstructor }
    ])
  }

  check(inner: Deconstructor<any>) {
    return this.field(null, inner)
  }

  skip(bytes: number) {
    return this.check(skip(bytes))
  }
}
