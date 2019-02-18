import * as math from './math'

const returnFraction = {
  type: 'operand',
  isResult: false,
  numinator: '',
  denominator: ''
}

const multiply = (x,y) => {
  returnFraction.numinator = +x.numinator * +y.numinator
  returnFraction.denominator = +x.denominator * +y.denominator
  return returnFraction
}

const divide = (x,y) => {
  returnFraction.numinator = +x.numinator * +y.denominator
  returnFraction.denominator = +x.denominator * +y.numinator
  return returnFraction
}

const sum = (x, y) => {
  const nok = math.findNOK([x.denominator, y.denominator])
  returnFraction.numinator = +x.numinator*(nok/x.denominator) + +y.numinator*(nok/y.denominator)
  returnFraction.denominator = nok
  return returnFraction

}

const sub = (x, y) => {
  const nok = math.findNOK([x.denominator, y.denominator])
  returnFraction.numinator = +x.numinator*(nok/x.denominator) - +y.numinator*(nok/y.denominator)
  returnFraction.denominator = nok
  return returnFraction
}

export {sum, multiply, divide, sub}
