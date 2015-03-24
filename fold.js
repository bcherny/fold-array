const _ = require ('lodash')


function fold (as) {

  return as

    // convert non-leaf sequence members to "-"
    .map (function (a, n) {
      return (as[n-1] + 1 == a) && (as[n+1] - 1 == a) ? '-' : a
    })

    // drop sequential "-"s
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



function sub (string, map) {
  return Object
    .keys(map)
    .reduce(function (prev, key) {
      return prev.replace(new RegExp(key, 'g'), map[key])
    }, string)
}

const map = {
  0: 'S',
  1: 'M',
  2: 'T',
  3: 'W',
  4: 'T',
  5: 'F',
  6: 'S'
}

assert(sub(fold([1,2,3,4,5]), map), 'M-F')
assert(sub(fold([1,2,3,5]), map), 'M-W,F')
assert(sub(fold([1,3,5,6]), map), 'M,W,F,S')
assert(sub(fold([1,3,5]), map), 'M,W,F')



//////////////////////////



function assert (a, b) {
  if (a == b) {
    console.info('assertion successful!', a, '==', b)
  } else {
    console.error('assertion failed!', a, '!=', b)
  }
}
