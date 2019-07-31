import { InternalStructDeconstructor } from "./internal"

export class EmptyStructDeconstructor
  implements InternalStructDeconstructor<{}> {
  readonly bytes = 0
  readonly minBytes = 0

  _fromBuffer() {
    return { value: {}, bytesUsed: 0 }
  }

  _offsetForField() {
    return undefined
  }
}
