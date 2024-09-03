// Squelch warnings of image imports from your assets dir
declare module '$lib/images/*' {
  var meta
  export default meta
}
