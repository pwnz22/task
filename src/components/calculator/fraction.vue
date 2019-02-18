<template>
  <div class="calc__inner">
    <input v-model="currentNuminator" class="calc__input" :readonly="isResult" @change="onChange('numinator')">
    <div class="calc__separate"></div>
    <input v-model="currentDenominator" class="calc__input" :readonly="isResult" @change="onChange('denominator')">
  </div>
</template>

<script>
  export default {
    name: 'fraction',
    props: {
      numinator: String,
      denominator: String,
      isResult: Boolean,
      id: Number
    },
    data() {
      return {
        currentNuminator: '',
        currentDenominator: ''
      }
    },
    watch: {
      numinator(){
        this.currentNuminator = this.numinator
      },
      denominator() {
        this.currentDenominator = this.denominator
      }
    },
    mounted(){
      this.currentNuminator = this.numinator
      this.currentDenominator = this.denominator
    },
    methods: {
      onChange(part) {
        if (!this.isResult) {
          let payload = {
            id: this.id,
            part: part,
            newValue: part === 'numinator' ? this.currentNuminator : this.currentDenominator
          };
          this.$emit('fraction-change', payload);
        }
      }
    }
  }
</script>

<style lang="scss">
  .calc {
    &__inner {
      width: 40px;
      height: 58px;
      padding-top: 0;
      padding-bottom: 0;
      line-height: 80px;
      max-width: 100%;
      border: 1px solid #bdc3c7;
      padding: 0 8px;
      background-color: #fff;
      transition: all 0.2s ease;
    }
    &__input {
      width: 100%;
      height: 25px;
      line-height: 25px;
      display: block;
      border: none;
      text-align: center;
      outline: none;
    }
    &__separate {
      height: 1px;
      line-height: 1px;
      font-size: 0;
      border-bottom: 1px solid #bdc3c7;
      margin: 1px 0;
    }
  }
</style>
