function asyncIdentity(x, cb) {
    setTimeout(() => {
      console.log('returning x =', x)
      cb(x)
    }, 0)
  }
  const result = asyncIdentity('foo', (arg) => {
    console.log('callback value =', arg)
  })
  console.log('result =', result)
  