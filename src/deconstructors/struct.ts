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

  bytes = (() => {
    let sum = 0
    for (let i = 0; i < this._inners.length; i++) {
      const innerBytes = this._inners[i].deconstructor.bytes
      if (!innerBytes) return undefined
      sum += innerBytes
    }
    return sum
  })()

  _fromBuffer(buffer: Buffer, offset: number) {
    const res: Partial<T> = {}
    let accumulatedOffset = offset

    for (let i = 0; i < this._inners.length; i++) {
      const { fieldName, deconstructor: inner } = this._inners[i]
      const deconstruction = inner._fromBuffer(buffer, accumulatedOffset)
      if (fieldName != null) (res as any)[fieldName] = deconstruction.value
      accumulatedOffset += deconstruction.bytesUsed
    }

    return { value: res as T, bytesUsed: accumulatedOffset - offset }
  }

  field<P extends string, V>(
    fieldName: P | null,
    deconstructor: Deconstructor<V>
  ): _StructDeconstructor<T & { [K in P]: V }> {
    if (fieldName != null) {
      for (let i = 0; i < this._inners.length; i++) {
        const inner = this._inners[i]
        if (inner.fieldName === fieldName)
          throw new Error("Repeated fieldName " + fieldName)
      }
    }

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
