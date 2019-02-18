import * as fm from './fraction'

const generate = infixArr => {
  let postFix = []
  let operationsStack = []
  const operators = {
    "/": {precedence: 3}, "*": {precedence: 3},
    "+": {precedence: 2}, "-": {precedence: 2}
  };

  for (let i = 0; i < infixArr.length; i++) {
    let token = infixArr[i]
    if (token.type === 'operand') {
      postFix.push(token)
    } else {
      let op1 = token
      let op2 = operationsStack[operationsStack.length - 1]
      while (
        op2 && operators[op1.value].precedence <= operators[op2.value].precedence) {
        postFix.push(operationsStack.pop())
        op2 = operationsStack[operationsStack.length - 1];
      }
      operationsStack.push(op1)
    }
  }
  while (operationsStack.length > 0) {
    postFix.push(operationsStack.pop())
  }

  return postFix
}

const parse = postfixArr => {
  let res = {
    numinator: 1,
    denominator: 1
  };

  const operators = {
    '+': (x, y) => fm.sum(x, y),
    '-': (x, y) => fm.sub(x, y),
    '*': (x, y) => fm.multiply(x, y),
    '/': (x, y) => fm.divide(x, y)
  };

  let stack = []
  postfixArr.forEach(token => {
    if (token.type === 'operation') {
      let [y, x] = [stack.pop(), stack.pop()]
      stack.push(operators[token.value](x, y))
    } else {
      stack.push(token)
    }
  });
  res = stack.pop()
  return res
}

const calculate = infix => {
  return parse(generate(infix))
}

export {calculate}
