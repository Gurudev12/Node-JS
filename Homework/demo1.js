function identity (x) {
    console.log('x =', x)
    return x
  }
  const result = identity('foo')
  console.log('result =', result)
  
  const mapped = [1, 2, 3].map(identity)
  console.log('mapped =', mapped)
  