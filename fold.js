const _ = require ('lodash')


function fold (as) {

  return as
    .map (function (a, n) {
      return (as[n-1] + 1 == a) && (as[n+1] - 1 == a) ? '-' : a
    })
    .reduce (function (prev, cur) {
      return _.tail(prev) == cur ? prev : prev.concat(cur)
    }, [])
    .join (',')
    .replace(/,-,/g, '-')

}


assert(fold([1,2,3,4,5]), '1-5')
assert(fold([1,2,3,5]), '1-3,5')
assert(fold([1,3,5,6]), '1,3,5,6')
assert(fold([1,3,5]), '1,3,5')


function assert (a, b) {
  if (a == b) {
    console.info('assertion successful!', a, '==', b)
  } else {
    console.error('assertion failed!', a, '!=', b)
  }
}