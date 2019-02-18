<template>
  <div>
    <div class="title">Калькулятор дробей</div>
    <div class="flex flex-center">
      <template v-for="(item, index) in fullInputString">
        <template v-if="item.type === 'operand'">
          <fraction :id="index" :isResult="item.isResult" :numinator="item.numinator" :denominator="item.denominator" @fraction-change="onChangeFractions"></fraction>
        </template>
        <template v-else-if="item.type === 'operation'">{{ item.isResult }}
          <operation :id="index" :type="item.value" @changeOperation="onChangeOperation"></operation>
        </template>
      </template>
    </div>
    <button class="calc__btn-add" @click="addFraction">Add</button>
    <div v-if="showWarning">
      <span>Необходимо ввести всё правильно</span>
    </div>
  </div>
</template>

<script>
  import fraction from './fraction.vue'
  import operation from './operation.vue'

  import * as rpn from '../../helpers/rpn'
  import * as helpers from '../../helpers/math'

  export default {
    name: 'calculator',
    data() {
      return {
        inputString: [],
        resultString: [],
        showWarning: false
      }
    },

    components: {
      fraction,
      operation
    },

    mounted() {
      this.initComponent()
    },

    computed: {
      fullInputString() {
        return this.inputString.concat(this.resultString)
      }
    },
    methods: {
      onChangeOperation(evt) {
        this.inputString[evt.id].value = evt.newOp
        this.checkForUpdate()
      },

      onChangeFractions(evt) {
        if (evt.part === 'numinator') {
          this.inputString[evt.id].numinator = evt.newValue
        } else if (evt.part === 'denominator') {
          this.inputString[evt.id].denominator = evt.newValue
        }
        this.checkForUpdate()
      },

      generateDefaultFraction(isResult = false) {
        return {
          numinator: '',
          denominator: '',
          type: 'operand',
          isResult: isResult
        };
      },
      generateDefaultOperation(op) {
        return {
          type: 'operation',
          value: op
        };
      },
      addFraction() {
        this.inputString.push(this.generateDefaultOperation('+'))
        this.inputString.push(this.generateDefaultFraction())
        this.checkForUpdate()
      },
      checkForUpdate() {
        const operands = this.inputString.filter(item => item.type === 'operand')
        for (let i = 0; i < operands.length; i++) {
          let isFractionOk =
            helpers.isNumeric(operands[i].numinator)
            && helpers.isNumeric(operands[i].denominator)
            && +operands[i].denominator !== 0
          if (!isFractionOk) {
            this.reCalcResult()
            return
          }
          if (i === operands.length - 1) {
            this.reCalcResult(false)
          }
        }
      },
      reCalcResult(isReset = true) {
        this.showWarning = isReset
        if (!isReset) {
          const result = rpn.calculate(this.inputString)
          this.setResult(result.numinator, result.denominator)
        } else {
          this.setResult()
        }
      },
      setResult(numinator = '', denominator = '') {
        if (numinator !== '' && denominator !== '' && numinator === denominator){
          numinator = 1
          denominator = 1
        }
        this.resultString = this.resultString.map(item => {
          if (item.type === 'operand') {
            item.numinator = numinator + ''
            item.denominator = numinator !== 0 ? denominator  + '' : '0'
          }
          return item
        });
      },
      initComponent() {
        this.inputString.push(this.generateDefaultFraction())
        this.inputString.push(this.generateDefaultOperation('+'))
        this.inputString.push(this.generateDefaultFraction())
        this.resultString.push(this.generateDefaultOperation('='))
        this.resultString.push(this.generateDefaultFraction(true))
        this.checkForUpdate()
      }
    },
  }
</script>

<style lang="scss">
  .calc {
    &__btn-add {
      margin: 15px 0;
      border: none;
      background: #fff;
      padding: 8px 20px;
      border: 1px solid #bdc3c7;
      cursor: pointer;
    }
  }
</style>
