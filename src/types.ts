/**
 * @internal
 */
export interface Deconstruction<T> {
  value: T
  bytesUsed: number
}

export interface Deconstructor<T> {
  readonly bytes?: number

  /**
   * @internal
   */
  _fromBuffer(buffer: Buffer, offset: number): Deconstruction<T>
}
