const isNumeric = num => {
  return !isNaN(parseFloat(num)) && isFinite(num)
}

const findNOK = arr => {
  let nok = Math.abs(arr[0])
  for (let i = 1; i < arr.length; i++) {
    let current = Math.abs(arr[i])
    let next = nok
    while (nok && current) {
      nok > current ? nok %= current : current %= nok
    }
    nok = Math.abs(next * arr[i]) / (nok + current)
  }
  return nok
}

export {isNumeric, findNOK}
