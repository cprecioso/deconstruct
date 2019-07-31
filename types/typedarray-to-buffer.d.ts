declare module "typedarray-to-buffer" {
  namespace typedarrayToBuffer {
    type TypedArray =
      | Int8Array
      | Int16Array
      | Int32Array
      | Uint8Array
      | Uint8ClampedArray
      | Uint16Array
      | Uint32Array
      | Float32Array
      | Float64Array

    type AcceptedInputValue =
      | TypedArray
      | ((typeof Buffer.from) extends (v: infer T) => Buffer ? T : never)
  }

  function typedarrayToBuffer(
    value: typedarrayToBuffer.AcceptedInputValue
  ): Buffer

  export = typedarrayToBuffer
}
