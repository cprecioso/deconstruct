export interface Deconstructor<T> {
  readonly bytes: number

  /**
   * @internal
   */
  _fromBuffer(buffer: Buffer, offset: number): T
}

export interface StructDeconstructor<T extends {}> extends Deconstructor<T> {
  field<P extends string, V>(
    name: P,
    deconstructor: Deconstructor<V>
  ): StructDeconstructor<T & { [K in P]: V }>
  field(name: null, deconstructor: Deconstructor<any>): StructDeconstructor<T>

  check(deconstructor: Deconstructor<any>): StructDeconstructor<T>

  skip(bytes: number): StructDeconstructor<T>
}
