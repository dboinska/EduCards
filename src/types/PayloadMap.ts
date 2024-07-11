export type PayloadMap<M extends { [index: string]: any }> = {
  [Key in keyof M]: M[Key] extends undefined
    ? {
        type: Key
        payload: undefined
      }
    : {
        type: Key
        payload: M[Key]
      }
}
